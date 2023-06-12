import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import ConfettiAnimation from './ConfettiAnimation';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from "../utils/queries";
const { random } = require('../utils/randomizer');

const TaskList = () => {
  const { data } = useQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);

  useEffect(() => {
    // Load tasks and their check status from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const storedCheckedTasks = JSON.parse(localStorage.getItem('checkedTasks'));
    const storedDate = localStorage.getItem('date');

    // Generate new tasks if there are no stored tasks or if the date has changed
    const today = new Date().toDateString();
    if (!storedTasks || !storedCheckedTasks || storedDate !== today) {
      if (data?.tasks) {
        const randomTasks = random(data.tasks).slice(0, 4);
        setTasks(randomTasks);
        setCheckedTasks(new Array(randomTasks.length).fill(false));
        // Save tasks and their check status in localStorage
        localStorage.setItem('tasks', JSON.stringify(randomTasks));
        localStorage.setItem('checkedTasks', JSON.stringify(new Array(randomTasks.length).fill(false)));
        localStorage.setItem('date', today);
      }
    } else {
      // Use stored tasks and their check status
      setTasks(storedTasks);
      setCheckedTasks(storedCheckedTasks);
    }
  }, [data]);

  return (
    <ul className="mb-6 mx-auto w-1/2">
      <ConfettiAnimation allTasksDone={checkedTasks.every(Boolean)} />
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task.task} // Pass the task's "task" property to TaskItem component
          index={index}
          checkedTasks={checkedTasks}
          setCheckedTasks={setCheckedTasks}
        />
      ))}
    </ul>
  );
};

export default TaskList;