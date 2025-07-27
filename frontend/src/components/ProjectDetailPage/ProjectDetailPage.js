// frontend/src/components/ProjectDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // This hook gets parameters from the URL
import axios from 'axios';
import './ProjectDetailPage.css'; // We'll create this CSS file next

const ProjectDetailPage = () => {
    // useParams() will give us an object like { projectId: '1' } from the URL /project/1
    const { projectId } = useParams(); 
    
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // We use the projectId from the URL to build the API request URL
                const response = await axios.get(`http://127.0.0.1:8000/api/projects/${projectId}/`);
                setProject(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch project details.');
                console.error("Error fetching project details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
        // The effect depends on projectId. If the ID changes, it will re-run.
    }, [projectId]);

    if (loading) {
        return <div>Loading project...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    if (!project) {
        return <div>Project not found.</div>;
    }

    // Once data is loaded, we render the project details
    return (
        <div className="detail-page-container">
            <h1 className="detail-title">{project.title}</h1>
            <p className="detail-author">by {project.author.username}</p>
            
            <div className="detail-tags">
                {project.tags.map(tag => (
                    <span key={tag.id} className="tag">{tag.name}</span>
                ))}
            </div>

            <img 
                src={`http://127.0.0.1:8000${project.cover_image}`} 
                alt={`${project.title} cover`} 
                className="detail-image"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1200x600/2d3748/ffffff?text=Project'; }}
            />
            
            <p className="detail-description">{project.description}</p>

            <div className="detail-links">
                {project.github_link && <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="detail-button">View on GitHub</a>}
                {project.live_demo_link && <a href={project.live_demo_link} target="_blank" rel="noopener noreferrer" className="detail-button">Live Demo</a>}
            </div>
        </div>
    );
};

export default ProjectDetailPage;
