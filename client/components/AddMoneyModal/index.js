import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import useSessionStorage from "../../hooks/useSessionStorage";
import apiCalls from "../../apiCalls/apiCalls";

import addMoneyModalStyles from "./AddMoneyModal.module.css";

export default function AddMoneyModal(props) {
  const { storedValue, setValue } = useSessionStorage("user", null);
  const [data, setData] = useState({
    amount: "",
    address: props.address,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addMoneyResp = await apiCalls.addMoney(
        data.amount,
        data.address,
        storedValue.accessToken
      );
      if (addMoneyResp.message === "Successful transaction") {
        addMoneyResp.user.transactions.reverse();
        console.log(addMoneyResp);
        props.onHide();
        //     setValue(loginResp.user);
        //     router.push("/dashboard");
        //   } else if (loginResp.errors) {
        //     setValidationMessage(loginResp.errors);
        //   } else {
        //     setErrorMessage(loginResp.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>Add Money to your wallet</h4>
        <Form onSubmit={handleSubmit} className={addMoneyModalStyles.loginForm}>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              placeholder="Enter an amount"
              onChange={handleChange}
            />
          </Form.Group>
          {/* {validationMessage && validationMessage.email && (
            <p className={addMoneyModalStyles.errorMessageTop}>
              {validationMessage.email.msg}
            </p>
          )} */}
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <div className={addMoneyModalStyles.addressInput}>
              <Form.Control
                type="text"
                name="address"
                disabled
                value={props.address}
                placeholder="Enter your wallet address"
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          {/* {validationMessage && validationMessage.password && (
            <p className={addMoneyModalStyles.errorMessage}>
              {validationMessage.password.msg}
            </p>
          )} */}
          {/* {errorMessage && (
            <p className={addMoneyModalStyles.errorMessage}>{errorMessage}</p>
          )} */}
          <div className={addMoneyModalStyles.buttonsContainer}>
            <Button
              variant="success"
              type="submit"
              className={addMoneyModalStyles.sendButton}
            >
              Send Money
            </Button>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
