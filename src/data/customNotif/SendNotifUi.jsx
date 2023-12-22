import "../../styles/dashboard-content.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AcquiredToken } from "../../App";
import useApiRequest from "../../hooks/useApiRequest";
import { useContext, useState, useEffect } from "react";
import { loginRequest, protectedApi } from "../../authConfig";
import { CurrentInstance } from "../../App";

const SendNotifUi = ({ onSenderIdUpdate }) => {
  const { acquiredToken, getToken } = useContext(AcquiredToken);
  const { makeApiRequest } = useApiRequest();
  const authRequest = {
    ...loginRequest,
  };
  const currentInstance = useContext(CurrentInstance);

  const sendMessage = async (e) => {
    e.preventDefault();
    const chatMessage = {
      userRole: "Instructor",
      center: "Binangonan Center Update",
      country: "Philippines",
      user: "Instructor Test",
      title: "Sample title instructor 3",
      description: "Sample description instructor3",
      senderId: currentInstance.localAccountId,
    };

    try {
      //await fetch('https://audionex-api.azurewebsites.net/api/notification', { //
      makeApiRequest({
        url: `https://audionex-api.azurewebsites.net/api/notification`,
        method: "POST",
        data: chatMessage,
      })
        .then((response) => {
          console.log("Successfully inserted notification", response);
        })
        .catch((error) => {
          console.error("Error in insertion of notification:", error);
        });
    } catch (e) {
      console.log("Sending message failed.", e);
    }
  };

  return (
    <Form
      className="notif-container notif-container-rows my-4"
      onSubmit={sendMessage}
    >
      <div className="row">
        <div className="col-6">
          <Form.Group className="d-flex flex-row row-centeritems">
            <Form.Label className="my-0 py-0 col-4 fw-bold">Title</Form.Label>
            <div className="my-0 py-0 col-8">
              <Form.Control
                type="text"
                id="inputNotifTitle"
                aria-describedby="inputNotifTitle"
                style={{ height: "40px", width: "250px" }}
              />
            </div>
          </Form.Group>
        </div>
        <div className="col-6" />
      </div>
      <div className="row">
        <div className="col-6">
          <div className="d-flex flex-row row-centeritems">
            <Form.Label className="my-0 py-0 col-4 fw-bold">
              User Role*
            </Form.Label>
            <div className="my-0 py-0 col-8">
              <Form.Select
                className="notif-formselect"
                aria-label="Select User Role"
              >
                <option>Select User Role</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex flex-row row-centeritems">
            <Form.Label className="my-0 py-0 col-4 fw-bold">
              Country*
            </Form.Label>
            <div className="my-0 py-0 col-8">
              <Form.Select
                className="notif-formselect"
                aria-label="Select User Role"
              >
                <option>Select Country</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="d-flex flex-row row-centeritems">
            <Form.Label className="my-0 py-0 col-4 fw-bold">Center*</Form.Label>
            <div className="my-0 py-0 col-8">
              <Form.Select
                className="notif-formselect"
                aria-label="Select User Role"
              >
                <option>Select Center</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex flex-row row-centeritems">
            <Form.Label className="my-0 py-0 col-4 fw-bold">User*</Form.Label>
            <div className="my-0 py-0 col-8">
              <Form.Select
                className="notif-formselect"
                aria-label="Select User Role"
              >
                <option>Select User</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="d-flex flex-row">
            <Form.Label className="my-0 py-0 col-2 fw-bold">
              Description*
            </Form.Label>
            <Form.Control as="textarea" rows={3} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="d-flex flex-row justify-content-center column-gap-5 ">
            <Button className="custom-btn" type="submit">
              Submit
            </Button>
            <Button className="custom-btn-cancel" type="submit">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SendNotifUi;
