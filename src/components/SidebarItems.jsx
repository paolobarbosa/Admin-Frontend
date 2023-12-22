import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/sidebar.css";

const SidebarItems = ({ label, icon, href, children, active, data }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {children ? (
        <div
          id={`sidebaritem-withchildren-${label}`}
          className="sidebar-item"
          onClick={() => setOpen(!open)}
        >
          {icon && <span>{icon}</span>}
          <span>{label}</span>
          <i className={`bi ${open ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </div>
      ) : (
        <Link
          id={`sidebaritem-${label}`}
          to={href}
          className={`${active ? "sidebar-item active" : "sidebar-item"}`}
        >
          {icon && <span>{icon}</span>}
          <span>{label}</span>
        </Link>
      )}
      {open && children && (
        <ul className="children">
          {Object.keys(data).length !== 0 ? (
            Object.keys(data.moduleData["User Management"]).length > 1 ? (
              children.map((child) => (
                <SidebarItems
                  key={child.label}
                  label={child.label}
                  icon={child.icon}
                  href={child.href}
                  active={child.active}
                  children={child.children}
                />
              ))
            ) : (
              label === "User Management" ? (
                children
                  .filter((child, index) => index !== 1)
                  .map((child) => (
                    <SidebarItems
                      key={child.label}
                      label={child.label}
                      icon={child.icon}
                      href={child.href}
                      active={child.active}
                      children={child.children}
                    />
                  ))

              ) : (
                children.map((child) => (
                  <SidebarItems
                    key={child.label}
                    label={child.label}
                    icon={child.icon}
                    href={child.href}
                    active={child.active}
                    children={child.children}
                  />
                ))
              )
            )

          ) : (null)}
        </ul>
      )}
    </div>
  );
};

export default SidebarItems;
