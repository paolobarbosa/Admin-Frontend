import "../../../styles/dashboard-content.css";
import MisMatch from "../../../image/Group23.svg"
import Feedback from "../../../image/Group24.svg"

const RightComponent = () => {
    return ( 
        <div className="bottom-box">
                <h2>Other Alerts</h2>
            <div className="user-boxes">
            <div className="user-box-5">
                <img
                    src={MisMatch}
                    alt="Admin"
                />
                <div>
                    <p className="number">50</p>
                    <p className="label">Total Mismatch</p>
                </div>
            </div>

            <div className="user-box-6">
                <img
                    src={Feedback}
                    alt="Instructors"
                />
                <div>
                    <p className="number">220</p>
                    <p className="label">Total Feedback</p>
                </div>
            </div>
        </div>
        </div>
     );
}
 
export default RightComponent;