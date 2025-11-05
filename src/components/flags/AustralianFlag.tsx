export function AustralianFlag({ className = "w-5 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue background */}
      <rect width="20" height="10" fill="#012169" />
      
      {/* Union Jack simplified */}
      <g>
        {/* White cross */}
        <path d="M0 0 L8 4 M8 0 L0 4 M0 4 L8 4 M0 0 L8 0" stroke="white" strokeWidth="0.8" />
        {/* Red cross */}
        <path d="M0 0 L8 4 M8 0 L0 4" stroke="#C8102E" strokeWidth="0.5" />
        <path d="M4 0 L4 4 M0 2 L8 2" stroke="#C8102E" strokeWidth="0.8" />
      </g>
      
      {/* Large star (Commonwealth Star) */}
      <g transform="translate(4, 7)">
        <path
          d="M0,-0.6 L0.15,-0.2 L0.6,-0.2 L0.25,0.1 L0.4,0.5 L0,0.2 L-0.4,0.5 L-0.25,0.1 L-0.6,-0.2 L-0.15,-0.2 Z"
          fill="white"
        />
      </g>
      
      {/* Small stars (Southern Cross) */}
      <g transform="translate(12, 2)">
        <path
          d="M0,-0.4 L0.1,-0.15 L0.4,-0.15 L0.15,0.05 L0.25,0.3 L0,0.1 L-0.25,0.3 L-0.15,0.05 L-0.4,-0.15 L-0.1,-0.15 Z"
          fill="white"
        />
      </g>
      <g transform="translate(15, 3)">
        <path
          d="M0,-0.4 L0.1,-0.15 L0.4,-0.15 L0.15,0.05 L0.25,0.3 L0,0.1 L-0.25,0.3 L-0.15,0.05 L-0.4,-0.15 L-0.1,-0.15 Z"
          fill="white"
        />
      </g>
      <g transform="translate(16, 6)">
        <path
          d="M0,-0.4 L0.1,-0.15 L0.4,-0.15 L0.15,0.05 L0.25,0.3 L0,0.1 L-0.25,0.3 L-0.15,0.05 L-0.4,-0.15 L-0.1,-0.15 Z"
          fill="white"
        />
      </g>
      <g transform="translate(13, 7)">
        <path
          d="M0,-0.4 L0.1,-0.15 L0.4,-0.15 L0.15,0.05 L0.25,0.3 L0,0.1 L-0.25,0.3 L-0.15,0.05 L-0.4,-0.15 L-0.1,-0.15 Z"
          fill="white"
        />
      </g>
      <g transform="translate(10, 5)">
        <path
          d="M0,-0.3 L0.08,-0.1 L0.3,-0.1 L0.12,0.04 L0.2,0.25 L0,0.08 L-0.2,0.25 L-0.12,0.04 L-0.3,-0.1 L-0.08,-0.1 Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
