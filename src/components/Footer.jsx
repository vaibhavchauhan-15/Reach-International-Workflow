import React from 'react';

export default function Footer({ currentSlide, totalSlides, prevSlide, nextSlide, goToSlide }) {
    return (
        <footer className="slide-footer">
            <button className="nav-arrow-btn" onClick={prevSlide} title="Previous Slide (Left Arrow)">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                <span>Previous</span>
            </button>

            <div className="slide-thumbnails-bar">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                        key={idx}
                        className={`dot-btn ${currentSlide === idx ? 'active' : ''}`}
                        onClick={() => goToSlide(idx)}
                        title={`Slide ${idx + 1}`}
                    />
                ))}
            </div>

            <button className="nav-arrow-btn primary-nav-btn" onClick={nextSlide} title="Next Slide (Right Arrow)">
                <span>Next</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
        </footer>
    );
}
