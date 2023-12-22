import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest, protectedApi } from "../authConfig";
import "../styles/dashboard.css";
import "../styles/dashboard-content.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";
import Table from "../components/Table";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../App";
import axios from "axios";
import { CurrentInstance } from "../App";
import { Modal } from "react-bootstrap";
import PopupUi from "../data/instructorMgmtContent/PopupUi";
import { toast } from "react-hot-toast";

import useApiRequest from "../hooks/useApiRequest";

const InstructorMgmt = ({ getToken, addInstructor }) => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const routes = useRoutes();
    const { instance } = useMsal();

    const {makeApiRequest} = useApiRequest();


    const authRequest = {
        ...loginRequest,
    };

    const data = useContext(DataContext);

    const sendPassword = async() => {
        console.log("Send Pass");
    }

    const handlePopupCancel = async() => {

        setShowModal(false);
    };

    const handlePopupSubmit = async() => {
        setShowModal(false);
    };
    const enable = async (aadIdentifer) => {
        try {
            await makeApiRequest({
              url: `${protectedApi.api.endpoint}/users/${aadIdentifer}/enabled`,
              method: "put",
            });
            fetchData();
            toast.success("Successfully enabled user");
          } catch (error) {
            console.error("Error enabling user:", error);
            // Handle error if needed
          }
    }

    const disable = async (aadIdentifer) => {
        try {
            await makeApiRequest({
              url: `${protectedApi.api.endpoint}/users/${aadIdentifer}/disabled`,
              method: "put",
            });
            fetchData();
            toast.success("Successfully disabled user");
          } catch (error) {
            console.error("Error disabling user:", error);
          }
      };
      
      const fetchData = async () => {
        try {
            const { data } = await makeApiRequest({
                url: `${protectedApi.api.endpoint}/users/instructor`,
                method: "get",
            });
            setTableData(data);
    
        } catch (err) {
            console.log('Error fetching centers', err);
        } finally {
            setLoading(false);
        }
    
    };

    useEffect(() => {
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
                            label={`${routes[1].label} > ${routes[1].children[0].label}`}
                        />
                    </div>
                    <UiContent
                        children={
                            <>
                                <h2 className='heading'>Instructor</h2>
                                <h6 className='subheading'>Listing</h6>
                                <Table
                                    id="users-instructor-table"
                                    data={tableData}
                                    withLinks={false}
                                    btnFunction={Object.keys(data).length != 0 ? (data.moduleData["User Management"]["Instructor Management"].includes("Send Password") ? sendPassword : null) : (null)}
                                    btnFunction2={Object.keys(data).length != 0 ? (data.moduleData["User Management"]["Instructor Management"].includes("Add Instructor") ? addInstructor : null) : (null)}
                                    tblButton2={Object.keys(data).length != 0 ? ("Add Instructor") : (null)}
                                    tblButton={Object.keys(data).length != 0 ? (data.moduleData["User Management"]["Instructor Management"].includes("Send Password") ? "Send Password" : null) : (null)}
                                    actionVisible={true}
                                    enable={Object.keys(data).length != 0 ? (data.moduleData["User Management"]["Instructor Management"].includes("Enable Instructor") ? enable : null) : (null)}
                                    disable={disable}
                                    selectAllVisible={true}
                                    tableSelectControls={true}
                                    loading={loading}
                                />
                            </>}
                    />
                </div>
            </div>

            <Modal show={showModal} onHide={handlePopupCancel} size="xl">
                <Modal.Header style={{ background: '#D9D9D9', textAlign: 'center' }}>
                    <Modal.Title style={{ margin: '0 auto' }} >Add Instructor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PopupUi updateData={fetchData} onSubmit={handlePopupSubmit} onCancel={handlePopupCancel}/>
                </Modal.Body>

            </Modal>

        </MsalAuthenticationTemplate>
    );
};

export default InstructorMgmt;
