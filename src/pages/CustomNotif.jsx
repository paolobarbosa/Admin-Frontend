import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';
import { loginRequest, protectedApi } from "../authConfig";
import "../styles/dashboard.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";
import Table from "../components/Table";
import tableData from "../data/tableData";
import SendNotifUi from "../data/customNotif/SendNotifUi";

const CustomNotif = ({onSenderIdUpdate}) => {

    const routes = useRoutes();
    
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
                        <Heading 
                            label={routes[5].label}
                        />
                    </div>
                    <UiContent 
                        children={
                            <>
                                <h2 className="heading">Send Notification</h2>
                                <SendNotifUi onSenderIdUpdate = {onSenderIdUpdate}/>
                            </>
                        }
                    />
                    <UiContent 
                        children={
                            <>
                                <h2 className='heading'>History Logs</h2>
                                <Table data={tableData} withLinks={false} 
                                tableSelectControls={true}/>
                            </>}
                    />
                </div>
            </div>
        </MsalAuthenticationTemplate>
     );
}
 
export default CustomNotif;