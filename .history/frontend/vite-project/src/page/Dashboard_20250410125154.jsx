// imported Dashboard UI from antdesign


import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Action from '../component/Action';
import AddTask from '../component/AddTask';
import { IoMdLogOut,IoMdAddCircle } from "react-icons/io";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const navigate = useNavigate(); 
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/login');
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            setSelectedKey(key);
            if (key === '3') handleLogout();
            else if (key === '2') navigate('/dashboard/addtask'); 
          }}
          className="h-screen color-black"
          items={[
            {
              key: '1',
              icon: <FormOutlined />,
              label: 'Task',
              onClick: () => navigate('/dashboard/task'),  
            },
            {
              key: '2',
              icon:< IoMdAddCircle /> ,
              label: 'AddTask',
            },
            {
              key: '3',
              icon:<IoMdLogOut /> ,
              label: 'Logout',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            margin: 1,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: 'black',
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 14,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/task" element={<Action />} />
            <Route path="/addtask" element={<AddTask />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
