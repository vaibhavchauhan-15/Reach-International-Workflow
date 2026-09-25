import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * PresentationOverlay Component
 * PowerPoint-style presentation mode with:
 * - 60fps Laser Pointer with click pulse
 * - Wide text highlighter brush
 * - Fine-point drawing pen
 * - Stroke eraser & undo/clear
 * - Scroll-anchored HTML5 Canvas layer
 * - Floating dark-glass presenter toolbar
 * - Keyboard shortcuts (P, H, D, E, F, Ctrl+Z, Esc)
 */
export default function PresentationOverlay({
    containerRef,
    contentRef,
    onClose,
    meetingTitle = 'Daily Meeting Report'
}) {
    // Tool states
    const [activeTool, setActiveTool] = useState('pointer'); // 'pointer' | 'highlighter' | 'pen' | 'eraser'
    const [activeColor, setActiveColor] = useState('#facc15'); // Yellow for highlighter, Red for pen default
    const [isToolbarMinimized, setIsToolbarMinimized] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));
    const [showColorPicker, setShowColorPicker] = useState(false);

    // Laser pointer coordinate states
    const [laserPos, setLaserPos] = useState({ x: -100, y: -100, visible: false });
    const [laserRings, setLaserRings] = useState([]);

    // Stroke history for canvas
    const strokesRef = useRef([]); // [{ id, tool, color, width, points: [{x, y}] }]
    const [strokeCount, setStrokeCount] = useState(0);

    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);
    const currentStrokeRef = useRef(null);
    const animFrameRef = useRef(null);

    // Color swatches
    const HIGHLIGHT_COLORS = [
        { name: 'Yellow', hex: '#facc15', label: 'Yellow Highlight' },
        { name: 'Cyan', hex: '#22d3ee', label: 'Cyan Highlight' },
        { name: 'Green', hex: '#4ade80', label: 'Green Highlight' },
        { name: 'Pink', hex: '#f472b6', label: 'Pink Highlight' }
    ];

    const PEN_COLORS = [
        { name: 'Red', hex: '#ef4444', label: 'Red Ink' },
        { name: 'Blue', hex: '#3b82f6', label: 'Blue Ink' },
        { name: 'Emerald', hex: '#10b981', label: 'Emerald Ink' },
        { name: 'Amber', hex: '#f59e0b', label: 'Amber Ink' }
    ];

    const activeSwatches = activeTool === 'pen' ? PEN_COLORS : HIGHLIGHT_COLORS;

    // Fullscreen toggle
    const toggleFullscreen = useCallback(async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                    setIsFullscreen(false);
                }
            }
        } catch {
            // Graceful fallback for devices without fullscreen support
        }
    }, []);

    // Sync fullscreen state changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // -------------------------------------------------------------
    // Canvas Redraw Logic
    // -------------------------------------------------------------
    const redrawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render each stored stroke
        strokesRef.current.forEach(stroke => {
            if (!stroke.points || stroke.points.length < 2) return;

            ctx.save();
            ctx.beginPath();
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            if (stroke.tool === 'highlighter') {
                ctx.globalAlpha = 0.42;
                ctx.lineWidth = stroke.width || 24;
                ctx.strokeStyle = stroke.color;
            } else {
                ctx.globalAlpha = 0.95;
                ctx.lineWidth = stroke.width || 3;
                ctx.strokeStyle = stroke.color;
            }

            ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
            for (let i = 1; i < stroke.points.length; i++) {
                ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
            }
            ctx.stroke();
            ctx.restore();
        });
    }, []);

    // -------------------------------------------------------------
    // Resize Canvas to Match Content Height & Width
    // -------------------------------------------------------------
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const content = contentRef?.current;
        if (!canvas || !content) return;

        const rect = content.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const targetWidth = Math.max(content.scrollWidth, rect.width, 300);
        const targetHeight = Math.max(content.scrollHeight, rect.height, 300);

        if (canvas.width !== targetWidth * dpr || canvas.height !== targetHeight * dpr) {
            canvas.width = targetWidth * dpr;
            canvas.height = targetHeight * dpr;
            canvas.style.width = `${targetWidth}px`;
            canvas.style.height = `${targetHeight}px`;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.scale(dpr, dpr);
            }
            redrawCanvas();
        }
    }, [contentRef, redrawCanvas]);

    useEffect(() => {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        const observer = new ResizeObserver(resizeCanvas);
        if (contentRef?.current) {
            observer.observe(contentRef.current);
        }
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            observer.disconnect();
        };
    }, [contentRef, resizeCanvas]);

    // -------------------------------------------------------------
    // Laser Pointer Global Tracking
    // -------------------------------------------------------------
    useEffect(() => {
        if (activeTool !== 'pointer') {
            setLaserPos(prev => ({ ...prev, visible: false }));
            return;
        }

        const handlePointerMove = (e) => {
            setLaserPos({ x: e.clientX, y: e.clientY, visible: true });
        };

        const handlePointerLeave = () => {
            setLaserPos(prev => ({ ...prev, visible: false }));
        };

        const handleClick = (e) => {
            // Ignore clicks on floating toolbar
            if (e.target.closest('.presentation-toolbar')) return;

            const newRing = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
            setLaserRings(prev => [...prev.slice(-4), newRing]);

            setTimeout(() => {
                setLaserRings(prev => prev.filter(r => r.id !== newRing.id));
            }, 600);
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('pointerleave', handlePointerLeave);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerleave', handlePointerLeave);
            window.removeEventListener('click', handleClick);
        };
    }, [activeTool]);

    // -------------------------------------------------------------
    // Canvas Drawing Pointer Events
    // -------------------------------------------------------------
    const getCanvasCoordinates = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }, []);

    const handlePointerDown = (e) => {
        if (activeTool === 'pointer') return;
        e.currentTarget.setPointerCapture(e.pointerId);

        const coords = getCanvasCoordinates(e);
        isDrawingRef.current = true;

        if (activeTool === 'eraser') {
            // Erase any stroke near coords
            eraseStrokeAt(coords);
            return;
        }

        const newStroke = {
            id: Date.now() + Math.random(),
            tool: activeTool,
            color: activeColor,
            width: activeTool === 'highlighter' ? 24 : 3,
            points: [coords]
        };

        currentStrokeRef.current = newStroke;
        strokesRef.current.push(newStroke);
        setStrokeCount(strokesRef.current.length);
    };

    const handlePointerMove = (e) => {
        if (!isDrawingRef.current || activeTool === 'pointer') return;
        const coords = getCanvasCoordinates(e);

        if (activeTool === 'eraser') {
            eraseStrokeAt(coords);
            return;
        }

        if (currentStrokeRef.current) {
            currentStrokeRef.current.points.push(coords);
            if (!animFrameRef.current) {
                animFrameRef.current = requestAnimationFrame(() => {
                    redrawCanvas();
                    animFrameRef.current = null;
                });
            }
        }
    };

    const handlePointerUp = (e) => {
        if (!isDrawingRef.current) return;
        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
            // Ignore pointer capture release exceptions
        }
        isDrawingRef.current = false;
        currentStrokeRef.current = null;
        redrawCanvas();
    };

    // Eraser helper: remove any stroke within 20px radius
    const eraseStrokeAt = (coords) => {
        const radius = 20;
        const initialCount = strokesRef.current.length;
        strokesRef.current = strokesRef.current.filter(stroke => {
            return !stroke.points.some(pt => {
                const dx = pt.x - coords.x;
                const dy = pt.y - coords.y;
                return Math.sqrt(dx * dx + dy * dy) < radius;
            });
        });
        if (strokesRef.current.length !== initialCount) {
            setStrokeCount(strokesRef.current.length);
            redrawCanvas();
        }
    };

    // Undo last stroke
    const handleUndo = () => {
        if (strokesRef.current.length === 0) return;
        strokesRef.current.pop();
        setStrokeCount(strokesRef.current.length);
        redrawCanvas();
    };

    // Clear all strokes
    const handleClearAll = () => {
        strokesRef.current = [];
        setStrokeCount(0);
        redrawCanvas();
    };

    // Switch tool and sync color default
    const handleSelectTool = (tool) => {
        setActiveTool(tool);
        if (tool === 'highlighter' && !HIGHLIGHT_COLORS.some(c => c.hex === activeColor)) {
            setActiveColor('#facc15');
        } else if (tool === 'pen' && !PEN_COLORS.some(c => c.hex === activeColor)) {
            setActiveColor('#ef4444');
        }
    };

    // -------------------------------------------------------------
    // Keyboard Hotkeys (P, H, D, E, F, Ctrl+Z, Esc)
    // -------------------------------------------------------------
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                onClose?.();
            } else if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
                e.preventDefault();
                handleUndo();
            } else if (e.key === 'p' || e.key === 'P') {
                handleSelectTool('pointer');
            } else if (e.key === 'h' || e.key === 'H') {
                handleSelectTool('highlighter');
            } else if (e.key === 'd' || e.key === 'D' || e.key === 'b' || e.key === 'B') {
                handleSelectTool('pen');
            } else if (e.key === 'e' || e.key === 'E') {
                handleSelectTool('eraser');
            } else if (e.key === 'f' || e.key === 'F') {
                toggleFullscreen();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, toggleFullscreen]);

    // -------------------------------------------------------------
    // Render
    // -------------------------------------------------------------
    return (
        <>
            {/* 1. Scroll-Anchored Canvas Layer (Over Document Card) */}
            <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`absolute inset-0 z-30 select-none ${
                    activeTool === 'pointer' 
                        ? 'pointer-events-none' 
                        : 'pointer-events-auto cursor-crosshair'
                }`}
                style={{
                    touchAction: activeTool === 'pointer' ? 'pan-y' : 'none'
                }}
            />

            {/* 2. Floating Laser Pointer Dot & Click Rings */}
            {activeTool === 'pointer' && laserPos.visible && typeof document !== 'undefined' && createPortal(
                <div
                    className="laser-pointer-dot"
                    style={{
                        left: `${laserPos.x}px`,
                        top: `${laserPos.y}px`
                    }}
                    aria-hidden="true"
                />,
                document.body
            )}

            {laserRings.map(ring => typeof document !== 'undefined' && createPortal(
                <div
                    key={ring.id}
                    className="laser-click-ring"
                    style={{
                        left: `${ring.x}px`,
                        top: `${ring.y}px`
                    }}
                    aria-hidden="true"
                />,
                document.body
            ))}

            {/* 3. Floating Presenter Toolbar (Portal to Body) */}
            {typeof document !== 'undefined' && createPortal(
                <aside 
                    className="presentation-toolbar fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[9990] select-none transition-all duration-200"
                    role="toolbar"
                    aria-label="Presentation controls"
                >
                    {isToolbarMinimized ? (
                        /* Minimized Floating Dot */
                        <button
                            type="button"
                            onClick={() => setIsToolbarMinimized(false)}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 text-white border border-slate-700/80 shadow-2xl backdrop-blur-md hover:bg-slate-800 transition-all active:scale-95 cursor-pointer text-xs font-bold"
                            title="Expand Presentation Toolbar"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                            <span>Presenting</span>
                            <span className="text-slate-400 text-[10px]">▲</span>
                        </button>
                    ) : (
                        /* Full Ergonomic Toolbar */
                        <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-slate-900/95 text-white border border-slate-700/80 shadow-2xl backdrop-blur-xl max-w-[95vw] overflow-x-auto scrollbar-none">
                            {/* Drag / Title Grip */}
                            <div className="hidden md:flex items-center gap-2 pl-2 pr-1 text-slate-400 text-xs font-bold border-r border-slate-700/60 mr-1 flex-shrink-0">
                                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                                <span className="text-[11px] text-slate-300 font-extrabold truncate max-w-[130px]">{meetingTitle}</span>
                            </div>

                            {/* Laser Pointer Tool */}
                            <button
                                type="button"
                                onClick={() => handleSelectTool('pointer')}
                                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[40px] min-w-[40px] justify-center ${
                                    activeTool === 'pointer'
                                        ? 'bg-rose-600 text-white shadow-md'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                                }`}
                                title="Laser Pointer (P)"
                                aria-label="Laser Pointer"
                            >
                                <span className="text-sm">🔴</span>
                                <span className="hidden sm:inline">Pointer</span>
                            </button>

                            {/* Highlighter Tool */}
                            <button
                                type="button"
                                onClick={() => handleSelectTool('highlighter')}
                                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[40px] min-w-[40px] justify-center ${
                                    activeTool === 'highlighter'
                                        ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                                }`}
                                title="Highlighter (H)"
                                aria-label="Highlighter"
                            >
                                <span className="text-sm">🖍️</span>
                                <span className="hidden sm:inline">Highlight</span>
                            </button>

                            {/* Pen / Draw Tool */}
                            <button
                                type="button"
                                onClick={() => handleSelectTool('pen')}
                                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[40px] min-w-[40px] justify-center ${
                                    activeTool === 'pen'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                                }`}
                                title="Pen / Underline (D)"
                                aria-label="Pen"
                            >
                                <span className="text-sm">✏️</span>
                                <span className="hidden sm:inline">Pen</span>
                            </button>

                            {/* Eraser Tool */}
                            <button
                                type="button"
                                onClick={() => handleSelectTool('eraser')}
                                className={`flex items-center gap-1 px-2 sm:px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[40px] min-w-[40px] justify-center ${
                                    activeTool === 'eraser'
                                        ? 'bg-slate-700 text-white shadow-md ring-1 ring-white/30'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                                }`}
                                title="Eraser (E)"
                                aria-label="Eraser"
                            >
                                <span className="text-sm">🧹</span>
                            </button>

                            {/* Color Selector (for Pen / Highlighter) */}
                            {(activeTool === 'highlighter' || activeTool === 'pen') && (
                                <div className="flex items-center gap-1 pl-1 border-l border-slate-700/60 flex-shrink-0">
                                    {activeSwatches.map(swatch => (
                                        <button
                                            key={swatch.hex}
                                            type="button"
                                            onClick={() => setActiveColor(swatch.hex)}
                                            className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                                                activeColor === swatch.hex
                                                    ? 'scale-115 border-white shadow-sm'
                                                    : 'border-transparent opacity-70 hover:opacity-100'
                                            }`}
                                            style={{ backgroundColor: swatch.hex }}
                                            title={swatch.label}
                                            aria-label={swatch.label}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Undo Button */}
                            <button
                                type="button"
                                onClick={handleUndo}
                                disabled={strokeCount === 0}
                                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center flex-shrink-0"
                                title="Undo Stroke (Ctrl+Z)"
                                aria-label="Undo Stroke"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="1 4 1 10 7 10"></polyline>
                                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                                </svg>
                            </button>

                            {/* Clear All Inks */}
                            {strokeCount > 0 && (
                                <button
                                    type="button"
                                    onClick={handleClearAll}
                                    className="px-2 py-1 text-[11px] font-bold text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                                    title="Clear All Annotations"
                                >
                                    Clear
                                </button>
                            )}

                            {/* Fullscreen Toggle */}
                            <button
                                type="button"
                                onClick={toggleFullscreen}
                                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center flex-shrink-0"
                                title="Toggle Fullscreen (F)"
                                aria-label="Toggle Fullscreen"
                            >
                                {isFullscreen ? (
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="4 14 10 14 10 20"></polyline>
                                        <polyline points="20 10 14 10 14 4"></polyline>
                                        <line x1="14" y1="10" x2="21" y2="3"></line>
                                        <line x1="3" y1="21" x2="10" y2="14"></line>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <polyline points="9 21 3 21 3 15"></polyline>
                                        <line x1="21" y1="3" x2="14" y2="10"></line>
                                        <line x1="3" y1="21" x2="10" y2="14"></line>
                                    </svg>
                                )}
                            </button>

                            {/* Minimize Toolbar */}
                            <button
                                type="button"
                                onClick={() => setIsToolbarMinimized(true)}
                                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center flex-shrink-0"
                                title="Minimize Toolbar"
                                aria-label="Minimize Toolbar"
                            >
                                <span className="text-xs">▼</span>
                            </button>

                            {/* Exit Presentation Mode */}
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer min-h-[40px] ml-1 flex-shrink-0"
                                title="Exit Presentation (Esc)"
                                aria-label="Exit Presentation"
                            >
                                <span>✕</span>
                                <span className="hidden sm:inline">Exit</span>
                            </button>
                        </div>
                    )}
                </aside>,
                document.body
            )}
        </>
    );
}
