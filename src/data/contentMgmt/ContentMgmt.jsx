import "../../styles/dashboard-content.css";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { FaUpload } from 'react-icons/fa';

const ContentMgmtUi = () => {
    return (
        <Form className="notif-container notif-container-rows my-4">
            <div className="row">
                <div className="col-6">
                    <Form.Group className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">FAQ</Form.Label>
                        <div className="my-0 py-0 col-8 d-flex align-items-center">
                            <Form.Control
                                type="text"
                                id="inputNotifTitle"
                                aria-describedby="inputNotifTitle"
                                placeholder="File Upload"
                                style={{ height: "40px", width: "250px" }}
                            />
                            <Button className="custom-btn-upload">
                            <FaUpload />
                            </Button>
                        </div>
                    </Form.Group>
                </div>
                <div className="col-6" />
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="d-flex flex-row row-centeritems">
                        <Form.Label className="my-0 py-0 col-4 fw-bold">User Guide</Form.Label>
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
                        <Button className="custom-btn">
                            Update
                        </Button>
                        <Button className="custom-btn-cancel">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    );
}

export default ContentMgmtUi;
