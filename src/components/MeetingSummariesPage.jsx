import React, { useState } from 'react';
import { meetingsData } from '../data/meetingsData';
import MeetingDetailModal from './MeetingDetailModal';

export default function MeetingSummariesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDateFilter, setSelectedDateFilter] = useState('all');
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [useModalView, setUseModalView] = useState(false);

    const filteredMeetings = meetingsData.filter(meeting => {
        const matchesDate = selectedDateFilter === 'all' || meeting.date === selectedDateFilter || meeting.id === selectedDateFilter;
        const query = searchQuery.toLowerCase();
        const matchesQuery = !query || 
               meeting.title.toLowerCase().includes(query) ||
               meeting.date.includes(query) ||
               (meeting.fullDateFormatted && meeting.fullDateFormatted.toLowerCase().includes(query)) ||
               meeting.summary.toLowerCase().includes(query) ||
               (meeting.machineBreakdowns && meeting.machineBreakdowns.some(m => 
                   m.machineName.toLowerCase().includes(query) || 
                   m.problemFacing.toLowerCase().includes(query)
               )) ||
               (meeting.actionItems && meeting.actionItems.some(a =>
                   a.task.toLowerCase().includes(query) ||
                   a.assignee.toLowerCase().includes(query)
               ));
        return matchesDate && matchesQuery;
    });

    const handleSelectMeeting = (meeting) => {
        setSelectedMeeting(meeting);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentIndex = selectedMeeting ? meetingsData.findIndex(m => m.id === selectedMeeting.id) : -1;
    const prevMeeting = currentIndex > 0 ? meetingsData[currentIndex - 1] : null;
    const nextMeeting = currentIndex < meetingsData.length - 1 ? meetingsData[currentIndex + 1] : null;

    return (
        <div className="meetings-page-container">
            {selectedMeeting ? (
                <div className="meeting-detail-full-page">
                    {/* Header Navigation Bar */}
                    <div className="detail-page-nav-bar">
                        <div className="nav-bar-left">
                            <button 
                                className="btn btn-outline back-to-grid-btn"
                                onClick={() => setSelectedMeeting(null)}
                            >
                                ← Back to All Daily Summaries
                            </button>
                        </div>

                        <div className="nav-bar-right">
                            {prevMeeting && (
                                <button 
                                    className="btn btn-outline btn-sm date-nav-btn"
                                    onClick={() => setSelectedMeeting(prevMeeting)}
                                    title={`View ${prevMeeting.title}`}
                                >
                                    ← <span className="date-nav-title">{prevMeeting.title}</span>
                                </button>
                            )}

                            {nextMeeting && (
                                <button 
                                    className="btn btn-outline btn-sm date-nav-btn"
                                    onClick={() => setSelectedMeeting(nextMeeting)}
                                    title={`View ${nextMeeting.title}`}
                                >
                                    <span className="date-nav-title">{nextMeeting.title}</span> →
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Detailed Page Content Box */}
                    <div className="meeting-full-detail-card">
                        {/* Title Header */}
                        <div className="full-detail-header">
                            {selectedMeeting.status && (
                                <div className="header-meta-row">
                                    <span className="status-badge-pill">{selectedMeeting.status}</span>
                                </div>
                            )}
                            <h1 className="full-detail-date-title">{selectedMeeting.fullDateFormatted || selectedMeeting.title}</h1>
                            {selectedMeeting.subtitle && (
                                <p className="full-detail-subtitle">{selectedMeeting.subtitle}</p>
                            )}
                            {selectedMeeting.chairperson && (
                                <div className="full-detail-chair-row">
                                    <span>Chairperson: <strong>{selectedMeeting.chairperson}</strong></span>
                                    {selectedMeeting.location && (
                                        <>
                                            <span className="dot-sep">•</span>
                                            <span>📍 Location: <strong>{selectedMeeting.location}</strong></span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Executive Summary Stats Overview */}
                        <div className="full-detail-section stats-overview-section">
                            <div className="section-title-bar">
                                <div>
                                    <h3 className="section-title-lg">📊 Meeting Overview & Key Metrics</h3>
                                    <p className="section-desc">Snapshot of reported machine issues, required spare parts, and assigned deliverables.</p>
                                </div>
                            </div>
                            <div className="detail-page-stats-grid">
                                <div className="page-stat-card border-blue">
                                    <div className="stat-icon-wrapper">⚙️</div>
                                    <div className="stat-info">
                                        <span className="stat-number">
                                            {selectedMeeting.machineBreakdowns ? selectedMeeting.machineBreakdowns.length : 0}
                                        </span>
                                        <span className="stat-label">Machines & Breakdown Items</span>
                                    </div>
                                </div>

                                <div className="page-stat-card border-amber">
                                    <div className="stat-icon-wrapper">📦</div>
                                    <div className="stat-info">
                                        <span className="stat-number">
                                            {selectedMeeting.machineBreakdowns 
                                                ? selectedMeeting.machineBreakdowns.reduce((acc, m) => acc + (m.partsRequired ? m.partsRequired.length : 0), 0)
                                                : 0}
                                        </span>
                                        <span className="stat-label">Parts & Delivery Issues</span>
                                    </div>
                                </div>

                                <div className="page-stat-card border-purple">
                                    <div className="stat-icon-wrapper">✅</div>
                                    <div className="stat-info">
                                        <span className="stat-number">
                                            {selectedMeeting.actionItems ? selectedMeeting.actionItems.length : 0}
                                        </span>
                                        <span className="stat-label">Action Tasks Assigned</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Executive Meeting Summary */}
                        {selectedMeeting.summary && (
                            <div className="full-detail-section executive-summary-box">
                                <h3 className="section-title-lg">📌 Executive Summary & Key Highlights</h3>
                                <p className="summary-paragraph">{selectedMeeting.summary}</p>
                            </div>
                        )}

                        {/* MACHINE BREAKDOWNS, PROBLEMS & PARTS */}
                        {selectedMeeting.machineBreakdowns && selectedMeeting.machineBreakdowns.length > 0 && (
                            <div className="full-detail-section machine-breakdowns-container">
                                <div className="section-title-bar">
                                    <div>
                                        <h3 className="section-title-lg">🔧 Machine Breakdowns, Issues & Technical Status</h3>
                                        <p className="section-desc">
                                            Comprehensive status of reported machines, failure causes, repair personnel, and spare parts required.
                                        </p>
                                    </div>
                                    <span className="badge-count">
                                        {selectedMeeting.machineBreakdowns.length} Machine(s)
                                    </span>
                                </div>

                                <div className="breakdown-cards-stack">
                                    {selectedMeeting.machineBreakdowns.map((machine) => (
                                        <div key={machine.id} className="detail-machine-card">
                                            <div className="detail-machine-header">
                                                <div className="machine-header-info">
                                                    <span className="machine-badge-icon">⚙️</span>
                                                    <div>
                                                        <h4 className="machine-name-title">{machine.machineName}</h4>
                                                        <span className="machine-sub-info">
                                                            Code: <strong>{machine.machineCode}</strong> &nbsp;•&nbsp; Location: <strong>{machine.location}</strong>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="machine-header-right">
                                                    {machine.downtime && <span className="downtime-pill">🕒 {machine.downtime}</span>}
                                                    {machine.urgency && (
                                                        <span className={`urgency-pill ${machine.urgency.toLowerCase()}`}>
                                                            Priority: {machine.urgency}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="detail-machine-grid">
                                                <div className="detail-box problem-facing-box">
                                                    <div className="detail-box-header">
                                                        <span className="box-icon">🚨</span>
                                                        <h5>Problem Facing & Root Cause</h5>
                                                    </div>
                                                    <p className="detail-box-text">{machine.problemFacing}</p>
                                                </div>

                                                <div className="detail-box serviceman-status-box">
                                                    <div className="detail-box-header">
                                                        <span className="box-icon">🛠️</span>
                                                        <h5>Action & Serviceman Status</h5>
                                                    </div>

                                                    <div className="serviceman-info-body">
                                                        <div className="service-banner-row">
                                                            <span className="service-verdict-tag verdict-pending">
                                                                {machine.servicemanStatus?.serviceStatusText || 'Action Required'}
                                                            </span>
                                                            {machine.servicemanStatus?.serviceTime && (
                                                                <span className="service-time-label">
                                                                    Timestamp: {machine.servicemanStatus.serviceTime}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {machine.servicemanStatus?.servicemanName && (
                                                            <div className="serviceman-meta-line">
                                                                <span>Assigned Personnel:</span>
                                                                <strong>{machine.servicemanStatus.servicemanName}</strong>
                                                            </div>
                                                        )}

                                                        {machine.servicemanStatus?.serviceNotes && (
                                                            <div className="serviceman-notes-quote">
                                                                💡 <em>"{machine.servicemanStatus.serviceNotes}"</em>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {machine.partsRequired && machine.partsRequired.length > 0 && (
                                                <div className="detail-parts-section">
                                                    <div className="parts-section-title">
                                                        <span className="box-icon">📦</span>
                                                        <h5>Spare Parts & Supply Status</h5>
                                                    </div>
                                                    <div className="table-responsive">
                                                        <table className="parts-data-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Part Name / Spec</th>
                                                                    <th>Quantity</th>
                                                                    <th>Store & Inventory Status</th>
                                                                    <th>Urgency</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {machine.partsRequired.map((part, pIdx) => (
                                                                    <tr key={pIdx}>
                                                                        <td className="part-name">🔩 {part.partName}</td>
                                                                        <td className="part-qty"><strong>{part.qty}</strong></td>
                                                                        <td>
                                                                            <span className={`store-badge ${part.storeStatus.toLowerCase().includes('out') || part.storeStatus.toLowerCase().includes('pending') ? 'store-pending' : 'store-in'}`}>
                                                                                {part.storeStatus}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span className={`urgency-tag-sm ${part.urgency ? part.urgency.toLowerCase() : ''}`}>{part.urgency}</span>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Key Agenda Discussion */}
                        {selectedMeeting.keyTopics && selectedMeeting.keyTopics.length > 0 && (
                            <div className="full-detail-section agenda-section">
                                <div className="section-title-bar">
                                    <div>
                                        <h3 className="section-title-lg">💬 Key Discussion Agenda & Highlights</h3>
                                        <p className="section-desc">Core discussions, decisions, and administrative points recorded during the meeting.</p>
                                    </div>
                                </div>
                                <ul className="key-topics-bullet-list">
                                    {selectedMeeting.keyTopics.map((topic, idx) => (
                                        <li key={idx}>{topic}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Action Items Table */}
                        {selectedMeeting.actionItems && selectedMeeting.actionItems.length > 0 && (
                            <div className="full-detail-section actions-section">
                                <div className="section-title-bar">
                                    <div>
                                        <h3 className="section-title-lg">✅ Action Items & Task Assignments</h3>
                                        <p className="section-desc">Specific action items assigned to team members with priority and target due dates.</p>
                                    </div>
                                    <span className="badge-count">{selectedMeeting.actionItems.length} Deliverable(s)</span>
                                </div>
                                <div className="table-responsive">
                                    <table className="action-items-data-table">
                                        <thead>
                                            <tr>
                                                <th>Task Description</th>
                                                <th>Assignee</th>
                                                <th>Priority</th>
                                                <th>Status</th>
                                                <th>Due Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedMeeting.actionItems.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="task-desc">{item.task}</td>
                                                    <td><span className="assignee-tag">👤 {item.assignee}</span></td>
                                                    <td>
                                                        <span className={`priority-tag ${item.priority.toLowerCase()}`}>
                                                            {item.priority}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`status-pill ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="due-date">{item.dueDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Departmental Updates */}
                        {selectedMeeting.departmentUpdates && selectedMeeting.departmentUpdates.length > 0 && (
                            <div className="full-detail-section depts-section">
                                <div className="section-title-bar">
                                    <div>
                                        <h3 className="section-title-lg">🏢 Departmental & Category Updates</h3>
                                        <p className="section-desc">Operational breakdowns and progress reports grouped by department.</p>
                                    </div>
                                </div>
                                <div className="depts-grid">
                                    {selectedMeeting.departmentUpdates.map((dept, idx) => (
                                        <div key={idx} className="dept-update-box">
                                            <div className="dept-box-top">
                                                <span className="dept-title">{dept.dept}</span>
                                                <span className="dept-lead">Lead: {dept.lead}</span>
                                            </div>
                                            <p className="dept-text">{dept.update}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Concluding Notes */}
                        {selectedMeeting.meetingNotes && (
                            <div className="full-detail-section notes-callout-section">
                                <div className="notes-header">
                                    <h3 className="section-title-lg">📝 Concluding Notes & Instructions</h3>
                                </div>
                                <p className="notes-text">{selectedMeeting.meetingNotes}</p>
                            </div>
                        )}

                        {/* Detail View Footer */}
                        <div className="full-detail-footer">
                            <button 
                                className="btn btn-outline"
                                onClick={() => setSelectedMeeting(null)}
                            >
                                ← Return to Meeting Summaries Grid
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* GRID VIEW */
                <>
                    {/* Page Hero Banner */}
                    <div className="page-hero-banner meeting-hero-banner">
                        <div className="hero-content-wrapper">
                            <div className="hero-text-side">
                                <h1>Daily Meeting Reports</h1>
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
                                        placeholder="Search by Date, machine, problem, personnel..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="meetings-content-section">
                        {/* Date Wise Selection Ribbon Bar */}
                        <div className="date-pills-filter-bar">
                            <span className="filter-label">🗓️ Date Selection:</span>
                            <button 
                                className={`date-pill-btn ${selectedDateFilter === 'all' ? 'active' : ''}`}
                                onClick={() => setSelectedDateFilter('all')}
                            >
                                All Dates ({meetingsData.length})
                            </button>
                            {meetingsData.map(m => (
                                <button 
                                    key={m.id}
                                    className={`date-pill-btn ${selectedDateFilter === m.date ? 'active' : ''}`}
                                    onClick={() => setSelectedDateFilter(m.date)}
                                >
                                    📅 {m.title}
                                </button>
                            ))}
                        </div>

                        <div className="section-info-row">
                            <span className="results-count">Showing {filteredMeetings.length} Date-Wise Daily Meeting Summaries</span>
                        </div>

                        <div className="meetings-grid">
                            {filteredMeetings.map((meeting) => (
                                <div 
                                    key={meeting.id} 
                                    className="meeting-card"
                                    onClick={() => handleSelectMeeting(meeting)}
                                >
                                    <div className="meeting-date-badge-box">
                                        <span className="calendar-icon">📅</span>
                                        <h2 className="meeting-date-title">{meeting.title}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredMeetings.length === 0 && (
                            <div className="empty-search-state">
                                <span className="empty-icon">📅</span>
                                <h3>No daily meeting summaries found</h3>
                                <p>No meeting summaries found for "{searchQuery}". Try searching for another date or keyword.</p>
                                <button className="btn btn-outline" onClick={() => setSearchQuery('')}>
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {useModalView && (
                <MeetingDetailModal 
                    selectedMeeting={selectedMeeting} 
                    setSelectedMeeting={setSelectedMeeting} 
                />
            )}
        </div>
    );
}

