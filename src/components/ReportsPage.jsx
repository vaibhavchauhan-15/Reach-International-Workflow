import React, { useState } from 'react';
import { reportsData } from '../data/reportsData';
import ReportDetailModal from './ReportDetailModal';

export default function ReportsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedReport, setSelectedReport] = useState(null);

    const categories = ['All', 'Procurement', 'Inbound Logistics', 'Outbound Logistics', 'Quality Control', 'Maintenance'];

    const filteredReports = reportsData.filter(report => {
        const matchesCategory = activeCategory === 'All' || report.category === activeCategory;
        const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              report.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              report.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="reports-page-container">
            {/* Page Header */}
            <div className="page-hero-banner">
                <div className="hero-content-wrapper">
                    <div className="hero-text-side">
                        <span className="hero-pill">REPORTS & WORKFLOW DOCUMENTATION</span>
                        <h1>Operational Reports & Flowcharts</h1>
                        <p>Comprehensive standard operating procedures, process flowcharts, quality audits, and department performance reports.</p>
                    </div>
                    <div className="hero-search-side">
                        <div className="search-input-wrapper">
                            <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input 
                                type="text" 
                                className="page-search-input"
                                placeholder="Search reports, flowcharts, authors, HODs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Category Pills Bar */}
                <div className="category-tabs-bar">
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reports Grid */}
            <div className="reports-content-section">
                <div className="section-info-row">
                    <span className="results-count">Showing {filteredReports.length} Reports & SOP Flowcharts</span>
                    <span className="click-hint-badge">💡 Click any title or card to enter detail page</span>
                </div>

                <div className="reports-grid">
                    {filteredReports.map((report) => (
                        <div 
                            key={report.id} 
                            className="report-card"
                            onClick={() => setSelectedReport(report)}
                        >
                            <div className="report-card-top">
                                <div className="report-card-meta">
                                    <span 
                                        className="report-cat-badge"
                                        style={{ backgroundColor: `${report.badgeColor}15`, color: report.badgeColor, border: `1px solid ${report.badgeColor}35` }}
                                    >
                                        {report.category}
                                    </span>
                                    <span className="report-card-date">🗓️ {report.date}</span>
                                </div>
                                <span className="report-status-tag">{report.status}</span>
                            </div>

                            <h3 className="report-card-title">
                                {report.title}
                            </h3>

                            <p className="report-card-dept">
                                🏢 <strong>{report.department}</strong> &nbsp;|&nbsp; 👤 {report.author}
                            </p>

                            <p className="report-card-summary">
                                {report.summary}
                            </p>

                            {/* Mini Flowchart Preview */}
                            {report.workflowNodes && (
                                <div className="mini-flowchart-preview">
                                    <span className="mini-flow-label">Workflow Steps:</span>
                                    <div className="mini-flow-steps">
                                        {report.workflowNodes.map((n, nIdx) => (
                                            <React.Fragment key={nIdx}>
                                                <span className="mini-step-chip" title={`${n.step}: ${n.desc}`}>
                                                    {n.title}
                                                </span>
                                                {nIdx < report.workflowNodes.length - 1 && <span className="mini-flow-arrow">➔</span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Key Metrics Row */}
                            {report.keyMetrics && report.keyMetrics.length > 0 && (
                                <div className="report-card-metrics">
                                    {report.keyMetrics.slice(0, 3).map((m, idx) => (
                                        <div key={idx} className="mini-metric">
                                            <span className="m-val">{m.value}</span>
                                            <span className="m-lbl">{m.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="report-card-footer">
                                <span className="enter-detail-link">
                                    Click to Enter Detail Page ➔
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredReports.length === 0 && (
                    <div className="empty-search-state">
                        <span className="empty-icon">🔍</span>
                        <h3>No reports found</h3>
                        <p>No reports match your current search query "{searchQuery}". Try clearing filters.</p>
                        <button className="btn btn-outline" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Full Detail Modal */}
            <ReportDetailModal 
                selectedReport={selectedReport} 
                setSelectedReport={setSelectedReport} 
            />
        </div>
    );
}
