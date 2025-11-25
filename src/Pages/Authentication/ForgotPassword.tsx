import AuthenticationOutline from "./Outline/AuthenticationOutline";
import StepperIndicator from "../../Components/StepperIndicator/StepperIndicator";
import { Form, Button, InputGroup } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ForgotPasswordAction } from "../../Redux/Api/Authentication/action";
function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ForgotResponse: any = useSelector(
    (state: any) => state.LoginReducer.ForgotRes
  );
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleForgot = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Please fill email");
      return;
    }

    try {
      dispatch(ForgotPasswordAction({ email: email }) as any);
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  useEffect(() => {
    if (ForgotResponse) {
      // console.log(ForgotResponse,'ForgotResponse')
      if (ForgotResponse?.code === 200 && ForgotResponse?.status === "Sucess") {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`)
      } else if (ForgotResponse?.code === 200 && ForgotResponse?.status === "Failed") {
        setError(ForgotResponse?.data)
      }
    }
  }, [ForgotResponse]);
  return (
    <AuthenticationOutline>
      <div className="login-form-wrapper">
        <h2 className="login-title">Forgot Password?</h2>
        <p className="login-subtitle">
          No worries we'll send you reset instructions
        </p>
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
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
           
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button">
            Reset Password
          </Button>
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
        <StepperIndicator currentStep={1} />
      </div> */}
      </div>
    </AuthenticationOutline>
  );
}

export default ForgotPassword;
