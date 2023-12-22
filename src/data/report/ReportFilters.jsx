import "../../styles/report.css";
import Form from 'react-bootstrap/Form';

const ReportFilters = () => {
    return (
        <Form className="report-filter-container">
            <div className="row">
                            <Form.Select className="report-filter-formselect" >
                                <option>Country</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select className="report-filter-formselect" >
                                <option>Branch</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select className="report-filter-formselect" >
                                <option>Center</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select className="report-filter-formselect" >
                                <option>Subject</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select className="report-filter-formselect" >
                                <option>Level</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select className="report-filter-formselect" >
                                <option>From Date</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select className="report-filter-formselect" >
                                <option>To Date</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
            </div>
        </Form>
    );
}

export default ReportFilters;