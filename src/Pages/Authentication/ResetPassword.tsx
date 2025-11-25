import AuthenticationOutline from "./Outline/AuthenticationOutline";
import StepperIndicator from "../../Components/StepperIndicator/StepperIndicator";
import { Form, Button } from "react-bootstrap";
import { IoIosCloseCircle } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import {
  ForgotPasswordAction,
  ValidateOTP,
} from "../../Redux/Api/Authentication/action";
// import { ForgotPassword, ValidateOtp } from "../../redux/Api/Authentication/action";
import { useDispatch, useSelector } from "react-redux";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const ValidateResponse: any = useSelector(
    (state: any) => state.LoginReducer.OtpValidateResponse
  );
  const urlEmail = searchParams.get("email") || "";
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const handleChange = (element: any, index: any) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    } else if (!element.value && element.previousSibling) {
      element.previousSibling.focus();
    }
  };

  const [error, setError] = useState<string>("");

  const handleForgot = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (!otpString) {
      setError("Please enter OTP");
      return;
    }
    if (!urlEmail) {
      setError("Email not found");
      return;
    }
    try {
      dispatch(
        ValidateOTP({
          email: urlEmail,
          validateOtp: otpString,
        }) as any
      );
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  const ResendOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (urlEmail) {
      dispatch(
        ForgotPasswordAction({
          email: urlEmail,
        }) as any
      );
      navigate(`/set-new-password?email=${urlEmail}`);
    } else {
      setError("An error occurred. Please try again.");
    }
  };
  useEffect(() => {
    if (ValidateResponse) {
      if (
        ValidateResponse?.code === 200 &&
        ValidateResponse?.status === "Success"
      ) {
        navigate(`/set-new-password?email=${encodeURIComponent(urlEmail)}`);
      } else if (
        ValidateResponse?.code === 200 &&
        ValidateResponse?.status === "Failed"
      ) {
        setError(ValidateResponse?.data);
      }
    }
  }, [ValidateResponse]);

  return (
    <AuthenticationOutline>
      <div className="login-form-wrapper">
        <h2 className="login-title">Password reset</h2>
        <p className="login-subtitle">We sent a code to {urlEmail}</p>
        {/* {error && (
          <p className="warning-message">
            <span className="d-flex align-items-center mx-1">
              <IoIosCloseCircle />
            </span>
            {""}
            {error}
          </p>
        )} */}

        <Form onSubmit={handleForgot}>
          <div className="otp-input-group d-flex mb-3">
            {otp.map((data, index) => (
              <Form.Control
                type="text"
                name="otp"
                maxLength={1}
                key={index}
                value={data}
                className="otp-input mx-1"
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <Button variant="primary" type="submit" className="login-button">
            Reset Password
          </Button>
          {/* <p className="login-subtitle text-center">
            Didn’t receive the email?
            <a className="Signup-link">Click to resend</a>
          </p> */}
        </Form>

        <div className="back-login" onClick={() => navigate("/")}>
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
          Don't you have an account? <a className="Signup-link">Sign up</a>
        </p> */}
        {/* <div className="stepper-div">
          <StepperIndicator currentStep={2} />
        </div> */}
      </div>
    </AuthenticationOutline>
  );
}

export default ResetPassword;
