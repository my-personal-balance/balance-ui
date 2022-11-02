import { useEffect, useState } from 'react';

import { Col, Descriptions, Layout, Row, Typography } from 'antd';

import { withAxios } from '../../container/Authenticated';
import { fetchUser } from '../../ws/users';

const Settings = (props) => {
  
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
            <UserInfo axios={props.axios} />
          </Col>
        </Row>
      </Layout.Content>
    </>
  );
}

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
  
  const [user, setUser] = useState({});
  
  useEffect(() => {
// debugger;
    asyncFetchUser();
  }, []);

  function asyncFetchUser() {
    fetchUser(axios, response => {
      if (response) {
        const { data } = response;
        setUser(data);
      }
    });
  }

  return user;
}
