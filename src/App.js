import "./App.css";
import {
  useMsal,
  useIsAuthenticated,
  MsalAuthenticationTemplate,
} from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { Route, Routes, useLocation } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { loginRequest, protectedApi } from "./authConfig";
import { useState, useEffect, createContext } from "react";
import Countries from "./pages/Countries";
import CenterMgmt from "./pages/CenterMgmt";
import CustomNotif from "./pages/CustomNotif";
import Report from "./pages/Report";
import Feedback from "./pages/Feedback";
import ContentMgmt from "./pages/ContentMgmt";
import LvlUnlockCfg from "./pages/LvlUnlockCfg";
import CountryAdm from "./pages/CountryAdm";
import InstructorMgmt from "./pages/InstructorMgmt";
import AudioFile from "./pages/AudioFile";
import CountryDynamic from "./pages/CountryDynamic";
import CenterDynamic from "./pages/CenterDynamic";
import axios from "axios";
import AddAudioFile from "./pages/AddAudioFile";
import RegistrationPage from "./pages/Registration";
import Students from "./pages/Students";
import Assistants from "./pages/Assistants";
import Parents from "./pages/Parents";
import { Toaster, toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { HubConnectionBuilder } from "@microsoft/signalr";
import NewUser from "./pages/NewUser";
const DataContext = createContext();
const CurrentInstance = createContext();
const CurrentAuth = createContext();
const AcquiredToken = createContext();

const App = () => {
  const { pathname } = useLocation();
  const [acquiredToken, setAcquiredToken] = useState("");
  const [currentInstance, setCurrentInstance] = useState([]);
  const [currentAuth, setCurrentAuth] = useState(false);
  const [userType, setUserType] = useState('');
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  //changes in signalR
  const [senderId, setSenderId] = useState(``);
  const handleSenderIdUpdate = (newSenderId) => {
    setSenderId(newSenderId);
    console.log(`new sender Id`, newSenderId);
    console.log(`senderId`,senderId);
  };
  console.log(senderId);

  //end of changes
  const authRequest = {
    ...loginRequest,
  };

  const userOid = currentInstance.localAccountId;

  const [data, setData] = useState({});

  const sendUserType = (sentUserType) => {
    setUserType(sentUserType);
  }

  const getAccessToken = async () => {
    console.log("getting access t4oken");
    const request = {
      scopes: protectedApi.api.scopes.read,
      account: accounts[0],
    };

    try {
      const response = await instance.acquireTokenSilent(request);
      console.log(response.accessToken);
      setAcquiredToken(response.accessToken);
      console.log("getting token success");
      return response.accessToken;
    } catch (error) {
      console.error("Error acquiring access token for the API:", error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${protectedApi.api.endpoint}/users/signin/${userOid}`,
        {
          headers: {
            Authorization: `Bearer ${acquiredToken}`,
          },
        }
      );
      console.log("consoling role response");
      console.log(response.data);
      console.log(response.data.moduleData);
      console.log(response.data.signInData);
      console.log(response.data.signInData.roleName);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error);
        instance.logoutRedirect();
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log("App.js use effect triggered");

    if (pathname !== "/usermgmt/newuser") {
      setUserType("");
    }

    const fetchCurrentSession = async () => {
      try {
        const userAccount = instance.getActiveAccount();
        console.log(userAccount);
        if (userAccount) {
          console.log(userAccount);
          setCurrentInstance(userAccount);
          setCurrentAuth(isAuthenticated);
          if (acquiredToken === "") {
            getAccessToken();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isAuthenticated) {
      fetchCurrentSession();
    }

    console.log(data);

    if (
      Object.keys(data).length === 0 &&
      typeof userOid != "undefined" &&
      acquiredToken != ""
    ) {
      fetchData().then((res) => setData(res));
    }

    if (Object.keys(data).length > 0) {
      if (
        data.signInData.roleName === "SuperAdmin" ||
        data.signInData.roleName === "CountryAdmin"
      ) {
        console.log("role is superadmin");
      } else {
        console.log("role is not superadmin");
        instance.logoutRedirect();
      }
    }
  }, [instance, isAuthenticated, data, userOid, acquiredToken, pathname]);

  useEffect(() => {
    const userAccount = instance.getActiveAccount();
    const connection = new HubConnectionBuilder()
      .withUrl("https://audionex-api.azurewebsites.net/hubs/chat")
      .withAutomaticReconnect()
      .build();

    const handleMessage = (message) => {
      console.log(message);
      console.log(message.senderId);
      console.log(userAccount.localAccountId);
      if (userAccount.localAccountId !== message.senderId) {
        toast.success("New Notification message!");
        console.log(`account id not equal to sender id`);
      }
    };

    connection
      .start()
      .then((result) => {
        console.log("Connected!");
        connection.on("ReceiveMessage", handleMessage);
        console.log(`sender id outside of handleMessage`, senderId);
      })
      .catch((e) => console.log("Connection failed: ", e));

    return () => {
      if (connection) {
        connection.off("ReceiveMessage", handleMessage);
        connection.stop();
      }
    };
  }, []);
  return (
    <>
      {!currentAuth ? (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainNavbar />
                <Home />
              </>
            }
          />
          <Route
            path="/registration"
            element={
              <>
                <MainNavbar />
                <RegistrationPage />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <MsalAuthenticationTemplate
                  interactionType={InteractionType.Redirect}
                  authenticationRequest={authRequest}
                ></MsalAuthenticationTemplate>
              </>
            }
          />
        </Routes>
      ) : Object.keys(data).length > 0 ? (
        data.signInData.roleName === "SuperAdmin" ||
        data.signInData.roleName === "CountryAdmin" ? (
          <CurrentAuth.Provider value={currentAuth}>
            <CurrentInstance.Provider value={currentInstance}>
              <AcquiredToken.Provider
                value={{ acquiredToken, getToken: getAccessToken }}
              >
                <DataContext.Provider value={data}>
                  <Toaster position="top-center" reverseOrder={false} />
                  <div className="container-div">
                    <Sidebar />

                    <div className="ui">
                      <Routes>
                        <Route
                          path="/dashboard"
                          element={<Dashboard getToken={getAccessToken} />}
                        />
                        <Route path="/usermgmt">
                          <Route
                            path="instructor"
                            element={
                              <InstructorMgmt addInstructor={sendUserType} getToken={getAccessToken} />
                            }
                          />
                          <Route
                            path="countryadm"
                            element={<CountryAdm addCountryAdmin={sendUserType} getToken={getAccessToken} />}
                          />
                          <Route 
                            path="newuser"
                            element={<NewUser userType={userType} />}
                          />
                        </Route>
                        <Route path="/centermgmt">
                          <Route
                            index
                            element={<CenterMgmt getToken={getAccessToken} />}
                          />
                          <Route
                            path=":dynamicCenter"
                            element={
                              <CenterDynamic getToken={getAccessToken} />
                            }
                          />
                        </Route>
                        <Route path="/countries">
                          <Route
                            index
                            element={<Countries getToken={getAccessToken} />}
                          />
                          <Route
                            path=":dynamicCountry"
                            element={
                              <CountryDynamic getToken={getAccessToken} />
                            }
                          />
                        </Route>
                        <Route path="/audiomgmt">
                          <Route path="audiofile">
                            <Route
                              index
                              element={<AudioFile getToken={getAccessToken} />}
                            />
                            <Route path="addaudio" element={<AddAudioFile />} />
                          </Route>
                          <Route
                            path="lvlunlockcfg"
                            element={<LvlUnlockCfg getToken={getAccessToken} />}
                          />
                        </Route>
                        <Route
                          path="/customnotif"
                          element={
                            <CustomNotif
                              getToken={getAccessToken}
                              onSenderIdUpdate={handleSenderIdUpdate}
                            />
                          }
                        />
                        <Route
                          path="/report"
                          element={<Report getToken={getAccessToken} />}
                        />
                        <Route
                          path="/feedback"
                          element={<Feedback getToken={getAccessToken} />}
                        />
                        <Route
                          path="/contentmgmt"
                          element={<ContentMgmt getToken={getAccessToken} />}
                        />
                      </Routes>
                    </div>
                  </div>
                </DataContext.Provider>
              </AcquiredToken.Provider>
            </CurrentInstance.Provider>
          </CurrentAuth.Provider>
        ) : (
          <div></div>
        )
      ) : (
        <div className="d-flex justify-content-center align-content-center h-100">
          <div className="mx-auto w-auto h-auto my-auto">
            <ClipLoader color="#4E4E4E" size={75} />
          </div>
        </div>
      )}
    </>
  );
};

export { CurrentAuth };
export { AcquiredToken };
export { CurrentInstance };
export { DataContext };
export default App;
