import React from 'react';

const Header = React.memo(function Header({ onLogoClick }) {
    return (
        <div className="fixed top-3.5 left-4 sm:top-4.5 sm:left-6 md:top-5 md:left-8 z-50 select-none pointer-events-auto">
            {/* Brand Title */}
            <div 
                className="inline-flex flex-col cursor-pointer group" 
                onClick={onLogoClick} 
                title="Reach International"
            >
                <span className="text-xs sm:text-sm md:text-base font-extrabold tracking-wider text-slate-900 uppercase whitespace-nowrap leading-tight group-hover:opacity-90 transition-opacity">
                    REACH <span className="text-ribbon-4">INTERNATIONAL</span>
                </span>
                <span className="text-[9px] sm:text-[10px] md:text-[10.5px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
                    REACHING ALL HEIGHTS
                </span>
            </div>
        </div>
    );
});

export default Header;
