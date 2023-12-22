import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";
import "../styles/dashboard.css";
import "../styles/dashboard-content.css";
import useRoutes from "../hooks/useRoutes";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import useApiRequest from "../hooks/useApiRequest";

const Countries = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const routes = useRoutes();

    const {fetchCountryData} = useApiRequest();



    const authRequest = {
        ...loginRequest,
    };

    useEffect(() => {
        fetchCountryData()
          .then(countries =>{ setData(countries)})
          .finally(setLoading(false));
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
                            label={routes[3].label}
                        />
                    </div>
                    <UiContent 
                        children={
                            <>
                                <h2 className='heading'>Countries</h2>
                                <h6 className='subheading'>Listing</h6>
                                <Table 
                                    id="countries-table"
                                    data={data} 
                                    withLinks={true} 
                                    actionVisible={true} 
                                    tableSelectControls={true}
                                    nonUserTable={true}
                                    loading={loading}
                                />
                            </>}
                        />
                </div>
        </div>
        </MsalAuthenticationTemplate>
    );
    };

    export default Countries;
