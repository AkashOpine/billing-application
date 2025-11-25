import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import hrmsIcon from "../../../assets/office-admin-icon.png";
import { Col, Row } from "react-bootstrap";
import "./Header.scss";
import SearchInput from "../../Components/Inputs/SearchInput/SearchInput";
import SettingIcon from '../../../assets/Setting.png';
import MessageIcon from '../../../assets/Message.png';
import MessageActiveIcon from '../../../assets/MessageActive.png';
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current route is "Sms" or a sub-route of "Sms"
  const isSmsRoute = location.pathname.includes('/Sms');
  
  return (
    <Row className="dashboard-header m-0">
    <Col className="left " >
      <Row className="icon-container ">
        {/* <Col xs={1} md={1}>
          <img src={icon} alt="HRMS Icon" className="hrms-icon" />
        </Col>
        <Col
          xs={4}
          md={4}
          className="d-flex align-items-center justify-content-end "
          style={{ padding: "0 12% 0 0" }}
        >
          <div className="hrms-text">
            <LuArrowLeftToLine size={15} color="#000000" />
          </div>
        </Col> */}
        <Col xs={12} md={12}>
          {/* <SearchInput /> */}
        </Col>
      </Row>
    </Col>
    <Col
      className="right d-flex align-items-center justify-content-end"
      
    >
      {/* <img
        src={isSmsRoute ? MessageActiveIcon : MessageIcon}
        alt="Message Icon"
        className="icon message-icon"
        // onClick={() => navigate("Sms")}
      /> */}
      {/* <NotificationSection /> */}
      {/* <img
        src={SettingIcon}
        alt="Setting Icon"
        className="icon setting-icon"
      /> */}
      <ProfileSection />
    </Col>
  </Row>
  );
}

export default Header;
