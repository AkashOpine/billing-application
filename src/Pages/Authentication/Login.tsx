import React, { useState, FormEvent, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { IoIosCloseCircle } from "react-icons/io";
import AuthenticationOutline from "./Outline/AuthenticationOutline";
import "./Styles/Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import {
  clearLogin,
  GetOrgDetails,
  GetUser,
  LoginAction,
} from "../../Redux/Api/Authentication/action";
import { SetSession, SetToken } from "../../Lib/Session";
import { Input } from "../../Styles/Form Styles/FormStyles";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const goToForgotPassword = () => {
    navigate("/forgot-password");
  };

  const LoginResponse: any = useSelector(
    (state: any) => state.LoginReducer.LoginRes
  );
  const UserResponse: any = useSelector(
    (state: any) => state.LoginReducer.GetUserRes
  );

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const StorageType = keepMeLoggedIn ? "local" : "session";
      dispatch(
        LoginAction({
          username: email,
          password: password,
          grantType: "password",
          StorageType: StorageType,
        }) as any
      );
      dispatch(GetUser(email) as any);
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (LoginResponse) {
      if (LoginResponse.status === "Success") {
        SetSession({ username: email, user: UserResponse });
        SetToken(LoginResponse.data.accessToken, "local");
        console.log("LoginResponse", LoginResponse);
        toast.success("Login Sucessfull!");
        navigate("/home");
        dispatch(clearLogin() as any);
      } else if (LoginResponse.status === "Error") {
        setError(LoginResponse.data);
        toast.error("Invalid Email and Password");
        dispatch(clearLogin() as any);
      }
    }
  }, [LoginResponse]);

  return (
    <AuthenticationOutline>
      <div className="login-form-wrapper ">
        <h2 className="login-title">Get Started Now</h2>
        <p className="login-subtitle">
          Welcome back! Please enter your details
        </p>
        {error && (
          <p className="warning-message">
            <span className="d-flex align-items-center mx-1">
              <IoIosCloseCircle />
            </span>
            {""}
            {error}
          </p>
        )}
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <InputGroup className="mb-4">
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* <div className="icon-wrapper">
                <MdEmail />
              </div> */}
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <div className="mb-3 " style={{ position: "relative" }}>
              <Input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="icon-wrapper"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <IoEyeOffOutline size={18} color="#A1A1A1" />
                ) : (
                  <IoEyeOutline size={18} color="#A1A1A1" />
                )}
              </div>
            </div>
          </Form.Group>

          <Form.Group className="d-flex justify-content-between align-items-center">
            <Form.Check
              type="checkbox"
              id="custom-switch"
              label="keep me logged in"
              checked={keepMeLoggedIn}
              onChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
              className="custom-checkbox-height"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button">
            Login
          </Button>
          <div className="text-center">
            <a onClick={goToForgotPassword} className="forgot-password-link">
              Forgot Password?
            </a>
          </div>
        </Form>
        {/* <div className="line-separation">
          <span>or</span>
        </div>
        <p className="login-subtitle">
          Don't have an account?{" "}
          <a  className="Signup-link">
            Sign up
          </a>
        </p> */}
      </div>
    </AuthenticationOutline>
  );
};

export default Login;
