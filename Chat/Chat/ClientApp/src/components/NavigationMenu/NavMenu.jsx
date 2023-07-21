import React, { Component, memo, useContext, useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import {
  SettingOutlined,
  HomeOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import AuthentificatedContext from '../../contexts/AuthentificatedContext';
import axios from 'axios';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const NavMenu = () => {

  const { setUser } = useContext(AuthentificatedContext);

  const logOutHandler = async () => {
    try {
      const response = await axios.delete('api/authentification');
      setUser(null);
      console.log("LogOuted");
    } catch (error) {
      console.error(error);
    }
  }
  const items = [
    getItem('Home', '1', <NavItem><NavLink tag={Link} to="/home"><HomeOutlined /></NavLink></NavItem>),
    getItem('Settings', '2', <NavItem><NavLink tag={Link} to="/home"><SettingOutlined /></NavLink></NavItem>),
    getItem('Profile', '3', <NavItem><NavLink tag={Link} to="/prof"><ProfileOutlined /></NavLink></NavItem>),
    getItem('Log out', '4', <NavItem><NavLink tag={Link} to="/" onClick={logOutHandler}><LogoutOutlined /></NavLink></NavItem>),
  ];

  const [collapsed, setCollapsed] = useState(true);


  return (
    <>
      <div
        style={{
          width: 'fit-content',
          position: 'sticky',
          left: 0,
          top: 0
        }}
      >
        <Menu
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
          defaultSelectedKeys={['1']}
          mode="horizontal"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
    </>
  );
}

export default NavMenu;