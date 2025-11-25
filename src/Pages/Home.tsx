import React, { useState } from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import './Home.scss'
function Home() {
  const [activeSubNavTitle, setActiveSubNavTitle] =
    useState<string>("Overview");
      const [isCollapsed, setIsCollapsed] = useState(false); // lift state;

  return (
  <div className={`home-layout ${isCollapsed ? "collapsed" : ""}`}>
   
      <Sidebar
        setActiveSubNavTitle={setActiveSubNavTitle}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
         <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
