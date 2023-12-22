import "../../styles/dashboard-content.css";

const CountryDetails = ({ col1, col2, col3 }) => {
    return (
        <>
            <h2 className="heading">Country Details</h2>
            <table className="subjects-table">
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Centers</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="fw-bold">{col1}</td>
                        <td className="fw-bold">{col2}</td>
                        <td className="fw-bold">{col3}</td>
                    </tr>
                </tbody>
            </table>
        </>

    );
}

export default CountryDetails;