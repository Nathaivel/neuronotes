import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavCollapse from "../assets/nav-collapse.svg?react";
import HomeIcon from "../assets/home.svg?react";
import NotesIcon from "../assets/notes.svg?react";
import StatIcon from "../assets/statistics.svg?react";
import SettingsIcon from "../assets/settings.svg?react";
import CreateIcon from "../assets/create.svg?react";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  function navCollapse() {
    setCollapsed(!collapsed);
  }

  useEffect(() => {
    if (location.pathname.startsWith("/note/")) {
      setCollapsed(true);
    }
  }, [location.pathname]);

  return (
    <>
      <nav className={collapsed ? "collapsed" : ""}>
        <div className="nav-top">
          <button className="sidebar-collapse" onClick={navCollapse}>
            <NavCollapse />
          </button>
          <div className="nav-logo">
            <h3>
              {collapsed ? "N" : "Neuro"}
              <span className="logo-secondary">
                {collapsed ? "N" : "Notes"}
              </span>
            </h3>
          </div>
        </div>

        <ul>
          <li>
            <NavLink to="/">
              <button>
                <HomeIcon />
                <span className={collapsed ? "collapsed-hide" : ""}>Home</span>
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/notes">
              <button>
                <NotesIcon />
                <span className={collapsed ? "collapsed-hide" : ""}>Notes</span>
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">
              <button>
                <StatIcon />
                <span className={collapsed ? "collapsed-hide" : ""}>
                  Statistics
                </span>
              </button>
            </NavLink>
          </li>
        </ul>

        <div className="navsettings">
          <button>
            <SettingsIcon />
            <span className={collapsed ? "collapsed-hide" : ""}>Settings</span>
          </button>
        </div>
      </nav>
    </>
  );
  /*
  return (
    <div className="flex sticky top-0 left-0 gap-1.5  bg-dark-soft  text-white backdrop-blur-2xl w-full py-5 px-2.5 shadow-2xl justify-between mb-5 ">
      <div className="flex space-x-2">
        <h3 className="text-md font-black sm:text-sm ">
          <NavLink to="/">Neuronotes</a>
        </h3>
      </div>

      <div className="justify-between space-x-2 ">
        <NavLink to="/">Notes</a>
        <NavLink to="/review">Review</a>
        <NavLink to="/dashboard">Dashboard</a>
      </div>
    </div>
    );  */
}

export function CreateButton() {
  return (
    <div>
      <Link
        to="/note/"
        className="flex shadow-[4px_0_12px_rgba(0,0,0,0.247)] fixed bottom-10 right-10  justify-end  items-center  dark:text-dark-accent rounded-sm text-[#C1F6FF] hover:text-[#abd4db] active:scale-93 z-2"
      >
        <CreateIcon />
      </Link>
    </div>
  );
}
