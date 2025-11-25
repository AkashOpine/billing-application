import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { GetSession } from "../../../Lib/Session";
import { Card, Col, Row } from "react-bootstrap";
import { IoReturnUpBack } from "react-icons/io5";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import { CiEdit } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { AiFillMail } from "react-icons/ai";
import { ConmmonContainer } from "../../Bill/Sub/AddBillsStyles";
import {
  CustomMDBTableHead,
  FullTableContain,
  StatusBox,
  StyledMDBTable,
  StyledMDBTableBody,
  StyledTable,
} from "../../../Styles/TableStyles";
import PaginationComponent from "../../../Components/Paginations/Pagination";
import AddVendorModal from "./AddVendorModal";
import Tag from "../../../Assets/Icons/tag.png";
import MoneyInHand from "../../../Assets/Icons/money-hand.png";
import Money from "../../../Assets/Icons/money.png";
import {
  GetPurchaseAmountByVendor,
  GetPurchaseByVendor,
  GetVendorById,
} from "../../../Redux/Api/Vendor/action";

function ViewVendor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SessionData = GetSession();

  const { id } = useParams();
  const [editData, setEditData] = useState<FormData | null>(null);
  const [addVendorModal, setAddVendorModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);

  const VendorByIdResponse: any = useSelector(
    (state: any) => state.VendorReducers.GetVendorByIdRes
  );
  const PurchaseByVendorResponse: any = useSelector(
    (state: any) => state.VendorReducers.GetPurchaseByVendorRes
  );
  const PurchaseAmountByVendorResponse: any = useSelector(
    (state: any) => state.VendorReducers.GetPurchaseAmountByVendorRes
  );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setCurrentPage(1);
  };
  const columnDef = [
    { name: "Purchase Number" },
    { name: "Invoice Number" },
    { name: "Name" },
    { name: "Phone" },
    { name: "Grand total " },
    { name: "Received" },
    { name: "Balance Due" },
    { name: "Payment status " },
  ];

  const handleEditCust = (data: any) => {
    setEditData(data);
    handleOpenAddVendorModal();
  };
  const handleOpenAddVendorModal = () => {
    setAddVendorModal(true);
  };
  const handleCloseAddVendorModal = () => {
    setAddVendorModal(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(
        GetVendorById({
          id: id,
        }) as any
      );
    }
  }, [id]);
  useEffect(() => {
    if (VendorByIdResponse?.vendorId) {
      dispatch(
        GetPurchaseByVendor({
          vendorId: VendorByIdResponse?.vendorId,
          branchId: SessionData?.user?.branchId,
          org_id: SessionData?.user?.organizationId,
          page: currentPage,
          size: perPage,
        }) as any
      );
    }
  }, [VendorByIdResponse?.vendorId, perPage, currentPage]);

  useEffect(() => {
    if (VendorByIdResponse?.vendorId) {
      dispatch(
        GetPurchaseAmountByVendor({
          vendorId: VendorByIdResponse?.vendorId,
          org_id: SessionData?.user?.organizationId,
        }) as any
      );
    }
  }, [VendorByIdResponse?.vendorId]);
  useEffect(() => {
    console.log(
      "PurchaseAmountByVendorResponse",
      PurchaseAmountByVendorResponse
    );
  }, [PurchaseAmountByVendorResponse]);

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
              onClick={() => handleEditCust(VendorByIdResponse)}
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
                <h5>{VendorByIdResponse?.vendorName}</h5>
                <SubText>
                  {" "}
                  <FaPhone className="me-2" />
                  {VendorByIdResponse?.phone}
                </SubText>
                <SubText>
                  <AiFillMail className="me-2" /> {VendorByIdResponse?.email}
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
                        ₹ {PurchaseAmountByVendorResponse?.totalAmount}
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
                        ₹ {PurchaseAmountByVendorResponse?.totalAmountPaid}
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
                        ₹ {PurchaseAmountByVendorResponse?.totalAmountBalance}
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
                      {columnDef?.map((col, colIndex) => (
                        <th key={colIndex}>{col.name}</th>
                      ))}
                      <th></th>
                    </tr>
                  </CustomMDBTableHead>
                  <StyledMDBTableBody>
                    {PurchaseByVendorResponse?.content?.length > 0 ? (
                      PurchaseByVendorResponse.content.map(
                        (item: any, index: any) => (
                          <tr key={index}>
                            <td>{item.poNumber}</td>
                            <td>{item.poInvoiceNumber}</td>
                            <td>{item.poVendorName}</td>
                            <td>{item.poVendorPhone}</td>

                            <td style={{ fontWeight: "600" }}>
                              {item.poGrandTotal}
                            </td>
                            <td style={{ fontWeight: "600" }}>
                              {item.poPaidAmount}
                            </td>
                            <td style={{ color: "#d946ef" }}>
                              {item.poBalanceAmount}
                            </td>
                            <td>
                              <StatusBox status={item.poPaidStatusDescription}>
                                {item.poPaidStatusDescription}
                              </StatusBox>
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
                  totalPages={PurchaseByVendorResponse?.totalPages}
                  totalElements={PurchaseByVendorResponse?.totalElements}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  handlePerPageChange={handlePerPageChange}
                />
              </FullTableContain>
            </StyledTable>
          </div>
        </Card.Body>
      </Card>
      <AddVendorModal
        Show={addVendorModal}
        handleCloseModal={handleCloseAddVendorModal}
        EditData={editData}
        setEditData={setEditData}
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
export default ViewVendor;
