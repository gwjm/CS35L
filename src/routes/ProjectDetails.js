import { useParams } from "react-router-dom";
import { Card, Descriptions, Button, Modal, ConfigProvider, Table, theme, Tag, Row, Space, Menu, Dropdown} from 'antd';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";
import { getRandomColor } from "../utility/randomColors.js";
import { showErrorDialog } from "../components/ErrorDialog";
import EditProjectDialogFromProjectDetails from '../components/EditProjectDialogFromProjectDetails';
import TaskForm from "../components/TaskCreation";
import moment from 'moment';
import EditTaskDialog from "../components/EditTaskDialog";

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState();
    const [tasks, setTasks] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [taskDeleteModalVisible, setTaskDeleteModalVisible] = useState(false);
    const currentTheme = useTheme();
    const toggleTheme = useThemeUpdate();
    const [deleteTaskId, setDeleteTaskId] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/projects/find/${id}`);
                setProject(response.data);
                console.log("Fetching project...", project);
            } catch (error) {
                console.log('Error fetching project:', error);
                showErrorDialog('Error fetching project');
            }
        };
        fetchProject();
    }, [id]);

    useEffect(() => {
        const setTaskMembers = async () => {
            if (!project.tasklist) return;
            try {
                const tasksLoaded = await Promise.all(
                    project.tasklist.map(async (task) => {
                        const response = await axios.get(
                            `http://localhost:3001/api/tasks/get/${task._id}`
                        );
                        if (response.data) {
                            return response.data;
                        } else {
                            console.log(`Empty data received for task with ID: ${task._id}`);
                            return null;
                        }
                    })
                );
                console.log("tasksLoaded: ", tasksLoaded);
                setTasks(tasksLoaded.filter((task) => task !== null));
            } catch (error) {
                console.log("Error fetching project members:", error);
                showErrorDialog("Error fetching project members");
            }
        };
        setTaskMembers();
    }, [project]);

    const handleDelete = async () => {
        setDeleteModalVisible(true);
    }

    const confirmDelete = async (id) => {
        // Logic to delete the project with the given id
        setDeleteModalVisible(false);
        try {
            await axios.delete(`http://localhost:3001/api/projects/delete/${project._id}`);
            setProject(null);
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

    if (!project) {
        return <div>Loading...</div>; // or display an appropriate loading state
    }

    const projectMembers = project.members;
    console.log("projectMembers: ", projectMembers)
    const tasklist = project.tasklist;
    // Generate random color for each user name
    const randomColorArray = projectMembers.map((str) => [str.username, getRandomColor()]);

    

    function getColor(username) {
        for (const user of randomColorArray) {
            console.log(user);
            if (user[0] === username) {
                return user[1];
            }
        }
        return getRandomColor();
    }

    const columns = [
        {
            title: 'Members',
            dataIndex: 'username',
            key: 'username',
            render: (username) => {
                const color = getColor(username);
                return <Tag color={color}>{username}</Tag>;
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    const handleTaskDelete = async (id) => {
        setTaskDeleteModalVisible(true);
        setDeleteTaskId(id);
    }

    const confirmTaskDelete = async () => {
        setTaskDeleteModalVisible(false);
        if (!id) {
            console.log('Error deleting task: no id provided');
            showErrorDialog('Error deleting task');
            return;
        }
        try{
            await axios.delete(`http://localhost:3001/api/tasks/delete/${id}`);
            window.location.href = `/projects/${project._id}`;
        } catch (error) {
            console.log('Error deleting task:', error);
            showErrorDialog('Error deleting task');
        }
        setDeleteTaskId(null);
    }

    const cancelTaskDelete = () => {
        setTaskDeleteModalVisible(false);
    }

    const editMenu = (task_details, record) => (
        <Menu> 
            <Menu.Item>
                <EditTaskDialog task={task_details}/>
            </Menu.Item>
            <Menu.Item> 
                
            </Menu.Item>
            <Menu.Item> 
                <Button 
                danger 
                type="primary" 
                onClick={() => handleTaskDelete(record._id)}
                style={{ backgroundColor: 'red', borderColor: 'red' }}
                >
                Delete
                </Button>
            </Menu.Item>
        </Menu>
    );

    // Task columns
    const taskColumns = [
        {
            title: 'Task',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Deadline',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (dueDate) => <div>{moment(dueDate).format('MM/DD/YYYY')}</div>,
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignedUsers',
            key: 'assignedUsers',
            render: (assignedUsers) => (
                <span>
                    {assignedUsers.map((user) => (
                        <React.Fragment key={user._id}>
                            <Tag color={getColor(user.username)}>{user.username}</Tag>
                        </React.Fragment>
                    ))}
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (completed) => {
                let color, statusText;
                switch (completed) {
                    case 0:
                        color = 'red';
                        statusText = 'Not Started';
                        break;
                    case 1:
                        color = 'yellow';
                        statusText = 'In Progress';
                        break;
                    case 2:
                        color = 'lime';
                        statusText = 'Completed';
                        break;
                    default:
                        color = 'gray';
                        statusText = 'Unknown';
                }
                return <Tag color={color}>{statusText}</Tag>;
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            dataIndex: '_id',
            render: (text, record) => (
                <div>

                    <div>{/*console.log(text)*/}
                        <Dropdown overlay={editMenu(text, record)}>
                            <Button>Actions</Button>
                        </Dropdown></div>
                </div>
            ),
        }, 
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ConfigProvider theme={{ algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
                <Card
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Project Details</span>
                            <div>
                                <Row>
                                    <Space>
                                        <EditProjectDialogFromProjectDetails />
                                    </Space>
                                </Row>
                            </div>
                        </div>
                    }
                    style={{ flex: 1 }}
                >
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Project Title">{project.title}</Descriptions.Item>
                        <Descriptions.Item label="Owner">{project.owner.username}</Descriptions.Item>
                        <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
                        <Descriptions.Item label="Created At">{project.createdAt}</Descriptions.Item>
                        <Descriptions.Item label="Deadline">{project.deadline}</Descriptions.Item>
                    </Descriptions>

                    <h3>Members</h3>
                    <Table dataSource={projectMembers} columns={columns} pagination={true} style={{ marginBottom: 16 }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Task List</h3>
                    <div>
                            <Row>
                                <Space>
                                    <TaskForm />
                                </Space>
                            </Row>
                    </div>
                    </div>

                    <Table dataSource={tasks} columns={taskColumns} pagination={true} style={{ marginBottom: 16 }} />

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                        <Button
                            danger
                            type="primary"
                            onClick={() => handleDelete()}
                            style={{ backgroundColor: 'red', borderColor: 'red' }}
                        >
                            Delete
                        </Button>
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
                            visible={taskDeleteModalVisible}
                            title="Confirm Delete"
                            okText="Delete"
                            cancelText="Cancel"
                            onOk={confirmTaskDelete}
                            onCancel={cancelTaskDelete}
                        >
                            Are you sure you want to delete this task?
                        </Modal>
                    </div>
                </Card>
            </ConfigProvider>
        </div>
    );
};

export default ProjectDetails;
