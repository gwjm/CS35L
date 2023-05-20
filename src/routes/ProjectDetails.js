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
        <div>
            <div className="project-details">
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {project && (
                    <article>
                        <h2>{project.title}</h2>
                        <p>Created by {project.owner}</p>
                        <div>{project.description}</div>
                    </article>
                )}
            </div>
            <div className="todo-list">
                {Todo()}
            </div>
        </div>
    );
}

export default ProjectDetails;