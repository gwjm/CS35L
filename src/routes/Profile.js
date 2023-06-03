import AuthContext from "../contexts/AuthProvider.js";
import { showErrorDialog } from '../components/ErrorDialog';
import useFetch from '../hooks/useFetch';
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";

// Libraries
import axios from 'axios';
import React, { useContext, useState, useEffect } from "react";

// AntD
import { Typography, Form, Select, Button, Card, theme , ConfigProvider } from 'antd';
import { useRouteLoaderData } from "react-router-dom";
const { Title, Text } = Typography;
const { Option } = Select;



function Profile() {
    const currentTheme = useTheme();
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const { auth } = useContext(AuthContext);
    const [members, setMembers] = useState([]);
    const [user, setUser] = useState([]);


    const onFinish = async values => {
        console.log('Values:', values.users);
        try {
            if (!Array.isArray(user.friends)) {
                user.friends = []; // Initialize as an empty array
              }
            user.friends.push(values.users);
            const data = { ...user};
            console.log(data)
            await axios.patch(`http://localhost:3001/api/users/${user._id}`, data);
            console.log('User created successfully');
            fetchUser();
            fetchMembers();
            
        } catch (error) {
            console.error(error);
        }
    }

    const onFinishFailed = errorInfo => {
        showErrorDialog('Failed to add friend');
    }

    const fetchMembers = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/users/`);
          const parsedMembers = response.data.filter(member => member.username !== user.username);
          const friendsOfUser = user.friends
          setMembers(parsedMembers);
        } catch (error) {
          console.error(error);
        }
      };

    const fetchUser = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/api/users/findusername/${auth.user1}`)
        setUser(response.data);
    } catch (error) {
        console.error(error);
    }
    };
    
    useEffect(() => {
        fetchUser();
        fetchMembers(); // Call fetchMembers when the component is mounted
    }, []); // The empty dependency array [] ensures that the effect runs only once on component mount
    

    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
            }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card style={{ width: 400 }}>
                    <Title level={1}>My Profile</Title>
                    <div>
                        <Text>Username: {user ? user.username : ''}</Text>
                        <Text>Email: {user ? user.email : ''}</Text>
                    </div>
                    <div className="search">
                        <Text>Add Friends (because you don't have any in real life :D)</Text>
                        <div>
                            <Form
                                name="basic"
                                wrapperCol={{ span: 16 }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    name="users"
                                    rules={[{ required: true, message: 'Please select a user to friend!' }]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Find friends"
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                    >
                                        {/* options={members} */}
                                        {members.map(member => (
                                            <Option key={member._id} value={member._id}>
                                              {member.username}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Card>
            </div>
        </ConfigProvider>
    );
};
export default Profile;