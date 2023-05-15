import React, {useState} from "react";
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import "./Navbar.css"
import {BiBookOpen} from 'react-icons/bi'
import {FaBars, FaTimes} from "react-icons/fa"
import {IconContext} from "react-icons/lib"

function NavBar() {
  const [click , setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false)
  return (
    <>
    <IconContext.Provider value={{color : "#fff"}}>
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" >
          <BiBookOpen 
          className="navbar-icon"
          onClick={closeMobileMenu} 
          />
          ProjectHub
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                "nav-links" + (isActive ? " activated" : "")
                }
              onClick={closeMobileMenu}
              >
                Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                "nav-links" + (isActive ? " activated" : "")
                }
              onClick={closeMobileMenu}
              >
                About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
    </IconContext.Provider>
    </>
  )
}

export default NavBar;