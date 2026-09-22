export function Logo({ className = "w-6 h-6", fill = "currentColor" }: { className?: string, fill?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Abstract Koodu (Nest/House) Shape */}
      <path 
        d="M12 2L2 9.5V20C2 21.1046 2.89543 22 4 22H9.5V15H14.5V22H20C21.1046 22 22 21.1046 22 20V9.5L12 2Z" 
        fill={fill} 
        fillOpacity="0.2"
      />
      <path 
        d="M12 2L2 9.5V20C2 21.1046 2.89543 22 4 22H9.5V15H14.5V22H20C21.1046 22 22 21.1046 22 20V9.5L12 2Z" 
        stroke={fill} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Little Heart inside */}
      <path 
        d="M12 11C12 11 10.5 8 8.5 8C6.5 8 5 9.5 5 11.5C5 14 12 18 12 18C12 18 19 14 19 11.5C19 9.5 17.5 8 15.5 8C13.5 8 12 11 12 11Z" 
        fill={fill} 
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
