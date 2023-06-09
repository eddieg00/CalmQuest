import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const TaskItem = ({ task, index, checkedTasks, setCheckedTasks }) => {
  const [isTouchDown, setIsTouchDown] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const fillAnimation = useSpring({
    width: isTouchDown ? '100%' : isChecked ? '100%' : '0%',
    backgroundColor: isTouchDown ? 'rgba(0, 255, 0, 0.2)' : isChecked ? 'rgba(0, 255, 0, 0.2)' : 'transparent',
    config: { duration: 1500 },
    immediate: !isTouchDown,
  });

  useEffect(() => {
    if (isTouchDown) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouchDown, index, checkedTasks]);

  const handleTouchStart = () => {
    setIsTouchDown(true);
  };

  const handleTouchEnd = () => {
    setIsTouchDown(false);
    clearTimeout(timerId);
  };

  const buttonClassName = `relative overflow-hidden font-mono text-2xl text-left w-full py-2 rounded shadow transition-colors duration-300 border border-black ${
    checkedTasks[index] ? 'bg-green-300' : 'hover:bg-stone-200'
  } transform transition-transform duration-200 ease-in-out hover:scale-105`;

  return (
    <li className="mb-2">
      <button
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className={buttonClassName}
      >
        {isChecked && <span className="mr-2 ml-2 text-green-800 text-2xl">✓</span>}
        <span className={`${checkedTasks[index] ? 'line-through text-green-800' : ''} ml-4`}>{task}</span>
        {checkedTasks[index] && (
          <span className="text-green-500 text-xl absolute top-0 right-0 mr-2 mt-2">Quest Complete</span>
        )}
        {isTouchDown && (
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
