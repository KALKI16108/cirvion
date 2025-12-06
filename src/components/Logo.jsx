import React from 'react';

const Logo = ({ className = "h-10" }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 900 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Circuit C Icon */}
            <g>
                {/* Outer circle segments */}
                <path
                    d="M 220 190 A 100 100 0 0 1 120 90"
                    stroke="#00C8FF"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                />
                <path
                    d="M 120 290 A 100 100 0 0 1 220 190"
                    stroke="#00C8FF"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Inner circle segments */}
                <path
                    d="M 200 190 A 80 80 0 0 1 140 130"
                    stroke="#00C8FF"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                />
                <path
                    d="M 140 250 A 80 80 0 0 1 200 190"
                    stroke="#00C8FF"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Connection nodes */}
                <circle cx="170" cy="150" r="8" fill="#00C8FF" />
                <circle cx="170" cy="230" r="8" fill="#00C8FF" />
                <circle cx="220" cy="190" r="10" fill="#00C8FF" />

                {/* Connection lines */}
                <line x1="170" y1="150" x2="200" y2="170" stroke="#00C8FF" strokeWidth="4" />
                <line x1="170" y1="230" x2="200" y2="210" stroke="#00C8FF" strokeWidth="4" />

                {/* Additional nodes */}
                <circle cx="130" cy="190" r="6" fill="#00C8FF" />
                <circle cx="200" cy="170" r="6" fill="#00C8FF" />
                <circle cx="200" cy="210" r="6" fill="#00C8FF" />
            </g>

            {/* CIRVION Text */}
            <text
                x="280"
                y="220"
                fontFamily="Outfit, sans-serif"
                fontSize="120"
                fontWeight="700"
                fill="white"
                letterSpacing="-2"
            >
                CIRVION
            </text>

            {/* Subtitle */}
            <text
                x="280"
                y="280"
                fontFamily="Inter, sans-serif"
                fontSize="32"
                fontWeight="400"
                fill="#94A3B8"
                letterSpacing="2"
            >
                AI & AUTOMATION CONSULTANCY
            </text>
        </svg>
    );
};

export default Logo;
