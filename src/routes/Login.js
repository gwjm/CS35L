import React, { useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';

const Login = () => {

  // constructor(props) {
  //   super(props);
  
  //   this.onChangeUsername = this.onChangeUsername.bind(this);
  //   this.onChangePassword = this.onChangePassword.bind(this);
  //   //this.onFinish = this.onFinish.bind(this)
  
  //   this.state = {
  //     username: '',
  //     password: ''
  //   };
  // };

  // onChangeUsername(e) {
  //   this.setState({ username: e.target.value});
  // };

  //   onChangePassword() {
  //     this.setState({ password: e.target.value});
  // };
      

  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    const user = {
      username: values['username'],
      email: values['username'],
      password: values['password']
    }

    console.log(user)

      axios.post('http://localhost:3001/api/users/createUser', user).then(rest => console.log('Added User'));
  };


  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default Login;
