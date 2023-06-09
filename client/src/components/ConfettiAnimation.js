import Confetti from 'react-dom-confetti';

const ConfettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 20,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

const ConfettiAnimation = ({ allTasksDone }) => (
  <div style={{
    position: 'fixed', 
    top: 0, 
    left: '50%', 
    transform: 'translateX(-50%)',
    zIndex: 1000
  }}>
    <Confetti active={ allTasksDone } config={ ConfettiConfig } />
  </div>
);

export default ConfettiAnimation;