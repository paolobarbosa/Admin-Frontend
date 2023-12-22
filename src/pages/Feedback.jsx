import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';
import { loginRequest, protectedApi } from "../authConfig";
import "../styles/dashboard.css";
import "../styles/dashboard-content.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";
import Table from "../components/Table";
import tableData from "../data/tableData";
import { useState, useEffect } from "react";
import axios from "axios";

const Feedback = () => {
    const [data, setData] = useState([]);
    const routes = useRoutes();

    const authRequest = {
        ...loginRequest,
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${protectedApi.api.endpoint}/feedback`);
            console.log(response);
            setData(response.data);
          } catch (error) {
            console.log(error);
          }
          
        }
    
        fetchData();
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
                            label={routes[7].label}
                        />
                    </div>
                    <UiContent 
                        children={
                            <>
                                <h2 className='heading'>Feedback Received</h2>
                                <h6 className='subheading'>Listing</h6>
                                <Table 
                                    data={tableData} 
                                    withLinks={false} 
                                    tableSelectControls={true}/>
                            </>}
                    />
                </div>
            </div>
        </MsalAuthenticationTemplate>
     );
}
 
export default Feedback;