import React from 'react';

interface LoaderProps {
  Color?: string;
  width?: string;
  height?: string;
}

const Loader: React.FC<LoaderProps> = ({ Color, height, width }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="40px"
        height="40px"
        style={{
          shapeRendering: 'auto',
          display: 'block',
          background: 'transparent',
          height: width ? width : '40px',
          width: height ? height : '40px',
        }}
      >
        <g>
          <circle
            strokeDasharray="164.93361431346415 56.97787143782138"
            r="35"
            strokeWidth="6"
            stroke={Color}
            fill="none"
            cy="50"
            cx="50"
          >
            <animateTransform
              keyTimes="0;1"
              values="0 50 50;360 50 50"
              dur="1.1764705882352942s"
              repeatCount="indefinite"
              type="rotate"
              attributeName="transform"
            />
          </circle>
          <g />
        </g>
      </svg>
    </>
  );
};

export default Loader;
