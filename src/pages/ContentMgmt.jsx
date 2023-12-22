import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';
import { loginRequest, protectedApi } from "../authConfig";
import "../styles/dashboard.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";
import Table from "../components/Table";
import tableData3 from "../data/tableData3";
import ContentMgmtUi from "../data/contentMgmt/ContentMgmt";
import { useState } from "react";
import { Modal } from 'react-bootstrap';
import PopUpUi from "../data/contentMgmt/PopUp";

const ContentMgmt = () => {

    const routes = useRoutes();


    const authRequest = {
        ...loginRequest,
    };

    const [showModal, setShowModal] = useState(false);

    const PIA = () => {
        setShowModal(true);
    }

    const handlePopupCancel = () => {
        setShowModal(false);
      };
      
    const handlePopupSubmit = () => {
        
        setShowModal(false);
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
                            label={routes[8].label}
                        />
                    </div>
                    <UiContent 
                        children={
                            <>
                                <h2 className="heading">Manage Content</h2>
                                <ContentMgmtUi />
                            </>
                        }
                    />
                    <UiContent
                        children={
                            <>
                                <h2 className='heading'>PIA Information</h2>
                                <Table 
                                    id="contentmgmt-table"
                                    data={tableData3} 
                                    withLinks={false} 
                                    btnFunction={PIA} 
                                    tblButton="Add PIA"
                                    actionVisible={true}
                                    selectAllVisible={false} 
                                    tableSelectControls={false}/>
                            </>}
                    />
                </div>
            </div>

            <Modal show={showModal} onHide={handlePopupCancel}>
                <Modal.Header style={{ background: '#D9D9D9', textAlign: 'center' }}>
                    <Modal.Title style={{ margin: '0 auto' }} >Add PIA Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PopUpUi onSubmit={handlePopupSubmit} onCancel={handlePopupCancel} />
                </Modal.Body>
        
            </Modal>

        </MsalAuthenticationTemplate>
     );
}
 
export default ContentMgmt;