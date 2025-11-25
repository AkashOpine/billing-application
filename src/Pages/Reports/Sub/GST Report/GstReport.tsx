import React, { useEffect, useState } from "react";
import ContentHeading from "../../../../Components/Headings/ContentHeading";
import TableSearch from "../../../../Components/Inputs/Table Search/TableSearchInput";
import {
  DownArrowIcon,
  StyledSelect,
  StyledSelectWrapper,
} from "../../../../Styles/Form Styles/FormStyles";
import { IconContainerButton } from "../../../../Styles/CommonStyles";
import { CiSearch } from "react-icons/ci";
import IconButton from "../../../../Components/Buttons/Icon Button/IconButton";
import { LuUpload } from "react-icons/lu";
import FilterDropdown from "../../../../Components/Dropdowns/Filter Dropdown/FilterDropdown";
import { HiOutlineDotsVertical } from "react-icons/hi";
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
import PaginationComponent from "../../../../Components/Paginations/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { GetSession } from "../../../../Lib/Session";
import {
  ClearExportGstReport,
  ExportGstReport,
  GetGstReport,
} from "../../../../Redux/Api/Reports/action";
import { GetCustomerList } from "../../../../Redux/Api/Customer/action";
import CustomSelect from "../../../../Components/Inputs/SearchInput/CustomSelect";
import DateRangePicker from "../../../../Components/Date Rage PIcker/DateRangePicker";
import { GetGstList } from "../../../../Redux/Api/Settings/action";
import InputAuto from "../../../../Components/Inputs/AutoCompleteInput/InputAuto";
const tableData = [
  {
    date: "24 May, 2020",
    invoiceNo: "GSV567489240UI",
    party: "(978) 444-4055",
    cgst: "₹7,283",
    sgst: "₹7,283",
    igst: "₹7,283",
    totalGst: "₹7,283",
    netAmount: "₹7,283",
  },
  {
    date: "24 May, 2020",
    invoiceNo: "GSV567489240UI",
    party: "(347) 438-7215",
    cgst: "₹7,283",
    sgst: "₹7,283",
    igst: "₹7,283",
    totalGst: "₹7,283",
    netAmount: "₹7,283",
  },
  {
    date: "24 May, 2020",
    invoiceNo: "GSV567489240UI",
    party: "(917) 339-6416",
    cgst: "₹7,283",
    sgst: "₹7,283",
    igst: "₹7,283",
    totalGst: "₹7,283",
    netAmount: "₹7,283",
  },
  {
    date: "24 May, 2020",
    invoiceNo: "GSV567489240UI",
    party: "(401) 715-3344",
    cgst: "₹7,283",
    sgst: "₹7,283",
    igst: "₹7,283",
    totalGst: "₹7,283",
    netAmount: "₹7,283",
  },
  {
    date: "24 May, 2020",
    invoiceNo: "GSV567489240UI",
    party: "(830) 556-6651",
    cgst: "₹7,283",
    sgst: "₹7,283",
    igst: "₹7,283",
    totalGst: "₹7,283",
    netAmount: "₹7,283",
  },
  {
    date: "24 May, 2020",
    invoiceNo: "GSV567489240UI",
    party: "(920) 948-1722",
    cgst: "₹7,283",
    sgst: "₹7,283",
    igst: "₹7,283",
    totalGst: "₹7,283",
    netAmount: "₹7,283",
  },
  {
    date: "24 May, 2020",
    invoiceNo: "GSV567489240UI",
    party: "(503) 338-2573",
    cgst: "₹7,283",
    sgst: "₹7,283",
    igst: "₹7,283",
    totalGst: "₹7,283",
    netAmount: "₹7,283",
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

function GstReport() {
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
  const [selectedGstType, setSelectedGstType] = useState<OptionType | null>(
    null
  );

  const GstReportResponse: any = useSelector(
    (state: any) => state.ReportReducers.GetGstReportRes
  );
  const ExportGstReportResponse: any = useSelector(
    (state: any) => state.ReportReducers.ExportGstReportRes
  );
  const CustomerResponse: any = useSelector(
    (state: any) => state.CustomerReducers.GetCustomerList
  );
  const GstListResponse: any = useSelector(
    (state: any) => state.SettingReducers.GetGstListRes
  );
  const CustData = CustomerResponse?.map((data: any) => ({
    value: data.customerId,
    label: data.customerName,
  }));
  const GstData = GstListResponse?.map((data: any) => ({
    value: data.gstId,
    label: data.gstType,
  }));
  const handleSelectChange = (option: OptionType | null) => {
    setSelectedOption(option);
  };
  const handleSelectGstType = (option: OptionType | null) => {
    setSelectedGstType(option);
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
    { name: "Date" },
    { name: "Invoice No" },
    { name: "Party GSTIN" },
    { name: "Party Name" },
    { name: "Taxable Amt" },
    // { name: "Gst Type" },
    { name: "Gst Percentage" },
    { name: "CGST ₹" },
    { name: "SGST ₹" },
    { name: "IGST ₹" },
    { name: "Total GST" },
    { name: "Invoice Value" },
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
      GstReportResponse?.content?.map((item: any) => item.txnId);
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
      ExportGstReport({
        org_id: SessionData?.user?.organizationId,
        branchId: SessionData?.user?.branchId,
        searchText: searchTerm,
        custId: selectedOption?.value || 0,
        fromDate: fromDate,
        toDate: toDate,
        gstId: selectedGstType?.map((gst: any) => gst.value) || [],
      }) as any
    );
  };
  useEffect(() => {
    dispatch(
      GetGstReport({
        org_id: SessionData?.user?.organizationId,
        branchId: SessionData?.user?.branchId,
        page: currentPage,
        searchText: searchTerm,
        size: perPage,
        custId: selectedOption?.value || 0,
        fromDate: fromDate,
        toDate: toDate,
        gstId: selectedGstType?.map((gst: any) => gst.value) || [],
      }) as any
    );
  }, [
    searchTerm,
    currentPage,
    perPage,
    selectedOption,
    fromDate,
    toDate,
    selectedGstType,
  ]);
  useEffect(() => {
    dispatch(GetCustomerList(null) as any);
  }, []);
  useEffect(() => {
    dispatch(GetGstList(null) as any);
  }, []);

  return (
    <div className="w-100 flex-grow-1">
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <div className="d-flex gap-3 align-items-center">
          <ContentHeading>GST Report</ContentHeading>
          <DateRangePicker
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
          />
          {/* <CustomSelect
            options={GstData}
            value={selectedGstType}
            onChange={handleSelectGstType}
            placeholder="Gst Type"
            isClearable
            isMulti
          /> */}
          <div>
            <InputAuto
              pholder="Suplier/Customer"
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
                {GstReportResponse?.content?.length > 0 ? (
                  GstReportResponse.content.map((item: any, index: number) => (
                    <tr key={index}>
                      {/* <StickyTd>
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          checked={selectedItems.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </StickyTd> */}
                      <td>{item.date}</td>
                      <td>{item.invoiceNo}</td>
                      <td>{item.customerGstin}</td>
                      <td>{item.customer}</td>
                      <td>{item.taxableAmount}</td>
                      {/* <td>
                        {item.tax && item.taxPercent
                          ? `${item.tax} - ${item.taxPercent}%`
                          : ""}
                      </td> */}
                      <td>{item.taxName} - {item.taxPercent}%</td>
                      <td>{item.cgst || 0} ₹</td>
                      <td>{item.sgst || 0} ₹</td>
                      <td>{item.igst || 0} ₹</td>
                      <td>{item.totalGst}</td>
                      <td>{item.grandTotal + item.totalGst}</td>
                      {/* <td style={{ textAlign: "end" }}>
                        <ActionDropdown
                          onEdit={() => handleEdit(item)}
                          onDelete={() => handleDelete(item)}
                        />
                      </td> */}
                    </tr>
                  ))
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
              totalPages={GstReportResponse?.totalPages}
              totalElements={GstReportResponse?.totalItems}
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

export default GstReport;
