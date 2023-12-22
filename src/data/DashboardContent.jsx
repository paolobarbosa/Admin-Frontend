import React from "react";
import "../styles/dashboard-content.css";

const DashboardContent = () => {
  return (
    <div className="">
      <div className="box">
        <h2>Users</h2>
        <div className="user-boxes">
          <div className="user-box">Country Admins</div>
          <div className="user-box">Instructors</div>
          <div className="user-box">Assistants</div>
          <div className="user-box">Students</div>
        </div>
      </div>
      <div className="box">
        <h2>Subjects</h2>
        <h6>Monthly Downloads</h6>
        <table>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Subject</th>
              <th>Total Number of Downloads</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>English</td>
              <td>200</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Thai</td>
              <td>150</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Math</td>
              <td>140</td>
            </tr>
            <tr>
              <td>4</td>
              <td>EFL</td>
              <td>120</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bottom-row">
        <div className="box bottom-box">
          <h2>Located In</h2>
          <div className="user-boxes">
            <div className="user-box"></div>
            <div className="user-box"></div>
          </div>
        </div>
        <div className="box bottom-box">
          <h2>Other Alerts</h2>
          <div className="user-boxes">
            <div className="user-box"></div>
            <div className="user-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
