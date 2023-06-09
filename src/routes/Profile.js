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
    const [filterValue, setFilterValue] = useState('');

    //used to search for friends in the text box
    const filteredMembers = members.filter(
        (member) =>
          member.username.toLowerCase().includes(filterValue.toLowerCase())
      );

    function removeAllOccurrences(set, element) {
        for (let item of set) {
          if (item === element) {
            set.delete(item);
          }
        }
      }

    const onFinish = async values => {
        console.log("onfinish");
        // console.log("values",values)

        //find the IDs associated with passed usernames
        const userIDs = []
        for (const username of values.users) {
           const user_id = await axios.get(`http://localhost:3001/api/users/findusername/${username}`);
           if (!user_id) {
            console.log("Error adding friend")
            message.error("Error adding friend")
            return
           }
           else {
            userIDs.push(user_id.data._id);
           }
        }
       
        let newFriends = new Set([...userIDs])
        let usernames = new Set([...user.friends]);
        //console.log('new',newFriends)
        
        // Add all friends
        try {
            if (!Array.isArray(user.friends)) {
                user.friends = []; // Initialize as an empty array
            }

            for (const friend of members) {
                //Remove a friend
                if (usernames.has(friend._id) && newFriends.has(friend._id)) {
                    message.error(`${friend.username} was removed from your friend list!`); // Show error message
                    user.friends = user.friends.filter(f => f !== friend._id);
                    let data = { ...user };
                    await axios.patch(`http://localhost:3001/api/users/${user._id}`, data);
                } 
                //Cant add yourself as friend
                else if (friend._id === user._id) {
                    message.error(`Can't add yourself as a friend`); // Show error message
                }
                //Add a friend
                else if (newFriends.has(friend._id)) {
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
                                <Text>Add Friends</Text>
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
                                                //filterOption={false}
                                                onSearch={(value_search) => setFilterValue(value_search)}
                                            >
                                                {members.map((member) => (
                                                    <Option key={member._id} value={member.username}>
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