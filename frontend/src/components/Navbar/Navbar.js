// frontend/src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // We'll create this for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* The main logo/title that links to the homepage */}
                <Link to="/" className="navbar-logo">
                    ProjectHub
                </Link>

                {/* We can add more links here later, like "Submit Project" or "Login" */}
                <div className="nav-menu">
                    {/* Example of another link */}
                    {/* <Link to="/submit" className="nav-link">Submit</Link> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
