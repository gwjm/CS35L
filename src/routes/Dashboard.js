import useFetch from '../hooks/useFetch';
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthProvider.js";
import { showErrorDialog } from '../components/ErrorDialog';
import axios from 'axios';

// AntD
import { Table, Button, Menu, Dropdown, Modal, Form, Input, ConfigProvider, theme, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import TaskCreation from '../components/TaskCreation'; // TODO: add task creation floating
import EditProjectDialogFromDashboard from '../components/EditProjectDialogFromDashboard';
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";

function Dashboard() {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const currentTheme = useTheme();

    const { data, loading, error } = useFetch('http://localhost:3001/api/projects');
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState([]);

    const { auth } = useContext(AuthContext);

    //set token to newly logged in user
    useEffect(() => {
        if (auth) {
            //console.log(auth);
            localStorage.setItem("token", JSON.stringify(auth));
        }
        fetchUser();
    }, [auth]);

    useEffect(() => {
        if (user._id) {
            fetchProjects();
        }
    }, [user]);

    //get currently logged in user
    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/findusername/${auth.user1}`)
            setUser(response.data);
            console.log(response.data)
            fetchProjects();
        } catch (error) {
            console.error(error);
        }
    };

    //get projects owned by logged in user
    const fetchProjects = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/projects/findbyowner/${user._id}`)
            const response2 = await axios.get(`http://localhost:3001/api/projects/findbymember/${user._id}`) 
            console.log('1',response);
            console.log('2',response2)
            const concatenatedResponse = [...response.data, ...response2.data];
            setProjects(concatenatedResponse);
        } catch (error) {
            console.error(error);
        }
    };


    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);

    const handleEdit = (record) => {
        setEditModalVisible(true);
    };

    const handleAddTask = (record) => {
        setAddTaskModalVisible(true);
    };

    const handleEditModalCancel = () => {
        setEditModalVisible(false);
    };

    const handleAddTaskModalCancel = () => {
        setAddTaskModalVisible(false);
    };

    const handleEditModalSubmit = (values) => {
        console.log('Edit Form Values:', values);
        setEditModalVisible(false);
    };

    const handleAddTaskModalSubmit = (values) => {
        console.log('Add Task Form Values:', values);
        setAddTaskModalVisible(false);
    };

    const editMenu = (project_details) => (
        <Menu>
            {/*console.log("record" + record._id)*/}
            <Menu.Item>
                <EditProjectDialogFromDashboard project={project_details} />
            </Menu.Item>
            <Menu.Item key="addTask">
                <TaskCreation />
            </Menu.Item>
        </Menu>
    );


    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <Link to={`/Projects/${record._id}`}>{text}</Link>
            ),
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
            render: (owner) => <div>{owner.username}</div>,
            sorter: (a, b) => a.owner.username.localeCompare(b.owner.username),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            sorter: (a, b) => new Date(a.deadline) - new Date(b.deadline),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div>{/*console.log(text)*/}
                    <Dropdown overlay={editMenu(text)}>
                        <Button>Actions</Button>
                    </Dropdown></div>
            ),
        },
    ];

    // Return --------------------------------------------------
    const cardStyle = {
        display: 'flex',
        alignItems: 'top',
        justifyContent: 'top',
        height: '100vh',
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
            }}>
            <Card style={cardStyle}>
                <h1>My Dashboard</h1>
                {loading && <div>Loading...</div>}
                {error && showErrorDialog(error)}
                <Row>
                    <Col span={8} offset={21}>
                        <Link to="/Projects">
                            <Button type="primary" size="large">Add Project</Button>
                        </Link>
                    </Col>
                </Row>
                <div><br /></div>
                <div
                    id="scrollableDiv"
                    style={{
                        height: 400,
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}
                >
                    <Table
                        dataSource={projects}
                        columns={columns}
                        pagination={false}
                        scroll={{ y: 300 }}
                        loading={loading}
                        locale={{
                            emptyText: 'No data available',
                        }}
                    />
                </div>

                <Modal
                    open={editModalVisible}
                    onCancel={handleEditModalCancel}
                    onOk={handleEditModalSubmit}
                    title="Edit Form"
                >
                    <Form>
                        {/* Add form fields for edit action */}
                        <Form.Item label="Title" name="editTitle">
                            <Input />
                        </Form.Item>
                        {/* Add more form fields as needed */}
                    </Form>
                </Modal>

            </Card>
        </ConfigProvider >
    );
};



export default Dashboard;