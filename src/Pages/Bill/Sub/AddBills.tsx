import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  BalanceDue,
  CheckboxContainer,
  CheckboxLabel,
  ConmmonContainer,
  ExpectedDDateContainer,
  HighlightRow,
  InvoiceContainerDiv,
  Label,
  OptionButton,
  OptionContainer,
  OptionImage,
  PaymentWrapper,
  StyledContainer,
  StyledRow,
  SummaryContainer,
  SummaryDetailsDiv,
  Value,
} from "./AddBillsStyles";
import Tag from "../../../Assets/Icons/tag.png";
import MoneyInHand from "../../../Assets/Icons/money-hand.png";
import CardImg from "../../../Assets/Icons/card.png";
import CashImg from "../../../Assets/Icons/cash.png";
import PhonePay from "../../../Assets/Icons/phone-pay.png";

import {
  DownArrowIcon,
  Input,
  InputGroup,
  StyledSelect,
  StyledSelectWrapper,
} from "../../../Styles/Form Styles/FormStyles";
import { useForm } from "react-hook-form";
import ItemDetialsTable from "./ItemDetialsTable";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import { MainContainer } from "../../../Styles/CommonStyles";

interface FormData {
  phoneNo: string;
  name: number;
  email: string;
  invoiceNo: number;
  invoiceDate: Date;
  expectedDDate: Date;
}
type PaymentOption = "PhonePe" | "Card" | "Cash";

function AddBills() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentOption>("PhonePe");

  const options: { label: PaymentOption; icon: string }[] = [
    { label: "PhonePe", icon: PhonePay },
    { label: "Card", icon: CardImg },
    { label: "Cash", icon: CashImg },
  ];
  return (
    <MainContainer>
      <h4>Add New Bills</h4>
      <Row className="mt-4">
        <Col>
          <ConmmonContainer>
            <div>Total Purchase</div>
            <div className="d-flex gap-2 align-items-center justiy-content-center">
              <img src={Tag} alt="" /> <h5 className="mt-2">123</h5>
            </div>
          </ConmmonContainer>
        </Col>

        <Col>
          {" "}
          <ConmmonContainer>
            <div>Total Lent Amounts </div>
            <div className="d-flex gap-2 align-items-center justiy-content-center">
              <img src={MoneyInHand} alt="" /> <h5 className="mt-2">₹ 4,355</h5>
            </div>
          </ConmmonContainer>
        </Col>
      </Row>

      <div className="mt-4">
        <div>CUSTOMER DETAILS</div>
        <Row className="mt-3">
          <Col className="d-flex flex-column gap-3">
            <InputGroup>
              <Input
                {...register("phoneNo")}
                type="text"
                placeholder="Phone Number"
              />
            </InputGroup>
            <InputGroup>
              <Input {...register("name")} type="text" placeholder="Name" />
            </InputGroup>
            <InputGroup>
              <Input {...register("email")} type="text" placeholder="Email" />
            </InputGroup>
          </Col>

          <Col className="d-flex flex-column align-items-end gap-3">
            <InvoiceContainerDiv>
              <div>Invoice Number</div>
              <div>#716366254674</div>
            </InvoiceContainerDiv>

            <InvoiceContainerDiv>
              <div>Invoice Date</div>
              <div>12 March 2025</div>
            </InvoiceContainerDiv>
          </Col>
        </Row>
      </div>

      <div className="mt-4">
        <div>Item Details</div>
        <ItemDetialsTable />
      </div>

      <div className="mt-4">
        <SummaryContainer>
          <StyledRow>
            <SummaryDetailsDiv>
              <Label>Grand Total</Label>
              <Value>₹ 61,181.40</Value>
            </SummaryDetailsDiv>
          </StyledRow>
          <StyledRow>
            <SummaryDetailsDiv>
              <Label>Tax</Label>
              <StyledSelectWrapper style={{ width: "120px" }}>
                <StyledSelect
                  value=""
                  style={{ width: "120px", height: "35px" }}
                >
                  <option value="">Taxs</option>
                </StyledSelect>

                <DownArrowIcon />
              </StyledSelectWrapper>
            </SummaryDetailsDiv>
          </StyledRow>
          <StyledRow>
            <SummaryDetailsDiv>
              <Label>Discount</Label>
              <Input type="text" placeholder="" style={{ width: "120px", height: "35px" }}/>
            </SummaryDetailsDiv>
          </StyledRow>
          <StyledRow>
            <SummaryDetailsDiv>
              <Label>Net amount</Label>
              <Value>₹ 61,181.40</Value>
            </SummaryDetailsDiv>
          </StyledRow>
          <HighlightRow>
            <SummaryDetailsDiv>
              <Label>Grand Total</Label>
              <Value>₹ 61,181.40</Value>
            </SummaryDetailsDiv>
          </HighlightRow>
          <StyledRow>
            <SummaryDetailsDiv>
              <CheckboxContainer>
                <input type="checkbox" id="received" />
                <CheckboxLabel htmlFor="received">Received</CheckboxLabel>
              </CheckboxContainer>
              <Input type="text" placeholder="" style={{ width: "120px", height: "35px" }}/>
            </SummaryDetailsDiv>
          </StyledRow>
          <StyledRow>
            <SummaryDetailsDiv>
              <Label style={{ color: "#d633ff" }}> Balance Due</Label>
              <Value style={{ color: "#d633ff" }}>₹ 6,938</Value>
            </SummaryDetailsDiv>
          </StyledRow>
        </SummaryContainer>
      </div>

      <div className="mt-4">
        <PaymentWrapper>
          <Label>Payment Type</Label>
          <OptionContainer>
            {options.map((option) => (
              <OptionButton
                key={option.label}
                selected={selectedPayment === option.label}
                onClick={() => setSelectedPayment(option.label)}
              >
                <input
                  type="radio"
                  checked={selectedPayment === option.label}
                  readOnly
                />
                <OptionImage src={option.icon} alt={option.label} />
                {option.label}
              </OptionButton>
            ))}
          </OptionContainer>
        </PaymentWrapper>
      </div>
      <div className="mt-4 d-flex justify-content-end">
        <Col md={5}>
          <ExpectedDDateContainer>
            <Label>Expected Delivery Date</Label>
            <Input {...register("expectedDDate")} type="date" />
          </ExpectedDDateContainer>
        </Col>
      </div>
      <div className="mt-5 mb-4 d-flex gap-2 justify-content-end">
        <Col md={3} className="d-flex gap-4 justify-content-end">
          <IconButton width="120px" border="1px solid #0539f4" color="#0539f4">
            Cancel
          </IconButton>

          <IconButton width="120px" color="#ffffff" bg="#0539f4" type="submit">
            Submit
          </IconButton>
        </Col>
      </div>
    </MainContainer>
  );
}

export default AddBills;
