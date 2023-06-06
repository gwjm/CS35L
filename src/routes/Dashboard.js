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
    const [deleteProject, setDeleteProject] = useState({}); 
    const [user, setUser] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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

    const handleDelete = async (id) => {
        setDeleteModalVisible(true);
        setDeleteProject(id)
        console.log(id)
    }

    const confirmDelete = async () => {
        // Logic to delete the project with the given id
        setDeleteModalVisible(false);
        try {
            await axios.delete(`http://localhost:3001/api/projects/delete/${deleteProject}`);
            window.location.href = '/dashboard';
        } catch (error) {
            console.log('Error deleting project:', error);
            showErrorDialog('Error deleting project');
        }
        setDeleteModalVisible(false);
    };

    const cancelDelete = () => {
        setDeleteModalVisible(false);
    };

    //get currently logged in user
    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/findusername/${auth.user1}`)
            setUser(response.data);
            // console.log(response.data)
            fetchProjects();
        } catch (error) {
            console.error(error);
        }
    };

    //get projects owned or a member of by logged in user
    const fetchProjects = async () => {
        try {
            //owned by
            const response_owner = await axios.get(`http://localhost:3001/api/projects/findbyowner/${user._id}`)
            //a member of these projects
            const response_member = await axios.get(`http://localhost:3001/api/projects/findbymember/${user._id}`) 
            //concatenate
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
            dataIndex: '_id',
            render: (text, record) => (
                <div>
                <Button
                    danger
                    type="primary"
                    onClick={() => handleDelete(record._id)}
                    style={{ backgroundColor: 'red', borderColor: 'red' }}
                >
                    Delete
                </Button>
                </div>
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
                    visible={deleteModalVisible}
                    title="Confirm Delete"
                    okText="Delete"
                    cancelText="Cancel"
                    onOk={confirmDelete}
                    onCancel={cancelDelete}
                >
                    Are you sure you want to delete the project?
                </Modal>
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