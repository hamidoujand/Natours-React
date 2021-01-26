import React, { useState } from "react";
import { StyledSidebar } from "./Sidebar.styled";
import { NavLink, withRouter } from "react-router-dom";

const USER_MENU = [
  {
    name: "setting",
    icon: "fa fa-cog",
    sectionPath: "",
  },
  {
    name: "my bookings",
    icon: "fas fa-suitcase",
    sectionPath: "bookings",
  },
  {
    name: "my reviews",
    icon: "fas fa-star",
    sectionPath: "reviews",
  },
  {
    name: "billing",
    icon: "fas fa-shopping-cart",
    sectionPath: "billing",
  },
];
function Sidebar(props) {
  let [sidebarMobile, setSidebarMobile] = useState(false);
  let handleToggleClick = () => setSidebarMobile(!sidebarMobile);
  let renderLinks = () => {
    return USER_MENU.map((menu) => (
      <li className="sidebar-nav-item" key={menu.name}>
        <NavLink
          onClick={() => setSidebarMobile(false)}
          className="nav-link"
          to={`${props.match.path}/${menu.sectionPath}`}
        >
          <i className={menu.icon}></i> <span>{menu.name}</span>
        </NavLink>
      </li>
    ));
  };
  return (
    <StyledSidebar sidebarMobile={sidebarMobile}>
      <ul className="sidebar-nav">{renderLinks()}</ul>
      <span className="toggler" onClick={handleToggleClick}>
        +
      </span>
    </StyledSidebar>
  );
}
export default withRouter(Sidebar);
