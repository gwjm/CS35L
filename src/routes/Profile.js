import AuthContext from "../contexts/AuthProvider.js";
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";

// Libraries
import axios from 'axios';
import React, { useContext, useState, useEffect } from "react";

// AntD
import { Typography, Form, Select, Button, Card, theme, ConfigProvider, message, Table, Row, Col, Tag } from 'antd';
const { Title, Text } = Typography;
const { Option } = Select;



function Profile() {
    const currentTheme = useTheme();
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const { auth } = useContext(AuthContext);
    const [members, setMembers] = useState([]);
    const [user, setUser] = useState([]);
    const [friends, setFriends] = useState([]);
    const [form] = Form.useForm();

    function removeAllOccurrences(set, element) {
        for (let item of set) {
          if (item === element) {
            set.delete(item);
          }
        }
      }

    const onFinish = async values => {
        console.log("onfinish");
        let usernames = new Set([...user.friends]);
        let newFriends = new Set([...values.users]);

        // Add all friends
        try {
            if (!Array.isArray(user.friends)) {
                user.friends = []; // Initialize as an empty array
            }

            for (const friend of members) {
                if (usernames.has(friend._id) && newFriends.has(friend._id)) {
                    message.error(`${friend.username} was removed from your friend list!`); // Show error message
                    user.friends = user.friends.filter(f => f !== friend._id);
                    let data = { ...user };
                    await axios.patch(`http://localhost:3001/api/users/${user._id}`, data);
                } else if (friend._id === user._id) {
                    message.error(`Can't add yourself as a friend`); // Show error message
                } else if (newFriends.has(friend._id)) {
                    message.success(`${friend.username} added successfully`); // Show success message
                    user.friends.push(friend._id);
                    let data = { ...user };
                    await axios.patch(`http://localhost:3001/api/users/${user._id}`, data);
                }
            }
            form.resetFields();
            fetchUser();
            fetchMembers();
        } catch (error) {
            console.error(error);
            message.error('Failed to add friends'); // Show error message
        }
    };

    const onFinishFailed = errorInfo => {
        console.error('Failed:', errorInfo);
        message.error('Failed to add friend'); // Show error message
    }

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/`);
            const parsedMembers = response.data.filter(member => member.username !== user.username);
            const friendsOfUser = user.friends;
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

    const fetchFriends = async () => {
        try {
            if (!user.friends) {
                user.friends = []
            }
            let accumulatedFriends = []; // Array to accumulate friends data
            for (let i = 0; i < user.friends.length; i++) {
                const response = await axios.get(`http://localhost:3001/api/users/find/${user.friends[i]}`);
                accumulatedFriends = accumulatedFriends.concat(response.data); // Accumulate friends data
            }
            setFriends(accumulatedFriends); // Update state with accumulated data
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser()
    }, [auth]);
    useEffect(() => {
        fetchMembers();
    }, [user]);
    useEffect(() => {
        fetchFriends();
    }, [user]);

    // Friends Columns
    const columns = [
        {
            title: "Friend Name",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        }
    ]

    const isFriend = (memberId) => {
        let usernames = new Set([...user.friends]);
        return usernames.has(memberId);
    };

    return (
        <ConfigProvider theme={{ algorithm: currentTheme === "dark" ? darkAlgorithm : defaultAlgorithm }}>
            <Card style={{ backgroundColor: "grey", height: "100vh" }}>
                <Row gutter={[12, 12]}>
                    <Col span={12}>
                        <Card>
                            <Title level={1}>My Profile</Title>
                            <div>
                                <Text>Username: {user ? user.username : ""}</Text>
                                <br />
                                <Text>Email: {user ? user.email : ""}</Text>
                            </div>
                            <div className="search">
                                <Text>Add Friends (because you don't have any in real life :D)</Text>
                                <div>
                                    <Form
                                        form={form}
                                        name="basic"
                                        wrapperCol={{ span: 16 }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                    >
                                        <Form.Item
                                            name="users"
                                            rules={[{ required: true, message: "Please select a user to friend!" }]}
                                        >
                                            <Select
                                                showSearch
                                                mode="multiple"
                                                placeholder="Find friends"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                                                }
                                            >
                                                {members.map((member) => (
                                                    <Option key={member._id} value={member._id}>
                                                        <Tag color={isFriend(member._id) ? 'red' : "green"}>{member.username}</Tag>
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
                    </Col>
                    <Col span={12}>
                        <Card style={{ width: "100%" }}>
                            <Title level={3}>My Friends:</Title>
                            <Table
                                dataSource={friends}
                                columns={columns}
                                pagination={false}
                                size="small"
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
        </ConfigProvider>
    );
};

export default Profile;