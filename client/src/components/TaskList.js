import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = ['Message Loved Ones', 'Make Your Bed', 'Take a Walk', 'Breathing Exercise'];
  const [checkedTasks, setCheckedTasks] = useState(Array(tasks.length).fill(false));

  return (
    <ul className="mb-6 mx-auto w-1/2">
      {tasks.map((task, index) => (
        <TaskItem 
          key={index} 
          task={task} 
          index={index} 
          checkedTasks={checkedTasks} 
          setCheckedTasks={setCheckedTasks} 
        />
      ))}
    </ul>
  );
};

export default TaskList;