import { useParams } from "react-router-dom";
import useFetch from '../hooks/useFetch';

function ProjectDetails() {
    const { id } = useParams();
    const { data: project, error, loading } = useFetch('http://localhost:8000/Projects/' + id);
    return (
        <div className="project-details">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {project && (
                <article>
                    <h2>{project.title}</h2>
                    <p>Written by {project.author}</p>
                    <div>{project.body}</div>
                </article>
            )}
        </div>
    );
}

export default ProjectDetails;