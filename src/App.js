import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
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

import { Authenticated } from './container/Authenticated.js';

import Dashboard from './pages/dashboard';
import Accounts from './pages/accounts';
import Account from './pages/account';
import Insights from './pages/insights';
import Settings from './pages/settings';

import './App.css';

const { Header, Sider, Content } = Layout;

class App extends React.Component {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Authenticated>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo">Personal Balance</div>
            <Menu theme="dark" mode="inline" >
              <Menu.Item key="1" icon={<AppstoreOutlined />}>
                <a href="/">Dashboard</a>
              </Menu.Item>
              <Menu.Item key="2" icon={<BankOutlined />}>
                <a href="/accounts">Accounts</a>
              </Menu.Item>
              <Menu.Item key="3" icon={<PieChartOutlined />}>
                <a href="/insights">Insights</a>
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
                <a href="/settings">Settings</a>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: '100vh',
              }}
            >
              <Router>
                <Switch>
                  <Route path="/accounts/:accountId/transactions" render={(props) => <Account {...props} />} />
                  <Route path="/accounts" render={(props) => <Accounts {...props} />} />
                  <Route path="/insights" render={(props) => <Insights {...props} />} />
                  <Route path="/settings" render={(props) => <Settings {...props} />} />
                  <Route path="/" render={(props) => <Dashboard {...props} />} />
                  <Redirect to={{ pathname: '/' }} />
                </Switch>
              </Router>
            </Content>
          </Layout>
        </Layout>
      </Authenticated>
    );
  }
}

export default App;


