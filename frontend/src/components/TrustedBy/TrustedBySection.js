import './TrustedBySection.css'; // Assuming you have a CSS file for styling
const TrustedBySection = () => {
  return (
    <div className="trusted-section">
      <div className="trusted-container">
        <div className="trusted-label">TRUSTED BY INNOVATORS AT</div>
        <div className="institution-grid">
          <div className="institution">MIT</div>
          <div className="institution">Stanford</div>
          <div className="institution">Harvard</div>
          <div className="institution">IIT</div>
          <div className="institution">ETH Zurich</div>
        </div>
        <div className="trusted-footnote">and 150+ leading institutions worldwide</div>
      </div>
    </div>
  );
};

export default TrustedBySection;