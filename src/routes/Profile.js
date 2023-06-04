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


    const onFinish = async values => {
        console.log("onfinish")
        console.log('Values:', values.users);
        let usernames = new Set(user.friends.map(friend => friend._id));

        try {
            if (!Array.isArray(user.friends)) {
                user.friends = []; // Initialize as an empty array
            }
            user.friends.push(values.users);
            const data = { ...user};
            console.log(data)

            for (let i = 0; i<data.friends.length; i++) {

                if (data.friends[i] === user._id) {
                    console.log("Can't friend youself")
                    return
                }

                if (data.friends[i] === values.users) {
                    console.log('Already friends')
                    return
                }

            }

            message.success('Friend added successfully'); // Show success message
            fetchUser();
            fetchMembers();

        } catch (error) {
            console.error(error);
            message.error('Failed to add friends'); // Show error message
        }
    }

    const onFinishFailed = errorInfo => {
        console.error('Failed:', errorInfo);
        message.error('Failed to add friend'); // Show error message
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
            if (!Array.isArray(user.friends)) {
                user.friends = []; // Initialize as an empty array
            }
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
        return user.friends.some((friend) => friend._id === memberId);
      };
    return (
        <ConfigProvider theme={{algorithm: currentTheme === "dark" ? darkAlgorithm : defaultAlgorithm}}>
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
                                                <Option key={member._id} value={member._id} disabled={isFriend(member._id)} >
                                                    <Tag color={isFriend(member._id) ? 'gold' : "green"}>{member.username}</Tag>
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
                            dataSource={user.friends}
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