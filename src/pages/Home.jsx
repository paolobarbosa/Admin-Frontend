import { AuthenticatedTemplate, UnauthenticatedTemplate,useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useState, useEffect } from 'react';
import '../styles/homeStyles.css';
import Globe from "../image/Globe.svg"
import Group from "../image/Group.svg"

const Home = () => {
    const {instance} = useMsal();
    const [isAuthenticated, setIsAuthenticated] = useState(useIsAuthenticated())
    console.log(isAuthenticated)
    console.log(instance)
    return ( 
        <div className="home-container">
            
            <AuthenticatedTemplate>
                Test if you're signed in.
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
            <div className="image-container">
                    <img src={Globe} alt="Globe" className="globe-image" />
                    <img src={Group} alt="Group" className="group-image" />
            </div>
            </UnauthenticatedTemplate>
        </div>
     );
}
 
export default Home;