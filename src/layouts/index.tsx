import React, { Component } from 'react';
import styles from './index.less';
import { Layout , Menu } from 'antd';
import { Link } from 'alita';
import { ConnectProps } from '@/models/connect';

const { Header , Content , Footer} = Layout;
const menuData  = [
  {route : 'hero' , name : '英雄'},
  {route : 'property' , name : '局内道具'},
  {route : 'skill' , name : '召唤师技能'},
];

interface BasicLayoutProps extends ConnectProps {}

const BasicLayout : React.FC<BasicLayoutProps> = ({ children , location : {pathname}}) => {
  return (
    <Layout>
      <Header>
        <div className = {styles.logo}>王者荣耀资料库</div>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[pathname]} className = {styles.menu} >
          {menuData.map( menu => (
            <Menu.Item key={`/${menu.route}`}>
              <Link to = {menu.route}>{menu.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content className = {styles.content}>
        <div className = {styles.contentStyle}>{children}</div>
      </Content>
      <Footer className = {styles.footer} >by findway</Footer>
    </Layout>
  );
};

export default BasicLayout;
