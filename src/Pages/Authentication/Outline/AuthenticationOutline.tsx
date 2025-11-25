import { Container, Row, Col} from "react-bootstrap";
import Logo from '../../../Assets/Logos/Logo.png'
import "./AuthenticationOutline.scss";
function AuthenticationOutline({ children }) {
  return (
    <Container fluid className="login-container p-0">
    <Row className="w-100 p-0 h-100">
      <Col md={6} className="login-form-section ">
        <Row className="icon-container">
          <Col xs={3}>
          <img src={Logo} alt="IESCA Icon" className="hrms-icon" />
          </Col>
          {/* <Col xs={9} className="d-flex align-items-center">
          <label className="hrms-text">HRMS</label>
          </Col> */}
        </Row>
        <Row className="form-row">
        {children}
        </Row>
        <Row>
          <div className="footer-text">2025 © Designed by Opine</div>
        </Row>
      </Col>
      <Col md={6} className=" p-0">
      <div className="login-image-section">
        <div className="login-image" >

        </div>
        </div>
      </Col>
    </Row>
  </Container>
  )
}

export default AuthenticationOutline