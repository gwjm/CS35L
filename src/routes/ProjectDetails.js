import { useParams } from "react-router-dom";
import useFetch from '../hooks/useFetch';

function ProjectDetails() {
    const { id } = useParams();
    const { data: projects, error, loading } = useFetch('http://localhost:3001/api/projects');
    console.log(projects);

    var project;
    projects.some(function (el) {
        if (el._id === id) {
            project = el;
            return true;
        }
    })

    console.log(project);
    return (
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
    );
}

export default ProjectDetails;