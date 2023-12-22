import { MsalAuthenticationTemplate } from "@azure/msal-react";
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
import { Modal } from "react-bootstrap";
import PopupUi from "../data/studentsContent/PopupUi";
import { toast } from "react-hot-toast";

import useApiRequest from "../hooks/useApiRequest";

const Students = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const routes = useRoutes();

    const {makeApiRequest} = useApiRequest();

    const authRequest = {
        ...loginRequest,
    };

    const data = useContext(DataContext);

    const sendPassword = () => {
        console.log("Send Pass");
    }

    const addInstructor = () => {
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
            method: "put",
          });
          fetchData();
          toast.success("Successfully enabled user");
        } catch (err) {
          console.error("Error enabling user:", err);
          // Handle error if needed
        }
      };

      const disable = async (aadIdentifer) => {
        try {
            await makeApiRequest({
                url: `${protectedApi.api.endpoint}/users/${aadIdentifer}/disabled`,
                method: "put",
            });
            fetchData();
            toast.success("Successfully disabled user");
        } catch (err) {
            console.error("Error disabling user:", err);
            // Handle error if needed
        }
    };

    const fetchData = async () => {
        try {
            const res = await makeApiRequest({
                url: `${protectedApi.api.endpoint}/users/student`,
                method: "get",
            });
            console.log(res); // Check if the response is what you expect
            setTableData(res.data);
        } catch (err) {
            console.error("Error fetching data:", err);
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
                                <div classname="student" >
                                <h2 className='heading'>Student</h2>
                                </div>
                                <h6 className='subheading'>Listing</h6>
                                <Table
                                    id="users-student-table"
                                    data={tableData}
                                    withLinks={false}
                                    btnFunction={Object.keys(data).length != 0 ? (data.moduleData["User Management"]["Instructor Management"].includes("Send Password") ? sendPassword : null) : (null)}
                                    btnFunction2={Object.keys(data).length != 0 ? (data.moduleData["User Management"]["Instructor Management"].includes("Add Instructor") ? addInstructor : null) : (null)}
                                    tblButton2={Object.keys(data).length != 0 ? ("Add Student") : (null)}
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
                    <Modal.Title style={{ margin: '0 auto' }} >Add Students</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PopupUi updateData={fetchData} onSubmit={handlePopupSubmit} onCancel={handlePopupCancel} />
                </Modal.Body>

            </Modal>
        </MsalAuthenticationTemplate>
    );
}

export default Students;