import React from 'react';

import './loading.styles.scss';

const Loading = () => {
  return (
      <div className="loading">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ background: "none" }}
            width="80"
            height="80"
            className="lds-infinity"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 100 100"
        >
          <path
              fill="none"
              stroke="#8093b0"
              strokeDasharray="161.65102478027345 94.9379034423828"
              strokeWidth="2"
              d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20c-19.3 0-32.1-40-51.4-40z"
          >
            <animate
                attributeName="stroke-dashoffset"
                begin="0s"
                calcMode="linear"
                dur="1.2"
                keyTimes="0;1"
                repeatCount="indefinite"
                values="0;256.58892822265625"
            />
          </path>
        </svg>
      </div>
  );
};


export default Loading;