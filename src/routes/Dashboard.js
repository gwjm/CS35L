import useFetch from '../hooks/useFetch';
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthProvider.js";
import { showErrorDialog } from '../components/ErrorDialog';

// AntD
import { Table, Button, Menu, Dropdown, Modal, Form, Input , ConfigProvider , theme } from 'antd';
import { Link } from 'react-router-dom';
import TaskCreation from './TaskCreation'; // TODO: add task creation floating
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";

function Dashboard() {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const currentTheme = useTheme();

    const { data, loading, error } = useFetch('http://localhost:3001/api/projects');
    let data2 = []

    const { auth } = useContext(AuthContext);

    //set token to newly logged in user
    useEffect(() => {
        if (auth) {
            //console.log(auth);
            localStorage.setItem("token", JSON.stringify(auth));
        }
    }, [auth]);

    //console.log(Object.keys(auth).length === 0);
    let j = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].owner.username === auth.user1) {
            data2[j] = data[i];
            j++;
        }
    }
    /* axios.get('http://localhost:3001/api/projects/')
         .then(function (response) {
             console.log(response);
         })
         .catch(function (error) {
             console.log(error);
         })
         .finally(function () {
 
         });*/

    //console.log(data);
    //console.log(data.id);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);

    const handleEdit = (record) => {
        // Handle edit action for the record
        // Example: set initial form values and open the edit modal
        setEditModalVisible(true);
    };

    const handleAddTask = (record) => {
        // Handle add task action for the record
        // Example: set initial form values and open the add task modal
        setAddTaskModalVisible(true);
    };

    const handleEditModalCancel = () => {
        setEditModalVisible(false);
    };

    const handleAddTaskModalCancel = () => {
        setAddTaskModalVisible(false);
    };

    const handleEditModalSubmit = (values) => {
        // Handle form submission for edit action
        // Example: update the record with new values and close the modal
        console.log('Edit Form Values:', values);
        setEditModalVisible(false);
    };

    const handleAddTaskModalSubmit = (values) => {
        // Handle form submission for add task action
        // Example: create a new task with the provided values and close the modal
        console.log('Add Task Form Values:', values);
        setAddTaskModalVisible(false);
    };

    const editMenu = (record) => (
        <Menu>
          <Menu.Item onClick={() => handleEdit(record)}>Edit</Menu.Item>
          <Menu.Item key="addTask">
            <Link to={`/TaskCreation/${record._id}`}>Add Task</Link>
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
              <Dropdown overlay={editMenu(record)}>
                <Button>Actions</Button>
              </Dropdown>
            ),
        },
    ];

    // Return --------------------------------------------------
    return (
    <ConfigProvider
        theme={{
         algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
        }}>
        <div>
            <h1>My Dashboard</h1>
            {loading && <div>Loading...</div>}
            {error && showErrorDialog(error)}
            <Link to="/Projects">
                <Button type="primary">Add Project</Button>
            </Link>
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
                    dataSource={data2}
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
                visible={editModalVisible}
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

            <Modal
                visible={addTaskModalVisible}
                onCancel={handleAddTaskModalCancel}
                onOk={handleAddTaskModalSubmit}
                title="Add Task Form"
            >
                <Form>
                    {/* Add form fields for add task action */}
                    <Form.Item label="Title" name="taskTitle">
                        <Input />
                    </Form.Item>
                    {/* Add more form fields as needed */}
                </Form>
            </Modal>
        </div>
        </ConfigProvider>
    );
};



export default Dashboard;