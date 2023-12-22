import "../../styles/dashboard-content.css";

const CenterSubjects = ({ header1, header2 }) => {
    return ( 
        <>
            <h2 className="heading">Subjects</h2>
            <table className="subjects-table">
                <thead>
                    <tr>
                        <th>{header1}</th>
                        <th>{header2}</th>
                    </tr>
                </thead>
            </table>
        </>
     );
}
 
export default CenterSubjects;