import "../../styles/dashboard-content.css";

const CenterDetails = ({ 
    col11, 
    col12, 
    col13, 
    col14,
    col21,
    col22, 
}) => {
    return (
        <>
            <h2 className="heading">Center Details</h2>
            <table className="subjects-table">
                <thead>
                    <tr>
                        <th>Center Name</th>
                        <th>Center ID</th>
                        <th>Branch Name</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="fw-bold">{col11}</td>
                        <td className="fw-bold">{col12}</td>
                        <td className="fw-bold">{col13}</td>
                        <td className="fw-bold">{col14}</td>
                    </tr>
                </tbody>
            </table>
            <table className="subjects-table subjects-table-centerdynamic">
                <thead>
                    <tr>
                        <th>Instructor Name</th>
                        <th>Instructor ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="fw-bold">{col21}</td>
                        <td className="fw-bold">{col22}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default CenterDetails;