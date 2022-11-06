import { useEffect, useState } from 'react';

import { Col, Descriptions, Layout, Row, Typography } from 'antd';

import { withAxios } from '../../container/AuthProvider';
import { fetchUser } from '../../ws/users';

const Settings = ({ axios }) => (
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
          <UserInfo axios={axios} />
        </Col>
      </Row>
    </Layout.Content>
  </>
)

export default withAxios(Settings);

const UserInfo = ({ axios }) => {

  const user = useUser(axios);
  
  return (
    <Descriptions title="User">
      <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
      <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
      <Descriptions.Item label="Currency">{user.currency}</Descriptions.Item>
    </Descriptions>
  );
}

const useUser = (axios) => {

  const [user, setUser] = useState({
    name: null,
    email: null,
    currency: null,
  });
  
  useEffect(() => {
    const asyncFetchUser = () => {
      fetchUser(axios, response => {
        if (response) {
          const { data } = response;
          setUser(data);
        }
      });
    }

    asyncFetchUser();
  }, [axios]);

  return user;
}