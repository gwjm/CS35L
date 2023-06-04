import { useParams } from "react-router-dom";
import { Card, Descriptions, List, Button, Modal, ConfigProvider, Table, theme } from 'antd';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const currentTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/projects/find/${id}`);
                setProject(response.data);
            } catch (error) {
                console.log('Error fetching project:', error);
            }
        };

        console.log("Fetching project...");
        fetchProject();
    }, [id]);

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
        }
        setDeleteModalVisible(false);
    };

    const cancelDelete = () => {
        setDeleteModalVisible(false);
    };

    console.log("Project:", project);

    if (!project) {
        return <div>Loading...</div>; // or display an appropriate loading state
    }

    const projectMembers = project.members;
    const tasklist = project.tasklist;

    const columns = [
        {
            title: 'Members',
            dataIndex: 'username',
            key: 'username',
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ConfigProvider theme={{ algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
                <Card title="Project Details" style={{ flex: 1 }}>
                    <Descriptions layout="vertical">
                        <Descriptions.Item label="Project Title">{project.title}</Descriptions.Item>
                        <Descriptions.Item label="Owner">{project.owner.username}</Descriptions.Item>
                        <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
                        <Descriptions.Item label="Created At">{project.createdAt}</Descriptions.Item>
                        <Descriptions.Item label="Deadline">{project.deadline}</Descriptions.Item>
                    </Descriptions>

                    <h3>Members</h3>
                    <Table dataSource={projectMembers} columns={columns} pagination={false} style={{ marginBottom: 16 }} />

                    <h3>Task List</h3>
                    <List
                        dataSource={tasklist}
                        renderItem={item => (
                            <List.Item>{item.title}</List.Item>
                        )}
                    />

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
                    </div>
                </Card>
            </ConfigProvider>
        </div>
    );
};

export default ProjectDetails;
