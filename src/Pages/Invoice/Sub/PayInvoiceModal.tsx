// PayInvoiceModal.tsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown, Col } from "react-bootstrap";
import styled from "styled-components";
import {
  CustomModalTitle,
  StyledModal,
} from "../../../Styles/ModalStyles/AddModalStyles";
import ModalCloseButton from "../../../Components/Buttons/ModalCloseButton";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  AddTransactions,
  ClearGetTransactionsByInvoice,
  EditInvoice,
  GetTransactionsByInvoice,
} from "../../../Redux/Api/Invoice/action";
import { GetSession } from "../../../Lib/Session";
import toast from "react-hot-toast";

interface PayInvoiceModalProps {
  show: boolean;
  onHide: () => void;
  invoiceId?: string;
  invoiceNumber?: string;
  customerName?: string;
  dueAmount?: any;
  setModalData?: any;
  customerId?: string;
  onSubmit?: () => void;
  inputAmount: any;
  setInputAmount: any;
  paymentMethod: any;
  setPaymentMethod: any;
}

const PayInvoiceModal: React.FC<PayInvoiceModalProps> = ({
  show,
  onHide,
  invoiceId,
  invoiceNumber,
  customerName,
  dueAmount,
  setModalData,
  customerId,
  onSubmit,
  inputAmount,
  setInputAmount,
  paymentMethod,
  setPaymentMethod,
}) => {
  const dispatch = useDispatch();
  const SessionData = GetSession();

  const [isChecked, setIsChecked] = useState(false);
  const today = new Date();
  const formattedDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  const TransactionByInvResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.GetTransactionByInvRes
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    setInputAmount(checked ? dueAmount.toString() : "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numeric input
    if (!/^\d*\.?\d*$/.test(value)) return;

    // Convert to number for comparison
    const numericValue = parseFloat(value);

    if (numericValue > dueAmount) {
      setInputAmount(""); // Clear input if greater than due
    } else {
      setInputAmount(value);
    }
  };
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Paid":
        return "status-paid";
      case "Partial":
        return "status-partial";
      case "Pending":
        return "status-pending";
      default:
        return "";
    }
  };

  const CloseModal = () => {
    onHide();
    setModalData?.(null);
    setPaymentMethod("");
    setInputAmount("");
    setIsChecked(false);
    dispatch(ClearGetTransactionsByInvoice());
  };

  const handleDefaultSubmit = () => {
    if (!inputAmount) {
      toast.error("Please enter the Amount before submitting.");
      return;
    }
    const Payload = {
      referenceType: "INVOICE",
      referenceId: invoiceId,
      referenceNumber: invoiceNumber,
      transactionType: "INCOME",
      amount: inputAmount,
      modeOfPayment: paymentMethod || "gpay",
      remarks: "First installment payment",
      organizationId: SessionData?.user?.organizationId,
      branchId: SessionData?.user?.branchId,
    };
    dispatch(AddTransactions(Payload) as any);
    CloseModal();
  };

  useEffect(() => {
    if (invoiceId) {
      dispatch(
        GetTransactionsByInvoice({
          type: "INVOICE",
          id: invoiceId,
        }) as any
      );
    }
  }, [invoiceId]);



  return (
    <StyledModal show={show} onHide={CloseModal} size="md" centered>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <CustomModalTitle>Payment Confirmation</CustomModalTitle>
          <ModalCloseButton onClick={CloseModal} />
        </div>
        <Modal.Body>
          <div className="d-flex flex-column gap-2 mb-3">
            <Col md={5} className="d-flex gap-4">
              <Label>Supplier Name</Label>
              <Value>{customerName}</Value>
            </Col>
            <Col md={5} className="d-flex gap-4">
              <Label>Date</Label>
              <Value>{formattedDate}</Value>
            </Col>
            {invoiceNumber && (
              <Col md={5} className="d-flex gap-4">
                <Label>Invoice No</Label>
                <Value>{invoiceNumber}</Value>
              </Col>
            )}
          </div>

          <div className="mb-3">
            <HighlightRow>
              <SummaryDetailsDiv>
                <Label>Due Amount</Label>
                <Value>₹ {dueAmount}</Value>
              </SummaryDetailsDiv>
            </HighlightRow>
            <StyledRow>
              <PaymentInputDiv>
                <Form.Check
                  type="checkbox"
                  label="Pay"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <Form.Control
                  style={{ width: "140px", textAlign: "end" }}
                  type="text"
                  value={inputAmount}
                  onChange={handleInputChange}
                  required
                />
              </PaymentInputDiv>
            </StyledRow>
            <StyledRow>
              <PaymentInputDiv>
                <Label>Payment Method</Label>
                <Form.Select
                  style={{ width: "140px" }}
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="gpay">GPay</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="upi">UPI</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </Form.Select>
              </PaymentInputDiv>
            </StyledRow>
          </div>

          <div className="d-flex mt-4 gap-4">
            <IconButton
              border="1px solid #0539F4"
              color="#0539F4"
              width="100%"
              bg="#FFFFFF"
              height="40px"
              onClick={CloseModal}
            >
              Cancel
            </IconButton>
            <IconButton
              border="1px solid #AEAEAE"
              color="#FFFFFF"
              width="100%"
              bg="#0539F4"
              height="40px"
              type="button"
              onClick={() => {
                if (typeof onSubmit === "function") {
                  onSubmit();
                  CloseModal();
                } else {
                  handleDefaultSubmit();
                }
              }}
            >
              Pay
            </IconButton>
          </div>
          {invoiceId && (
            <div className="mt-4">
              <Label>Payment History</Label>
              {TransactionByInvResponse?.map((item: any, idx: number) => (
                <HistoryItem key={idx}>
                  <span>
                    {item.transactionId} {item.createdAt}
                    {/* <span className={getStatusClass(item.paymentStatus)}>
                      {item.paymentStatus}
                    </span> */}
                  </span>
                  <span>
                    -₹{item.amount}&nbsp;&nbsp;&nbsp;&nbsp;{item.modeOfPayment}
                  </span>
                </HistoryItem>
              ))}
            </div>
          )}
        </Modal.Body>
      </div>
    </StyledModal>
  );
};
const Label = styled.div`
  font-weight: 400;
  margin-bottom: 4px;
  width: 50%;
  text-align: start;
`;

const Value = styled.div`
  font-weight: 700;

  text-align: start;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #e5e5e5;
`;

const SummaryDetailsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  align-items: center;
`;
const PaymentInputDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const HighlightRow = styled.div`
  border-bottom: 1px solid #e5e5e5;
  background-color: #eef3ff;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 12px 25px;
`;
const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eaeaea;

  span {
    font-size: 14px;
  }

  .status-paid {
    color: #007acc;
    font-weight: 500;
  }

  .status-partial {
    color: #6b5b95; /* Blue */
    font-weight: 500;
  }

  .status-pending {
    color: #fb923c; /* Orange */
    font-weight: 500;
  }
`;

export default PayInvoiceModal;
