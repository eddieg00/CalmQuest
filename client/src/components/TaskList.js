import React, { useState, useRef } from 'react';
import './TaskList.css';

const TaskList = () => {
  const tasks = ['Brush Your teeth', 'Make Your Bed', 'Take a Walk', 'Breathing Exercise'];
  const [checkedTasks, setCheckedTasks] = useState(Array(tasks.length).fill(false));
  const [pressedTasks, setPressedTasks] = useState(Array(tasks.length).fill(false));
  const timers = useRef([]);

  const startTimer = index => {
    const newPressedTasks = [...pressedTasks];
    newPressedTasks[index] = true;
    setPressedTasks(newPressedTasks);

    timers.current[index] = setTimeout(() => {
      const newCheckedTasks = [...checkedTasks];
      newCheckedTasks[index] = true;
      setCheckedTasks(newCheckedTasks);
    }, 2000);
  };

  const clearTimer = index => {
    clearTimeout(timers.current[index]);

    const newPressedTasks = [...pressedTasks];
    newPressedTasks[index] = false;
    setPressedTasks(newPressedTasks);
  };

  return (
    <ul className="mb-6 mx-auto w-1/2">
      {tasks.map((task, index) => (
        <li key={index} className="mb-2">
          <button 
            onMouseDown={() => startTimer(index)}
            onMouseUp={() => clearTimer(index)}
            onMouseLeave={() => clearTimer(index)}
            className={`task-button font-mono text-2xl text-left w-full py-2 rounded shadow transition-colors duration-300 ${checkedTasks[index] ? 'bg-green-300' : 'hover:bg-blue-300'} ${pressedTasks[index] ? 'pressed' : ''}`}
          >
            {checkedTasks[index] && <span className="mr-2 text-white text-2xl">✓</span>}
            <span className={checkedTasks[index] ? 'line-through text-white' : ''}>{task}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;