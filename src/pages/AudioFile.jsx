import { useState, useContext, useEffect } from "react";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest, protectedApi } from "../authConfig";
import "../styles/dashboard.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";
import Table from "../components/Table";
import tableData2 from "../data/tableData2";

import { Modal } from "react-bootstrap";
import PopupUi from "../data/addAudioFileContent/PopupUi";


import useApiRequest from "../hooks/useApiRequest";

const AudioFile = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { instance } = useMsal();

  const {makeApiRequest} = useApiRequest();

  const routes = useRoutes();

  const [firstTabOpen, setFirstTabOpen] = useState(true);
  const [secondTabOpen, setSecondTabOpen] = useState(false);

  const onFirstTabClick = (bool) => {
    setFirstTabOpen(bool);
    setSecondTabOpen(false);
  }

  const onSecondTabClick = (bool) => {
    setSecondTabOpen(bool);
    setFirstTabOpen(false);
  }

  const addAudio = () => {
    setShowModal(true);
  }

  const handlePopupCancel = () => {
    setShowModal(false);
  };

  const handlePopupSubmit = () => {
    setShowModal(false);
  };

  const authRequest = {
    ...loginRequest,
  };

  const fetchData = async () => {
    try {
        const res = await makeApiRequest({
            url: `${protectedApi.api.endpoint}/audio`,
            method: "get",
        });
        setData(res.data);
    } catch (err) {
        console.log(err);
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
              label={`${routes[4].label} > ${routes[4].children[0].label}`}
            />

          </div>
          <h2 className='heading'>Audio Files</h2>

          <UiContent
            children={firstTabOpen ? (<Table data={data} loading={loading} withLinks={false} btnFunction={addAudio} tblButton="Add Audio File" actionVisible={true} tableSelectControls={true} />) : secondTabOpen ? (<Table data={tableData2} loading={loading} withLinks={false} btnFunction={addAudio} tblButton="Add Audio File" actionVisible={true} tableSelectControls={true} />) : (null)}
            withTab={true}
            firstTab="All"
            secondTab="Instructors"
            onFirstTabClick={onFirstTabClick}
            onSecondTabClick={onSecondTabClick}
            firstTabOpen={firstTabOpen}
            secondTabOpen={secondTabOpen}
          />
        </div>
      </div>

      <Modal show={showModal} onHide={handlePopupCancel} size="xl">
        <Modal.Header style={{ background: '#D9D9D9', textAlign: 'center' }}>
          <Modal.Title style={{ margin: '0 auto' }} >Add Audio File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PopupUi onSubmit={handlePopupSubmit} onCancel={handlePopupCancel} updateData={fetchData}/>
        </Modal.Body>

      </Modal>

    </MsalAuthenticationTemplate>
  );
};

export default AudioFile;
