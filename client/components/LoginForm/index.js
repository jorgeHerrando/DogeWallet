import React, { useState } from "react";
import { useRouter } from "next/router";
import useSessionStorage from "../../hooks/useSessionStorage";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import apiCalls from "../../apiCalls/apiCalls";
import loginStyles from "./LoginForm.module.css";

export default function LoginForm() {
  const { storedValue, setValue } = useSessionStorage("user", null);

  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hola2");
    setValidationMessage(null);
    setErrorMessage("");
    const processLogin = async () => {
      try {
        const loginResp = await apiCalls.login(data.email, data.password);
        console.log("hola");
        if (loginResp.message === "Login successful") {
          console.log(loginResp.user);
          setValue(loginResp.user);
          router.push("/dashboard");
        } else if (loginResp.errors) {
          setValidationMessage(loginResp.errors);
        } else {
          setErrorMessage(loginResp.message);
        }
      } catch (e) {
        console.log(e);
      }
    };
    processLogin();
  };
  return (
    <div className={loginStyles.loginFormContainer}>
      <Form onSubmit={handleSubmit} className={loginStyles.loginForm}>
        <h2 className={loginStyles.formTitle}>DogeCoin Wallet</h2>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={handleChange}
          />
        </Form.Group>
        {validationMessage && validationMessage.email && (
          <p className={loginStyles.errorMessageTop}>
            {validationMessage.email.msg}
          </p>
        )}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </Form.Group>
        {validationMessage && validationMessage.password && (
          <p className={loginStyles.errorMessage}>
            {validationMessage.password.msg}
          </p>
        )}
        {errorMessage && (
          <p className={loginStyles.errorMessage}>{errorMessage}</p>
        )}
        <Button
          variant="primary"
          type="submit"
          className={loginStyles.loginButton}
        >
          Sign In
        </Button>
      </Form>
    </div>
  );
}
