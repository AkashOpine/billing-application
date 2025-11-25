import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import { BsPrinter, BsThreeDotsVertical } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { ConmmonContainer } from "../../Bill/Sub/AddBillsStyles";
import Tag from "../../../Assets/Icons/tag.png";
import MoneyInHand from "../../../Assets/Icons/money-hand.png";
import Money from "../../../Assets/Icons/money.png";
import { FaPhone } from "react-icons/fa6";
import { AiFillMail } from "react-icons/ai";
import styled from "styled-components";
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
import {
  GetCustomerById,
  GetInvoiceByCust,
  GetInvoiceStatusByCust,
} from "../../../Redux/Api/Customer/action";
import AddCustomerModal from "./AddCustomerModal";
import { GetSession } from "../../../Lib/Session";
import { ClearGetTransactionsByInvoice } from "../../../Redux/Api/Invoice/action";
import PayInvoiceModal from "../../Invoice/Sub/PayInvoiceModal";

function ViewCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SessionData = GetSession();

  const { id } = useParams();
  const [editData, setEditData] = useState<FormData | null>(null);
  const [ShowCreateCdModal, setShowCreateCdModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [modalData, setModalData] = useState({
    invoiceId: "",
    invoiceNumber: "",
    customerName: "",
    dueAmount: "",
    customerId: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [showPayInvoiceModal, setShowPayInvoiceModal] = useState(false);
  const [paidAmount, setPaidAmount] = useState("");

  const CustByIdResponse: any = useSelector(
    (state: any) => state.CustomerReducers.GetCustomerById
  );
  const InvoiceByCustResponse: any = useSelector(
    (state: any) => state.CustomerReducers.GetInvoiceByCust
  );
  const InvoiceStatusByCustResponse: any = useSelector(
    (state: any) => state.CustomerReducers.GetInvoiceStatusByCust
  );
  const AddTransactionResponse: any = useSelector(
      (state: any) => state.InvoiceReducers.AddTransactionRes
    );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setCurrentPage(1);
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
  const columnDef = [
    { name: "ID" },
    { name: "Name" },
    { name: "Phone" },
    { name: "Grand total " },
    { name: "Received" },
    { name: "Balance Due" },
    { name: "Payment status " },
    { name: "Payment" },
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
        InvoiceByCustResponse?.content?.map((item: any) => item.invoiceId)
      );
    }
    setIsSelectAllChecked(!isSelectAllChecked);
  };
  const handleEditCust = (data: any) => {
    setEditData(data);
    handleOpenCreateCdModal();
  };
  const handleOpenCreateCdModal = () => {
    setShowCreateCdModal(true);
  };
  const handleCloseCreateCdModal = () => {
    setShowCreateCdModal(false);
  };
  const handleEdit = (rowData: any) => {
    navigate(`invoice/list/add/${id}`);
  };

  const handleDelete = (rowData: any) => {
    console.log("Delete clicked:", rowData);
  };
  useEffect(() => {
    if (id) {
      dispatch(
        GetCustomerById({
          id: id,
        }) as any
      );
    }
  }, [id]);
  useEffect(() => {
    if (CustByIdResponse?.customerId) {
      dispatch(
        GetInvoiceByCust({
          custId: CustByIdResponse?.customerId,
          org_id: SessionData?.user?.organizationId,
          page: currentPage,
          size: perPage,
        }) as any
      );
    }
  }, [CustByIdResponse?.customerId, perPage, currentPage,AddTransactionResponse]);

  useEffect(() => {
    if (CustByIdResponse?.customerId) {
      dispatch(
        GetInvoiceStatusByCust({
          custId: CustByIdResponse?.customerId,
          org_id: SessionData?.user?.organizationId,
        }) as any
      );
    }
  }, [CustByIdResponse?.customerId,AddTransactionResponse]);

  return (
    <div className="w-100 flex-grow-1">
      <Card style={{ background: "#FFFFFF80", border: "none" }}>
        <Card.Header
          style={{
            background: "#FFFFFF80",
            borderBottom: "1px solid #0000001A",
          }}
          className="d-flex justify-content-between align-items-center flex-wrap"
        >
          <div className="d-flex gap-3">
            <IoReturnUpBack onClick={() => navigate(-1)} />
          </div>
          <div className="d-flex gap-3 flex-wrap">
            <IconButton
              icon={CiEdit}
              iconColor="#E25889"
              border="0.5px solid #D3D3D3"
              width="96px"
              onClick={() => handleEditCust(CustByIdResponse)}
            >
              Edit
            </IconButton>
            {/* <IconButton
              icon={BsPrinter}
              iconColor="#E25889"
              border="0.5px solid #D3D3D3"
              width="96px"
            >
              Print
            </IconButton>
            <IconButton
              icon={BsThreeDotsVertical}
              iconColor="#000000"
              border="0.5px solid #D3D3D3"
            >
              Actions
            </IconButton> */}
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={3}>
              <div>
                <h5>{CustByIdResponse?.customerName}</h5>
                <SubText>
                  {" "}
                  <FaPhone className="me-2" />
                  {CustByIdResponse?.phone}
                </SubText>
                <SubText>
                  <AiFillMail className="me-2" /> {CustByIdResponse?.email}
                </SubText>
              </div>
            </Col>

            <Col md={9}>
              <Row>
                <Col>
                  <ConmmonContainer>
                    <div>Invoice Amount</div>
                    <div className="d-flex gap-2 align-items-center justiy-content-center">
                      <img src={Tag} alt="" />{" "}
                      <h5 className="mt-2">
                        ₹ {InvoiceStatusByCustResponse?.totalAmount}
                      </h5>
                    </div>
                  </ConmmonContainer>
                </Col>

                <Col>
                  {" "}
                  <ConmmonContainer>
                    <div>Amount Received</div>
                    <div className="d-flex gap-2 align-items-center justiy-content-center">
                      <img src={MoneyInHand} alt="" />{" "}
                      <h5 className="mt-2">
                        ₹ {InvoiceStatusByCustResponse?.totalAmountPaid}
                      </h5>
                    </div>
                  </ConmmonContainer>
                </Col>

                <Col>
                  {" "}
                  <ConmmonContainer>
                    <div>Outstanding Balance</div>
                    <div className="d-flex gap-2 align-items-center justiy-content-center">
                      <img src={Money} alt="" />{" "}
                      <h5 className="mt-2">
                        ₹ {InvoiceStatusByCustResponse?.totalAmountBalance}
                      </h5>
                    </div>
                  </ConmmonContainer>
                </Col>
              </Row>
            </Col>
          </Row>
          <SubHeading> History</SubHeading>
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
                    {InvoiceByCustResponse?.content?.length > 0 ? (
                      InvoiceByCustResponse.content.map(
                        (item: any, index: any) => (
                          <tr key={index}>
                            {/* <StickyTd>
                              <input
                                className="custom-checkbox"
                                type="checkbox"
                                checked={selectedItems.includes(item.invoiceId)}
                                onChange={() =>
                                  handleCheckboxChange(item.invoiceId)
                                }
                              />
                            </StickyTd> */}
                            <td>{item.invoiceNumber}</td>
                            <td>{item.customerName}</td>
                            <td>{item.customerPhone}</td>

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
                              <StatusBox
                                status={item.invoicePaidStatusDescription}
                              >
                                {item.invoicePaidStatusDescription}
                              </StatusBox>
                            </td>
                            <td>
                              {item.invoicePaidStatusDescription ===
                                "Pending" ||
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
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          style={{ textAlign: "center", padding: "1rem" }}
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </StyledMDBTableBody>
                </StyledMDBTable>

                <PaginationComponent
                  perPage={perPage}
                  totalPages={InvoiceByCustResponse?.totalPages}
                  totalElements={InvoiceByCustResponse?.totalElements}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  handlePerPageChange={handlePerPageChange}
                />
              </FullTableContain>
            </StyledTable>
          </div>
        </Card.Body>
      </Card>
      <AddCustomerModal
        Show={ShowCreateCdModal}
        handleCloseModal={handleCloseCreateCdModal}
        EditData={editData}
        setEditData={setEditData}
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
      />
    </div>
  );
}

const SubHeading = styled.h6`
  color: #747474;
  font-size: 15px;
  font-weight: 500;
  line-height: 10px;
`;
const SubText = styled.p`
  color: #747474;
  font-size: 13px;
  font-weight: 400;
  line-height: 10px;
`;
export default ViewCustomer;
