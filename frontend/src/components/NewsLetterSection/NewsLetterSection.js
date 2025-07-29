import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NewsLetterSection.css'; // Import the CSS for styling

const CreativeNewsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (!email) {
      setFormError('Please enter your email address');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setFormError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="creative-newsletter">
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.6 + 0.4
            }}
            animate={{
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 40 - 20],
              transition: {
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
          />
        ))}
      </div>
      
      <div className="newsletter-container">
        <motion.div 
          className="newsletter-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-wave"></div>
          </div>
          
          <div className="card-content">
            <div className="header-group">
              <motion.span 
                className="newsletter-badge"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                Join Our Community
              </motion.span>
              <h2 className="newsletter-title">
                <span className="title-line">Stay Ahead with</span>
                <span className="title-highlight">Creative Insights</span>
              </h2>
              <p className="newsletter-description">
                Get exclusive access to curated content, early product releases, and 
                special offers delivered straight to your inbox.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  className="success-state"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="confetti-container">
                    {[...Array(30)].map((_, i) => (
                      <div 
                        key={i}
                        className="confetti"
                        style={{
                          backgroundColor: [
                            'var(--accent-blue)',
                            'var(--accent-purple)',
                            'var(--accent-pink)',
                            'var(--accent-green)'
                          ][Math.floor(Math.random() * 4)],
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                  <div className="success-content">
                    <svg className="success-icon" viewBox="0 0 24 24">
                      <motion.path
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </svg>
                    <h3>Welcome Aboard!</h3>
                    <p>You've joined our creative community.</p>
                    <motion.button
                      className="reset-button"
                      onClick={() => setSubscribed(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Subscribe Another Email
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  className="newsletter-form"
                  onSubmit={handleSubscribe}
                  initial={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="input-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="email-input"
                      aria-label="Email address"
                    />
                    <motion.button
                      type="submit"
                      className="submit-button"
                      disabled={isLoading}
                      whileHover={{ 
                        scale: 1.05,
                        background: 'var(--primary-accent)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                    >
                      {isLoading ? (
                        <span className="button-loader"></span>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <motion.svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24"
                            animate={{
                              x: isHovered ? 5 : 0
                            }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </motion.svg>
                        </>
                      )}
                    </motion.button>
                  </div>
                  {formError && (
                    <motion.p 
                      className="form-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formError}
                    </motion.p>
                  )}
                  <p className="privacy-note">
                    We respect your privacy. Unsubscribe anytime. 
                    <a href="/privacy"> Privacy Policy</a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreativeNewsletter;