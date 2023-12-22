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
import { AcquiredToken } from "../App";
import { Modal } from "react-bootstrap";
import PopupUi from "../data/parentsContent/PopupUi";
import { toast } from "react-hot-toast";

import useApiRequest from "../hooks/useApiRequest";

const Parents = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const acquiredToken = useContext(AcquiredToken);
    const [showModal, setShowModal] = useState(false);
    const routes = useRoutes();
    const { instance } = useMsal();

    const authRequest = {
        ...loginRequest,
    };

    const {makeApiRequest} = useApiRequest();

    const data = useContext(DataContext);

    const sendPassword = () => {
        console.log("Send Pass");
    }

    const addParent = () => {
        setShowModal(true);
    }

    const handlePopupCancel = () => {
        setShowModal(false);
    };

    const handlePopupSubmit = () => {
        setShowModal(false);
    };

    const enable = async (aadIdentifer) => {

        try {
            await makeApiRequest({
                url: `${protectedApi.api.endpoint}/users/${aadIdentifer}/enabled`,
                method: 'put',
            })

            await fetchData();
            toast.success("Successfully enabled user");
        } catch(err) {
            console.log('Error in enabling user', err);
        }

    }

    const disable = async (aadIdentifer) => {

        try {
            await makeApiRequest({
                url: `${protectedApi.api.endpoint}/users/${aadIdentifer}/disabled`,
                method: 'put',
            })

            await fetchData();
            toast.success("Successfully disabled user");
        } catch(err) {
            console.log('Error in disabling user', err);
        }
    }


    const fetchData = async () => {
        try {
            const response = await makeApiRequest({
                url: `${protectedApi.api.endpoint}/users/parent`,
                method: 'get',
            })

            console.log(response);
            setTableData(response.data);
        } catch(err) {
            console.log('Error in fetching parents', err);
        } finally {
            setLoading(false);
        }
    }

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
                            label={`${routes[1].label} > ${routes[1].children[1].label}`}
                        />
                    </div>
                    <UiContent
                        children={
                            <>
                                <h2 className='heading'>Parent</h2>
                                <h6 className='subheading'>Listing</h6>
                                <Table
                                    id="users-parent-table"
                                    data={tableData}
                                    withLinks={false}
                                    btnFunction={Object.keys(data).length != 0 ? (data.moduleData["User Management"]["Instructor Management"].includes("Send Password") ? sendPassword : null) : (null)}
                                    btnFunction2={Object.keys(data).length != 0 ? (data.moduleData["User Management"]["Instructor Management"].includes("Add Instructor") ? addParent : null) : (null)}
                                    tblButton2={Object.keys(data).length != 0 ? ("Add Parent") : (null)}
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
                    <Modal.Title style={{ margin: '0 auto' }} >Add Parent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PopupUi updateData={fetchData} onSubmit={handlePopupSubmit} onCancel={handlePopupCancel}/>
                </Modal.Body>

            </Modal>

        </MsalAuthenticationTemplate>
    );
}

export default Parents;