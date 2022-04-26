import React from 'react';
import { useRef } from 'react';

import classes from './TaskForm.module.css';

const TaskForm = (props: { onEnterTask: (arg0: string) => void; loading: boolean; }) => {
  const taskInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current!.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type='text' ref={taskInputRef} />
      <button>{props.loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
