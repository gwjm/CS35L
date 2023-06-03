import AuthContext from "../contexts/AuthProvider.js";
import { showErrorDialog } from '../components/ErrorDialog';
import useFetch from '../hooks/useFetch';
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";

// Libraries
import axios from 'axios';
import React, { useContext } from "react";

// AntD
import { Typography, Form, Select, Button, Card, theme, ConfigProvider , Modal } from 'antd';
const { Title, Text } = Typography;
const { Option } = Select;

const showSuccessDialog = (message) => {
    Modal.success({
      title: 'Success',
      content: message,
      centered: true,
    });
  };

function Profile() {
    const currentTheme = useTheme();
    const { defaultAlgorithm, darkAlgorithm } = theme;

    const { auth } = useContext(AuthContext);
    const { data: usersData, loading, error } = useFetch('http://localhost:3001/api/users/');
    let currentUser;
    let filteredUsers = [];

    for (let i = 0; i < usersData.length; i++) {
        if (usersData[i].username === auth.loggedInUser) {
            currentUser = usersData[i];
        } else {
            filteredUsers.push(usersData[i]);
        }
    }

    const labeledUsers = filteredUsers.map(user => {
        return { value: user.username, label: user.username };
    });

    const handleAddFriend = async values => {
        let currentUserId = 'Unknown';

        axios.get('http://localhost:3001/api/users/')
            .then(response => {
                if (response.data.length > 0) {
                    const usernames = response.data.map(user => user.username);
                    const userIds = response.data.map(user => user._id);

                    for (let i = 0; i < usernames.length; i++) {
                        if (usernames[i] === auth.loggedInUser) {
                            currentUserId = userIds[i];
                            const newFriend = values.selectedUser;

                            axios.get(`http://localhost:3001/api/users/find/${currentUserId}`)
                                .then(response => {
                                    const currentUserData = response.data;

                                    currentUserData.friends.push(newFriend);

                                    axios.put(`http://localhost:3001/api/users/${currentUserId}`, currentUserData)
                                        .then(() => {
                                            showSuccessDialog('Friend added successfully!');
                                        })
                                        .catch(error => {
                                            console.log('Error adding friend:', error);
                                            showErrorDialog('Error adding friend');
                                        });
                                })
                                .catch(error => {
                                    console.log('Error finding user:', error);
                                    showErrorDialog('Error finding user');
                                });
                        }
                    }
                }
            })
            .catch(error => {
                console.log('Error fetching users:', error);
                showErrorDialog('Error fetching users');
            });

        console.log('Success:', values);
        showSuccessDialog('Friend added successfully!');
    }

    const handleAddFriendFailed = errorInfo => {
        showErrorDialog('Failed to add friend');
    }

    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
            }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card style={{ width: 400 }}>
                    <Title level={1}>My Profile</Title>
                    <div>
                        <Text>Username: {currentUser ? currentUser.username : ''}</Text>
                        <Text>Email: {currentUser ? currentUser.email : ''}</Text>
                    </div>
                    <div className="search">
                        <Text>Add Friends (because you don't have any in real life :D)</Text>
                        <div>
                            <Form
                                name="basic"
                                wrapperCol={{ span: 16 }}
                                onFinish={handleAddFriend}
                                onFinishFailed={handleAddFriendFailed}
                            >
                                <Form.Item
                                    name="selectedUser"
                                    rules={[{ required: true, message: 'Please select a user to add as a friend!' }]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Find friends"
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={labeledUsers}
                                    />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        Add Friend
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
