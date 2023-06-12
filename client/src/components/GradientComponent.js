import React, { useEffect, useRef } from "react";
import MeshGradient from "mesh-gradient.js";

const COLORS = ["#eb75b6", "#ddf3ff", "#6e3deb", "#c92f3c"];
const SPEED = 200; // change this value to adjust the speed

const GradientComponent = () => {
  const gradient = useRef(new MeshGradient());
  const canvasId = "my-canvas";

  useEffect(() => {
    gradient.current.initGradient("#" + canvasId, COLORS);
    gradient.current.conf = {
      ...gradient.current.conf,
      density: [10, 10], // no clue :/
      zoom: 2, // no clue what this does
      rotation: 90, // assuming rotation is in degrees
      playing: true, // assuming this starts or stops the animation
    };
    gradient.current.changePosition(780);
  
    const intervalId = setInterval(() => {
      const value = Math.floor(Math.random() * 1000);
      gradient.current.changePosition(value);
    }, SPEED);
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <canvas id={canvasId} width="800" height="600" />
    </div>
  );
};

export default GradientComponent;