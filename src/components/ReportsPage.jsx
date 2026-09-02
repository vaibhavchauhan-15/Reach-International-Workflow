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
        <div className="flex-1 flex flex-col overflow-y-auto bg-stage-bg pb-12 w-full select-none animate-fade-in scroll-fade-top relative">
            <div className="top-blur-mask" aria-hidden="true" />
            {/* Page Header */}
            <div className="bg-white border-b border-border-light pt-20 sm:pt-22 md:pt-24 px-4 pb-4 sm:px-6 sm:pb-6 md:px-8 md:pb-8 mb-4 sm:mb-6 shadow-xs">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1 max-w-xl">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ribbon-4 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200 self-start">
                            REPORTS & WORKFLOW DOCUMENTATION
                        </span>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Operational Reports & Flowcharts
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-600">
                            Comprehensive standard operating procedures, process flowcharts, quality audits, and department performance reports.
                        </p>
                    </div>

                    <div className="w-full md:w-auto">
                        <div className="relative flex items-center w-full md:w-72">
                            <svg className="absolute left-3 text-slate-400 pointer-events-none w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input 
                                type="text" 
                                className="w-full h-9 sm:h-10 pl-9 pr-8 text-xs sm:text-sm bg-stage-bg border border-border-light rounded-full focus:bg-white focus:border-ribbon-4 focus:ring-2 focus:ring-cyan-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                                placeholder="Search reports, authors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="absolute right-3 text-slate-400 hover:text-slate-700 text-xs font-bold" onClick={() => setSearchQuery('')}>✕</button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Category Pills Bar */}
                <div className="max-w-6xl mx-auto flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none mt-4 pt-2 border-t border-slate-100">
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border min-h-[38px] ${
                                activeCategory === cat 
                                    ? 'bg-ribbon-4 text-white border-ribbon-4 shadow-sm' 
                                    : 'bg-white text-slate-700 border-border-dark hover:bg-slate-50'
                            }`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reports Grid */}
            <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full">
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-semibold mb-4">
                    <span>Showing {filteredReports.length} Reports & SOP Flowcharts</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {filteredReports.map((report) => (
                        <div 
                            key={report.id} 
                            className="bg-white border border-border-light rounded-xl p-4 sm:p-5 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-ribbon-4 cursor-pointer transition-all duration-300 flex flex-col justify-between group min-h-[220px]"
                            onClick={() => setSelectedReport(report)}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-2.5">
                                    <span 
                                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                                        style={{ backgroundColor: `${report.badgeColor}15`, color: report.badgeColor, borderColor: `${report.badgeColor}35` }}
                                    >
                                        {report.category}
                                    </span>
                                    <span className="text-[11px] font-semibold text-slate-500">🗓️ {report.date}</span>
                                </div>

                                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-ribbon-4 transition-colors mb-1.5 line-clamp-2">
                                    {report.title}
                                </h3>

                                <p className="text-xs text-slate-600 mb-2 font-medium">
                                    🏢 <strong>{report.department}</strong> &nbsp;|&nbsp; 👤 {report.author}
                                </p>

                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">
                                    {report.summary}
                                </p>

                                {/* Mini Flowchart Preview */}
                                {report.workflowNodes && (
                                    <div className="bg-stage-bg rounded-lg p-2 mb-3 border border-border-light">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Workflow Steps:</span>
                                        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
                                            {report.workflowNodes.map((n, nIdx) => (
                                                <React.Fragment key={nIdx}>
                                                    <span className="text-[10px] font-semibold bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-700 whitespace-nowrap">
                                                        {n.title}
                                                    </span>
                                                    {nIdx < report.workflowNodes.length - 1 && <span className="text-[10px] text-slate-400">➔</span>}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-ribbon-4">
                                <span>Click to Enter Detail Page</span>
                                <span className="transition-transform group-hover:translate-x-1">➔</span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredReports.length === 0 && (
                    <div className="text-center py-12 px-4 bg-white border border-border-light rounded-xl max-w-md mx-auto my-8 shadow-xs">
                        <span className="text-4xl mb-3 block">🔍</span>
                        <h3 className="text-base font-extrabold text-slate-900 mb-1">No reports found</h3>
                        <p className="text-xs sm:text-sm text-slate-500 mb-4">No reports match your current search query "{searchQuery}".</p>
                        <button 
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white text-slate-800 border border-border-light hover:bg-stage-bg active:scale-95 transition-all shadow-xs min-h-[44px]" 
                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                        >
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
