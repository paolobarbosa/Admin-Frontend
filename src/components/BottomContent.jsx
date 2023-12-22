import "../styles/dashboard-content.css";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

function BottomContent() {

  return (
    <Form className="notif-container notif-container-rows my-4">
        <div className="row">
            <div className="col">
                <div className="d-flex flex-row justify-content-center column-gap-5 ">
                    <Button className="custom-btn"type="submit">
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
}

export default BottomContent;
