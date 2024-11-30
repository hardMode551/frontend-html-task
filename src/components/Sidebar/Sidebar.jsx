import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import logo from "../../assets/logo.png";
import userAvatar from "../../assets/user-avatar.avif";

const routes = [
  { title: "Dashboard", icon: "fas-solid fa-tachometer-alt", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

const Container = styled.div`
  width: ${({ isOpened }) => (isOpened ? "250px" : "80px")};
  height: 100%; /* Занимает всю высоту родителя */
  min-height: 98vh; /* Минимум высота на весь экран */

  background-color: ${({ theme }) => theme.colors.sidebarBackground};
  color: ${({ theme }) => theme.colors.text};

  transition: all 0.3s ease-in-out;

  display: flex;
  flex-direction: column;

  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  .sidebar-header {
    position: relative;

    display: flex;
    align-items: center;

    padding: 1.5rem;

    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    .sidebar-logo {
      width: 42px;
      height: 42px;

      margin-right: ${({ isOpened }) => (isOpened ? "1rem" : "0")};

      transition: margin-right 0.3s ease-in-out;
    }

    .sidebar-title {
      font-size: 1.25rem;
      font-weight: 600;

      white-space: nowrap;

      color: ${({ theme }) => theme.colors.logo};

      opacity: ${({ isOpened }) => (isOpened ? "1" : "0")};
      transition: opacity 0.3s ease-in-out;
    }

    .sidebar-toggle {
      position: absolute;
      top: 25%;
      right: ${({ isOpened }) => (isOpened ? "-15px" : "-40px")};

      padding: 0.5rem;

      border-radius: 1.25rem;

      background-color: ${({ theme }) => theme.colors.buttonBackground};
      color: ${({ theme }) => theme.colors.text};

      transition: background-color 0.3s ease-in-out, right 0.3s ease-in-out;

      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.colors.buttonHover};

        span {
          opacity: 1;
          pointer-events: auto;
        }
      }

      span {
        position: absolute;
        top: 50%;
        left: 70px;
        transform: translate(-50%, -50%);

        font-weight: 700;
        letter-spacing: 2px;

        color: ${({ theme }) => theme.colors.shrink};

        text-transform: uppercase;

        pointer-events: none;

        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
    }
  }

  .sidebar-bottom-routes {
    margin-top: auto;
  }

  .sidebar-bottom-routes,
  .sidebar-routes {
    display: flex;
    flex-direction: column;

    .sidebar-route-item {
      display: flex;
      align-items: center;
      justify-content: ${({ isOpened }) =>
        isOpened ? "flex-start" : "center"};

      padding: 1rem 2rem;

      border-radius: 1.5rem;

      transition: justify-content 0.3s ease-in-out;

      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.colors.sidebarHover};

        .sidebar-tooltip {
          opacity: 1;
          pointer-events: auto;
        }
      }

      &.active {
        background-color: ${({ theme }) => theme.colors.sidebarActive};
        color: ${({ theme }) => theme.colors.textActive};
      }

      svg {
        ${({ isOpened }) =>
          isOpened
            ? {
                position: "none",
              }
            : {
                position: "absolute",
                left: "40px",
                transition: "left 0.3s ease-in-out",
              }}

        width: 1.25rem;
        height: 1.25rem;

        margin-right: ${({ isOpened }) => (isOpened ? "1rem" : "0")};

        transition: margin-right 0.3s ease-in-out;
      }

      .route-title {
        font-size: 1rem;
        font-weight: 500;

        opacity: ${({ isOpened }) => (isOpened ? "1" : "0")};

        transition: opacity 0.3s ease-in-out;
      }

      .sidebar-tooltip {
        background-color: ${({ theme }) => theme.colors.sidebarTooltipBackground};
        color: ${({ theme }) => theme.colors.sidebarTooltipText};

        padding: 0.5rem 1rem;

        border-radius: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        margin-left: 60px;

        white-space: nowrap;
        font-size: 0.9rem;
        font-weight: 700;

        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out;
      }
    }
  }
`;

const UserMenu = styled.div`
  position: relative;

  justify-content: flex-end;

  cursor: pointer;

  margin-top: 30px;
`;

const UserBlock = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2.5rem 0.7rem;

  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background-color: ${({ theme }) => theme.colors.sidebarHover};

    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.sidebarActive};
    color: ${({ theme }) => theme.colors.textActive};
  }

  .user-logo-primary {
    display: flex;
    align-items: center;

    padding-right: 20px;

    .user-info-primary {
      width: 100px;
    }

    p {
      padding: 0;
      margin: 0;

      font-size: 0.9rem;

      color: ${({ theme }) => theme.colors.additionalText};

      opacity: ${({ isOpened }) => (isOpened ? "1" : "0")};
      transition: opacity 0.1s ease-in-out;
    }
  }

  img {
    width: 50px;
    height: 50px;

    border-radius: 20%;
  }

  span {
    font-size: 1.5rem;
    font-weight: 500;

    color: ${({ theme }) => theme.colors.logo};

    opacity: ${({ isOpened }) => (isOpened ? "1" : "0")};
    transition: opacity 0.1s ease-in-out;
  }

  svg {
    padding: 0.5rem;

    background-color: ${({ theme }) => theme.colors.sidebarHover};

    border-radius: 0.5rem;

    opacity: ${({ isOpened }) => (isOpened ? "1" : "0")};
    transition: opacity 0.3s ease-in-out;
  }
`;

const SideMenuUser = styled.div`
  .user-logo {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.5rem;

    padding: 1rem;
    margin-bottom: 1rem;

    img {
      width: 50px;
      height: 50px;

      border-radius: 20%;
    }

    .user-info {
      margin-left: 1rem;

      h2 {
        padding: 0;
        margin: 0;

        font-size: 1.3rem;
        font-weight: 700;

        color: ${({ theme }) => theme.colors.logo};
      }

      p {
        font-size: 0.9rem;
        font-weight: 500;

        color: ${({ theme }) => theme.colors.additionalText};

        padding: 0;
        margin: 0;
      }
    }
  }

  ul {
    position: absolute;
    left: 104%;
    bottom: -15px;

    width: 245px;

    background-color: ${({ theme }) => theme.colors.sidebarBackground};

    border-radius: 0.5rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    list-style-type: none;

    padding: 0;

    opacity: ${({ isOpenedMenu }) => (isOpenedMenu ? "0" : "1")};
    transition: opacity 0.3s ease-in-out;

    .user-menu-list{
      position: relative;

      padding: 1rem 0 1rem 0;


      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        background-color: ${({ theme }) => theme.colors.border}; /* Цвет бордера */
      }

      &::before {
        top: 0; /* Верхний бордер */
        height: 1px; /* Толщина бордера */
      }

      &::after {
        bottom: 0; /* Нижний бордер */
        height: 1px; /* Толщина бордера */
      }
    }
  }

  li {
    padding: 0.5rem 1rem;

    transition: background-color 0.3s ease-in-out;

    font-weight: 600;

    color: ${({ theme }) => theme.colors.text};

    border-radius: 0.5rem;

    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.sidebarHover};
    }

    &.active {
      background-color: ${({ theme }) => theme.colors.sidebarActive};
      color: ${({ theme }) => theme.colors.textActive};
    }
  }

  .logout {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 1rem;

    svg {
      margin-right: 0.5rem;
    }
  }

  .version {
    font-size: 0.75rem;

    color: ${({ theme }) => theme.colors.additionalText};

    a {
      color: ${({ theme }) => theme.colors.additionalText};   
    }
  }
`;

const themes = {
  light: {
    colors: {
      sidebarBackground: "var(--color-sidebar-background-light-default)",
      sidebarHover: "var(--color-sidebar-background-light-hover)",
      sidebarActive: "var(--color-sidebar-background-light-active)",
      text: "var(--color-text-light-default)",
      textActive: "var(--color-text-light-active)",
      logo: "var(--color-text-logo-light-default)",
      border: "var(--color-border-light-default)",
      buttonBackground: "var(--color-button-background-light-default)",
      buttonHover: "var(--color-button-background-light-active)",
      sidebarTooltipText: "var(--color-sidebar-tooltip-light-text)",
      sidebarTooltipBackground: "var(--color-sidebar-tooltip-light-background)",
      shrink: "var(--color-shrink-light-active)",
      additionalText: "var(--color-additional-text-light)",
    },
  },
  dark: {
    colors: {
      sidebarBackground: "var(--color-sidebar-background-dark-default)",
      sidebarHover: "var(--color-sidebar-background-dark-hover)",
      sidebarActive: "var(--color-sidebar-background-dark-active)",
      text: "var(--color-text-dark-default)",
      textActive: "var(--color-text-dark-active)",
      logo: "var(--color-text-logo-dark-default)",
      border: "var(--color-border-dark-default)",
      buttonBackground: "var(--color-button-background-dark-default)",
      buttonHover: "var(--color-button-background-dark-active)",
      sidebarTooltipText: "var(--color-sidebar-tooltip-dark-text)",
      sidebarTooltipBackground: "var(--color-sidebar-tooltip-dark-background)",
      shrink: "var(--color-shrink-dark-active)",
      additionalText: "var(--color-additional-text-dark)",
    },
  },
};

const Sidebar = ({ color = "light" }) => {
  const [isOpened, setIsOpened] = useState(true);
  const [isOpenedMenu, setIsOpenedMenu] = useState(true);

  const theme = themes[color];

  const toggleSidebar = () => setIsOpened((prev) => !prev);
  const toggleUserMenu = () => setIsOpenedMenu((prev) => !prev);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu")) {
        setIsOpenedMenu(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container isOpened={isOpened} theme={theme} className="sidebar-container">
      <div className="sidebar-header">
        <img src={logo} alt="TensorFlow logo" className="sidebar-logo" />
        <span className="sidebar-title">TensorFlow</span>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isOpened ? "angle-left" : "angle-right"}/>
          <span>Shrink</span>
        </div>
      </div>
      <div className="sidebar-routes">
        {routes.map((route) => (
          <div
            key={route.title}
            className="sidebar-route-item"
            onClick={() => console.log(`Go to ${route.path}`)}
          >
            <FontAwesomeIcon icon={route.icon} />
            <span className="route-title">{route.title}</span>
            {!isOpened && (
              <span className="sidebar-tooltip">{route.title}</span>
            )}
          </div>
        ))}
      </div>
      <div className="sidebar-bottom-routes">
        {bottomRoutes.map((route) => (
          <div
            key={route.title}
            className="sidebar-route-item"
            onClick={() => console.log(`Go to ${route.path}`)}
          >
            <FontAwesomeIcon icon={route.icon} />
            <span className="route-title">{route.title}</span>
            {!isOpened && (
              <span className="sidebar-tooltip">{route.title}</span>
            )}
          </div>
        ))}
      </div>
      <UserMenu isOpenedMenu={isOpenedMenu} className="user-menu" theme={theme}>
        <UserBlock
          onClick={toggleUserMenu}
          isOpened={isOpened}
          theme={theme}
          className="user-block"
        >
          <img src={userAvatar} alt="userLogo" className="user-image" />
          <div className="user-logo-primary">
            <div className="user-info-primary">
              <p>user account</p>
              <span>Mark T.</span>
            </div>
          </div>
          <FontAwesomeIcon icon="fa-solid fa-bars" />
        </UserBlock>
        <SideMenuUser isOpenedMenu={isOpenedMenu} theme={theme}>
          <ul>
            <div className="user-logo">
              <img src={userAvatar} alt="userLogo" />
              <div className="user-info">
                <h2>Mark Talbierz</h2>
                <p>hello@Mark_T</p>
              </div>
            </div>
            <div className="user-menu-list">
              <li onClick={() => console.log("/view profile")}>View Profile</li>
              <li onClick={() => console.log("/manage subscriptions")}>
                Manage Subscriptions
              </li>
              <li onClick={() => console.log("/view history")}>View History</li>
            </div>
            <li onClick={() => console.log("/Logout")} className="logout">
              Logout <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
            </li>
            <li className="version">v 1.0.34 - <a href="#" onClick={() => console.log("/terms and conditions")}>Terms and Conditions</a></li>
          </ul>
        </SideMenuUser>
      </UserMenu>
    </Container>
  );
};

Sidebar.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default Sidebar;
