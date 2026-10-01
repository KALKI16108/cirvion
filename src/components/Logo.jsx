import React from 'react';

const Logo = ({ className = "h-10", markOnly = false }) => {
    return (
        <img 
            src={markOnly ? "/logo-mark.svg" : "/logo.svg"} 
            alt="AIFlowix - AI Workflow Automation & Custom Software" 
            className={`${className} object-contain`} 
            width={markOnly ? 48 : 216}
            height={48}
        />
    );
};

export default Logo;

