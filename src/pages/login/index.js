import { useState } from 'react';
import { Alert, Button, Checkbox, Col, Form, Input, Layout, Row } from 'antd';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { signin } from '../../ws/signin';
import { useAuth, withAxios } from '../../container/AuthProvider';

const { Content } = Layout;

const AUTHORIZATION_QUERY_PARAMETERS = {
  redirect_uri: window.env.REACT_APP_REDIRECT_URI,
};
const AUTHORIZATION_ENDPOINT = `${window.env.REACT_APP_API_BASE_URL}/oauth2/token`;
const STATE_KEY = 'oauth2-state';

const Login = ({ axios }) => {

  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const authURI = getAuthorizationEndpoint();
  
  const onFinish = (values) => {
    signin(axios, authURI, values, response => {
      const { data, error } = response;
      if (error) {
        setErrorMessage((<Alert
          message="Authentication failed"
          description="Error while validating the given email and password."
          type="error"
          showIcon
        />));
      } else {
        const { accessToken } = data;
        if (accessToken) {
          login(accessToken);
          const redirectUri = `${AUTHORIZATION_QUERY_PARAMETERS.redirect_uri}?accessToken=${accessToken}`;
          window.location.replace(redirectUri);
        }
      }
    });
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <Layout>
      <Content>
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
          <Col span={4}>
            {errorMessage}
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="john@doe.com" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Keep me logged in</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 9 }}>
                <Button size="large" shape="round" type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default withAxios(Login);

const getAuthorizationEndpoint = () => {
  const state = getRandomString();
  sessionStorage.setItem(STATE_KEY, state);
  return getAuthorizationUrl(state);
}

const getAuthorizationUrl = (state) => {
  const params = {
    ...AUTHORIZATION_QUERY_PARAMETERS,
    state: state
  };
  const query = Object.entries(params).map(pair => pair.map(encodeURIComponent).join('=')).join('&');
  return `${AUTHORIZATION_ENDPOINT}?${query}`;
}

const getRandomString = (length = 20) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const chars = [];
  if (window.crypto) {
    const random_bytes = new Uint8Array(length);
    window.crypto.getRandomValues(random_bytes);
    for (const random_byte of random_bytes) {
      chars.push(alphabet.charAt(random_byte % alphabet.length));
    }
  } else {
    // insecure fallback used when window.crypto is not available e.g. during tests.
    for (let i = 0; i < length; i++) {
      chars.push(alphabet.charAt(Math.floor(Math.random() * Math.floor(alphabet.length))));
    }
  }
  return chars.join('');
}
