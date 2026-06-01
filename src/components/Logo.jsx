import React from 'react';

const Logo = ({ className = "h-10" }) => {
    return (
        <img 
            src="/logo.png" 
            alt="AIFLOWIX Logo" 
            className={`${className} object-contain`} 
        />
    );
};

export default Logo;
