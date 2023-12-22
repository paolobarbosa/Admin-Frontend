import { useEffect, useState, useContext } from "react";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest, protectedApi } from "../authConfig";
import "../styles/dashboard.css";
import useRoutes from "../hooks/useRoutes";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import UiContentHalved from "../components/UiContentHalved";
import Users from "../data/dashboardContent/Users";
import Subjects from "../data/dashboardContent/Subjects";
import LeftComponent from "../data/dashboardContent/bottomComponent/leftComponent";
import RightComponent from "../data/dashboardContent/bottomComponent/rightComponent";
import "../styles/dashboard-content.css";

const Dashboard = ({ getToken }) => {
  const routes = useRoutes();

  // const [userRoles, setUserRoles] = useState([]);

  let hasCache = false;

  if (
    window.localStorage.getItem("dashboardData") &&
    window.localStorage.getItem("dashboardData") !== "undefined"
  ) {
    hasCache = true;
  }

  const [data, setData] = useState(
    hasCache ? JSON.parse(window.localStorage.getItem("dashboardData")) : null
  );

  console.log(data);

  const authRequest = {
    ...loginRequest,
  };

  

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
    >
     
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="d-flex align-items-center">
            <Heading label={routes[0].label} />
          </div>
          <UiContent children={<Users />} />
          <UiContent children={<Subjects />} />
          <div className="bottom-row">
            <UiContentHalved children={<LeftComponent />} />
            <UiContentHalved children={<RightComponent />} />
          </div>
        </div>
      </div>
    </MsalAuthenticationTemplate>
  );
};

export default Dashboard;
