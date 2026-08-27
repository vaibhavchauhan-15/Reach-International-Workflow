import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CoverSlide from './components/CoverSlide';
import FlowNodeCard from './components/FlowNodeCard';
import SlideDeckGrid from './components/SlideDeckGrid';
import NodeDetailModal from './components/NodeDetailModal';
import LandingPage from './components/LandingPage';
import MeetingSummariesPage from './components/MeetingSummariesPage';
import { slidesData, totalSlides } from './data/workflowsData';

export default function WorkflowPresentation() {
    const [activePage, setActivePage] = useState('landing'); // 'landing' | 'workflows' | 'meetings'
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideDirection, setSlideDirection] = useState('right');
    const [isGridOpen, setIsGridOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isWalkthroughActive, setIsWalkthroughActive] = useState(false);
    const [isWalkthroughPaused, setIsWalkthroughPaused] = useState(false);
    const [activeWalkthroughStep, setActiveWalkthroughStep] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [meetingSearchQuery, setMeetingSearchQuery] = useState('');
    const [selectedMeeting, setSelectedMeeting] = useState(null);

    const walkthroughTimerRef = useRef(null);
    const scrollLockRef = useRef(false);
    const touchStartRef = useRef({ x: 0, y: 0, isFlowchart: false });
    const flowchartRef = useRef(null);

    const checkScrollState = useCallback(() => {
        const el = flowchartRef.current;
        if (!el) {
            setCanScrollLeft(false);
            setCanScrollRight(false);
            return;
        }
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const maxScroll = scrollWidth - clientWidth;
        setCanScrollLeft(scrollLeft > 6);
        setCanScrollRight(maxScroll - scrollLeft > 6);
    }, []);

    const scrollFlowchart = useCallback((direction) => {
        const el = flowchartRef.current;
        if (!el) return;
        const scrollDistance = el.clientWidth * 0.65;
        el.scrollBy({
            left: direction === 'left' ? -scrollDistance : scrollDistance,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        if (activePage !== 'workflows') return;
        const timer = setTimeout(() => {
            checkScrollState();
        }, 60);

        window.addEventListener('resize', checkScrollState);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkScrollState);
        };
    }, [currentSlide, checkScrollState, activePage]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement));
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        return () => {
            if (walkthroughTimerRef.current) {
                clearInterval(walkthroughTimerRef.current);
            }
        };
    }, []);

    const clearWalkthroughTimer = useCallback(() => {
        if (walkthroughTimerRef.current) {
            clearInterval(walkthroughTimerRef.current);
            walkthroughTimerRef.current = null;
        }
    }, []);

    const stopWalkthrough = useCallback(() => {
        clearWalkthroughTimer();
        setIsWalkthroughActive(false);
        setIsWalkthroughPaused(false);
        setActiveWalkthroughStep(null);
    }, [clearWalkthroughTimer]);

    const goToSlide = useCallback((idx) => {
        if (idx >= 0 && idx < totalSlides) {
            stopWalkthrough();
            setCurrentSlide(prev => {
                setSlideDirection(idx >= prev ? 'right' : 'left');
                return idx;
            });
        }
    }, [stopWalkthrough]);

    const nextSlide = useCallback(() => {
        stopWalkthrough();
        setSlideDirection('right');
        setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, [stopWalkthrough]);

    const prevSlide = useCallback(() => {
        stopWalkthrough();
        setSlideDirection('left');
        setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
    }, [stopWalkthrough]);

    const runWalkthroughFromStep = useCallback((startStep) => {
        clearWalkthroughTimer();
        const currentNodes = slidesData[currentSlide]?.nodes;
        if (!currentNodes || currentNodes.length === 0) {
            alert('Switch to a workflow slide to start step walkthrough.');
            stopWalkthrough();
            return;
        }

        setIsWalkthroughActive(true);
        setIsWalkthroughPaused(false);
        setActiveWalkthroughStep(startStep);

        let step = startStep;
        walkthroughTimerRef.current = setInterval(() => {
            step += 1;
            if (step < currentNodes.length) {
                setActiveWalkthroughStep(step);
            } else {
                stopWalkthrough();
            }
        }, 2000);
    }, [currentSlide, clearWalkthroughTimer, stopWalkthrough]);

    const startWalkthrough = useCallback(() => {
        runWalkthroughFromStep(0);
    }, [runWalkthroughFromStep]);

    const pauseWalkthrough = useCallback(() => {
        clearWalkthroughTimer();
        setIsWalkthroughPaused(true);
    }, [clearWalkthroughTimer]);

    const resumeWalkthrough = useCallback(() => {
        const stepToResume = activeWalkthroughStep !== null ? activeWalkthroughStep : 0;
        runWalkthroughFromStep(stepToResume);
    }, [activeWalkthroughStep, runWalkthroughFromStep]);

    const resetWalkthrough = useCallback(() => {
        runWalkthroughFromStep(0);
    }, [runWalkthroughFromStep]);

    const toggleFullscreen = useCallback(() => {
        const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
        if (!isFS) {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen().catch(err => {
                    console.error("Error attempting to enable fullscreen:", err);
                });
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(err => {
                    console.error("Error attempting to exit fullscreen:", err);
                });
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }, []);

    // Smooth Mouse Wheel / Trackpad Scroll Navigation
    const handleWheel = useCallback((e) => {
        if (isGridOpen || selectedNode || activePage !== 'workflows') return;
        
        // Allow horizontal scroll inside flowchart wrapper without triggering slide navigation
        if (e.target.closest && (e.target.closest('.visual-flowchart-area') || e.target.closest('.flowchart-scroll-wrapper'))) {
            return;
        }

        if (scrollLockRef.current) return;

        const deltaY = e.deltaY;
        const deltaX = e.deltaX;
        const threshold = 25;

        if (Math.abs(deltaY) > threshold || Math.abs(deltaX) > threshold) {
            scrollLockRef.current = true;

            if (deltaY > 0 || deltaX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }

            setTimeout(() => {
                scrollLockRef.current = false;
            }, 380);
        }
    }, [isGridOpen, selectedNode, activePage, nextSlide, prevSlide]);

    // Touch Swipe Gesture Handlers
    const handleTouchStart = useCallback((e) => {
        if (isGridOpen || selectedNode || activePage !== 'workflows') return;
        const touch = e.touches[0];
        const isFlowchart = !!(e.target.closest && e.target.closest('.visual-flowchart-area'));
        touchStartRef.current = { x: touch.clientX, y: touch.clientY, isFlowchart };
    }, [isGridOpen, selectedNode, activePage]);

    const handleTouchEnd = useCallback((e) => {
        if (isGridOpen || selectedNode || activePage !== 'workflows') return;

        // If swipe originated inside flowchart and flowchart has horizontal scroll space, let native scroll handle it
        if (touchStartRef.current.isFlowchart) {
            const el = flowchartRef.current;
            if (el && el.scrollWidth > el.clientWidth + 10) {
                return;
            }
        }

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;

        // Ensure horizontal swipe is dominant so vertical page scrolling on mobile isn't disrupted
        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.8) {
            if (deltaX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }, [isGridOpen, selectedNode, activePage, nextSlide, prevSlide]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isGridOpen || selectedNode || activePage !== 'workflows') return;

            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'f' || e.key === 'F') {
                toggleFullscreen();
            } else if (e.key === 'g' || e.key === 'G') {
                setIsGridOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGridOpen, selectedNode, activePage, nextSlide, prevSlide, toggleFullscreen]);

    // Preload Adjacent Slide Images Silently for Instantaneous Load Speed
    useEffect(() => {
        if (activePage !== 'workflows') return;

        const preloadSlideImages = (slideIdx) => {
            const slide = slidesData[slideIdx];
            if (!slide || !slide.nodes) return;
            slide.nodes.forEach(node => {
                if (node.photo) {
                    const img = new Image();
                    img.src = node.photo;
                }
            });
        };

        const idleId = window.requestIdleCallback ? window.requestIdleCallback(() => {
            const nextIdx = (currentSlide + 1) % totalSlides;
            const prevIdx = (currentSlide - 1 + totalSlides) % totalSlides;
            preloadSlideImages(nextIdx);
            preloadSlideImages(prevIdx);
        }) : setTimeout(() => {
            const nextIdx = (currentSlide + 1) % totalSlides;
            const prevIdx = (currentSlide - 1 + totalSlides) % totalSlides;
            preloadSlideImages(nextIdx);
            preloadSlideImages(prevIdx);
        }, 100);

        return () => {
            if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
            else clearTimeout(idleId);
        };
    }, [currentSlide, activePage]);

    const activeSlideData = slidesData[currentSlide];

    return (
        <div 
            className="w-full h-full flex flex-col overflow-hidden bg-white"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {(activePage !== 'meetings' || !selectedMeeting) && (
                <Header 
                    activePage={activePage}
                    setActivePage={(page) => {
                        if (page !== activePage) {
                            setSelectedMeeting(null);
                        }
                        setActivePage(page);
                    }}
                    currentSlide={currentSlide}
                    totalSlides={totalSlides}
                    isWalkthroughActive={isWalkthroughActive}
                    isWalkthroughPaused={isWalkthroughPaused}
                    startWalkthrough={startWalkthrough}
                    pauseWalkthrough={pauseWalkthrough}
                    resumeWalkthrough={resumeWalkthrough}
                    resetWalkthrough={resetWalkthrough}
                    setIsGridOpen={setIsGridOpen}
                    toggleFullscreen={toggleFullscreen}
                    isFullscreen={isFullscreen}
                    searchQuery={meetingSearchQuery}
                    setSearchQuery={setMeetingSearchQuery}
                />
            )}

            {/* Page Content Switcher */}
            {activePage === 'workflows' && (
                <>
                    {/* 16:9 Presentation Stage Container */}
                    <main className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 bg-white relative overflow-hidden">
                        <div className="w-full max-w-[1440px] md:aspect-video md:max-h-[82vh] h-full relative bg-white rounded-xl md:rounded-2xl shadow-card border border-border-light overflow-hidden flex flex-col">
                            <section 
                                key={currentSlide} 
                                className={`absolute inset-0 p-3.5 sm:p-5 md:p-7 flex flex-col bg-white text-slate-900 overflow-y-auto scrollbar-none will-change-transform contain-content ${
                                    slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'
                                }`}
                            >
                                {activeSlideData.isCover ? (
                                    <CoverSlide goToSlide={goToSlide} toggleFullscreen={toggleFullscreen} />
                                ) : (
                                    <>
                                        {/* Slide Header */}
                                        <div className="mb-3 sm:mb-4 border-b-2 border-border-light pb-2 sm:pb-3 flex-shrink-0">
                                            <div className="inline-block bg-stage-bg text-ribbon-3 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase mb-1.5 border border-border-light">
                                                {activeSlideData.tag}
                                            </div>
                                            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                                                {activeSlideData.title}
                                            </h2>
                                        </div>

                                        {/* Flowchart Scroll Wrapper */}
                                        <div className="flowchart-scroll-wrapper relative w-full my-auto flex items-center">
                                            {canScrollLeft && (
                                                <button 
                                                    type="button" 
                                                    className="hidden md:flex absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-border-light shadow-lg text-slate-800 items-center justify-center cursor-pointer hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:scale-110 active:scale-95 transition-all opacity-95"
                                                    onClick={() => scrollFlowchart('left')}
                                                    title="Scroll left to view previous steps"
                                                    aria-label="Scroll left"
                                                >
                                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="15 18 9 12 15 6"></polyline>
                                                    </svg>
                                                </button>
                                            )}

                                            {canScrollRight && (
                                                <button 
                                                    type="button" 
                                                    className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-border-light shadow-lg text-slate-800 items-center justify-center cursor-pointer hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:scale-110 active:scale-95 transition-all opacity-95"
                                                    onClick={() => scrollFlowchart('right')}
                                                    title="Scroll right to view more steps"
                                                    aria-label="Scroll right"
                                                >
                                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="9 18 15 12 9 6"></polyline>
                                                    </svg>
                                                </button>
                                            )}

                                            {canScrollLeft && <div className="hidden md:block absolute top-0 bottom-0 left-0 w-7 pointer-events-none z-10 bg-gradient-to-r from-white/95 to-transparent transition-opacity" />}
                                            {canScrollRight && <div className="hidden md:block absolute top-0 bottom-0 right-0 w-7 pointer-events-none z-10 bg-gradient-to-l from-white/95 to-transparent transition-opacity" />}

                                            {/* Visual Flowchart Timeline */}
                                            <div 
                                                ref={flowchartRef}
                                                className={`visual-flowchart-area flex-1 my-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-2 p-1 md:py-3 md:px-1 w-full md:overflow-x-auto md:snap-x md:snap-proximity scrollbar-none ${
                                                    activeSlideData.nodes && activeSlideData.nodes.length > 5 ? 'md:justify-start md:gap-3' : ''
                                                }`}
                                                onScroll={checkScrollState}
                                            >
                                                {activeSlideData.nodes && activeSlideData.nodes.map((node, nIdx) => {
                                                    const isNodeActive = activeWalkthroughStep === nIdx;
                                                    return (
                                                        <React.Fragment key={nIdx}>
                                                            <FlowNodeCard 
                                                                node={node}
                                                                nIdx={nIdx}
                                                                isNodeActive={isNodeActive}
                                                                goToSlide={goToSlide}
                                                                setSelectedNode={setSelectedNode}
                                                            />

                                                            {nIdx < activeSlideData.nodes.length - 1 && (
                                                                <div className="flex items-center justify-center my-0.5 md:my-0 flex-shrink-0 text-ribbon-4">
                                                                    <svg viewBox="0 0 24 24" className="w-5 h-5 rotate-90 md:rotate-0 animate-move-arrow-vertical md:animate-none">
                                                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </section>
                        </div>
                    </main>

                    <Footer 
                        currentSlide={currentSlide}
                        totalSlides={totalSlides}
                        prevSlide={prevSlide}
                        nextSlide={nextSlide}
                        goToSlide={goToSlide}
                    />

                    <SlideDeckGrid 
                        isGridOpen={isGridOpen}
                        setIsGridOpen={setIsGridOpen}
                        slidesData={slidesData}
                        currentSlide={currentSlide}
                        goToSlide={goToSlide}
                    />

                    <NodeDetailModal 
                        selectedNode={selectedNode}
                        setSelectedNode={setSelectedNode}
                        goToSlide={goToSlide}
                    />
                </>
            )}

            {activePage === 'landing' && <LandingPage setActivePage={setActivePage} totalSlides={totalSlides} />}

            {activePage === 'meetings' && (
                <MeetingSummariesPage 
                    searchQuery={meetingSearchQuery} 
                    setSearchQuery={setMeetingSearchQuery}
                    selectedMeeting={selectedMeeting}
                    setSelectedMeeting={setSelectedMeeting}
                />
            )}
        </div>
    );
}
