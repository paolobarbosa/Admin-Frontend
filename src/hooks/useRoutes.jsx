import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import GridIcon from "../hooks/icons/GridIcon.svg";
import UserPeople from "../hooks/icons/UserPeople.svg";
import CenterManagement from "../hooks/icons/CenterManagement.svg";
import Countries from "../hooks/icons/Countries.svg";
import Audio from "../hooks/icons/Audio.svg";
import Notifications from "../hooks/icons/Notifications.svg";
import Report from "../hooks/icons/Report.svg";
import Feedback from "../hooks/icons/Feedback.svg";
import ContentManagement from "../hooks/icons/ContentManagement.svg";
import '../styles/sidebar.css';

const useRoutes = () => {
  const pathname = useLocation();

  const routes = useMemo(
    () => [
      {
        label: "Dashboard",
        href: "/dashboard",
        active: pathname.pathname === "/dashboard",
        icon: (
          <img
            src={GridIcon}
            alt="Dashboard"
            id="Dashboard"
            className={pathname.pathname === "/dashboard" ? "active" : ""}
          />
        ),
      },
      {
        label: "User Management",
        href: "/usermgmt",
        icon: (
          <img
            src={UserPeople}
            alt="User Management"
            id="UserManagement" />
        ),
        children: [
          {
            label: "Instructor",
            href: "/usermgmt/instructor",
            icon: "          ",
            active: pathname.pathname === "/usermgmt/instructor",
          },
          {
            label: "Country Admin",
            href: "/usermgmt/countryadm",
            icon: "          ",
            active: pathname.pathname === "/usermgmt/countryadm",
          },
          {
            label: "New User Registration",
            href: "/usermgmt/newuser",
            icon: "         ",
            active: pathname.pathname === "/usermgmt/newuser",
          }
        ],
      },
      {
        label: "Center Management",
        href: "/centermgmt",
        active: pathname.pathname === "/centermgmt",
        icon: (
          <img
            src={CenterManagement}
            alt="CenterManagement"
            id="CenterManagement"
            className={pathname.pathname === "/centermgmt" ? "active" : ""}
          />
        ),
      },
      {
        label: "Countries",
        href: "/countries",
        active: pathname.pathname === "/countries",
        icon: (
          <img
            src={Countries}
            alt="Countries"
            id="Countries"
            className={pathname.pathname === "/countries" ? "active" : ""}
          />
        ),
      },
      {
        label: "Audio File Management",
        href: "/audiomgmt",
        icon: (
          <img
            src={Audio}
            alt="Audio"
            id="AudioFileManagement" />
        ),
        active: pathname.pathname === "/audiomgmt",
        children: [
          {
            label: "Audio File",
            href: "/audiomgmt/audiofile",
            icon: "          ",
            active: pathname.pathname === "/audiomgmt/audiofile",
          },
          {
            label: "Level Unlock Config",
            href: "/audiomgmt/lvlunlockcfg",
            icon: "          ",
            active: pathname.pathname === "/audiomgmt/lvlunlockcfg",
          },
        ],
      },
      {
        label: "Custom Notification",
        href: "/customnotif",
        active: pathname.pathname === "/customnotif",
        icon: (
          <img
            src={Notifications}
            alt="Custom Notification"
            id="CustomNotification"
            className={pathname.pathname === "/customnotif" ? "active" : ""}
          />
        ),
      },
      {
        label: "Report",
        href: "/report",
        active: pathname.pathname === "/report",
        icon: (
          <img
            src={Report}
            alt="Report"
            id="Report"
            className={pathname.pathname === "/report" ? "active" : ""}
          />
        ),
      },

      {
        label: "Feedback Received",
        href: "/feedback",
        active: pathname.pathname === "/feedback",
        icon: (
          <img
            src={Feedback}
            alt="Feedback Received"
            id="FeedbackReceived"
            className={pathname.pathname === "/feedback" ? "active" : ""}
          />
        ),
      },

      {
        label: "Content Management",
        href: "/contentmgmt",
        active: pathname.pathname === "/contentmgmt",
        icon: (
          <img
            src={ContentManagement}
            alt="Content Management"
            id="ContentManagement"
            className={pathname.pathname === "/contentmgmt" ? "active" : ""}
          />
        ),
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
