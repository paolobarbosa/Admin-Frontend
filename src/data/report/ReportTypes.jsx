import "../../styles/report.css";
import Form from 'react-bootstrap/Form';

const ReportTypes = () => {
    return (
        <Form className="report-type-container">
            <div className="row">

                            <Form.Select className="report-type-formselect">
                                <option>Select a Report Type</option>
                                <option value="type1">Report Type 1</option>
                                <option value="type2">Report Type 2</option>
                                <option value="type3">Report Type 3</option>
                            </Form.Select>
                </div>
        </Form>
    ); 
}

export default ReportTypes;