import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CoverSlide from './components/CoverSlide';
import FlowNodeCard from './components/FlowNodeCard';
import SlideDeckGrid from './components/SlideDeckGrid';
import NodeDetailModal from './components/NodeDetailModal';
import { slidesData, totalSlides } from './data/workflowsData';

export default function WorkflowPresentation() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isGridOpen, setIsGridOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isWalkthroughActive, setIsWalkthroughActive] = useState(false);
    const [activeWalkthroughStep, setActiveWalkthroughStep] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const walkthroughTimerRef = useRef(null);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, []);

    const goToSlide = (idx) => {
        if (idx >= 0 && idx < totalSlides) {
            stopWalkthrough();
            setCurrentSlide(idx);
        }
    };

    const nextSlide = () => {
        goToSlide((currentSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    };

    const stopWalkthrough = () => {
        if (walkthroughTimerRef.current) {
            clearInterval(walkthroughTimerRef.current);
            walkthroughTimerRef.current = null;
        }
        setIsWalkthroughActive(false);
        setActiveWalkthroughStep(null);
    };

    const toggleWalkthrough = () => {
        if (isWalkthroughActive) {
            stopWalkthrough();
        } else {
            const currentNodes = slidesData[currentSlide].nodes;
            if (!currentNodes || currentNodes.length === 0) {
                alert('Switch to a workflow slide to start step walkthrough.');
                return;
            }
            setIsWalkthroughActive(true);
            let step = 0;
            setActiveWalkthroughStep(0);

            walkthroughTimerRef.current = setInterval(() => {
                step = (step + 1) % currentNodes.length;
                setActiveWalkthroughStep(step);
            }, 2000);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error("Error attempting to enable fullscreen:", err);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(err => {
                    console.error("Error attempting to exit fullscreen:", err);
                });
            }
        }
    };

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
    }, [currentSlide, isGridOpen, selectedNode]);

    const activeSlideData = slidesData[currentSlide];

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Header 
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                isWalkthroughActive={isWalkthroughActive}
                toggleWalkthrough={toggleWalkthrough}
                setIsGridOpen={setIsGridOpen}
                toggleFullscreen={toggleFullscreen}
                isFullscreen={isFullscreen}
            />

            {/* 16:9 Presentation Stage */}
            <main className="presentation-container">
                <div className="ppt-stage-frame">
                    <section className="slide-card active">
                        {activeSlideData.isCover ? (
                            <CoverSlide goToSlide={goToSlide} />
                        ) : (
                            <>
                                <div className="slide-header">
                                    <div className="slide-tag">{activeSlideData.tag}</div>
                                    <h2>{activeSlideData.title}</h2>
                                    <p className="slide-desc">{activeSlideData.desc}</p>
                                </div>

                                <div className="visual-flowchart horizontal-flow">
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
            />
        </div>
    );
}
