import React, { useEffect, useState } from "react";
import {
  CustomMDBTableHead,
  FullTableContain,
  StickyTd,
  StickyTh,
  StyledMDBTable,
  StyledMDBTableBody,
  StyledTable,
} from "../../../../Styles/TableStyles";
import ActionDropdown from "../../../../Components/Dropdowns/Action Dropdown/ActionDropdown";
import ContentHeading from "../../../../Components/Headings/ContentHeading";
import IconButton from "../../../../Components/Buttons/Icon Button/IconButton";
import { HiOutlineDotsVertical } from "react-icons/hi";
import TableSearch from "../../../../Components/Inputs/Table Search/TableSearchInput";
import FilterDropdown from "../../../../Components/Dropdowns/Filter Dropdown/FilterDropdown";
import PaginationComponent from "../../../../Components/Paginations/Pagination";

import { CiSearch } from "react-icons/ci";
import { IconContainerButton } from "../../../../Styles/CommonStyles";
import { LuUpload } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetSession } from "../../../../Lib/Session";
import {
  ExportSalesReport,
  GetSalesReport,
} from "../../../../Redux/Api/Reports/action";
import { GetCustomerList } from "../../../../Redux/Api/Customer/action";
import CustomSelect from "../../../../Components/Inputs/SearchInput/CustomSelect";
import DateRangePicker from "../../../../Components/Date Rage PIcker/DateRangePicker";
import InputAuto from "../../../../Components/Inputs/AutoCompleteInput/InputAuto";

const tableData = [
  {
    invoiceNo: "558612",
    customer: "Autumn Phillips",
    phone: "(978) 444-4055",
    date: "24 May, 2020",
    total: "₹7,283",
    gst: "₹7,283",
    status: "Active",
  },
  {
    invoiceNo: "558612",
    customer: "Kenneth Allen",
    phone: "(347) 438-7215",
    date: "24 May, 2020",
    total: "₹7,283",
    gst: "₹7,283",
    status: "Active",
  },
];
type OptionType = {
  label: string;
  value: string;
};
const today = new Date();
const fifteenDaysAgo = new Date();
fifteenDaysAgo.setDate(today.getDate() - 15);
const formatDate = (date: Date): string => date.toISOString().split("T")[0];

function SalesReport() {
  const dispatch = useDispatch();
  const SessionData = GetSession();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [selectedSections, setSelectedSections] = useState("");
  const [fromDate, setFromDate] = useState<string>(formatDate(fifteenDaysAgo));
  const [toDate, setToDate] = useState<string>(formatDate(today));
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<OptionType | {}>({});

  const SalesReportResponse: any = useSelector(
    (state: any) => state.ReportReducers.GetSalesReportRes
  );
  const ExportSalesReportResponse: any = useSelector(
    (state: any) => state.ReportReducers.ExportSalesReportRes
  );
  const CustomerResponse: any = useSelector(
    (state: any) => state.CustomerReducers.GetCustomerList
  );

  const CustData = CustomerResponse?.map((data: any) => ({
    value: data.customerId,
    label: data.customerName,
  }));

  const handleSelectChange = (option: OptionType | null) => {
    setSelectedOption(option);
    console.log("Selected:", option);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setCurrentPage(1);
  };
  const columnDef = [
    { name: "Invoice No" },
    { name: "Customer" },
    { name: "Phone Number" },
    { name: "Date" },

    { name: "GST" },
    { name: "GST Percentage" },
    { name: "Total" },
    { name: "Status" },
  ];

  const handleCheckboxChange = (index: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };
  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(tableData.map((_, index) => index));
    }
    setIsSelectAllChecked(!isSelectAllChecked);
  };

  const handleEdit = (rowData: any) => {
    console.log("Edit clicked:", rowData);
  };

  const handleDelete = (rowData: any) => {
    console.log("Delete clicked:", rowData);
  };

  const handleExport = () => {
    dispatch(
      ExportSalesReport({
        org_id: SessionData?.user?.organizationId,
        branchId: SessionData?.user?.branchId,
        searchText: searchTerm,
        custId: selectedOption?.value || 0,
        fromDate: fromDate,
        toDate: toDate,
      }) as any
    );
  };
  useEffect(() => {
    dispatch(
      GetSalesReport({
        org_id: SessionData?.user?.organizationId,
        branchId: SessionData?.user?.branchId,
        page: currentPage,
        searchText: searchTerm,
        size: perPage,
        custId: selectedOption?.value || 0,
        fromDate: fromDate,
        toDate: toDate,
      }) as any
    );
  }, [searchTerm, currentPage, perPage, selectedOption, fromDate, toDate]);
  useEffect(() => {
    dispatch(GetCustomerList(null) as any);
  }, []);

  useEffect(() => {
    console.log("sales perPage", perPage);
  }, [perPage]);

  return (
    <div className="w-100 flex-grow-1">
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <div className="d-flex gap-3 align-items-center">
          <ContentHeading>Sales Report</ContentHeading>
          <TableSearch
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Invoice No"
            width="150px"
            height="34px"
          />

          <div>
            <InputAuto
              pholder="Customer"
              data={CustData?.map((item: any) => item.label) || ""}
              onSelected={(selectedLabel) => {
                const selected = CustData.find(
                  (s: any) => s.label === selectedLabel
                );
                if (selected) {
                  setSelectedOption({
                    label: selected.label,
                    value: selected.value,
                  });
                }
              }}
              onChange={(val) => {
                console.log(val);
                if (val === "") {
                  setSelectedOption({
                    label: "",
                    value: "",
                  });
                }
              }}
            />
          </div>
          <DateRangePicker
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
          />
          {/* <IconContainerButton color="#fff" backgroundColor="#CACACA">
            <CiSearch />
          </IconContainerButton> */}
        </div>
        <div className="d-flex gap-3">
          <IconButton
            icon={LuUpload}
            onClick={handleExport}
            iconColor=""
            padding="0.6em"
          >
            Export
          </IconButton>
          {/* <FilterDropdown
            sections={[
              {
                heading: "Section",
                data: [
                  { id: "1", label: "Regular" },
                  { id: "2", label: "Reference" },
                ],
                selectedData: selectedSections,
                setSelectedData: setSelectedSections,
              },
            ]}
          /> */}

          {/* <IconButton icon={HiOutlineDotsVertical} iconColor="" padding="0.6em">
            Action
          </IconButton> */}
        </div>
      </div>
      <div className="mt-4">
        <StyledTable>
          <FullTableContain>
            <StyledMDBTable>
              <CustomMDBTableHead>
                <tr>
                  {/* <StickyTh>
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={isSelectAllChecked}
                      onChange={handleSelectAll}
                    />
                  </StickyTh> */}
                  {columnDef?.map((col, colIndex) => (
                    <th key={colIndex}>{col.name}</th>
                  ))}
                  <th></th>
                </tr>
              </CustomMDBTableHead>
              <StyledMDBTableBody>
                {SalesReportResponse?.content?.length > 0 ? (
                  SalesReportResponse.content.map(
                    (item: any, index: number) => (
                      <tr key={index}>
                        {/* <StickyTd>
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            checked={selectedItems.includes(index)}
                            onChange={() => handleCheckboxChange(index)}
                          />
                        </StickyTd> */}
                        <td>{item.invoiceNumber}</td>
                        <td>{item.customerName}</td>
                        <td>{item.customerPhone}</td>
                        <td>
                          {item.dateCreated
                            ? new Date(item.dateCreated)
                                .toISOString()
                                .split("T")[0]
                            : ""}
                        </td>

                        <td>
                          {item.taxBreakupList?.length === 1 &&
                            item.taxBreakupList[0].taxType}
                          {item.taxBreakupList?.length === 2 &&
                            `${item.taxBreakupList[0].taxType} - ${item.taxBreakupList[1].taxType}`}
                        </td>
                        <td>{item.invoiceTaxPercent}%</td>
                        <td>{item.invoiceGrandTotal}</td>
                        <td>
                          <div
                            style={{
                              color:
                                item.invoicePaidStatusDescription ===
                                "Payment Complete"
                                  ? "#2dd4bf" // Paid
                                  : item.invoicePaidStatusDescription ===
                                    "Payment Pending"
                                  ? "#fb923c" // Pending
                                  : item.invoicePaidStatusDescription ===
                                    "Payment Due"
                                  ? "#3b82f6" // Due
                                  : "#000",
                              fontWeight: 500,
                            }}
                          >
                            {item.invoicePaidStatusDescription}
                          </div>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={9}
                      style={{ textAlign: "center", padding: "1rem" }}
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </StyledMDBTableBody>
            </StyledMDBTable>

            <PaginationComponent
              perPage={perPage}
              totalPages={SalesReportResponse?.totalPages}
              totalElements={SalesReportResponse?.totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
            />
          </FullTableContain>
        </StyledTable>
      </div>
    </div>
  );
}

export default SalesReport;
