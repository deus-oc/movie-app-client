import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="default">
        <Link to={"/"}>Popular</Link>
      </Menu.Item>
      <Menu.Item key="latest">
        <Link to={"/discover/latest"}>Latest</Link>
      </Menu.Item>
      <Menu.Item key="favourites">
        <Link to={"/discover/favourites"}>Favourites</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu