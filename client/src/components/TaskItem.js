import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import ConfettiAnimation from './ConfettiAnimation';

const TaskItem = ({ task, index, checkedTasks, setCheckedTasks }) => {
  const [isInteractionActive, setIsInteractionActive] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const fillAnimation = useSpring({
    width: isInteractionActive ? '100%' : isChecked ? '100%' : '0%',
    backgroundColor: isInteractionActive ? 'rgba(0, 255, 0, 0.2)' : isChecked ? 'rgba(0, 255, 0, 0.2)' : 'transparent',
    config: { duration: 1500 },
    immediate: !isInteractionActive,
  });

  useEffect(() => {
    if (isInteractionActive) {
      setTimerId(setTimeout(() => {
        setIsChecked(true);
        const newCheckedTasks = [...checkedTasks];
        newCheckedTasks[index] = true;
        setCheckedTasks(newCheckedTasks);
      }, 1500));
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isInteractionActive, index, checkedTasks]);

  const handleInteractionStart = () => {
    setIsInteractionActive(true);
  };

  const handleInteractionEnd = () => {
    setIsInteractionActive(false);
    clearTimeout(timerId);
  };

  const buttonClassName = `relative overflow-hidden font-mono text-2xl text-left w-full py-2 rounded shadow transition-colors duration-300 border border-black ${
    checkedTasks[index] ? 'bg-green-300' : 'hover:bg-stone-200'
  } transform transition-transform duration-200 ease-in-out hover:scale-105`;

  return (
    <li className="mb-2">
      <button
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        onTouchCancel={handleInteractionEnd}
        className={buttonClassName}
      >
        {isChecked && <span className="mr-2 ml-2 text-green-800 text-2xl">✓</span>}
        <span className={`${checkedTasks[index] ? 'line-through text-green-800' : ''} ml-4`}>{task}</span>
        <div className="flex justify-end">
          {checkedTasks[index] && (
            <span className="text-green-500 text-right text-base mr-4">Quest Complete</span>
          )}
          {isInteractionActive && (
            <animated.div
              style={{
                ...fillAnimation,
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
              }}
            />
          )}
        </div>
      </button>

      <style jsx>{`
        @media (max-width: 768px) {
          .relative {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .text-left {
            text-align: center;
          }
          .ml-4 {
            margin-left: 0;
            margin-right: 0;
          }
        }
      `}</style>
    </li>
  );
};

export default TaskItem;
