import AuthenticationOutline from "./Outline/AuthenticationOutline";
import StepperIndicator from "../../Components/StepperIndicator/StepperIndicator";
import { Form, Button } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DoneImg from "../../Assets/Done.png";
import { useDispatch } from "react-redux";
import {
  clearForgotPassword,
  clearResetPassword,
  clearValidateOTP,
} from "../../Redux/Api/Authentication/action";
function Done() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LogoinAction = () => {
    dispatch(clearForgotPassword());
    dispatch(clearValidateOTP());
    dispatch(clearResetPassword());
    navigate("/")
  };
  return (
    <AuthenticationOutline>
      <div className="login-form-wrapper">
        <div className="done-container mb-3">
          <img src={DoneImg} alt="Done" className="doneIcon" />
        </div>

        <h2 className="login-title text-center">All Done</h2>
        <p className="login-subtitle text-center">
          Your password has been reset.
        </p>

        <Form>
          <Button onClick={LogoinAction} variant="primary" type="submit" className="login-button">
            Login Now
          </Button>
        </Form>
        <div className="back-login" onClick={LogoinAction}>
          <span className="d-flex  align-items-center">
            {" "}
            <IoMdArrowRoundBack />{" "}
          </span>{" "}
          <span>Back to login</span>
        </div>
        {/* <div className="line-separation">
        <span>or</span>
      </div>
      <p className="login-subtitle text-center">
        Don't you have an account?{" "}
        <a  className="Signup-link">
          Sign up
        </a>
      </p> */}
        {/* <div className="stepper-div">
          <StepperIndicator currentStep={4} />
        </div> */}
      </div>
    </AuthenticationOutline>
  );
}

export default Done;
