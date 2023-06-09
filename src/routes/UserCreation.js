import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card } from 'antd';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import { Link } from "react-router-dom";

import AuthContext from "../contexts/AuthProvider.js";
//const LOGIN_URL = '/auth'

const UserCreation = () => {
  const { data, loading, error } = useFetch('http://localhost:3001/api/users/');
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      // console.log(auth);
      localStorage.setItem("token", JSON.stringify(auth));
    }
  }, [auth]);

  const onFinishCreate = (values) => {
    // console.log('Create User:', values);
    const user = {
      username: values['username'],
      email: values['email'],
      password: values['password']
    }

    // console.log(user)

    axios.post('http://localhost:3001/api/users/createUser', user).then(console.log('Added User'));
    const user1 = values.username;
    const password1 = values.password;
    setAuth({ user1, password1 });
    window.localStorage.setItem("isLoggedIn", true);
    navigate("/dashboard");
  };

  const usernameNotTaken = (value) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].username === value) {
        return false;
      }
    }
    return true;
  };
  const emailNotTaken = (value) => {
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].email)
      if (data[i].email === value) {
        // console.log(data[i].email)
        return false;
      }
    }
    return true;
  };

  return (
    <Card title="Create an Account">
      <Form name="loginForm" onFinish={onFinishCreate} layout="vertical">
        <Form.Item label="Username" name="username" rules={[
          {
            required: true,
            message: 'Please enter a username',
          },
          {
            validator: (_, value) => {
              return usernameNotTaken(value)
                ? Promise.resolve()
                : Promise.reject(new Error("Username already taken"));
            }
          }
        ]}>

          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
            {
              validator: (_, value) => {
                return emailNotTaken(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error("Email already used"));
              }
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create Account</Button>
          &ensp;Or&nbsp;
          <Link to="/login">
            Login
          </Link>
        </Form.Item>
      </Form>
    </Card >
  );
};

export default UserCreation;
