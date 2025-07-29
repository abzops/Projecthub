import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegLightbulb, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-icon">
                <FaRegLightbulb />
              </span>
              <span className="logo-text">ProjectHub</span>
            </Link>
            <p className="footer-mission">
              Empowering student innovators to share their work, collaborate,
              and gain recognition for their academic achievements.
            </p>
            <div className="social-links">
              <a href="https://github.com" aria-label="GitHub" className="social-link">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="social-link">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="social-link">
                <FaTwitter />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-column">
              <h4 className="link-heading">Platform</h4>
              <Link to="/features" className="footer-link">Features</Link>
              <Link to="/pricing" className="footer-link">Pricing</Link>
              <Link to="/examples" className="footer-link">Examples</Link>
              <Link to="/updates" className="footer-link">Updates</Link>
            </div>
            <div className="link-column">
              <h4 className="link-heading">Resources</h4>
              <Link to="/blog" className="footer-link">Blog</Link>
              <Link to="/guides" className="footer-link">Guides</Link>
              <Link to="/help" className="footer-link">Help Center</Link>
              <Link to="/webinars" className="footer-link">Webinars</Link>
            </div>
            <div className="link-column">
              <h4 className="link-heading">Company</h4>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/careers" className="footer-link">Careers</Link>
              <Link to="/partners" className="footer-link">Partners</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
            <div className="link-column">
              <h4 className="link-heading">Legal</h4>
              <Link to="/privacy" className="footer-link">Privacy</Link>
              <Link to="/terms" className="footer-link">Terms</Link>
              <Link to="/cookies" className="footer-link">Cookies</Link>
              <Link to="/guidelines" className="footer-link">Community Guidelines</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} ProjectHub. All rights reserved.
          </div>
          <div className="footer-cta">
            <Link to="/signup" className="cta-button">
              Start Sharing Your Projects
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;