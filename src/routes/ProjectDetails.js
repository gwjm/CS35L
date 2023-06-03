import { useParams } from "react-router-dom";
import useFetch from '../hooks/useFetch';
import { Todo } from './Todo.js';

function ProjectDetails() {
    const { id } = useParams();
    const { data: projects, error, loading } = useFetch('http://localhost:3001/api/projects');
    console.log(projects);

    var project = projects.find(function (el) {
        return el._id === id;
        /*if (el._id === id) {
            project = el;
            return true;
        }*/
    });

    console.log(project);
    return (
        <Card title="Project Details">
            <Descriptions layout="vertical">
                <Descriptions.Item label="Project Title">{project.title}</Descriptions.Item>
                <Descriptions.Item label="Owner">{project.owner.username}</Descriptions.Item>
                <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
                <Descriptions.Item label="Created At">{project.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Start Date">{project.startDate}</Descriptions.Item>
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
            <div className="todo-list">
                {Todo()}
            </div>
        </div>
    );
}

export default ProjectDetails;