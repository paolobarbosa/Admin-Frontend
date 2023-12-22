import "../../styles/dashboard-content.css";
import '../../font.css';
import CountryAdmin from "../../image/CountryAdmin.svg"
import Instructors from "../../image/Instructor.svg"
import Assistant from "../../image/Assitant.svg"
import Students from "../../image/Student.svg"

const Users = () => {
    return ( 
        <>
        <h2 className="heading">Users</h2>
            <div className="user-boxes">
            <div className="user-box-1">
                <img
                    src={CountryAdmin}
                    alt="Admin"
                />
                <div>
                    <p className="number">20</p>
                    <p className="label">Country Admins</p>
                </div>
            </div>

            <div className="user-box-2">
                <img
                    src={Instructors}
                    alt="Instructors"
                />
                <div>
                    <p className="number">300</p>
                    <p className="label">Instructors</p>
                </div>
            </div>
            <div className="user-box-3">
                <img
                    src={Assistant}
                    alt="Assistants"
                />
                <div>
                    <p className="number">150</p>
                    <p className="label">Assistants</p>
                </div>
            </div>
                
            <div className="user-box-4">
                <img
                    src={Students}
                    alt="Students"
                />
                <div>
                    <p className="number">10,000</p>
                    <p className="label">Students</p>
                </div>
            </div>
            </div>
      </>
     );
}
 
export default Users;