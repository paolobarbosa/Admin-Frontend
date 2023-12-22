import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { protectedApi } from "../authConfig";

const useSession = () => {

    const [acquiredToken, setAcquiredToken] = useState("");
    const [currentInstance, setCurrentInstance] = useState([]);
    const [currentAuth, setCurrentAuth] = useState(false);
    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    async function getAccessToken() {
        const request = {
          scopes: protectedApi.api.scopes.read, 
          account: accounts[0], 
        };
    
        try {
          const response = await instance.acquireTokenSilent(request);
          console.log(response.accessToken);
          return response.accessToken;
        } catch (error) {
          console.error('Error acquiring access token for the API:', error);
          return null;
        }
      }

    useEffect(() => {

        const fetchCurrentSession = async () => {
            try {
                const userAccount = await instance.getActiveAccount();
                if (userAccount) {
                    setCurrentInstance(userAccount);
                    setCurrentAuth(isAuthenticated);
                    const accessToken = await getAccessToken();
                    if (accessToken) {
                        setAcquiredToken(accessToken);
                        console.log(`Access token obtained for API: ${accessToken}`);
                    }
                }
            } catch (error) {
                console.error("Error fetching instance");
            }
        }

        if (isAuthenticated) {
            fetchCurrentSession();
        }

    }, [instance, isAuthenticated]);

   

    return {
        currentInstance,
        currentAuth,
        acquiredToken,
        instance
    };
}
 
export default useSession;