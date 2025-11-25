import { useEffect, useState } from "react";
import "./Sidebar.scss";
import { Col, Container, Row } from "react-bootstrap";
import { SidebarData } from "./SidebarData";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiArrowLongRight } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";

import {
  PiArrowBendDownRightLight,
  PiArrowBendDownRightThin,
} from "react-icons/pi";
import Logo from "../../Assets/Logos/Logo.png"
import styled from "styled-components";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";

interface SubNavItem {
  title: string;
  path: string;
}

interface NavItem {
  title: string;
  path: string;
  icon: string;
  activeIcon: string;
  subNav: SubNavItem[];
}

interface SidebarProps {
 setActiveSubNavTitle: (title: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

function Sidebar({ setActiveSubNavTitle, isCollapsed, setIsCollapsed }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState<number | null>(0);
  const [activeSubNav, setActiveSubNav] = useState<number | null>(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    const foundNavIndex = SidebarData.findIndex((item) =>
      currentPath.startsWith(item.path)
    );

    if (foundNavIndex !== -1) {
      setActiveNav(foundNavIndex);
      const subNavIndex = SidebarData[foundNavIndex].subNav.findIndex(
        (subItem) => currentPath.startsWith(subItem.path)
      );
      setActiveSubNav(subNavIndex !== -1 ? subNavIndex : null);
      setActiveSubNavTitle(
        subNavIndex !== -1
          ? SidebarData[foundNavIndex].subNav[subNavIndex].title
          : "Overview"
      );
    } else {
      setActiveNav(null);
      setActiveSubNav(null);
    }
  }, [location.pathname]);

  const toggleSubNav = (index: number, path: string, subNavLength: number) => {
    navigate(path);
    setActiveNav(index);
    setActiveSubNav(0);
  };

  const setActiveSubNavItem = (
    navIndex: number,
    subNavIndex: number,
    path: string,
    title: string
  ) => {
    navigate(path);
    setActiveNav(navIndex);
    setActiveSubNav(subNavIndex);
    setActiveSubNavTitle(title);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <Container className="sidebar-container h-100">
        <Row className={`icon-container`}>
          <Col xs={12} >
            <img
              src={Logo}
              alt="iesca Icon"
              className="hrms-icon"
            />
          </Col>
          <Col xs={12} className="d-flex align-items-center  justify-content-end">
            <div
              className="collapse-icon" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{ cursor: "pointer" }}
            >
              {isCollapsed ? (
                <LuArrowRightToLine size={18} color="#000000" />
              ) : (
                <LuArrowLeftToLine size={18} color="#000000"  />
              )}
            </div>
          </Col>
        </Row>

        <SidebarItemWrapper className="d-flex flex-column gap-4">
          {SidebarData.map((item: NavItem, index: number) => (
            <div key={index}>
              <Row
                className={`${
                  activeNav === index ? "activemenu" : ""
                } d-flex align-items-center`}
                onClick={() =>
                  toggleSubNav(index, item.path, item.subNav.length)
                }
              >
                <Col xs={2}>
                  <img
                    src={activeNav === index ? item.activeIcon : item.icon}
                    alt={item.title}
                  />
                </Col>
                {!isCollapsed && <Col xs={10}>{item.title}</Col>}
              </Row>

              {!isCollapsed &&
                activeNav === index &&
                item.subNav.length > 0 && (
                  <div className="submenu">
                    {item.subNav.map(
                      (subItem: SubNavItem, subIndex: number) => (
                        <Row
                          className={` ${
                            activeSubNav === subIndex ? "active" : ""
                          }`}
                          key={subIndex}
                          onClick={() =>
                            setActiveSubNavItem(
                              index,
                              subIndex,
                              subItem.path,
                              subItem.title
                            )
                          }
                        >
                          <Col xs={2}>
                            <PiArrowBendDownRightLight
                              color={
                                activeSubNav === subIndex
                                  ? "#652AE2"
                                  : "#D9D9D9"
                              }
                            />
                          </Col>
                          <Col xs={10} className="pe-0">
                            {subItem.title}
                          </Col>
                        </Row>
                      )
                    )}
                  </div>
                )}
            </div>
          ))}
        </SidebarItemWrapper>
      </Container>

      {/* <div
        className="logout-option"
        onClick={handleLogout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CurvedLine />
        <Row>
          <Col xs={2} md={2}>
            <img src={isHovered ? LogoutActiveIcon : LogoutIcon} alt="Logout" />
          </Col>
          <Col xs={10} md={10}>
            Logout
          </Col>
        </Row>
      </div> */}
    </div>
  );
}
export default Sidebar;
const CurvedLine = styled.div`
  width: 100%;
  height: 2px;
  border-radius: 99%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
  margin: 24px 0;
`;
const SidebarItemWrapper = styled.div`
 overflow-y: scroll;
 -ms-overflow-style: none;
 scrollbar-width: none;
`