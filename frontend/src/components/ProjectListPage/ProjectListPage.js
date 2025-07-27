// frontend/src/components/ProjectListPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../ProjectCard/ProjectCard'; // Import the new card component
import './ProjectListPage.css'; // Import the CSS for the grid layout

const ProjectListPage = () => {
    // State to hold the list of projects
    const [projects, setProjects] = useState([]);
    // State to handle loading status
    const [loading, setLoading] = useState(true);
    // State to handle any errors during fetching
    const [error, setError] = useState(null);

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Make a GET request to the Django API
                const response = await axios.get('http://127.0.0.1:8000/api/projects/');
                // Update state with the fetched data
                setProjects(response.data);
                setError(null); // Clear previous errors
            } catch (err) {
                // If an error occurs, update the error state
                setError('Failed to fetch projects. Make sure the backend server is running.');
                console.error("There was an error fetching the projects:", err);
            } finally {
                // Set loading to false once the request is complete (success or fail)
                setLoading(false);
            }
        };

        fetchProjects();
    }, []); // The empty array ensures this effect runs only once

    // Conditional rendering for the loading state
    if (loading) {
        return <div>Loading projects...</div>;
    }

    // Conditional rendering for the error state
    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    // Main component render
    return (
        <div className="page-container">
            <h1 className="page-title">Student Project Showcase</h1>
            
            {/* Check if there are any projects to display */}
            {projects.length === 0 ? (
                <p>No projects to display yet. Add some in the Django admin!</p>
            ) : (
                // Use the 'project-grid' class from our CSS file
                <div className="project-grid">
                    {/* Map over the projects array and render a ProjectCard for each one */}
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectListPage;
