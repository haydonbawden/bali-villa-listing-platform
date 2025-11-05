export function IndonesianFlag({ className = "w-5 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red top half */}
      <rect width="20" height="5" fill="#FF0000" />
      
      {/* White bottom half */}
      <rect y="5" width="20" height="5" fill="#FFFFFF" />
      
      {/* Border for visibility */}
      <rect width="20" height="10" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
    </svg>
  );
}
