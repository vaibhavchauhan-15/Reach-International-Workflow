import React from 'react';

const CoverSlide = React.memo(function CoverSlide({ goToSlide, toggleFullscreen }) {
    const handleStartPresentation = () => {
        goToSlide(1);
        if (toggleFullscreen && !document.fullscreenElement && !document.webkitFullscreenElement) {
            toggleFullscreen();
        }
    };

    return (
        <div className="cover-content">
            <div className="cover-machine-showcase">
                <img 
                    src="https://www.reachinternational.co.in/wp-content/uploads/2024/05/JCB-S1530E.png" 
                    alt="Reach International JCB Scissor Lift" 
                    className="cover-machine-img"
                    decoding="async"
                />
            </div>

            <h1 className="cover-title">STANDARD OPERATING PROCEDURES</h1>

            <div className="cover-stats-grid">
                <div className="stat-card" onClick={() => goToSlide(1)}>
                    <div className="stat-img-wrapper">
                        <img src="https://www.reachinternational.co.in/wp-content/uploads/2024/05/JCB-S1530E.png" alt="Parts Inventory" loading="lazy" decoding="async" />
                    </div>
                    <div className="stat-card-body">
                        <div className="stat-num">3 Flowcharts</div>
                        <div className="stat-label">Procurement, Inbound & Outbound</div>
                    </div>
                </div>
                <div className="stat-card" onClick={() => goToSlide(4)}>
                    <div className="stat-img-wrapper">
                        <img src="https://www.reachinternational.co.in/wp-content/uploads/2024/06/hyundai.png" alt="Fleet Commercial" loading="lazy" decoding="async" />
                    </div>
                    <div className="stat-card-body">
                        <div className="stat-num">3 Flowcharts</div>
                        <div className="stat-label">OEM Fleet, Sales & Rentals</div>
                    </div>
                </div>
                <div className="stat-card" onClick={() => goToSlide(7)}>
                    <div className="stat-img-wrapper">
                        <img src="https://www.reachinternational.co.in/wp-content/uploads/2024/06/16BRJ-9.png" alt="Service Maintenance" loading="lazy" decoding="async" />
                    </div>
                    <div className="stat-card-body">
                        <div className="stat-num">4 Flowcharts</div>
                        <div className="stat-label">Fleet Repairs, Client & Maintenance</div>
                    </div>
                </div>
            </div>

            <div className="cover-cta-bar">
                <button className="btn btn-primary btn-large" onClick={handleStartPresentation}>
                    <span>Start Presentation</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
            </div>
        </div>
    );
});

export default CoverSlide;

