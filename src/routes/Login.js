import { useEffect, useContext , useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input , Card , ConfigProvider , theme , Alert} from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import { UserOutlined , KeyOutlined } from '@ant-design/icons';

import AuthContext from "../contexts/AuthProvider.js";
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";
const { defaultAlgorithm, darkAlgorithm } = theme;

//const LOGIN_URL = '/auth'

const Login = () => {
  const currentTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const { auth, setAuth } = useContext(AuthContext);
  const [error, setError] = useState();
  const navigate = useNavigate();
  // const userRef = useRef();
  // const errRef = useRef();

  // const [user, setUser] = useState('');
  // const [pwd, setPwd] = useState('');

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

  useEffect(() => {
    if (auth) {
      console.log(auth);
      localStorage.setItem("token", JSON.stringify(auth));
    }
  }, [auth]);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    const user = {
      username: values['username'],
      email: values['username'],
      password: values['password']
    }

    console.log(user)

    axios.post('http://localhost:3001/api/users/createUser', user).then(console.log('Added User'));
  };

  const onFinishCreate = (values) => {
    console.log('Create User:', values);
    // Logic for user creation
  };

  //Logic for user login
  const onFinishLogin = (values) => {
    console.log('Login:', values);
    axios.get('http://localhost:3001/api/users/')
      .then(response => {
        if (response.data.length > 0) {
          let users = response.data.map(user => user.username)
          let passes = response.data.map(user => user.password)

          for (var i = 0; i < users.length; i++) {
            if (values.username === users[i]) {
              if (values.password === passes[i]) {
                //LOGIN SUCCESSFUL LOGIC HERE
                console.log('Login Successful')
                const user1 = values.username;
                const password1 = values.password;
                setAuth({ user1, password1 });
                //set logged in state so navbar shows correct things
                //localStorage.setItem("token", JSON.stringify(auth));
                window.localStorage.setItem("isLoggedIn", true);
                //successful login redirect to dashboard
                navigate("/dashboard");

                //setUser('');
                //setPwd('');
                break;
              }
              else { console.log('Incorrect Password'); setError('Incorrect password'); break; }
            }
            else if (i === users.length - 1) {
              console.log('User not found');
              setError('User not found');
            }
          }
        }
      })
  };

  const onClose = () => {
    setError(null);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ConfigProvider
      theme={{
       algorithm: currentTheme === "dark" ? darkAlgorithm : defaultAlgorithm,
      }}>
    <Card title="Login" style={{ width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}> 
      {console.log(error)}
      {error ? <Alert
        //message="Error Text"
        description={error}
        type="error"
        closable
        onClose={onClose}
      /> : null}

      <Form name="loginForm" onFinish={onFinishLogin} layout="vertical">
        <Form.Item label="Username" name="username" rules={[{ required: true, message: `Eease enter your username`}]}>
          <Input placeholder="default size" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password placeholder="default size" prefix={<KeyOutlined />}/>  
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Login</Button>
          &ensp;Or&nbsp;
          <Link to="/UserCreation">
            Register Now!
          </Link>

        </Form.Item>
      </Form>
    </Card>
    </ConfigProvider>
    </div>
  );
};

export default Login;
