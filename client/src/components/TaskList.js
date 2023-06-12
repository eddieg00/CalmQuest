import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { SAVE_TASK } from '../utils/queries';
import {useMutation} from "@apollo/client";
//import { useQuery } from '@apollo/client';
import ConfettiAnimation from './ConfettiAnimation';
// USE useQuery TO GET TASKS AND DISPLAY DATA TO THE MAPPED RETURN
//import { useQuery } from '@apollo/client';
//import {GET_TASKS} from "../utils/queries"
//const { radnom } = require('../utils/randomizer')



const TaskList = () => {
  const tasks = ['Message Loved Ones', 'Make Your Bed', 'Take a Walk', 'Breathing Exercise'];
  //const { data } = useQuery(GET_TASKS)
  //const tasks = data.tasks;
  //const randomTasks = random(tasks)
  const [checkedTasks, setCheckedTasks] = useState(Array(tasks.length).fill(false));
  const [saveTask] = useMutation(SAVE_TASK);
  const [userid, setuserid] = useState("64810a7f1b07b0070a0d38b2");
  console.log("joshua pierre")
  const handleTaskItemClick = (taskid) => { console.log(taskid);
    saveTask({ variables: { userid,taskid } })
    .then(() => {
      console.log('Task saved successfully!');
      // Additional logic or actions after saving the task
    })
    .catch((error) => {
      console.error('Error saving task:', error);
    });}


  
  return (
    <ul className="mb-6 mx-auto w-1/2">
      <ConfettiAnimation allTasksDone={checkedTasks.every(Boolean)} />
      {tasks.map((task, index) => (
        <li key={index} onClick={() => handleTaskItemClick(index)}>
        <TaskItem 
          key={index} 
          task={task} 
          index={index} 
          checkedTasks={checkedTasks} 
          setCheckedTasks={setCheckedTasks}
          
          
        />
</li>
      ))}
    </ul>
  );
};

export default TaskList;