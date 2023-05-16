import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom"
import "./Navbar.css"
// ant designs
import Icon, {ContactsOutlined, HomeOutlined , BranchesOutlined , CoffeeOutlined} from '@ant-design/icons';
import { Menu, Switch, Input } from 'antd';

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
  const PandaIcon = (props) => <Icon component={PandaSvg} {...props} />;

  // TODO: Pass the theme state to routes and change the theme of the page, remove the old index.css file
  return (
    <Menu mode="horizontal" selectedKeys={[selectedKey]} theme={theme} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Menu.Item key="logo" style={{ fontWeight: 'bold' }}>
      <Link to="/">{<PandaIcon
        style={{
          fontSize: '32px',
          verticalAlign: 'middle',
        }}
      />} My Website</Link>
      </Menu.Item>

      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="projects" icon={<BranchesOutlined />}>
        <Link to="/projects">Projects</Link>
      </Menu.Item>
      <Menu.Item key="contact" icon={<ContactsOutlined />}>
        <Link to="/contact">Contact</Link>
      </Menu.Item>
      <Menu.Item key="about" icon={<CoffeeOutlined />}>
        <Link to="/about">About</Link>
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

const PandaSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path
      d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
      fill="#6B676E"
    />
    <path
      d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
      fill="#FFEBD2"
    />
    <path
      d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
      fill="#E9D7C3"
    />
    <path
      d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
      fill="#FFFFFF"
    />
    <path
      d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
      fill="#6B676E"
    />
    <path
      d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
      fill="#464655"
    />
    <path
      d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
    />
    <path
      d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
    />
  </svg>
);

export default NavBar;