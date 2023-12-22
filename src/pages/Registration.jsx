import { AuthenticatedTemplate, UnauthenticatedTemplate,useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useState, useEffect } from 'react';
import Registration from "../components/Registration";
import "../styles/registration.css";


const RegistrationPage = () => {
    const {instance} = useMsal();
    

    return ( 
        <div classname ="home-container">
            
            <AuthenticatedTemplate>
                Test if you're signed in.
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
          <div>
            <Registration />
          </div>

            </UnauthenticatedTemplate>
        </div>
     );
}
 
export default RegistrationPage;