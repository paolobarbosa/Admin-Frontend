import { useContext } from "react";
import Button from "react-bootstrap/Button";
import useRoutes from "../hooks/useRoutes";
import SidebarItems from "./SidebarItems";
import { useMsal } from "@azure/msal-react";
import useSession from "../hooks/useSession";
import { 
  DataContext,
  CurrentInstance,
  CurrentAuth,
} from "../App";
import "../styles/sidebar.css";
import Ellipse1 from "../image/Ellipse1.svg"


const Sidebar = () => {

  // const { currentAuth, instance } = useSession();
  const { instance } = useMsal();
  const currentAuth = useContext(CurrentAuth);
  const currentInstance = useContext(CurrentInstance);

  const sidebar = currentAuth ? true : false;

  const data = useContext(DataContext);

  const routes = useRoutes();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return sidebar ? (
    <div style={{ fontFamily: 'Roboto, sans-serif' }} className="sidebar">
      <nav className="sidebar-nav">
        <div className="sidebar-userinfo">
        <img
        src={Ellipse1}
        alt="User"
        width="60px"
        height="60px"
        style={{ borderRadius: '50%' }}
    />
          <div className="sidebar-username-role">
            <div className="sidebar-username">
              {currentInstance.name ? currentInstance.name : "Fetching user information..."}
            </div>
            <div>
              {Object.keys(data).length != 0 ? data.signInData.roleName : "Fetching user role..."}
            </div>
          </div>
        </div>

        <ul className="sidebar-nav-ul">
          {Object.keys(data).length != 0 ? (
            Object.keys(data.moduleData["Countries"]).length != 0 ? (
              routes.map((item) => (
                <SidebarItems
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={item.active}
                  children={item.children}
                  data={data}
                />          
            ))
              
            ) : (
              routes
                .filter((item, index) => index !== 3 )
                .map((item) => (
                  <SidebarItems
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    active={item.active}
                    children={item.children}
                    data={data}
                  />          
              ))
            )
            
          ) : (<div>Loading Navbar</div>)}


        </ul>
        <Button variant="primary" type="submit" onClick={handleLogout}>
          Logout
        </Button>
      </nav>
    </div>
  ) : null;
};

export default Sidebar;
