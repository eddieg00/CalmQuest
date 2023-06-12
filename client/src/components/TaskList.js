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
    if (data?.tasks) {
      const randomTasks = random(data.tasks).slice(0, 4);
      setTasks(randomTasks);
      // Initialize checkedTasks with the same length as tasks, all values set to false
      setCheckedTasks(new Array(randomTasks.length).fill(false));
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