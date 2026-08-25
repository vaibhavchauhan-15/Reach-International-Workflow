import React from 'react';

export default function MeetingDetailModal({ selectedMeeting, setSelectedMeeting }) {
    if (!selectedMeeting) return null;

    const totalBreakdowns = selectedMeeting.machineBreakdowns ? selectedMeeting.machineBreakdowns.length : 0;
    const servicedCount = selectedMeeting.machineBreakdowns 
        ? selectedMeeting.machineBreakdowns.filter(m => m.servicemanStatus && m.servicemanStatus.serviced).length 
        : 0;

    return (
        <div className="modal-backdrop active" onClick={() => setSelectedMeeting(null)}>
            <div className="modal-container meeting-detail-modal" onClick={e => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="modal-header">
                    <div className="modal-title-group">
                        <div className="modal-tags-row">
                            <span className="modal-badge modal-badge-meeting-date">
                                📅 Daily Meeting Minutes
                            </span>
                            <span 
                                className="modal-badge modal-badge-status" 
                                style={{ backgroundColor: `${selectedMeeting.statusColor}20`, color: selectedMeeting.statusColor }}
                            >
                                {selectedMeeting.status}
                            </span>
                            <span className="modal-date-tag">
                                🕒 {selectedMeeting.time}
                            </span>
                        </div>
                        <h2 className="modal-meeting-date-title">{selectedMeeting.title}</h2>
                        <p className="modal-report-subtitle">
                            <strong>{selectedMeeting.subtitle}</strong> &nbsp;•&nbsp; Chairperson: <strong>{selectedMeeting.chairperson}</strong> &nbsp;|&nbsp; 📍 {selectedMeeting.location}
                        </p>
                    </div>
                    <button className="modal-close-btn" onClick={() => setSelectedMeeting(null)} title="Close (Esc)">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="modal-body meeting-modal-body">
                    {/* Key Executive Summary Stat Banner */}
                    <div className="meeting-summary-stats-banner">
                        <div className="summary-stat-card">
                            <span className="stat-icon">🔧</span>
                            <div className="stat-content">
                                <span className="stat-val">{totalBreakdowns}</span>
                                <span className="stat-lbl">Breakdown Machines</span>
                            </div>
                        </div>
                        <div className="summary-stat-card">
                            <span className="stat-icon">🛠️</span>
                            <div className="stat-content">
                                <span className="stat-val">{servicedCount} / {totalBreakdowns}</span>
                                <span className="stat-lbl">Serviced by Technician</span>
                            </div>
                        </div>
                        <div className="summary-stat-card">
                            <span className="stat-icon">📦</span>
                            <div className="stat-content">
                                <span className="stat-val">
                                    {selectedMeeting.machineBreakdowns 
                                        ? selectedMeeting.machineBreakdowns.reduce((acc, m) => acc + (m.partsRequired ? m.partsRequired.length : 0), 0)
                                        : 0}
                                </span>
                                <span className="stat-lbl">Parts Required / Issued</span>
                            </div>
                        </div>
                        <div className="summary-stat-card">
                            <span className="stat-icon">✅</span>
                            <div className="stat-content">
                                <span className="stat-val">
                                    {selectedMeeting.actionItems ? selectedMeeting.actionItems.filter(i => i.status === 'Completed').length : 0} / {selectedMeeting.actionItems ? selectedMeeting.actionItems.length : 0}
                                </span>
                                <span className="stat-lbl">Tasks Completed</span>
                            </div>
                        </div>
                    </div>

                    {/* Participants Row */}
                    <div className="meeting-attendees-box">
                        <span className="attendees-label">👥 Meeting Participants & Department Leads:</span>
                        <div className="attendees-pills-row">
                            {selectedMeeting.attendees && selectedMeeting.attendees.map((att, idx) => (
                                <div key={idx} className="attendee-chip">
                                    <span className="attendee-avatar" style={{ backgroundColor: att.avatarBg }}>
                                        {att.name.charAt(0)}
                                    </span>
                                    <div className="attendee-info">
                                        <span className="attendee-name">{att.name}</span>
                                        <span className="attendee-role">{att.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Executive Summary Section */}
                    <div className="report-text-section summary-callout-box">
                        <h4>📌 Executive Overview</h4>
                        <p>{selectedMeeting.summary}</p>
                    </div>

                    {/* 🔧 DISCUSSED MACHINE BREAKDOWNS, PROBLEMS, PARTS REQUIRED & SERVICEMAN STATUS */}
                    {selectedMeeting.machineBreakdowns && selectedMeeting.machineBreakdowns.length > 0 && (
                        <div className="report-section-box breakdown-section-container">
                            <div className="section-box-header">
                                <div className="section-header-title">
                                    <h3>🔧 Machine Breakdown & Technical Service Report</h3>
                                    <span className="section-subtitle">
                                        Detailed analysis of machines discussed, problems faced, parts required, and serviceman service status
                                    </span>
                                </div>
                                <span className="breakdown-count-badge">
                                    {selectedMeeting.machineBreakdowns.length} Machine(s) Reviewed
                                </span>
                            </div>

                            <div className="breakdown-cards-list">
                                {selectedMeeting.machineBreakdowns.map((machine) => {
                                    const isServiced = machine.servicemanStatus && machine.servicemanStatus.serviced;
                                    return (
                                        <div key={machine.id} className="machine-breakdown-card">
                                            {/* Machine Header */}
                                            <div className="machine-card-top-bar">
                                                <div className="machine-identity">
                                                    <span className="machine-icon-tag">⚙️</span>
                                                    <div>
                                                        <h4 className="machine-title-text">{machine.machineName}</h4>
                                                        <span className="machine-meta-sub">
                                                            Code: <strong>{machine.machineCode}</strong> &nbsp;|&nbsp; 📍 Location: {machine.location}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="machine-top-badges">
                                                    <span className="downtime-badge">🕒 Downtime: {machine.downtime}</span>
                                                    <span className={`urgency-badge ${machine.urgency.toLowerCase()}`}>
                                                        Priority: {machine.urgency}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Grid layout for Problem Faced & Serviceman Status */}
                                            <div className="machine-details-grid">
                                                {/* What Problem are Facing */}
                                                <div className="machine-problem-box">
                                                    <div className="sub-box-header problem-header">
                                                        <span className="header-icon">🚨</span>
                                                        <h5>Problem Facing & Root Cause</h5>
                                                    </div>
                                                    <p className="problem-text-content">{machine.problemFacing}</p>
                                                </div>

                                                {/* Serviceman Service Status */}
                                                <div className="machine-serviceman-box">
                                                    <div className="sub-box-header serviceman-header">
                                                        <span className="header-icon">🛠️</span>
                                                        <h5>Serviceman Service Status</h5>
                                                    </div>
                                                    
                                                    <div className="serviceman-status-content">
                                                        <div className="serviceman-pill-row">
                                                            <span className={`service-status-pill ${isServiced ? 'serviced-yes' : 'serviced-pending'}`}>
                                                                {isServiced ? '✓ Serviced by Serviceman' : '⏳ Serviceman Action Required'}
                                                            </span>
                                                            <span className="service-time-tag">
                                                                {machine.servicemanStatus?.serviceTime}
                                                            </span>
                                                        </div>

                                                        <div className="serviceman-detail-row">
                                                            <span className="sv-label">Technician / Serviceman:</span>
                                                            <span className="sv-value">{machine.servicemanStatus?.servicemanName || 'Unassigned'}</span>
                                                        </div>

                                                        <div className="serviceman-status-banner">
                                                            <strong>Status:</strong> {machine.servicemanStatus?.serviceStatusText}
                                                        </div>

                                                        {machine.servicemanStatus?.serviceNotes && (
                                                            <div className="service-notes-box">
                                                                <strong>Service Notes:</strong> {machine.servicemanStatus.serviceNotes}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Parts Required Section */}
                                            {machine.partsRequired && machine.partsRequired.length > 0 && (
                                                <div className="machine-parts-box">
                                                    <div className="sub-box-header parts-header">
                                                        <span className="header-icon">📦</span>
                                                        <h5>Parts Required & Store Availability Status</h5>
                                                    </div>
                                                    <div className="parts-table-wrapper">
                                                        <table className="parts-detail-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Part Name / Description</th>
                                                                    <th>Quantity Required</th>
                                                                    <th>Store & Inventory Status</th>
                                                                    <th>Procurement Urgency</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {machine.partsRequired.map((part, pIdx) => (
                                                                    <tr key={pIdx}>
                                                                        <td className="part-name-cell">
                                                                            <span>🔩 {part.partName}</span>
                                                                        </td>
                                                                        <td className="part-qty-cell">
                                                                            <strong>{part.qty}</strong>
                                                                        </td>
                                                                        <td>
                                                                            <span className={`store-status-badge ${part.storeStatus.toLowerCase().includes('out of stock') ? 'out-of-stock' : 'in-stock'}`}>
                                                                                {part.storeStatus}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span className="part-urgency-tag">
                                                                                {part.urgency}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Key Discussion Topics */}
                    {selectedMeeting.keyTopics && (
                        <div className="report-text-section">
                            <h4>💬 Key Discussion Agenda</h4>
                            <ul className="meeting-bullet-list">
                                {selectedMeeting.keyTopics.map((topic, idx) => (
                                    <li key={idx}>{topic}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Action Items Table */}
                    {selectedMeeting.actionItems && (
                        <div className="report-section-box">
                            <div className="section-box-header">
                                <h3>✅ Action Items & Deliverables</h3>
                                <span className="section-subtitle">{selectedMeeting.actionItems.length} Tasks Assigned</span>
                            </div>
                            <div className="action-items-table-wrapper">
                                <table className="action-items-table">
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
                                                <td className="task-name-cell">{item.task}</td>
                                                <td><span className="assignee-badge">👤 {item.assignee}</span></td>
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
                                                <td className="due-date-cell">{item.dueDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Department Updates */}
                    {selectedMeeting.departmentUpdates && (
                        <div className="report-section-box">
                            <div className="section-box-header">
                                <h3>🏢 Departmental Highlights</h3>
                            </div>
                            <div className="dept-updates-grid">
                                {selectedMeeting.departmentUpdates.map((dept, idx) => (
                                    <div key={idx} className="dept-update-card">
                                        <div className="dept-card-header">
                                            <span className="dept-name">{dept.dept}</span>
                                            <span className="dept-lead">Lead: {dept.lead}</span>
                                        </div>
                                        <p className="dept-note">{dept.update}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Concluding Notes */}
                    {selectedMeeting.meetingNotes && (
                        <div className="report-text-section meeting-notes-callout">
                            <h4>📝 Concluding Notes & Instructions</h4>
                            <p>{selectedMeeting.meetingNotes}</p>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                    <div className="footer-signoff">
                        <span>Daily Minutes Verified • Reach International Workflow System</span>
                    </div>
                    <div className="modal-footer-actions">
                        <button className="btn btn-outline" onClick={() => window.print()}>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                <rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                            Print Minutes
                        </button>
                        <button className="btn btn-primary" onClick={() => setSelectedMeeting(null)}>
                            Close Meeting Summary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
