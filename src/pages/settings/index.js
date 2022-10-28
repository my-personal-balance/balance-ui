import { useEffect, useState } from 'react';

import { Col, Descriptions, Layout, Row, Typography } from 'antd';

import Loader from '../../components/Loader';

import { withAxios } from '../../container/Authenticated';
import { fetchUser } from '../../ws/users';

const Settings = (props) => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    asyncFetchUser();
  }, []);

  const asyncFetchUser = () => {
    fetchUser(props.axios, response => {
      if (response) {
        const { data } = response;
        setUser(data);
      }
    });
  }

  
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
            <UserInfo user={user} />
          </Col>
        </Row>
      </Layout.Content>
    </>
  );
}

export default withAxios(Settings);

const UserInfo = ({ user }) => {
  if (user) {
    return (
      <Descriptions title="User">
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Currency">{user.currency}</Descriptions.Item>
      </Descriptions>
    )
  } else {
    return (<Loader />)
  }
}
