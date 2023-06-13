import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import ConfettiAnimation from './ConfettiAnimation';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from "../utils/queries";
import { random } from '../utils/randomizer';

const TaskList = () => {
  const { data } = useQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // Current date in 'YYYY-MM-DD' format
    const storedDate = localStorage.getItem('tasksDate');
    let randomTasks;

    if (storedDate === today) {
      // If the tasks for the current date have already been stored, use them
      randomTasks = JSON.parse(localStorage.getItem('tasks'));
    } else if (data?.tasks) {
      // If there are no tasks for the current date, generate and store new tasks
      randomTasks = random(data.tasks).slice(0, 4);
      localStorage.setItem('tasks', JSON.stringify(randomTasks));
      localStorage.setItem('tasksDate', today);
    }

    if (randomTasks) {
      setTasks(randomTasks);
      // Load the checked state from localStorage, or initialize with false if not present
      const storedCheckedTasks = JSON.parse(localStorage.getItem('checkedTasks')) || new Array(randomTasks.length).fill(false);
      setCheckedTasks(storedCheckedTasks);
    }
  }, [data]);

  useEffect(() => {
    // Store the checked state in localStorage whenever it changes
    localStorage.setItem('checkedTasks', JSON.stringify(checkedTasks));
  }, [checkedTasks]);

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