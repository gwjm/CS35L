import React, {useState} from "react";
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import "./Navbar.css"
import {BiBookOpen} from 'react-icons/bi'
import {FaBars, FaTimes} from "react-icons/fa"
import {IconContext} from "react-icons/lib"

// ant designs
import { HomeOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const { Search } = Input;

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
          {createNavElement("/", (<HomeOutlined /> ), closeMobileMenu)}
          {createNavElement("/about", "About", closeMobileMenu)}
          <li className="search-bar">
            <Search placeholder="input search text" onSearch={(value) => console.log(value)} style={{ width:300 }} enterButton />
          </li>
        </ul>
      </div>
    </nav>
    </IconContext.Provider>
    </>
  )
}

const createNavElement = (pathTo, label, clickAction) => {
  return (<li className="nav-item">
    <NavLink 
      to={pathTo}
      className={({ isActive }) => 
        "nav-links" + (isActive ? " activated" : "")
        }
      onClick={clickAction}
      >
        {label}
    </NavLink>
  </li>
  );
}


export default NavBar;