import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeading from "../../../Components/Headings/ContentHeading";
import TableSearch from "../../../Components/Inputs/Table Search/TableSearchInput";
import FilterDropdown from "../../../Components/Dropdowns/Filter Dropdown/FilterDropdown";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import { GoPlus } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  CustomMDBTableHead,
  FullTableContain,
  PayButton,
  StatusBox,
  StickyTd,
  StickyTh,
  StyledMDBTable,
  StyledMDBTableBody,
  StyledTable,
} from "../../../Styles/TableStyles";
import ActionDropdown from "../../../Components/Dropdowns/Action Dropdown/ActionDropdown";
import PaginationComponent from "../../../Components/Paginations/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { GetSession } from "../../../Lib/Session";
import {
  ClearAddInvoice,
  ClearCheckInvoiceNum,
  ClearGetTransactionsByInvoice,
  ClearInvoiceNum,
  DeleteInvoice,
  GetInvoice,
  GetInvoicePDF,
} from "../../../Redux/Api/Invoice/action";
import ConfirmationModal from "../../../Components/Modals/ConfirmationModal";
import InvoicePDFModal from "./InvoicePDFModal";
import { ClearAddServiceField } from "../../../Redux/Api/Settings/action";
import PayInvoiceModal from "./PayInvoiceModal";
import { ClearCustByNum } from "../../../Redux/Api/Customer/action";
import { SetFilters } from "../../../Redux/Common/Filter States/action";
const today = new Date();
const oneMonthAgo = new Date(today);
oneMonthAgo.setMonth(today.getMonth() - 1);

const formatDate = (date: Date): string => date.toISOString().split("T")[0];
function InvoiceList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SessionData = GetSession();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [selectedSections, setSelectedSections] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [fromDate, setFromDate] = useState<string>(formatDate(oneMonthAgo));
  // const [toDate, setToDate] = useState<string>(formatDate(today));
  const [showModal, setShowModal] = useState(false);
  const [showPayInvoiceModal, setShowPayInvoiceModal] = useState(false);
  const [modalData, setModalData] = useState({
    invoiceId: "",
    invoiceNumber: "",
    customerName: "",
    dueAmount: "",
    customerId: "",
  });
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("gpay");

  const InvoiceResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.GetInvoiceRes
  );
  const AddInvoiceResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.AddInvoiceRes
  );
  const EditInvoiceResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.EditInvoiceRes
  );
  const DeleteInvoiceResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.DeleteInvoiceRes
  );
  const InvoicePDFResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.GetInvoicePDF
  );
  const AddTransactionResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.AddTransactionRes
  );
  const { fromDate, toDate } = useSelector(
    (state: any) => state.FilterReducer.filters.dateRange || {}
  );
 

  // ✅ Handlers that dispatch Redux actions
  const handleFromDateChange = (newDate: string) => {
    dispatch(SetFilters("dateRange", { fromDate: newDate, toDate }));
  };

  const handleToDateChange = (newDate: string) => {
    dispatch(SetFilters("dateRange", { fromDate, toDate: newDate }));
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
    { name: "Invoice Number" },
    { name: "Name" },
    { name: "Phone" },
    // { name: "Expected Delivery date" },
    { name: "Grand total " },
    { name: "Received" },
    { name: "Balance Due" },
    { name: "Payment status " },
    { name: "Payment" },
    { name: "" },
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
        InvoiceResponse?.content?.map((item: any) => item.invoiceId)
      );
    }
    setIsSelectAllChecked(!isSelectAllChecked);
  };

  const handleEdit = (id: any) => {
    dispatch(ClearAddInvoice());
    dispatch(ClearAddServiceField());
    dispatch(ClearCustByNum());
    dispatch(ClearCheckInvoiceNum());
    dispatch(ClearInvoiceNum());

    navigate(`add/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handlePDFDownload = (id: string) => {
    dispatch(GetInvoicePDF({ id: id }) as any);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    dispatch(
      DeleteInvoice({
        id: selectedId,
        userId: SessionData?.user?.id,
      }) as any
    );
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  const AddInvoice = () => {
    dispatch(ClearAddInvoice());
    dispatch(ClearAddServiceField());
    dispatch(ClearCustByNum());
    dispatch(ClearCheckInvoiceNum());
    dispatch(ClearInvoiceNum());
    navigate("add");
  };
  const openModal = (item: {
    invoiceId: string;
    invoiceNumber: string;
    customerName: string;
    dueAmount: any;
    customerId: string;
  }) => {
    setModalData({
      invoiceId: item.invoiceId,
      invoiceNumber: item.invoiceNumber,
      customerName: item.customerName,
      dueAmount: item.dueAmount,
      customerId: item.customerId,
    });
    setShowPayInvoiceModal(true);
    dispatch(ClearGetTransactionsByInvoice());
  };

  useEffect(() => {
    dispatch(
      GetInvoice({
        org_id: SessionData?.user?.organizationId,
        branchId: SessionData?.user?.branchId,
        page: currentPage,
        searchText: searchTerm,
        size: perPage,
        toDate: toDate,
        fromDate: fromDate,
      }) as any
    );
  }, [
    AddInvoiceResponse,
    EditInvoiceResponse,
    DeleteInvoiceResponse,
    AddTransactionResponse,
    searchTerm,
    currentPage,
    perPage,
    toDate,
    fromDate,
  ]);

  return (
    <div className="w-100 flex-grow-1">
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <ContentHeading>Invoice</ContentHeading>
        <div className="d-flex gap-3">
          <TableSearch value={searchTerm} onChange={handleSearch} />
          <FilterDropdown
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={handleFromDateChange}
            onToDateChange={handleToDateChange}
          />
          <IconButton icon={GoPlus} bg="#0539f4" onClick={AddInvoice}>
            New
          </IconButton>

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
                  {columnDef?.map((col, colIndex) => (
                    <th key={colIndex}>{col.name}</th>
                  ))}
                  <th></th>
                </tr>
              </CustomMDBTableHead>
              <StyledMDBTableBody>
                {InvoiceResponse?.content?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item.invoiceNumber}</td>
                    <td>{item.customerName}</td>
                    <td>{item.customerPhone}</td>
                    {/* <td>{item.expectedDeliveryDate}</td> */}

                    <td style={{ fontWeight: "600" }}>
                      {item.invoiceGrandTotal}
                    </td>
                    <td style={{ fontWeight: "600" }}>
                      {item.invoiceAmountPaid}
                    </td>
                    <td style={{ color: "#d946ef" }}>
                      {item.invoiceAmountBalance}
                    </td>
                    <td>
                      <StatusBox status={item.invoicePaidStatusDescription}>
                        {item.invoicePaidStatusDescription}
                      </StatusBox>
                    </td>
                    <td>
                      {item.invoicePaidStatusDescription === "Pending" ||
                      item.invoicePaidStatusDescription === "Partial" ||
                      item.invoicePaidStatusDescription ===
                        "Payment Pending" ? (
                        <PayButton
                          onClick={() =>
                            openModal({
                              invoiceId: item.invoiceId,
                              invoiceNumber: item.invoiceNumber,
                              customerName: item.customerName,
                              dueAmount: item.invoiceAmountBalance,
                              customerId: item.customerId,
                            })
                          }
                        >
                          Pay
                        </PayButton>
                      ) : (
                        ""
                      )}
                    </td>

                    <td></td>
                    <td style={{ textAlign: "end" }}>
                      <ActionDropdown
                        onEdit={() => handleEdit(item.invoiceId)}
                        onDelete={() => handleDeleteClick(item.invoiceId)}
                        onPdfDownload={() => handlePDFDownload(item.invoiceId)}
                      />
                    </td>
                  </tr>
                ))}
              </StyledMDBTableBody>
            </StyledMDBTable>

            <PaginationComponent
              perPage={perPage}
              totalPages={InvoiceResponse?.totalPages}
              totalElements={InvoiceResponse?.totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
            />
          </FullTableContain>
        </StyledTable>
      </div>
      <ConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseModal}
        onConfirmDelete={handleConfirmDelete}
      />
      <InvoicePDFModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        PdfData={InvoicePDFResponse}
      />
      <PayInvoiceModal
        show={showPayInvoiceModal}
        onHide={() => setShowPayInvoiceModal(false)}
        invoiceId={modalData?.invoiceId}
        invoiceNumber={modalData?.invoiceNumber}
        customerName={modalData?.customerName}
        customerId={modalData?.customerId}
        dueAmount={modalData?.dueAmount}
        setModalData={setModalData}
        setInputAmount={setPaidAmount}
        inputAmount={paidAmount}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
    </div>
  );
}

export default InvoiceList;
