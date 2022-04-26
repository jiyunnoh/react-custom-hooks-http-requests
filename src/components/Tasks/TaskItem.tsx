import React from 'react';
import classes from './TaskItem.module.css';

const TaskItem = (props: { children: React.ReactNode }) => {
  return <li className={classes.task}>{props.children}</li>
};

export default TaskItem;