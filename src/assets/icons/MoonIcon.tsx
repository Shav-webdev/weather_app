const MoonIcon = ({ iconStroke = '#000' }) => {
  const classes = {
    cls1: {
      'fill-rule': 'evenodd',
      stroke: iconStroke,
    },
    cls2: {
      stroke: iconStroke,
      fill: 'none',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '15px',
    },
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 345.71 352.38"
    >
      <g id="Clearly-Night">
        <g>
          <path
            id="Combined-Shape"
            className={'cls2'}
            d="m131.4,31.09c-12.14,22.18-19.04,47.63-19.04,74.69,0,86.04,69.75,155.79,155.79,155.79,18.56,0,36.36-3.25,52.87-9.2-26.45,48.33-77.77,81.1-136.75,81.1-86.04,0-155.79-69.75-155.79-155.79,0-67.48,42.9-124.94,102.92-146.59Z"
          />
          <polygon
            id="Star"
            className="cls-1"
            points="255.74 135.29 248.04 138.47 248.69 130.16 243.28 123.82 251.38 121.87 255.74 114.77 260.1 121.87 268.2 123.82 262.8 130.16 263.44 138.47 255.74 135.29"
          />
          <polygon
            id="Star-2"
            data-name="Star"
            className="cls-1"
            points="196.78 177.44 192.92 179.03 193.25 174.88 190.54 171.71 194.6 170.73 196.78 167.18 198.96 170.73 203.01 171.71 200.3 174.88 200.63 179.03 196.78 177.44"
          />
          <polygon
            id="Star-3"
            data-name="Star"
            className="cls-1"
            points="203.33 82.87 195.63 86.06 196.27 77.75 190.87 71.41 198.97 69.45 203.33 62.35 207.69 69.45 215.79 71.41 210.38 77.75 211.03 86.06 203.33 82.87"
          />
        </g>
      </g>
    </svg>
  );
};

export default MoonIcon;
