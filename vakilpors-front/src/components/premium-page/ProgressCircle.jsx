import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressCircle = ({ progress }) => {

  return (
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;height: 100vh;">
      <div class="progresse-circle">
        <div class="number" id="number">
          8/10
        </div>
scdvdcbvf
        <svg class="circle-overlay">
          <circle class="circle-bg" cx="50" cy="50" r="40" stroke="#E5F4DE" />

          <circle
            id="circle-progresse"
            cx="50"
            cy="50"
            r="40"
            stroke="#4F9E30"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProgressCircle;
