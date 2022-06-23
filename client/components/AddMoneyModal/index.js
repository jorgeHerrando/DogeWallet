import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import useSessionStorage from "../../hooks/useSessionStorage";
import apiCalls from "../../apiCalls/apiCalls";

import addMoneyModalStyles from "./AddMoneyModal.module.css";

export default function AddMoneyModal(props) {
  const router = useRouter();
  const { storedValue, setValue } = useSessionStorage("user", null);
  const [success, setSuccess] = useState(false);
  const [validationMessage, setValidationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState({
    amount: "",
    address: props.address,
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        props.onHide();
      }, 3000);
    }
  }, [success]);

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
        setSuccess(true);
        console.log(addMoneyResp.user.id);
        props.fetchUser(addMoneyResp.user.id);
        setValue(addMoneyResp.user);
      } else if (addMoneyResp.message === "Invalid credentials") {
        setValidationMessage(addMoneyResp.message);
      } else {
        setErrorMessage(addMoneyResp.message);
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
          {success && (
            <p className={addMoneyModalStyles.successMessage}>
              Money added to your wallet successfully
            </p>
          )}
          {validationMessage && (
            <p className={addMoneyModalStyles.errorMessage}>
              {validationMessage}
            </p>
          )}
          {errorMessage && (
            <p className={addMoneyModalStyles.errorMessage}>{errorMessage}</p>
          )}
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
