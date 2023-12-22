import "../../../styles/dashboard-content.css";
import Countries from "../../../image/Group25.svg"
import Centers from "../../../image/Group22.svg"

const LeftComponent = () => {
    return ( 
        <div className="bottom-box">
            <h2>Located In</h2>
               <div className="user-boxes">
            <div className="user-box-7">
                <img
                    src={Countries}
                    alt="Countries"
                />
                <div>
                    <p className="number">20</p>
                    <p className="label">Countries</p>
                </div>
            </div>

            <div className="user-box-8">
                <img
                    src={Centers}
                    alt="Centers"
                />
                <div>
                    <p className="number">220</p>
                    <p className="label">Centers</p>
                </div>
            </div>
        </div>
        </div>
     );
}
 
export default LeftComponent;