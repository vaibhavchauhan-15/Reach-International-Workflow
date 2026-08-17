import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CoverSlide from './components/CoverSlide';
import FlowNodeCard from './components/FlowNodeCard';
import SlideDeckGrid from './components/SlideDeckGrid';
import NodeDetailModal from './components/NodeDetailModal';
import { slidesData, totalSlides } from './data/workflowsData';

export default function WorkflowPresentation() {
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
        const timer = setTimeout(() => {
            checkScrollState();
        }, 60);

        window.addEventListener('resize', checkScrollState);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkScrollState);
        };
    }, [currentSlide, checkScrollState]);

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
        if (isGridOpen || selectedNode) return;
        
        // Allow horizontal scroll inside flowchart wrapper without triggering slide navigation
        if (e.target.closest && (e.target.closest('.visual-flowchart') || e.target.closest('.flowchart-scroll-wrapper'))) {
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
    }, [isGridOpen, selectedNode, nextSlide, prevSlide]);

    // Touch Swipe Gesture Handlers
    const handleTouchStart = useCallback((e) => {
        if (isGridOpen || selectedNode) return;
        const touch = e.touches[0];
        const isFlowchart = !!(e.target.closest && e.target.closest('.visual-flowchart'));
        touchStartRef.current = { x: touch.clientX, y: touch.clientY, isFlowchart };
    }, [isGridOpen, selectedNode]);

    const handleTouchEnd = useCallback((e) => {
        if (isGridOpen || selectedNode) return;

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
    }, [isGridOpen, selectedNode, nextSlide, prevSlide]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isGridOpen || selectedNode) return;

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
    }, [isGridOpen, selectedNode, nextSlide, prevSlide, toggleFullscreen]);

    // Preload Adjacent Slide Images Silently for Instantaneous Load Speed
    useEffect(() => {
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
    }, [currentSlide]);

    const activeSlideData = slidesData[currentSlide];

    return (
        <div 
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <Header 
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
            />

            {/* 16:9 Presentation Stage */}
            <main className="presentation-container">
                <div className="ppt-stage-frame">
                    <section key={currentSlide} className={`slide-card active slide-enter-${slideDirection}`}>
                        {activeSlideData.isCover ? (
                            <CoverSlide goToSlide={goToSlide} toggleFullscreen={toggleFullscreen} />
                        ) : (
                            <>
                                <div className="slide-header">
                                    <div className="slide-tag">
                                        {activeSlideData.tag}
                                    </div>
                                    <h2>{activeSlideData.title}</h2>
                                </div>

                                <div className="flowchart-scroll-wrapper">
                                    {canScrollLeft && (
                                        <button 
                                            type="button" 
                                            className="flow-scroll-btn left"
                                            onClick={() => scrollFlowchart('left')}
                                            title="Scroll left to view previous steps"
                                            aria-label="Scroll left"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </button>
                                    )}

                                    {canScrollRight && (
                                        <button 
                                            type="button" 
                                            className="flow-scroll-btn right"
                                            onClick={() => scrollFlowchart('right')}
                                            title="Scroll right to view more steps"
                                            aria-label="Scroll right"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </button>
                                    )}

                                    {canScrollLeft && <div className="scroll-shadow-left" />}
                                    {canScrollRight && <div className="scroll-shadow-right" />}

                                    <div 
                                        ref={flowchartRef}
                                        className={`visual-flowchart horizontal-flow ${activeSlideData.nodes && activeSlideData.nodes.length > 5 ? 'has-many-nodes' : ''}`}
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
                                                        <div className="flow-arrow">
                                                            <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
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
        </div>
    );
}

