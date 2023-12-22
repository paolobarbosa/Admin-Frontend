import React from "react";
import "../styles/heading.css";
import Ellipse1 from "../image/Ellipse1.svg"

const Heading = ({ label }) => {
  return (
    <div className="ui-heading">
      <h2 className="ui-heading-content">{label}</h2>
      <div className="profile-icon">
      <img
        src={Ellipse1}
        alt="User"
        width="60px"
        height="60px"
        style={{ borderRadius: '50%' }}
    />
      </div>
    </div>
  );
};

export default Heading;
