import React, { useState, useEffect, FormEvent } from "react";
import AuthenticationOutline from "./Outline/AuthenticationOutline";
import StepperIndicator from "../../Components/StepperIndicator/StepperIndicator";
import { Form, Button, InputGroup } from "react-bootstrap";
import { IoIosCloseCircle } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ResetPassword } from "../../Redux/Api/Authentication/action";
// import { ResetPassword } from "../../redux/Api/Authentication/action";

function SetNewPassword() {
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const [searchParams] = useSearchParams();
  const urlEmail = searchParams.get("email") || "";
  const ResetResponse: any = useSelector(
    (state: any) => state.LoginReducer.ResetResponse
  );

  // State to manage new password and confirm password
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

    const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

      if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (!urlEmail) {
      setError("Email not found");
      return;
    }
    if (newPassword === confirmPassword) {
      try {
        dispatch(
          ResetPassword({
            email:urlEmail,
            newPassword:confirmPassword
          })as any
        );
        navigate("/done");
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    } else {
      setError("Passwords do not match");
    }
  };

  useEffect(() => {
    if (ResetResponse) {
      console.log('ResetResponse',ResetResponse)
      if (ResetResponse?.code === 200 && ResetResponse?.status === "Success") {
        navigate("/done");
      } else if (ResetResponse?.status === "Failed") {
        setError(ResetResponse?.data);
      }
    }
  }, [ResetResponse]);
  return (
    <AuthenticationOutline>
      <div className="login-form-wrapper">
        <h2 className="login-title">Set New Password</h2>
        <p className="login-subtitle">Must be at least 8 characters</p>
        {error && (
          <p className="warning-message">
            <span className="d-flex align-items-center mx-1">
              <IoIosCloseCircle />
            </span>
            {""}
            {error}
          </p>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPassword">
            <Form.Label>New Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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
          <StepperIndicator currentStep={3} />
        </div> */}
      </div>
    </AuthenticationOutline>
  );
}

export default SetNewPassword;
