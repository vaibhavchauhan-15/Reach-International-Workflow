import React from 'react';

export default function CoverSlide({ goToSlide }) {
    return (
        <div className="cover-content">
            <div className="cover-machine-showcase">
                <img 
                    src="https://www.reachinternational.co.in/wp-content/uploads/2024/05/JCB-S1530E.png" 
                    alt="Reach International JCB Scissor Lift" 
                    className="cover-machine-img"
                />
            </div>

            <h1 className="cover-title">STANDARD OPERATING PROCEDURES</h1>

            <div className="cover-stats-grid">
                <div className="stat-card" onClick={() => goToSlide(1)}>
                    <div className="stat-img-wrapper">
                        <img src="https://www.reachinternational.co.in/wp-content/uploads/2024/05/JCB-S1530E.png" alt="Scissor Lift" />
                    </div>
                    <div className="stat-card-body">
                        <div className="stat-num">3 Flowcharts</div>
                        <div className="stat-label">Inbound, Outbound & Procurement</div>
                    </div>
                </div>
                <div className="stat-card" onClick={() => goToSlide(4)}>
                    <div className="stat-img-wrapper">
                        <img src="https://www.reachinternational.co.in/wp-content/uploads/2024/06/16BRJ-9.png" alt="Reach Truck" />
                    </div>
                    <div className="stat-card-body">
                        <div className="stat-num">4 Flowcharts</div>
                        <div className="stat-label">Warranty, Overhauls & Field Repairs</div>
                    </div>
                </div>
                <div className="stat-card" onClick={() => goToSlide(6)}>
                    <div className="stat-img-wrapper">
                        <img src="https://www.reachinternational.co.in/wp-content/uploads/2024/06/hyundai.png" alt="Hyundai Equipment" />
                    </div>
                    <div className="stat-card-body">
                        <div className="stat-num">3 Flowcharts</div>
                        <div className="stat-label">OEM Acquisition, Sales & Rentals</div>
                    </div>
                </div>
            </div>

            <div className="cover-cta-bar">
                <button className="btn btn-primary btn-large" onClick={() => goToSlide(1)}>
                    <span>Start Presentation</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
            </div>
        </div>
    );
}
