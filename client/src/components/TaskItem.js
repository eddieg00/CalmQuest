import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const TaskItem = ({ task, index, checkedTasks, setCheckedTasks }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const fillAnimation = useSpring({
    width: isMouseDown ? '100%' : isChecked ? '100%' : '0%',
    backgroundColor: isMouseDown ? 'rgba(0, 255, 0, 0.2)' : isChecked ? 'rgba(0, 255, 0, 0.2)' : 'transparent',
    config: { duration: 2000 },
    immediate: !isMouseDown,
  });

  useEffect(() => {
    if (isMouseDown) {
      setTimerId(setTimeout(() => {
        setIsChecked(true);
        const newCheckedTasks = [...checkedTasks];
        newCheckedTasks[index] = true;
        setCheckedTasks(newCheckedTasks);
      }, 2000));
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isMouseDown]);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    clearTimeout(timerId);
  };

  return (
    <li className="mb-2">
      <button 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative overflow-hidden font-mono text-2xl text-left w-full py-2 rounded shadow transition-colors duration-300 border border-black ${checkedTasks[index] ? 'bg-green-300' : 'hover:bg-blue-300'}`}
      >
        {isChecked && <span className="mr-2 text-white text-2xl">✓</span>}
        <span className={`${checkedTasks[index] ? 'line-through text-white' : ''} ml-1`}>{task}</span>
        {checkedTasks[index] && <span className="text-green-500 text-xl absolute top-0 right-0 mr-2 mt-2">Quest Complete</span>}
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