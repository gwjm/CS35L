import React, {useState} from "react";
import { Link } from "react-router-dom"
import "./Navbar.css"

// ant designs
import {MailOutlined, SettingOutlined , AppstoreOutlined} from '@ant-design/icons';
import { Menu, Switch , Input, Button} from 'antd';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// TODO: remove this and replace with ant design
// const items = [
//   getItem('Home', 'sub1', <MailOutlined />, [
//     getItem('Option 1', '1'),
//     getItem('Option 2', '2'),
//   ]),
//   getItem('Projects', 'sub2', <AppstoreOutlined />, [
//     getItem('Option 5', '5'),
//     getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
//   ]),
//   getItem('About', 'sub4', <SettingOutlined />, [
//     getItem('Option 9', '9'),
//     getItem('Switch Dark Mode', '10', null, null, 'switch'),
//   ]),
// ];

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

  // TODO: Pass the theme state to routes and change the theme of the page, remove the old index.css file
  return (
    <Menu mode="horizontal" selectedKeys={[current]} theme={theme} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/about">About</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/projects">Projects</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/contact">Contact</Link>
      </Menu.Item>

      <Menu.Item key="5">
        <Input placeholder="Search..." onSearch={(value) => console.log(value)} style={{width: 300, 
        backgroundColor: theme === 'dark' ? '#fff' : '#fff',
        color: theme === 'dark' ? '#fff' : '#fff',
        border: theme === 'dark' ? 'none' : '1px solid #ccc'}} />

        <Button type="primary" style={{
        backgroundColor: theme === 'dark' ? '#4096ff' : '#69b1ff',
        color: theme === 'dark' ? '#fff' : '#fff',
        border: theme === 'dark' ? 'none' : '1px solid #ccc'}}>Search</Button>
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