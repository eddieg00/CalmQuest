import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const TaskItem = ({ task, index, checkedTasks, setCheckedTasks }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [isChecked, setIsChecked] = useState(() => JSON.parse(localStorage.getItem('checkedTasks'))[index] || false);
  
  const [fillAnimation, setFillAnimation] = useSpring(() => ({
    width: '0%',
    backgroundColor: 'transparent',
    config: { duration: 1500 },
  }));

  useEffect(() => {
    if (isMouseDown) {
      setFillAnimation({
        width: '100%',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        reset: true,
        from: {
          width: '0%',
          backgroundColor: 'transparent',
        },
      });
      setTimerId(setTimeout(() => {
        setIsChecked(true);
        const newCheckedTasks = [...checkedTasks];
        newCheckedTasks[index] = true;
        setCheckedTasks(newCheckedTasks);
      }, 1500));
    } else {
      setFillAnimation({
        width: '0%',
        backgroundColor: 'transparent',
        reset: true,
        from: {
          width: isChecked ? '100%' : '0%',
          backgroundColor: isChecked ? 'rgba(0, 255, 0, 0.2)' : 'transparent',
        },
      });
    }

    return () => {
      clearTimeout(timerId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseDown, index]);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    clearTimeout(timerId);
  };

  return (
    <li className="mb-2 bg-white bg-opacity-80">
      <button 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        disabled={isChecked} 
        className={`relative overflow-hidden font-mono text-2xl text-left w-full py-2 rounded shadow transition-colors duration-300 border border-black ${
          isChecked ? 'bg-green-300' : 'hover:bg-stone-200'
        } transform transition-transform duration-200 ease-in-out hover:scale-105`}
        style={{transitionProperty: 'background-color, transform',
        transitionDuration: '0.3s',}}
      >
        {isChecked && <span className="mr-2 ml-2 text-green-800 text-2xl">✓</span>}
        <span className={`${isChecked ? 'line-through text-green-800' : ''} ml-4`}>{task}</span>
        {isChecked && <span className="text-green-500 text-xl absolute top-0 right-0 mr-2 mt-2">Quest Complete</span>}
        {isMouseDown && (
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
      </button>
    </li>
  );
};

export default TaskItem;