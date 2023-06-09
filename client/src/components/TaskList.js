import React, { useState } from 'react';
import TaskItem from './TaskItem';
import ConfettiAnimation from './ConfettiAnimation';
// USE useQuery TO GET TASKS AND DISPLAY DATA TO THE MAPPED RETURN
// import { useQuery } from '@apollo/client';
// import {GET_TASKS} from "../utils/queries"

const TaskList = () => {
  const tasks = ['Message Loved Ones', 'Make Your Bed', 'Take a Walk', 'Breathing Exercise'];
  const [checkedTasks, setCheckedTasks] = useState(Array(tasks.length).fill(false));

  return (
    <ul className="mb-6 mx-auto w-1/2">
      <ConfettiAnimation allTasksDone={checkedTasks.every(Boolean)} />
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