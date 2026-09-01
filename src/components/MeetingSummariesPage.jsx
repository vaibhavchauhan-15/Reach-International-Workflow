import React, { useState, useRef, useEffect } from 'react';
import { meetingsData } from '../data/meetingsData';
import MeetingDetailModal from './MeetingDetailModal';
import { formatMeetingSummary, copyTextToClipboard, formatMeetingDate } from '../utils/meetingUtils';

export default function MeetingSummariesPage({ 
    searchQuery = '', 
    setSearchQuery,
    selectedMeeting: controlledSelectedMeeting,
    setSelectedMeeting: controlledSetSelectedMeeting
}) {
    const [localSearchQuery, setLocalSearchQuery] = useState('');
    const currentSearchQuery = setSearchQuery ? searchQuery : localSearchQuery;
    const updateSearchQuery = setSearchQuery || setLocalSearchQuery;

    const getDefaultMonth = () => {
        const now = new Date();
        const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const allMonths = Array.from(
            new Set(
                meetingsData
                    .map(m => {
                        const parts = m.date.split('-');
                        return `${parts[0]}-${parts[1]}`;
                    })
                    .filter(Boolean)
            )
        );
        if (allMonths.includes(currentYearMonth)) {
            return currentYearMonth;
        }
        return allMonths[0] || 'all';
    };

    const [selectedMonth, setSelectedMonth] = useState(getDefaultMonth);
    const [localSelectedMeeting, setLocalSelectedMeeting] = useState(null);
    const selectedMeeting = controlledSelectedMeeting !== undefined ? controlledSelectedMeeting : localSelectedMeeting;
    const setSelectedMeeting = controlledSetSelectedMeeting || setLocalSelectedMeeting;

    const [useModalView, setUseModalView] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const pageContainerRef = useRef(null);
    const copyTimeoutRef = useRef(null);

    const availableMonths = [
        { key: 'all', label: 'All Months' },
        ...Array.from(
            new Set(
                meetingsData
                    .map(m => {
                        const parts = m.date.split('-');
                        return `${parts[0]}-${parts[1]}`;
                    })
                    .filter(Boolean)
            )
        ).map(yearMonth => {
            const [year, month] = yearMonth.split('-');
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const label = `${monthNames[parseInt(month, 10) - 1]} ${year}`;
            return { key: yearMonth, label };
        })
    ];

    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (currentSearchQuery && selectedMeeting) {
            setSelectedMeeting(null);
        }
    }, [currentSearchQuery]);

    useEffect(() => {
        const container = pageContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop || window.scrollY || 0;
            setShowScrollTop(scrollTop > 200);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        handleScroll();

        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [selectedMeeting]);

    const scrollToTop = () => {
        if (pageContainerRef.current) {
            pageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredMeetings = meetingsData.filter(meeting => {
        const matchesMonth = selectedMonth === 'all' || meeting.date.startsWith(selectedMonth);
        const query = currentSearchQuery.toLowerCase().trim();
        const matchesQuery = !query || 
               meeting.title.toLowerCase().includes(query) ||
               meeting.date.includes(query) ||
               (meeting.dateFormatted && meeting.dateFormatted.toLowerCase().includes(query)) ||
               (meeting.focus && meeting.focus.toLowerCase().includes(query)) ||
               (meeting.holidayName && meeting.holidayName.toLowerCase().includes(query)) ||
               (meeting.breakdowns && meeting.breakdowns.some(b => 
                   (b.site && b.site.toLowerCase().includes(query)) ||
                   (b.issue && b.issue.toLowerCase().includes(query)) ||
                   (b.action && b.action.toLowerCase().includes(query)) ||
                   (b.logistics && b.logistics.toLowerCase().includes(query)) ||
                   (b.clarification && b.clarification.toLowerCase().includes(query)) ||
                   (b.status && b.status.toLowerCase().includes(query))
               )) ||
               (meeting.parts && meeting.parts.some(p =>
                   p.part.toLowerCase().includes(query) ||
                   p.context.toLowerCase().includes(query) ||
                   p.statusNextSteps.toLowerCase().includes(query)
               )) ||
               (meeting.directives && meeting.directives.some(d =>
                   d.title.toLowerCase().includes(query) ||
                   d.points.some(pt => pt.toLowerCase().includes(query))
               )) ||
               (meeting.actionItems && meeting.actionItems.some(a =>
                   a.person.toLowerCase().includes(query) ||
                   a.task.toLowerCase().includes(query)
               ));
        return matchesMonth && matchesQuery;
    });

    const handleSelectMeeting = (meeting) => {
        if (meeting?.isHoliday) return;
        setSelectedMeeting(meeting);
        scrollToTop();
    };

    const navigableMeetings = meetingsData.filter(m => !m.isHoliday);
    const currentNavIndex = selectedMeeting ? navigableMeetings.findIndex(m => m.id === selectedMeeting.id) : -1;
    const prevMeeting = currentNavIndex > 0 ? navigableMeetings[currentNavIndex - 1] : null;
    const nextMeeting = currentNavIndex >= 0 && currentNavIndex < navigableMeetings.length - 1 ? navigableMeetings[currentNavIndex + 1] : null;

    const copyFormattedSummary = async () => {
        if (!selectedMeeting) return;
        
        const text = formatMeetingSummary(selectedMeeting);
        const success = await copyTextToClipboard(text);
        
        if (success) {
            setCopySuccess(true);
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current);
            }
            copyTimeoutRef.current = setTimeout(() => {
                setCopySuccess(false);
            }, 2500);
        }
    };

    return (
        <div ref={pageContainerRef} className="flex-1 flex flex-col overflow-y-auto bg-stage-bg pb-12 w-full select-none animate-fade-in">
            {selectedMeeting ? (
                <div className="p-3 sm:p-5 md:p-8 flex justify-center">
                    {/* Clean Operational Document Container */}
                    <div className="relative bg-white border border-border-light rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl w-full mx-auto shadow-card">
                        {/* Top Navigation & Action Row (Back Button + Small Copy Button) */}
                        <div className="flex items-center justify-between gap-3 pb-3 sm:pb-3.5 mb-4 sm:mb-5 border-b border-slate-100">
                            <button 
                                type="button"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 border border-border-light active:scale-95 transition-all cursor-pointer shadow-2xs"
                                onClick={() => {
                                    setSelectedMeeting(null);
                                    scrollToTop();
                                }}
                                title="Return to Choose Date"
                                aria-label="Return to Choose Date"
                            >
                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                                <span>← Choose Date</span>
                            </button>

                            {/* Small Static Copy Button */}
                            <button
                                type="button"
                                onClick={copyFormattedSummary}
                                className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-90 border flex-shrink-0 cursor-pointer group ${
                                    copySuccess 
                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                                        : 'bg-white text-slate-500 border-border-light hover:text-theme-breakdown hover:border-theme-breakdown hover:bg-slate-50 shadow-2xs'
                                }`}
                                title={copySuccess ? 'Copied to clipboard!' : 'Copy full meeting summary'}
                                aria-label="Copy full meeting summary"
                            >
                                {copySuccess ? (
                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                )}

                                {/* Tooltip */}
                                <span className={`absolute right-full mr-2 px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-all shadow-md ${
                                    copySuccess ? 'bg-emerald-700 text-white opacity-100' : 'bg-slate-900 text-white opacity-0 group-hover:opacity-100 pointer-events-none'
                                }`}>
                                    {copySuccess ? '✓ Copied!' : 'Copy'}
                                </span>
                            </button>
                        </div>

                        {/* Title Header */}
                        <div className="border-b border-border-light pb-4 sm:pb-5 mb-5 sm:mb-6">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                                {formatMeetingDate(selectedMeeting.dateFormatted || selectedMeeting.date || selectedMeeting.title)}
                            </h1>

                            <div className="space-y-1 text-xs sm:text-sm text-slate-700">
                                <p className="leading-relaxed">
                                    <span className="font-bold text-slate-900 mr-1.5">Date:</span>
                                    <span className="font-semibold text-ribbon-3">{formatMeetingDate(selectedMeeting.dateFormatted || selectedMeeting.date || selectedMeeting.title)}</span>
                                </p>
                                {selectedMeeting.focus && (
                                    <p className="leading-relaxed">
                                        <span className="font-bold text-slate-900 mr-1.5">Focus:</span>
                                        <span className="text-slate-600 font-medium">{selectedMeeting.focus}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Holiday Notification Banner */}
                        {selectedMeeting.isHoliday && (
                            <div className="bg-amber-50/80 border border-amber-200/90 border-l-4 border-l-amber-500 rounded-xl p-4 sm:p-5 mb-6 shadow-xs">
                                <div className="flex items-start sm:items-center gap-3">
                                    <span className="text-2xl sm:text-3xl flex-shrink-0">🎉</span>
                                    <div className="space-y-1">
                                        <h2 className="text-sm sm:text-base font-extrabold text-amber-950">
                                            Official Company Holiday – {selectedMeeting.holidayName || 'Holiday'}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
                                            Operations, workshop maintenance, and administrative offices remained closed in celebration of {selectedMeeting.holidayName || 'Company Holiday'}. No daily operations breakdown or coordination meeting was conducted on this day.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECTION 1: Machine Breakdowns & Site Updates */}
                        {selectedMeeting.breakdowns && selectedMeeting.breakdowns.length > 0 && (
                            <section className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-border-light">
                                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-blue-50 text-theme-breakdown text-xs font-bold border border-blue-100 flex-shrink-0">
                                        1
                                    </span>
                                    <span>Machine Breakdowns & Site Updates</span>
                                </h2>
                                
                                <div className="flex flex-col gap-3 sm:gap-3.5">
                                    {selectedMeeting.breakdowns.map((item, idx) => (
                                        <div key={idx} className="bg-slate-50/70 border border-border-light border-l-4 border-l-theme-breakdown rounded-xl p-3.5 sm:p-4.5 text-xs sm:text-sm shadow-xs flex flex-col gap-2 transition-colors hover:bg-slate-50">
                                            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-2 pb-1.5 border-b border-slate-200/70">
                                                <span className="w-2 h-2 rounded-full bg-theme-breakdown"></span>
                                                <span>{item.site}</span>
                                            </h3>
                                            
                                            <div className="space-y-1.5 text-xs sm:text-sm pt-0.5">
                                                {item.issue && (
                                                    <p className="leading-relaxed">
                                                        <span className="font-bold text-slate-800 mr-1.5">Issue:</span>
                                                        <span className="text-slate-600">{item.issue}</span>
                                                    </p>
                                                )}

                                                {item.action && (
                                                    <p className="leading-relaxed">
                                                        <span className="font-bold text-slate-800 mr-1.5">Action:</span>
                                                        <span className="text-slate-600">{item.action}</span>
                                                    </p>
                                                )}

                                                {item.logistics && (
                                                    <p className="leading-relaxed">
                                                        <span className="font-bold text-slate-800 mr-1.5">Logistics:</span>
                                                        <span className="text-slate-600">{item.logistics}</span>
                                                    </p>
                                                )}

                                                {item.clarification && (
                                                    <p className="leading-relaxed">
                                                        <span className="font-bold text-slate-800 mr-1.5">Clarification:</span>
                                                        <span className="text-slate-600">{item.clarification}</span>
                                                    </p>
                                                )}

                                                {item.status && (
                                                    <p className="leading-relaxed">
                                                        <span className="font-bold text-slate-800 mr-1.5">Status:</span>
                                                        <span className="text-slate-700 font-semibold">{item.status}</span>
                                                    </p>
                                                )}

                                                {item.pendingIssue && (
                                                    <p className="leading-relaxed">
                                                        <span className="font-bold text-amber-900 mr-1.5">Pending Issue:</span>
                                                        <span className="text-amber-800 font-medium">{item.pendingIssue}</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* SECTION 2: Parts, Procurement & Inventory */}
                        {selectedMeeting.parts && selectedMeeting.parts.length > 0 && (
                            <section className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-border-light">
                                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-teal-50 text-theme-parts text-xs font-bold border border-teal-100 flex-shrink-0">
                                        2
                                    </span>
                                    <span>Parts, Procurement & Inventory</span>
                                </h2>
                                
                                <div className="overflow-x-auto rounded-xl border border-border-light shadow-xs">
                                    <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
                                        <thead>
                                            <tr className="bg-slate-100/90 border-b border-border-light text-slate-800 font-bold uppercase text-[10px] sm:text-xs tracking-wider">
                                                <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Part / Equipment</th>
                                                <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Site / Context</th>
                                                <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Status & Next Steps</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedMeeting.parts.map((p, idx) => (
                                                <tr key={idx} className="border-b border-border-light last:border-0 hover:bg-slate-50/80 transition-colors">
                                                    <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 font-bold text-slate-900 min-w-[130px]">{p.part}</td>
                                                    <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 text-slate-600 min-w-[110px]">{p.context}</td>
                                                    <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 text-slate-700 min-w-[180px] font-medium">{p.statusNextSteps}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )}

                        {/* SECTION 3: Policy & Process Directives */}
                        {selectedMeeting.directives && selectedMeeting.directives.length > 0 && (
                            <section className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-border-light">
                                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-amber-50 text-theme-directive text-xs font-bold border border-amber-100 flex-shrink-0">
                                        3
                                    </span>
                                    <span>Policy & Process Directives</span>
                                </h2>
                                
                                <div className="space-y-3">
                                    {selectedMeeting.directives.map((directive, idx) => (
                                        <div key={idx} className="bg-amber-50/70 border border-amber-200/80 border-l-4 border-l-theme-directive rounded-xl p-3.5 sm:p-4.5 shadow-xs space-y-2">
                                            <h3 className="text-xs sm:text-sm font-extrabold text-amber-950 flex items-center gap-1.5">
                                                <span>{directive.title}</span>
                                            </h3>
                                            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-amber-900/90 font-medium pl-1">
                                                {directive.points.map((pt, pIdx) => (
                                                    <li key={pIdx} className="leading-relaxed">{pt}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* SECTION 4: Key Action Items & Ownership */}
                        {selectedMeeting.actionItems && selectedMeeting.actionItems.length > 0 && (
                            <section className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-border-light">
                                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-emerald-50 text-theme-action text-xs font-bold border border-emerald-100 flex-shrink-0">
                                        4
                                    </span>
                                    <span>Key Action Items & Ownership</span>
                                </h2>
                                
                                <div className="bg-emerald-50/70 border border-emerald-200/80 border-l-4 border-l-theme-action rounded-xl p-3.5 sm:p-4.5 shadow-xs space-y-2.5">
                                    {selectedMeeting.actionItems.map((item, idx) => (
                                        <div key={idx} className="text-xs sm:text-sm flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-100/90 text-emerald-950 font-extrabold text-[11px] sm:text-xs flex-shrink-0 self-start">
                                                {item.person}
                                            </span>
                                            <span className="text-slate-700 font-medium">{item.task}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Document Footer Controls */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
                                <button 
                                    type="button"
                                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-800 border border-border-light hover:bg-stage-bg hover:border-slate-400 active:scale-95 transition-all shadow-xs min-h-[44px] cursor-pointer"
                                    onClick={() => {
                                        setSelectedMeeting(null);
                                        scrollToTop();
                                    }}
                                >
                                    ← All Summaries
                                </button>

                                {(prevMeeting || nextMeeting) && (
                                    <div className="grid grid-cols-2 sm:flex items-center gap-2 sm:gap-2 flex-1 sm:flex-initial">
                                        {prevMeeting ? (
                                            <button 
                                                type="button"
                                                className="inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-700 border border-border-light hover:bg-stage-bg hover:border-ribbon-4 hover:text-ribbon-4 active:scale-95 transition-all shadow-xs min-h-[44px] cursor-pointer"
                                                onClick={() => handleSelectMeeting(prevMeeting)}
                                                title={`Previous: ${formatMeetingDate(prevMeeting.dateFormatted || prevMeeting.date || prevMeeting.title)}`}
                                            >
                                                ← Prev Day
                                            </button>
                                        ) : (
                                            <div className="hidden sm:block" />
                                        )}
                                        {nextMeeting ? (
                                            <button 
                                                type="button"
                                                className="inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-700 border border-border-light hover:bg-stage-bg hover:border-ribbon-4 hover:text-ribbon-4 active:scale-95 transition-all shadow-xs min-h-[44px] cursor-pointer"
                                                onClick={() => handleSelectMeeting(nextMeeting)}
                                                title={`Next: ${formatMeetingDate(nextMeeting.dateFormatted || nextMeeting.date || nextMeeting.title)}`}
                                            >
                                                Next Day →
                                            </button>
                                        ) : (
                                            <div className="hidden sm:block" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* GRID VIEW */
                <>
                    {/* Page Hero Banner with Choose Date & Month Filter */}
                    <div className="bg-white border-b border-border-light p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-xs">
                        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex flex-col">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                                    Choose Date
                                </h1>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none w-full md:w-auto py-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
                                    Filter:
                                </span>
                                {availableMonths.map(m => (
                                    <button 
                                        key={m.key} 
                                        type="button"
                                        className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border min-h-[38px] ${
                                            selectedMonth === m.key 
                                                ? 'bg-theme-breakdown text-white border-theme-breakdown shadow-pill-active' 
                                                : 'bg-white text-slate-700 border-border-dark hover:bg-slate-50'
                                        }`}
                                        onClick={() => setSelectedMonth(m.key)}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full">
                        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-semibold mb-4">
                            <span>Showing {filteredMeetings.length} Meeting Summary Record(s)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5">
                            {filteredMeetings.map((meeting) => (
                                meeting.isHoliday ? (
                                    <div 
                                        key={meeting.id} 
                                        className="bg-white border border-border-light border-t-4 border-t-amber-500 rounded-xl p-4 sm:p-5 shadow-card flex flex-col justify-between min-h-[140px] select-none"
                                    >
                                        <div>
                                            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                                                {formatMeetingDate(meeting.dateFormatted || meeting.date || meeting.title)}
                                            </h2>
                                            <div className="mt-2.5">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100/90 text-amber-900 font-extrabold text-xs">
                                                    🎉 Holiday: {meeting.holidayName || 'Rakshabandhan'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                                <span>No Meeting Held</span>
                                            </span>
                                            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded">
                                                Official Holiday
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div 
                                        key={meeting.id} 
                                        className="bg-white border border-border-light border-t-4 border-t-theme-breakdown rounded-xl p-4 sm:p-5 shadow-card hover:shadow-card-hover hover:-translate-y-1 cursor-pointer transition-all duration-300 flex flex-col justify-between group min-h-[140px]"
                                        onClick={() => handleSelectMeeting(meeting)}
                                    >
                                        <div>
                                            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-theme-breakdown transition-colors">
                                                {formatMeetingDate(meeting.dateFormatted || meeting.date || meeting.title)}
                                            </h2>
                                            <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                                                {meeting.focus}
                                            </p>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-theme-breakdown">
                                            <span>View Document</span>
                                            <span className="transition-transform group-hover:translate-x-1">→</span>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        {filteredMeetings.length === 0 && (
                            <div className="text-center py-12 px-4 bg-white border border-border-light rounded-xl max-w-md mx-auto my-8 shadow-xs">
                                <span className="text-4xl mb-3 block">📅</span>
                                <h3 className="text-base font-extrabold text-slate-900 mb-1">No meeting summaries found</h3>
                                <p className="text-xs sm:text-sm text-slate-500 mb-4">No summaries matched "{currentSearchQuery}".</p>
                                <button 
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white text-slate-800 border border-border-light hover:bg-stage-bg active:scale-95 transition-all shadow-xs min-h-[44px]" 
                                    onClick={() => updateSearchQuery('')}
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Floating Scroll-to-Top Action Button */}
            <button
                type="button"
                onClick={scrollToTop}
                className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-border-light shadow-card hover:shadow-hover text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-ribbon-4 hover:to-ribbon-3 flex items-center justify-center transition-all duration-300 transform active:scale-90 group min-w-[44px] min-h-[44px] ${
                    showScrollTop 
                        ? 'opacity-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
                title="Scroll back to top"
                aria-label="Scroll back to top"
            >
                <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>

            {useModalView && (
                <MeetingDetailModal 
                    selectedMeeting={selectedMeeting} 
                    setSelectedMeeting={setSelectedMeeting} 
                />
            )}
        </div>
    );
}
