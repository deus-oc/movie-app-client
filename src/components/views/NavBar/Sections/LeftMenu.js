import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="default">
        <a href="/">Popular</a>
      </Menu.Item>
      <Menu.Item key="latest">
        <a href="/discover/latest">Latest</a>
      </Menu.Item>
      <Menu.Item key="favourites">
        <a href="/discover/favourites">Favourites</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu