import React, { Component } from 'react';

import { Col, Layout, Row, Typography } from 'antd';

import Loader from '../../components/Loader';

import { withAxios } from '../../container/Authenticated';
import { fetchUser } from '../../ws/BalanceAPI';

class Settings extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: null  
    }
  }

  componentDidMount () {
    fetchUser(this.props.axios, response => {
      if (response) {
        const { data } = response;
        this.setState({user: data});
      }
    });
  }

  render() {
    return (
      <>
        <Typography.Title>Settings</Typography.Title>
        <Layout.Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
          }}
        >
          <Row>
            <Col>
              <Typography.Title level={4}>User</Typography.Title>  
            </Col>
          </Row>
          <Row>
            <Col>
              <UserInfo user={this.state.user} />
            </Col>
          </Row>
        </Layout.Content>
      </>
    );
  }
}

export default withAxios(Settings);

const UserInfo = ({ user }) => {
  if (user) {
    return (
      <Row>
        <Col span={12}>Name: </Col>
        <Col span={24}>{user.name}</Col>
      </Row>
    )
  } else {
    return (<Loader />)
  }
}

