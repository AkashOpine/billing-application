import React from "react";
import {
  Card,
  CardButton,
  CardImage,
  CardPrice,
  CardTitle,
} from "../../../../Styles/ProductCardStyles";
import { Col, Row } from "react-bootstrap";
import Product1 from "../../../../Assets/Products/Product1.png";
import Product2 from "../../../../Assets/Products/Product2.png";
import Product3 from "../../../../Assets/Products/Product3.png";
import Product4 from "../../../../Assets/Products/Product4.png";
import Product5 from "../../../../Assets/Products/Product5.png";
import Product6 from "../../../../Assets/Products/Product6.png";
import Product7 from "../../../../Assets/Products/Product7.png";
import Product8 from "../../../../Assets/Products/Product8.png";
import Product9 from "../../../../Assets/Products/Product9.png";
import Product10 from "../../../../Assets/Products/Product10.png";
import Product11 from "../../../../Assets/Products/Product11.png";
import Product12 from "../../../../Assets/Products/Product12.png";
import { CiSquarePlus } from "react-icons/ci";

function WomensWear() {
  const data = [
    { img: Product1, title: "Anarkali Suit Stitching", price: 245 },
    { img: Product2, title: "Anarkali Suit Stitching", price: 245 },
    { img: Product3, title: "Anarkali Suit Stitching", price: 245 },
    { img: Product4, title: "Anarkali Suit Stitching", price: 245 },
    { img: Product5, title: "Anarkali Suit Stitching", price: 245 },
    { img: Product6, title: "Anarkali Suit Stitching", price: 245 },
    { img: Product7, title: "Anarkali Suit Stitching", price: 245 },
    { img: Product8, title: "Anarkali Suit Stitching", price: 245 },
    { img: Product9, title: "Anarkali Suit Stitching", price: 245 },
    { img: Product10, title: "Anarkali Suit Stitching", price: 245 },
    { img: Product11, title: "Anarkali Suit Stitching", price: 245 },
    { img: Product12, title: "Anarkali Suit Stitching", price: 245 },
  ];
  return (
    <>
      {Array.from({ length: Math.ceil(data.length / 3) }).map((_, rowIndex) => (
        <Row key={rowIndex} className="mb-2~">
          {data.slice(rowIndex * 3, rowIndex * 3 + 3).map((item, colIndex) => (
            <Col md={4} key={colIndex}>
              <Card className="d-flex gap-3">
                <CardImage src={item.img} alt={item.title} />

                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardPrice><span>₹</span> {item.price.toFixed(2)}</CardPrice>
                  <div className="d-flex align-items-center justify-content-center">
                    <CardButton> <span><CiSquarePlus size={20} color="#0539F4"/></span> Add</CardButton>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
}

export default WomensWear;
