import React from 'react';
import { useState } from 'react';
import { TaskItemType } from '../Tasks/Tasks';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props: { onAddTask: (arg0: TaskItemType) => void; }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const enterTaskHandler = async (taskText: string) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(
        'https://react-http-6b4a6.firebaseio.com/tasks.json',
        {
          method: 'POST',
          body: JSON.stringify({ text: taskText }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Something went wrong!');
      }
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
