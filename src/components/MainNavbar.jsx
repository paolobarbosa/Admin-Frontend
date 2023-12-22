import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import useSession from "../hooks/useSession";
import { loginRequest } from '../authConfig';
import { useNavigate, useLocation }  from "react-router-dom";

import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { useState, useEffect } from 'react';

const MainNavbar = () => {

    const { instance, currentAuth } = useSession();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    // const { instance, accounts } = useMsal();

    const handleLogin = () => {

        instance.loginRedirect(loginRequest)
            .catch((err) => console.log(err));

    }

    const handleRegistration = () => {
        if (location.pathname !== '/registration') {
            navigate("/registration");
        }
    }

    const handleLogout = () => {
        instance.logoutRedirect();
    }

    // const isAuthenticated = useIsAuthenticated();

    // async function getAccessToken() {
    //     const request = {
    //       scopes: [
    //         'api://63507057-6df3-4839-b5f8-6def4650b13a/Task.Read', 
    //         'api://63507057-6df3-4839-b5f8-6def4650b13a/Task.Write'
    //     ], 
    //       account: accounts[0], 
    //     };
    
    //     try {
    //       const response = await instance.acquireTokenSilent(request);
    //       console.log(response.accessToken);
    //       return response.accessToken;
    //     } catch (error) {
    //       console.error('Error acquiring access token for the API:', error);
    //       return null;
    //     }
    //   }


    // useEffect(() => {
    //     const fetchUsername = async () => {
    //         try {
    //             const currentAccount = await instance.getActiveAccount();
    //             if (currentAccount) {
    //                 setName(currentAccount.name);
    //                 const accessToken = await getAccessToken();
    //                 if (accessToken) {
                        
    //                     console.log(`Access token obtained for API: ${accessToken}`);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user information:', error);
    //         } finally {
    //             setLoading(false); 
    //         }
    //     }
    
    //     if (isAuthenticated) {
    //         fetchUsername();
    //     }

    // }, [instance, isAuthenticated, name])

    
    return ( 
        <div>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">AudioNex (Admin)</Navbar.Brand>
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    {currentAuth ? 
                        (
                            <>
                                <div className='me-5'>
                                    {name ? `Welcome, ${name}` : "Fetching user information..." }
                                </div>
                                <Button variant="light" type="submit" onClick={handleLogout}>Logout</Button>
                            </>
                        ) : location.pathname !== '/login' ? (
                            <>
                              <Button id="navbar-login" variant="light" type="submit" onClick={handleLogin}>
                                Login
                              </Button>
                              <Button id="navbar-signup" variant="light" type="submit" onClick={handleRegistration} style={{ marginLeft: '10px' }}>
                                Sign Up
                              </Button>
                            </>
                          )
                        : location.pathname !== '/registration' ? (
                                <Button id="navbar-signup" variant="light" type="submit" onClick={handleRegistration}>Sign Up</Button>
                        ) : null}
                </Container>
            </Navbar>
        </div>
     );
}
 
export default MainNavbar;