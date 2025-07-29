// frontend/src/pages/LandingPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuoteLeft,
  FaRegLightbulb,
  FaUsers,
  FaChartLine,
  FaUniversity,
  FaAward,
  FaRegStar,
  FaStar,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import "./LandingPage.css";
import TrustedBySection from "../components/TrustedBy/TrustedBySection";
import HeroSection from "../components/HeroSection/HeroSection";
import StatsSection from "../components/StatsSection/StatsSection";
import UniversityProgram from "../components/UniversitySection/UniversitySection";
import NewsLetterSection from "../components/NewsLetterSection/NewsLetterSection";
import Footer from "../Footer/Footer";

// FAQ Accordion Item Component
const FaqItem = ({ faq, index, toggleFAQ }) => {
  return (
    <div
      className={"faq " + (faq.open ? "open" : "")}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">
        {faq.question}
        {faq.open ? (
          <FaChevronUp className="faq-icon" />
        ) : (
          <FaChevronDown className="faq-icon" />
        )}
      </div>
      <div className="faq-answer">{faq.answer}</div>
    </div>
  );
};

// Stats Component
const StatItem = ({ value, label, icon }) => {
  return (
    <div className="stat-item">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

// Testimonial Component
const TestimonialCard = ({ quote, author, role, avatar }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="testimonial">
      <div className="testimonial-content">
        <FaQuoteLeft className="quote-icon" />
        <blockquote>
          {quote.length > 150 && !expanded
            ? `${quote.substring(0, 150)}... `
            : quote}
          {quote.length > 150 && (
            <button
              className="read-more"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </blockquote>
      </div>
      <div className="testimonial-author">
        <img src={avatar} alt={author} className="author-avatar" />
        <div>
          <cite>{author}</cite>
          <span className="author-role">{role}</span>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [formError, setFormError] = useState("");

  const [stats, setStats] = useState([
    { value: "5,000+", label: "Active Students", icon: <FaUsers /> },
    { value: "2,300+", label: "Projects Shared", icon: <FaRegLightbulb /> },
    { value: "150+", label: "Universities", icon: <FaUniversity /> },
    { value: "50+", label: "Featured Projects", icon: <FaAward /> },
  ]);
  const [faqs, setFaqs] = useState([
    {
      question: "Who can join ProjectHub?",
      answer:
        "ProjectHub is open to all current college and university students from any field of study who are eager to share their work and discover new ideas. Whether you're an undergraduate, graduate, or PhD student, you're welcome here. We also welcome recent graduates (up to 1 year post-graduation) to showcase their academic work.",
      open: false,
    },
    {
      question: "What kind of projects can I upload?",
      answer:
        "You can upload any project you're proud of! This includes but isn't limited to: software applications, mobile apps, web designs, research papers, hardware prototypes, art portfolios, business plans, architectural designs, and scientific experiments. We encourage projects from all disciplines - from computer science to fine arts, from engineering to social sciences. The only requirement is that it represents your original work.",
      open: false,
    },
    {
      question: "Is it free to use?",
      answer:
        "Yes! ProjectHub is completely free for all students. Our goal is to foster a community of innovation without any financial barriers. We're supported by educational grants and partner institutions who believe in our mission to democratize access to student innovation. In the future, we may offer premium features for institutions, but the core platform will always remain free for students.",
      open: false,
    },
    {
      question: "How can I get my project featured?",
      answer:
        "Featured projects are selected by our editorial team based on creativity, completeness, technical merit, and quality of presentation. We look for projects that demonstrate exceptional work in their field, have clear documentation, and can inspire others. To increase your chances: 1) Include high-quality images/videos, 2) Write a detailed project description, 3) Document your process, 4) Highlight what makes your project unique. Featured projects get special visibility on our homepage and social media.",
      open: false,
    },
    {
      question: "Can I collaborate on projects through ProjectHub?",
      answer:
        "Absolutely! ProjectHub encourages collaboration. You can: 1) Mark your project as 'open for collaboration' to invite others to contribute, 2) Browse projects looking for collaborators, 3) Use our discussion features to connect with potential team members. Many students have formed interdisciplinary teams through our platform to work on hackathons, research projects, and startup ideas.",
      open: false,
    },
    {
      question: "How do I protect my intellectual property?",
      answer:
        "While ProjectHub is designed for sharing, we understand intellectual property concerns. We recommend: 1) Only sharing what you're comfortable making public, 2) For sensitive projects, consider filing for patents or copyrights first, 3) Using our visibility settings to control who can see your project details. Remember that sharing early-stage work can help establish prior art and protect against IP theft. Our Terms of Service protect your ownership rights to all content you upload.",
      open: false,
    },
  ]);

  const testimonials = [
    {
      quote:
        "ProjectHub gave my final year project the visibility it deserved. I even got an internship offer because a recruiter from a top tech company saw my work here! The feedback I received helped me improve my project before presenting it at a national conference.",
      author: "Priya S.",
      role: "Computer Science, IIT Bombay",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "It's so inspiring to see what other students are creating across disciplines. The mechanical engineering projects gave me ideas for my robotics club, and the design portfolios pushed me to improve my UI skills. This platform has become my daily dose of motivation.",
      author: "David L.",
      role: "Mechanical Engineering, MIT",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote:
        "As an art student, I never thought my work would interest tech people. But through ProjectHub, I connected with a developer who helped me create an interactive version of my thesis project. We're now working on an exhibition together!",
      author: "Maria G.",
      role: "Fine Arts, RISD",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      quote:
        "The interdisciplinary nature of ProjectHub is its greatest strength. My environmental science research caught the attention of a business student, and together we're developing a startup based on my findings. This platform goes beyond just showcasing work—it creates real opportunities.",
      author: "James T.",
      role: "Environmental Science, Stanford",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setFormError("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address");
      return;
    }

    // In a real app, you would send this to your backend
    console.log("Subscribing email:", email);
    setSubscribed(true);
    setEmail("");
    setFormError("");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch the 3 most recent projects for the landing page showcase
        const response = await axios.get(
          "http://127.0.0.1:8000/api/projects/?limit=3"
        );
        // The API response for a paginated list is in `response.data.results`
        setProjects(response.data.results || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      <HeroSection />
      <TrustedBySection />
      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-container">
          <h2 className="section-title">
            <span className="title-decorator"></span>
            How ProjectHub Works
          </h2>
          <p className="section-subtitle">
            Join thousands of students showcasing their best work and
            discovering inspiring projects
          </p>

          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your Profile</h3>
                <p>
                  Sign up in minutes with your academic email. Build your
                  student profile highlighting your skills, interests, and
                  academic background. Connect with peers from your university
                  and beyond.
                </p>
                <div className="step-features">
                  <span className="feature-badge">Academic Verification</span>
                  <span className="feature-badge">Skill Tags</span>
                  <span className="feature-badge">Portfolio Links</span>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Submit Your Project</h3>
                <p>
                  Upload your project with rich details: descriptions, images,
                  videos, code repositories, research papers, or design files.
                  Categorize your work and add relevant tags to help others
                  discover it.
                </p>
                <div className="step-features">
                  <span className="feature-badge">Multiple Media</span>
                  <span className="feature-badge">Detailed Metadata</span>
                  <span className="feature-badge">Team Projects</span>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Engage & Grow</h3>
                <p>
                  Receive constructive feedback from peers and experts. Get
                  featured in our weekly highlights. Connect with potential
                  collaborators or employers interested in your work.
                </p>
                <div className="step-features">
                  <span className="feature-badge">Feedback System</span>
                  <span className="feature-badge">Featured Projects</span>
                  <span className="feature-badge">Recruiter Network</span>
                </div>
              </div>
            </div>
          </div>

          <div className="video-demo">
            <div className="video-container">
              <div className="video-placeholder">
                <button className="play-button" aria-label="Play video demo">
                  <svg viewBox="0 0 24 24" className="play-icon">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <p className="video-label">See ProjectHub in action</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <StatsSection />
      {/* Featured Projects Section */}
      <section id="featured-projects" className="projects-section">
        <div className="section-container">
          <h2 className="section-title">
            <span className="title-decorator"></span>
            Featured Student Projects
          </h2>
          <p className="section-subtitle">
            Discover exceptional work from students around the world
          </p>

          {loading ? (
            <div className="loading-projects">
              <div className="loading-spinner"></div>
              <p>Loading featured projects...</p>
            </div>
          ) : (
            <>
              <div className="project-grid">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              <div className="project-tabs">
                <button className="tab active">Most Recent</button>
                <button className="tab">Most Viewed</button>
                <button className="tab">Top Rated</button>
                <button className="tab">Editor's Picks</button>
              </div>
              <div className="view-all-cta">
                <Link to="/projects" className="cta-button secondary">
                  Browse All Projects
                  <span className="cta-icon">
                    <FiExternalLink />
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">
            <span className="title-decorator"></span>
            Success Stories
          </h2>
          <p className="section-subtitle">
            Hear from students who transformed their academic journey with
            ProjectHub
          </p>

          <div className="testimonials-carousel">
            <div
              className="testimonials-track"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  avatar={testimonial.avatar}
                />
              ))}
            </div>
            <div className="testimonial-nav">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`nav-dot ${
                    index === activeTestimonial ? "active" : ""
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                ></button>
              ))}
            </div>
          </div>

          <div className="success-metrics">
            <div className="metric">
              <h3>80%</h3>
              <p>
                of users say ProjectHub improved their project quality through
                feedback
              </p>
            </div>
            <div className="metric">
              <h3>45%</h3>
              <p>have found collaborators for new projects</p>
            </div>
            <div className="metric">
              <h3>30%</h3>
              <p>
                received internship or job opportunities through their projects
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">
            <span className="title-decorator"></span>
            Why Choose ProjectHub?
          </h2>
          <p className="section-subtitle">
            Designed specifically for student innovators
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                </svg>
              </div>
              <h3>Academic Focused</h3>
              <p>
                Our platform is tailored specifically for student work, with
                features like academic verification, course tagging, and
                university networking.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                </svg>
              </div>
              <h3>Collaboration Tools</h3>
              <p>
                Built-in tools for team formation, version tracking, and
                interdisciplinary collaboration make working together seamless.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
                </svg>
              </div>
              <h3>Multi-disciplinary</h3>
              <p>
                Whether you're in STEM, arts, business, or humanities,
                ProjectHub supports all types of academic work with specialized
                presentation formats.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <h3>Feedback System</h3>
              <p>
                Get constructive, structured feedback from peers and experts to
                improve your work before presentations or submissions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <h3>Portfolio Builder</h3>
              <p>
                Automatically generate professional portfolios from your
                uploaded projects to share with potential employers or graduate
                schools.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <h3>Academic Integrity</h3>
              <p>
                Our verification system ensures all work is original student
                work, creating a trusted environment for academic sharing.
              </p>
            </div>
          </div>
        </div>
      </section>
      <UniversityProgram />
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-container">
          <h2 className="section-title">
            <span className="title-decorator"></span>
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle">
            Everything you need to know about ProjectHub
          </p>

          <div className="faqs-container">
            <div className="faqs">
              {faqs.map((faq, i) => (
                <FaqItem faq={faq} index={i} key={i} toggleFAQ={toggleFAQ} />
              ))}
            </div>
            <div className="faq-sidebar">
              <div className="sidebar-card">
                <h3>Still have questions?</h3>
                <p>
                  Our student support team is here to help you with any
                  questions about using ProjectHub.
                </p>
                <Link
                  to="/contact"
                  className="cta-button small"
                  style={{ textDecoration: "none" }}
                >
                  Contact Support
                </Link>
              </div>
              <div className="sidebar-card">
                <h3>Join Our Community</h3>
                <p>
                  Connect with other student innovators in our Discord server.
                </p>
                <span className="cta-button small discord-btn">
                  Join Discord
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NewsLetterSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
