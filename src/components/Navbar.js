import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom"
import "./Navbar.css"

// ant designs
import {MailOutlined, SettingOutlined , AppstoreOutlined} from '@ant-design/icons';
import { Menu, Switch, Input} from 'antd';

function NavBar() {
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const location = useLocation();

  const getCurrentPageKey = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'home';
      case '/about':
        return 'about';
      case '/contact':
        return 'contact';
      case '/projects':
        return 'projects';
      default:
        return '';
    }
  };
  const selectedKey = getCurrentPageKey();
  
  // TODO: Pass the theme state to routes and change the theme of the page, remove the old index.css file
  return (
    <Menu mode="horizontal" selectedKeys={[selectedKey]} theme={theme} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link to="/about">About</Link>
      </Menu.Item>
      <Menu.Item key="projects">
        <Link to="/projects">Projects</Link>
      </Menu.Item>
      <Menu.Item key="contact">
        <Link to="/contact">Contact</Link>
      </Menu.Item>

      <Menu.Item key="5">
        <Input.Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        onSearch={(value) => console.log(value)}
        style={{ width: 300 , marginTop: 8}} // TODO: fix this, the search bar is not aligned horizontally with other navbar items
        />
      </Menu.Item>

      <Menu.Item key="6" style={{ float: 'right' }}>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      </Menu.Item>
    </Menu>
  );
}

// TODO: remove this and replace with ant design, this is the old navbar
// function NavBar() {
//   const { Search } = Input;
//   const [click , setClick] = useState(false);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false)
//   return (
//     <>
//     <IconContext.Provider value={{color : "#fff"}}>
//     <nav className="navbar">
//       <div className="navbar-container container">
//         <Link to="/" className="navbar-logo" >
//           <BiBookOpen className="navbar-icon" onClick={closeMobileMenu} />
//           ProjectHub
//         </Link>
//         <div className="menu-icon" onClick={handleClick}>
//           {click ? <FaTimes /> : <FaBars />}
//         </div>
        
//         <ul className={click ? "nav-menu active" : "nav-menu"}>
//           {createNavElement("/", (<HomeOutlined /> ), closeMobileMenu)}
//           {createNavElement("/projects", "Projects", closeMobileMenu)}
//           {createNavElement("/contact", "Contact", closeMobileMenu)}
//           {createNavElement("/about", "About", closeMobileMenu)}
//           <li className="search-bar">
//             <Search placeholder="input search text" onSearch={(value) => console.log(value)} style={{ width:300 }} enterButton />
//           </li>
//         </ul>
//       </div>
//     </nav>
//     </IconContext.Provider>
//     </>
//   )
// }

// const createNavElement = (pathTo, label, clickAction) => {
//   return (<li className="nav-item">
//     <NavLink 
//       to={pathTo}
//       className={({ isActive }) => 
//         "nav-links" + (isActive ? " activated" : "")
//         }
//       onClick={clickAction}
//       >
//         {label}
//     </NavLink>
//   </li>
//   );
// }


export default NavBar;