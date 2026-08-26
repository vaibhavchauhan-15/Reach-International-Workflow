import React from 'react';

export default function LandingPage({ setActivePage, totalSlides = 11, totalMeetings = 6 }) {
    return (
        <div className="landing-page-container">
            {/* Executive Hero Banner */}
            <div className="landing-hero">
                <div className="landing-hero-badge">
                    <span className="badge-pulse-dot"></span>
                    <span>REACH INTERNATIONAL OPERATIONAL PORTAL</span>
                </div>
                <h1 className="landing-hero-title">
                    Streamlined Operations & <span className="hero-gradient-text">Daily Intelligence</span>
                </h1>
            </div>

            {/* Main Portal Navigation Cards (2 Main Tabs) */}
            <div className="landing-cards-grid">
                {/* 1. Workflows Deck Card */}
                <div 
                    className="landing-card card-workflows"
                    onClick={() => setActivePage('workflows')}
                >
                    <div className="landing-card-header">
                        <div className="card-icon-box icon-workflows">
                            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                                <polyline points="2 17 12 22 22 17"/>
                                <polyline points="2 12 12 17 22 12"/>
                            </svg>
                        </div>
                        <span className="card-badge badge-blue">{totalSlides} Interactive Slides</span>
                    </div>

                    <div className="landing-card-body">
                        <h2 className="card-title">Workflows Deck</h2>
                        <p className="card-description">
                            Explore interactive step-by-step operational presentation decks, department flowcharts, 
                            and visual node breakdowns for end-to-end plant processes.
                        </p>

                        <ul className="card-feature-list">
                            <li><span className="bullet-icon">⚡</span> Interactive Step Walkthroughs</li>
                            <li><span className="bullet-icon">📊</span> Horizontal Visual Flowcharts</li>
                            <li><span className="bullet-icon">🔍</span> Node Detail Modals & Specifications</li>
                        </ul>
                    </div>

                    <div className="landing-card-footer">
                        <button className="landing-action-btn btn-workflows">
                            Open Workflows Deck <span className="btn-arrow">→</span>
                        </button>
                    </div>
                </div>

                {/* 2. Daily Meetings Card */}
                <div 
                    className="landing-card card-meetings"
                    onClick={() => setActivePage('meetings')}
                >
                    <div className="landing-card-header">
                        <div className="card-icon-box icon-meetings">
                            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                        </div>
                        <span className="card-badge badge-emerald">Date-Wise Summaries</span>
                    </div>

                    <div className="landing-card-body">
                        <h2 className="card-title">Daily Meetings</h2>
                        <p className="card-description">
                            Access date-wise daily meeting logs, machine breakdown analysis, serviceman service status, 
                            store parts inventory tracking, and action items.
                        </p>

                        <ul className="card-feature-list">
                            <li><span className="bullet-icon">📅</span> Choose Meeting Date & Card Grid</li>
                            <li><span className="bullet-icon">🔧</span> Machine Breakdown & Serviceman Status</li>
                            <li><span className="bullet-icon">✅</span> Action Items & Task Completion Tracking</li>
                        </ul>
                    </div>

                    <div className="landing-card-footer">
                        <button className="landing-action-btn btn-meetings">
                            Choose Meeting Date <span className="btn-arrow">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
