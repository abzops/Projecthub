import "./HeroSection.css"; // Assuming you have a CSS file for styling
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function HeroSection() {
  // Typing effect for the hero section
  const [typedText, setTypedText] = useState("");
  const texts = ["Showcase", "Share", "Discover", "Collaborate"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = texts[currentIndex];

      if (isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        setTypingSpeed(100);
      } else {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setTypingSpeed(300);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, currentIndex, isDeleting, texts, typingSpeed]);

  return (
    <section className="hero">
      {/* Animated background elements */}
      <div className="hero-bg-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-blur"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🚀</span>
            <span className="badge-text">The #1 student project platform</span>
          </div>

          <h1 className="hero-headline">
            <span className="hero-typed">{typedText}</span> your projects
            <span className="hero-highlight"> with world</span>
          </h1>

          <p className="hero-subheadline">
            Join thousands of students showcasing their work, gaining
            recognition, and connecting with opportunities at top universities
            and companies.
          </p>

          <div className="hero-cta">
            <Link to="/signup" className="cta-primary">
              Get Started — It's Free
            </Link>
            <Link to="/explore" className="cta-secondary">
              See How It Works
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">5,000+</div>
              <div className="stat-label">Student Creators</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">2,300+</div>
              <div className="stat-label">Projects Shared</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">150+</div>
              <div className="stat-label">Universities</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Students collaborating"
              className="hero-main-image"
            />

            {/* Floating project cards */}
            <div className="floating-card card-1">
              <div className="card-header">
                <div className="card-avatar">AI</div>
                <div className="card-title">Machine Learning Model</div>
              </div>
              <div className="card-footer">
                <span className="card-author">Priya S.</span>
                <span className="card-likes">❤️ 142</span>
              </div>
            </div>

            <div className="floating-card card-2">
              <div className="card-header">
                <div className="card-avatar">UX</div>
                <div className="card-title">Mobile App Design</div>
              </div>
              <div className="card-footer">
                <span className="card-author">David L.</span>
                <span className="card-likes">❤️ 89</span>
              </div>
            </div>

            <div className="floating-card card-3">
              <div className="card-header">
                <div className="card-avatar">ENG</div>
                <div className="card-title">Solar Vehicle</div>
              </div>
              <div className="card-footer">
                <span className="card-author">Maria G.</span>
                <span className="card-likes">❤️ 76</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
