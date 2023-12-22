import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest, protectedApi } from "../authConfig";
import "../styles/dashboard.css";
import Heading from "../components/Heading";
import UiContent from "../components/UiContent";
import UIContentAudio from "../components/UIContentAudio";
import useRoutes from "../hooks/useRoutes";
import Lvlulcfg from "../data/audioFileContent/Lvlulcfg";
import UiContentHalvedAudio from "../components/UiContentHalvedAudio";
import LeftComponent from "../data/audioFileContent/bottomUI/leftComponent";
import RightComponent from "../data/audioFileContent/bottomUI/rightComponent";
import BottomContent from "../components/BottomContent";

const LvlUnlockCfg = () => {
  const routes = useRoutes();

  const authRequest = {
    ...loginRequest,
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
              label={`${routes[4].label} > ${routes[4].children[1].label}`}
            />
          </div>
          <UiContent
            children={
              <>
                <h2 className="heading">Management Level Unlock</h2>
                <Lvlulcfg />
              </>
            }
          />
          {/* <UiContent
            children={
              <>
                <UIContentAudio />
              </>}
          /> */}
          <div className="bottom-row">
            <UiContentHalvedAudio
              children={<LeftComponent />}
            />
            <UiContentHalvedAudio
              children={<RightComponent />}
            />
          </div>
          <UiContent
            children={
              <>
                <BottomContent />
              </>}
          />
        </div>
      </div>
    </MsalAuthenticationTemplate>
  );
}

export default LvlUnlockCfg;