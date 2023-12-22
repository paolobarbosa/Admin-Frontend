import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Addaudio() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalContentStyle = {
    width: '60.625rem',
    height: '29.5rem',
    flexShrink: 0,
    borderRadius: '0rem 0.3125rem 0.3125rem 0.3125rem',
    background: '#FFF',
  };
  

  function SwitchToggle() {
    return (
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Enable/Disable"
        />
      </Form>
    );
  }

  return (
    <>
     <div style={{ fontFamily: 'Roboto, sans-serif' }}></div>
      <button className="pill-button" onClick={handleShow}>
        Add Audio File
      </button>

      {show && (
        <div className="custom-modal">
          <div id="content" className="modal-content" style={modalContentStyle}>
            <div className="modal-header">
              <h1 className="modal-title">Add Audio File</h1>
              <button className="close" onClick={handleClose}>
                &times;
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex' }}>
              <div className="column" style={{ flex: 1, paddingRight: '30px' }}>
                <div className="row">
              <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Track Name</Form.Label>
              <Form.Control type="input" placeholder="Type Track Name..." />
              </Form.Group>
              </Form>
                </div>
                <div className="row">
                  <label class="LabelFont" htmlFor="dropdown2">Country</label>
                  <Form.Select aria-label="Country">
                    <option>Select Country</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
                <div className="row">
                  <label class="LabelFont" htmlFor="dropdown3">Subject</label>
                  <Form.Select aria-label="Subject">
                    <option>Select Subject</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
                <div className="row">
                  <label class="LabelFont" htmlFor="dropdown4">Level</label>
                  <Form.Select aria-label="Level">
                    <option>Select Level</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
              </div>
              <div className="column" style={{ flex: 1, paddingLeft: '40px'  }}>
                <div className="row" >
                  <label class="LabelFont" htmlFor="dropdown5">Assign Skit Audio</label>
                  <SwitchToggle />
                </div>
                <div className="row" style={{ marginTop: '30px'}}>
                  <label class="LabelFont" htmlFor="dropdown6">Skit Audio</label>
                  <Form.Select aria-label="Skit Audio">
                    <option>Select Audio</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
                <div className="row">
                <label class="LabelFont" htmlFor="dropdown7">
                Subject Audio
                </label>
              <input className="form-control" type="file" />
              </div>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
          <button className="btn btn-dark" style={{ marginRight: '10px' }}>Add</button>
         <button className="btn btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        </div>
        </div>
        </div>
      )}
    </>
  );
}

export default Addaudio;
