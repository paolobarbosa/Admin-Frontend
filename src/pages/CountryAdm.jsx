import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest, protectedApi } from "../authConfig";
import "../styles/dashboard.css";
import "../styles/dashboard-content.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import useRoutes from "../hooks/useRoutes";
import Table from "../components/Table";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { Modal } from "react-bootstrap";
import PopupUi from "../data/countryAdmContent/PopupUi"
import toast from "react-hot-toast";
import useApiRequest from "../hooks/useApiRequest";

const CountryAdm = ({ addCountryAdmin }) => {

  const { makeApiRequest } = useApiRequest();

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const routes = useRoutes();
  const data = useContext(DataContext);

  const handlePopupCancel = () => {
    setShowModal(false);
  };

  const handlePopupSubmit = () => {
    setShowModal(false);
  };

  const authRequest = {
    ...loginRequest,
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
  }

  const fetchData = async () => {

    try {
      const { data } = await makeApiRequest({
        url: `${protectedApi.api.endpoint}/users/countryadmin`,
        method: "get",
      });
      setTableData(data);

    } catch (err) {
      console.log('Error fetching country admins', err);
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
                <h2 className='heading'>Country Admin</h2>
                <h6 className='subheading'>Listing</h6>
                <Table
                  id="users-countryadm-table"
                  data={tableData}
                  withLinks={false}
                  tableSelectControls={true}
                  actionVisible={true}
                  btnFunction={Object.keys(data).length != 0 ? (data.moduleData["User Management"]["Country Admin"].includes("Add Country Admin") ? addCountryAdmin : null) : (null)}
                  tblButton={Object.keys(data).length != 0 ? ("Add Country Admin") : (null)}
                  enable={enable}
                  disable={disable}
                  loading={loading}
                />
              </>}
          />
        </div>
      </div>

      <Modal show={showModal} onHide={handlePopupCancel} size="xl">
        <Modal.Header style={{ background: '#D9D9D9', textAlign: 'center' }}>
          <Modal.Title style={{ margin: '0 auto' }} >Add Country Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PopupUi updateData={fetchData} onSubmit={handlePopupSubmit} onCancel={handlePopupCancel} />
        </Modal.Body>

      </Modal>
    </MsalAuthenticationTemplate>
  );
};

export default CountryAdm;
