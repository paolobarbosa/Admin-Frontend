import "../../styles/dashboard-content.css";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { FaUpload } from 'react-icons/fa';

const PopUpUi = ({ onSubmit, onCancel }) => {

    
    return (
        <Form className="notif-container notif-container-rows my-4">
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Country</Form.Label>
                        <div className="my-0 py-0 col-8 d-flex align-items-center">
                        <Form.Select className="notif-formselect" aria-label="Select User Role">
                                <option>Select Country</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                </div>
                <div className="col-6" />
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">Upload PIA File</Form.Label>
                        <div className="my-0 py-0 col-8 d-flex align-items-center">
                            <Form.Control
                                type="text"
                                id="inputUserGuide"
                                aria-describedby="inputUserGuide"
                                placeholder="File Upload"
                                style={{ height: "40px", width: "250px" }}
                            />
                            <Button className="custom-btn-upload">
                            <FaUpload />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-row justify-content-center column-gap-5 ">
                        <Button className="custom-btn" onClick={onSubmit}>
                            Submit
                        </Button>
                        <Button className="custom-btn-cancel" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    );
}

export default PopUpUi;
