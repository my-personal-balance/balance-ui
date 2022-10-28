import { useState } from 'react';

import { Alert, Button, Checkbox, Col, Form, Input, Layout, Row } from 'antd';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { signin } from '../../ws/signin';

const { Content } = Layout;

const Login = (props) => {

  const [ errorMessage, setErrorMessage ] = useState(null);
  
  const onFinish = (values) => {
    const authURI = props.authorizationEndpoint();
    signin(props.axios, authURI, values, response => {
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
          const redirectUri = `${props.redirectUrl}?accessToken=${accessToken}`;
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

export default Login;