import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './StatsSection.css'; // Assuming you have a CSS file for styling

const StatsSection = () => {
  const stats = [
    { id: 1, value: 5000, suffix: '+', label: 'Student Creators', duration: 2 },
    { id: 2, value: 2300, suffix: '+', label: 'Projects Shared', duration: 2.2 },
    { id: 3, value: 150, suffix: '+', label: 'Universities', duration: 2.4 },
    { id: 4, value: 50, suffix: '+', label: 'Featured Projects', duration: 2.6 }
  ];

  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setCounted(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.stats-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="stats-header"
        >
          <h3 className="stats-subtitle">Our Impact</h3>
          <h2 className="stats-title">By The Numbers</h2>
          <p className="stats-description">
            Join a growing community of student innovators and creators
          </p>
        </motion.div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.id * 0.1 }}
              viewport={{ once: true }}
              className="stat-card"
            >
              <div className="stat-value">
                {counted && (
                  <Counter from={0} to={stat.value} duration={stat.duration} />
                )}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Counter component for animation
const Counter = ({ from, to, duration }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = from;
    const increment = (to - from) / (duration * 60); // 60fps

    const timer = setInterval(() => {
      start += increment;
      setCount(Math.floor(start));
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return <span>{count}</span>;
};

export default StatsSection;