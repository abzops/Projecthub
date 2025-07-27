// frontend/src/components/ProjectCard.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    const imageUrl = `http://127.0.0.1:8000${project.cover_image}`;

    // We wrap the entire card content in a Link component.
    // The 'to' prop specifies the destination URL.
    return (
        <Link to={`/project/${project.id}`} className="project-card-link">
            <div className="project-card">
                <img 
                    src={imageUrl} 
                    alt={`${project.title} cover`} 
                    className="card-image"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/2d3748/ffffff?text=Project'; }}
                />
                <div className="card-content">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-author">by {project.author.username}</p>
                    <div className="card-tags">
                        {project.tags.map(tag => (
                            <span key={tag.id} className="tag">{tag.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
