import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest, protectedApi } from "../authConfig";
import "../styles/dashboard.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";
import AddNewUser from "../data/newUserContent/AddNewUser";

const NewUser = ({ userType }) => {
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
                            label={`${routes[1].label} > ${routes[1].children[2].label}`}
                        />
                    </div>
                    <UiContent
                        children={
                            <>
                                <h2 className="heading">New User Registration</h2>
                                <AddNewUser latestSentUserType={userType}/>
                            </>
                        }
                    />
                </div>
            </div>
        </MsalAuthenticationTemplate>
    );
}

export default NewUser;