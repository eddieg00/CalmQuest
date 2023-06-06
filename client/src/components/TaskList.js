import React, { useState } from 'react';

const TaskList = () => {
  const tasks = ['Brush Your teeth', 'Make Your Bed', 'Take a Walk', 'Breathing Exercise'];
  const [checkedTasks, setCheckedTasks] = useState(Array(tasks.length).fill(false));

  const toggleTask = index => {
    const newCheckedTasks = [...checkedTasks];
    newCheckedTasks[index] = !newCheckedTasks[index];
    setCheckedTasks(newCheckedTasks);
  };

  return (
    <ul className="mb-6 mx-auto w-1/2">
      {tasks.map((task, index) => (
        <li key={index} className="mb-2">
          <button 
            onClick={() => toggleTask(index)}
            className={`font-mono text-2xl text-left w-full py-2 rounded shadow hover:bg-blue-300 transition-colors duration-300`}
          >
            {checkedTasks[index] && <span className="mr-2 text-green-500 text-2xl">✓</span>}
            <span className={checkedTasks[index] ? 'line-through text-gray-400' : ''}>{task}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;