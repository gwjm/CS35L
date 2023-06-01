import { useParams } from "react-router-dom";
import { Card, Descriptions, List, Button, Modal } from 'antd';
import axios from "axios";
import React, { useState, useEffect } from "react";

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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

    return (
        <Card title="Project Details">
            <Descriptions layout="vertical">
                <Descriptions.Item label="Project Title">{project.title}</Descriptions.Item>
                <Descriptions.Item label="Owner">{project.owner.username}</Descriptions.Item>
                <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
                <Descriptions.Item label="Created At">{project.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Deadline">{project.deadline}</Descriptions.Item>
            </Descriptions>

            <List
                header={<header><h3>Members</h3></header>}
                dataSource={projectMembers}
                renderItem={(item) => <List.Item>{item.username}</List.Item>}
            />

            <List
                header={<header><h3>Task List</h3></header>}
                dataSource={tasklist}
                renderItem={(item) => <List.Item>{item.title}</List.Item>}
            />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <Button
                    danger type="text"
                    onClick={() => handleDelete()}
                >
                    Delete
                </Button>
                <Modal
                    open={deleteModalVisible}
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
    );
};

export default ProjectDetails;
