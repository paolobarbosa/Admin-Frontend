import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';
import { loginRequest, protectedApi } from "../authConfig";
import "../styles/dashboard.css";
import "../styles/dashboard-content.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";
import Table from "../components/Table";
import { useState, useEffect } from "react";

import { toast } from "react-hot-toast";
import useApiRequest from "../hooks/useApiRequest";

const CenterMgmt = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const routes = useRoutes();

  const { makeApiRequest, fetchCenterData } = useApiRequest();

  const authRequest = {
    ...loginRequest,
  };


  const enable = async (id) => {
    try {
      await makeApiRequest({
        url: `${protectedApi.api.endpoint}/center/${id}/enable`,
        method: "put",
      });
      fetchData();
      toast.success("Successfully enabled user");
    } catch (error) {
      console.error("Error enabling user:", error);
      // Handle error if needed
    }
  }

  const disable = async (id) => {
    try {
      await makeApiRequest({
        url: `${protectedApi.api.endpoint}/center/${id}/disable`,
        method: "put",
      });
      fetchData();
      toast.success("Successfully disabled user");
    } catch (error) {
      console.error("Error disabling user:", error);
      // Handle error if needed
    }
  };

  const fetchData = async () => {
    setData(await fetchCenterData());
  };

  useEffect(() => {
    fetchData()
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
    >
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="d-flex align-items-center">
            <Heading
              label={routes[2].label}
            />
          </div>
          <UiContent
            children={
              <>
                <h2 className='heading'>Centers</h2>
                <h6 className='subheading'>Listing</h6>
                <Table
                  id="centermgmt-table"
                  data={data}
                  withLinks={true}
                  tableSelectControls={true}
                  actionVisible={true}
                  isCenterMgmt={true}
                  nonUserTable={true}
                  enable={enable}
                  disable={disable}
                  loading={loading}
                />
              </>}
          />
        </div>
      </div>
    </MsalAuthenticationTemplate>
  );
}

export default CenterMgmt;