import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSession } from "../../../Lib/Session";
import DateRangePickerNew from "../../../Components/Date Rage PIcker/DateRangePickerNew";
import ContentHeading from "../../../Components/Headings/ContentHeading";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  CustomMDBTableHead,
  FullTableContain,
  StatusBox,
  StickyTd,
  StickyTh,
  StyledMDBTable,
  StyledMDBTableBody,
  StyledTable,
} from "../../../Styles/TableStyles";
import PaginationComponent from "../../../Components/Paginations/Pagination";
import {
  ExportTransactionReport,
  GetTransactions,
} from "../../../Redux/Api/Invoice/action";
import TableSearch from "../../../Components/Inputs/Table Search/TableSearchInput";
import { LuUpload } from "react-icons/lu";

const today = new Date();
const fifteenDaysAgo = new Date();
fifteenDaysAgo.setDate(today.getDate() - 15);

function TransactionsList() {
  const dispatch = useDispatch();
  const SessionData = GetSession();
  const [startDate, setStartDate] = useState<Date | null>(fifteenDaysAgo);
  const [endDate, setEndDate] = useState<Date | null>(today);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  const TransactionsResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.GetTransactionRes
  );
  const columnDef = [
    { name: "invoice no" },
    { name: "TXN ID" },
    { name: "Invoice date" },
    { name: "Name" },
    { name: "Phone" },
    { name: "Amount Received" },
    { name: "Balance" },
    { name: "Received Date" },
    { name: "Payment Status" },
    { name: "Mode of Payment" },
    { name: "Type of TXN" },
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
      setSelectedItems(
        TransactionsResponse?.content?.map((item: any) => item.txnId)
      );
    }
    setIsSelectAllChecked(!isSelectAllChecked);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setCurrentPage(1);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const formatToYMD = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleExport = () => {
    dispatch(
      ExportTransactionReport({
        org_id: SessionData?.user?.organizationId,
        branchId: SessionData?.user?.branchId,

        searchText: searchTerm,

        toDate: formatToYMD(endDate),
        fromDate: formatToYMD(startDate),
      }) as any
    );
  };
  useEffect(() => {
    dispatch(
      GetTransactions({
        org_id: SessionData?.user?.organizationId,
        branchId: SessionData?.user?.branchId,
        page: currentPage,
        searchText: searchTerm,
        size: perPage,
        toDate: formatToYMD(endDate),
        fromDate: formatToYMD(startDate),
      }) as any
    );
  }, [searchTerm, currentPage, perPage, startDate, endDate]);

  return (
    <div className="w-100 flex-grow-1">
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <div className="d-flex gap-3 align-items-center">
          <ContentHeading>Transaction</ContentHeading>
          <DateRangePickerNew
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <TableSearch value={searchTerm} onChange={handleSearch} />
          {/* <IconContainerButton color="#fff" backgroundColor="#CACACA">
            <CiSearch />
          </IconContainerButton> */}
        </div>
        <div className="d-flex gap-3">
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
          {/* <IconButton icon={LuUpload} iconColor="" padding="0.6em">
            Export
          </IconButton>
          <IconButton icon={HiOutlineDotsVertical} iconColor="" padding="0.6em">
            Action
          </IconButton> */}
          <IconButton
            icon={LuUpload}
            onClick={handleExport}
            iconColor=""
            padding="0.6em"
          >
            Export
          </IconButton>
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
                {TransactionsResponse?.content?.length > 0 ? (
                  TransactionsResponse.content.map(
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
                        <td>{item.referenceNo}</td>
                        <td>{item.txnId}</td>
                        <td>{item.invoiceOrPurchaseDate}</td>
                        <td>{item.supplierOrCustomerName}</td>
                        <td>{item.phone}</td>
                        <td>{item.amountReceived}</td>
                        <td>{item.balance}</td>
                        <td>{item.receivedDate}</td>

                        <td>
                          {" "}
                          <StatusBox status={item.paymentStatus}>
                            {item.paymentStatus}
                          </StatusBox>
                        </td>
                        <td>{item.modeOfPayment}</td>
                        <td>{item.typeOfTxn}</td>
                        {/* <td style={{ textAlign: "end" }}>
                        <ActionDropdown
                          onEdit={() => handleEdit(item)}
                          onDelete={() => handleDelete(item)}
                        />
                      </td> */}
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={11}
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
              totalPages={TransactionsResponse?.totalPages}
              totalElements={TransactionsResponse?.totalElements}
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

export default TransactionsList;
