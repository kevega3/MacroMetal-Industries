import React from "react";

const MacroMetalLogo = () => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="25" cy="25" r="23" fill="#8884d8" />
      <text
        x="25"
        y="30"
        fontFamily="Arial"
        fontSize="18"
        fontWeight="bold"
        textAnchor="middle"
        fill="white"
      >
        MM
      </text>
      <path d="M10,35 L40,35 L40,37 L10,37 Z" fill="white" />
      <path
        d="M15,15 L20,15 L25,25 L30,15 L35,15 L25,32 Z"
        fill="white"
        fillOpacity="0.7"
      />
    </svg>
  );
};

export default MacroMetalLogo;
