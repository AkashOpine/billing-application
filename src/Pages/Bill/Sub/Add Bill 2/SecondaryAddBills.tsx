import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import {
  BalanceDue,
  CheckboxContainer,
  CheckboxLabel,
  ConmmonContainer,
  ExpectedDDateContainer,
  HighlightRow,
  Label,
  OptionButton,
  OptionContainer,
  OptionImage,
  PaymentWrapper,
  Value,
} from "../AddBillsStyles";
import Tag from "../../../../Assets/Icons/tag.png";
import MoneyInHand from "../../../../Assets/Icons/money-hand.png";
import CardImg from "../../../../Assets/Icons/card.png";
import CashImg from "../../../../Assets/Icons/cash.png";
import PhonePay from "../../../../Assets/Icons/phone-pay.png";
import Product1 from "../../../../Assets/Products/Product1.png";
import Product2 from "../../../../Assets/Products/Product2.png";
import Product3 from "../../../../Assets/Products/Product3.png";
import Product4 from "../../../../Assets/Products/Product4.png";

import { TabButton, TabContainer, TabContent, TabHeader } from "./TabStyles";
import WomensWear from "./WomensWear";
import {
  ItemList,
  ItemRow,
  OrderDetailsContainer,
  PriceBox,
  QuantityControls,
  SearchBar,
  SectionTitle,
  Summary,
  SummaryDetailsDiv,
} from "./SecondaryAddBillsStyles";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { CardPrice, CardTitle } from "../../../../Styles/ProductCardStyles";
import {
  DownArrowIcon,
  Input,
  StyledSelect,
  StyledSelectWrapper,
} from "../../../../Styles/Form Styles/FormStyles";
import IconButton from "../../../../Components/Buttons/Icon Button/IconButton";
type PaymentOption = "PhonePe" | "Card" | "Cash";

const categories = [
  "Women's Wear",
  "Men's Wear",
  "Kids Wear",
  "Alterations",
  "Accessories Stitching",
];
const itemsMock = [
  {
    id: 1,
    title: "Anarkali Suit Stitching",
    price: 245,
    img: Product1,
  },
  {
    id: 2,
    title: "Anarkali Suit Stitching",
    price: 245,
    img: Product2,
  },
  {
    id: 3,
    title: "Anarkali Suit Stitching",
    price: 245,
    img: Product3,
  },
  {
    id: 4,
    title: "Anarkali Suit Stitching",
    price: 245,
    img: Product4,
  },
];
const options: { label: PaymentOption; icon: string }[] = [
  { label: "PhonePe", icon: PhonePay },
  { label: "Card", icon: CardImg },
  { label: "Cash", icon: CashImg },
];
function SecondaryAddBills() {
  const [activeTab, setActiveTab] = useState("Women's Wear");
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentOption>("PhonePe");
  const [items, setItems] = useState(
    itemsMock.map((item) => ({ ...item, quantity: 3 }))
  );
  const [discount, setDiscount] = useState(0);
  const [received, setReceived] = useState(false);

  const handleQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const grandTotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const tax = 611; // static as per UI
  const netAmount = grandTotal;
  const balanceDue = netAmount - discount - (received ? netAmount : 0);
  return (
    <Container>
      <h4>Add New Bills</h4>
      <Row>
        <Col md={7}>
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
                  <img src={MoneyInHand} alt="" />{" "}
                  <h5 className="mt-2">₹ 4,355</h5>
                </div>
              </ConmmonContainer>
            </Col>
          </Row>

          <Row>
            <TabContainer>
              <TabHeader>
                {categories.map((cat) => (
                  <TabButton
                    key={cat}
                    active={cat === activeTab}
                    onClick={() => setActiveTab(cat)}
                  >
                    {cat}
                  </TabButton>
                ))}
              </TabHeader>
              <TabContent>
                {activeTab === "Women's Wear" && <WomensWear />}
                {activeTab === "Men's Wear" && "Men's Wear"}
                {activeTab === "Kids Wear" && "Kids Wear"}
                {activeTab === "Alterations" && "Alterations"}
                {activeTab === "Accessories Stitching" &&
                  "Accessories Stitching"}
              </TabContent>
            </TabContainer>
          </Row>
        </Col>

        <Col md={5}>
          <OrderDetailsContainer>
            <h5>Order Details</h5>
            <div>
              <SectionTitle>CUSTOMER DETAILS</SectionTitle>
              <SearchBar>
                <input type="text" placeholder="Phone Number" />
                <CiSearch className="search-icon" size={20} />
                <button>
                  <IoMdAdd size={20} />
                </button>
              </SearchBar>

              <SectionTitle>ITEMS</SectionTitle>
              <ItemList>
                {items.map((item) => (
                  <ItemRow key={item.id}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={item.img} alt="item" />
                      <div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardPrice>
                          <span>₹</span> {item.price.toFixed(2)}
                        </CardPrice>
                      </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                      <QuantityControls>
                        <FaMinus
                          size={10}
                          onClick={() => handleQuantity(item.id, -1)}
                        />
                      </QuantityControls>
                      {item.quantity}
                      <QuantityControls>
                        <FaPlus
                          size={10}
                          onClick={() => handleQuantity(item.id, 1)}
                        />
                      </QuantityControls>
                    </div>
                    <PriceBox>
                      {" "}
                      <CardPrice style={{ marginBottom: "0px" }}>
                        <span>₹</span> {item.price.toFixed(2)}
                      </CardPrice>
                    </PriceBox>
                  </ItemRow>
                ))}
              </ItemList>

              <Summary>
                <HighlightRow>
                  <SummaryDetailsDiv>
                    <Label>Grand Total</Label>
                    <Value>₹ {grandTotal.toFixed(2)}</Value>
                  </SummaryDetailsDiv>
                </HighlightRow>
                <HighlightRow>
                  <SummaryDetailsDiv>
                    <Label>Tax(18%)</Label>
                    <StyledSelectWrapper style={{ width: "70px", height: "30px" }}>
                      <StyledSelect value="" style={{ width: "70px", height: "30px" }}>
                        <option value="">Taxs</option>
                      </StyledSelect>

                      <DownArrowIcon />
                    </StyledSelectWrapper>
                  </SummaryDetailsDiv>
                </HighlightRow>
                <HighlightRow>
                  <SummaryDetailsDiv>
                    <Label>Net amount</Label>
                    <Value>₹ {netAmount.toFixed(2)}</Value>
                  </SummaryDetailsDiv>
                </HighlightRow>
                <HighlightRow style={{ background: "#fff" }}>
                  <SummaryDetailsDiv>
                    <Label>Discount</Label>
                    <Input
                      style={{ width: "70px", height: "30px" }}
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                    />
                  </SummaryDetailsDiv>
                </HighlightRow>
                <HighlightRow>
                  <SummaryDetailsDiv>
                    <Label>Grand Total</Label>
                    <Value>₹ {netAmount.toFixed(2)}</Value>
                  </SummaryDetailsDiv>
                </HighlightRow>
                <HighlightRow style={{ background: "#fff" }}>
                  <SummaryDetailsDiv>
                    <CheckboxContainer>
                      <input type="checkbox" id="received" />
                      <CheckboxLabel htmlFor="received">Received</CheckboxLabel>
                    </CheckboxContainer>
                    <Input
                      type="text"
                      placeholder=""
                      style={{ width: "70px", height: "30px" }}
                    />
                  </SummaryDetailsDiv>
                </HighlightRow>
                <HighlightRow style={{ background: "#fff" }}>
                  <SummaryDetailsDiv>
                    <Label style={{ color: "#d633ff" }}>Balance Due</Label>
                    <Value>₹ {balanceDue.toLocaleString()}</Value>
                  </SummaryDetailsDiv>
                </HighlightRow>
              </Summary>
            </div>
          </OrderDetailsContainer>

          <Row className="mt-4">
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
          </Row>
          <Row className="mt-4">
            <PaymentWrapper>
              <Label>Expected Delivery Date</Label>
              <Input type="date" />
            </PaymentWrapper>
          </Row>

          <Row className="mt-4 mb-4 d-flex gap-2 justify-content-end">
            <IconButton
              width="150px"
              border="1px solid #0539f4"
              color="#0539f4"
            >
              Cancel
            </IconButton>

            <IconButton
              width="150px"
              color="#ffffff"
              bg="#0539f4"
              type="submit"
            >
              Submit
            </IconButton>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SecondaryAddBills;
