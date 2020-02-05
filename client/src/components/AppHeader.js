
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Header } = Layout;

function AppHeader() {
  let location = useLocation();

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        selectedKeys={location.pathname}
      >
        <Menu.Item key="words"><Link to="/words">All words</Link></Menu.Item>
        <Menu.Item key="map"><Link to="/map">USA heatmap</Link></Menu.Item>
        <Menu.Item key="cities"><Link to="/cities">Cities charts</Link></Menu.Item>
        <Menu.Item key="report"><Link to="/report">Word mentions charts</Link></Menu.Item>
      </Menu>
    </Header>
  );
}

export default AppHeader;