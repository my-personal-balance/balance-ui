import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  Navigate,
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BankOutlined,
  AppstoreOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import './App.css';
import Dashboard from "./pages/dashboard";
import Accounts from "./pages/accounts";
import Account from "./pages/account";
import Insights from "./pages/insights";
import Settings from "./pages/settings";
import { Authenticated } from "./container/Authenticated";
const { Header, Sider, Content } = Layout;

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "accounts",
          element: <Accounts />,
        },
        {
          path: "accounts/:accountId",
          element: <Account />,
        },
        {
          path: "insights",
          element: <Insights />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate replace to="/" />
    },
  ]);

  return (
    <Authenticated>
      <RouterProvider router={router} />
    </Authenticated>
  );
}

function Root() {

  let [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    {
      label: (<Link to="/">Dashboard</Link>),
      key: '1',
      icon: <AppstoreOutlined />,
    },
    {
      label: (<Link to="/accounts">Accounts</Link>),
      key: '2',
      icon: <BankOutlined />,
    },
    {
      label: (<Link to="/insights">Insights</Link>),
      key: '3',
      icon: <PieChartOutlined />,
    },
    {
      label: (<Link to="/settings">Settings</Link>),
      key: '4',
      icon: <UserOutlined />,
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">Personal Balance</div>
          <Menu theme="dark" mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger', onClick: toggle,
            })}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '100vh',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
    </Layout>
  );
}

export default App;
