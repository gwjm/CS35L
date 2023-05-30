import { useParams } from "react-router-dom";
import { Card, Descriptions } from 'antd';
import axios from "axios";
import React, { useState, useEffect } from "react";    

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState();

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
    
    console.log("Project:", project);

    if (!project) {
        return <div>Loading...</div>; // or display an appropriate loading state
    }

    return (
        <Card>
            <Descriptions title="Project Details" layout="vertical">
                <Descriptions.Item label="Project Title">{project.title}</Descriptions.Item>
                <Descriptions.Item label="Owner">{project.owner.username}</Descriptions.Item>
                <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
                <Descriptions.Item label="Created At">{project.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Deadline">{project.deadline}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
}

export default ProjectDetails;
