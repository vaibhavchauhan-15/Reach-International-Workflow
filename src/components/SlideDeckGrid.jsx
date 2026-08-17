import React from 'react';

export default function SlideDeckGrid({ isGridOpen, setIsGridOpen, slidesData, currentSlide, goToSlide }) {
    if (!isGridOpen) return null;

    return (
        <div className="modal-overlay active" onClick={() => setIsGridOpen(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Operational Flowcharts Slide Index</h3>
                    <button className="close-btn" onClick={() => setIsGridOpen(false)}>×</button>
                </div>
                <div className="grid-slides-container">
                    {slidesData.map((slide, idx) => (
                        <div 
                            key={idx} 
                            className={`grid-thumb-card ${currentSlide === idx ? 'active' : ''}`}
                            onClick={() => {
                                goToSlide(idx);
                                setIsGridOpen(false);
                            }}
                        >
                            <span className="thumb-tag">{slide.isCover ? 'START' : `SLIDE 0${idx}`}</span>
                            <div className="thumb-title">{slide.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
