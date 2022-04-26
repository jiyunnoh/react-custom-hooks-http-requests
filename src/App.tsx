import React, { useEffect, useState } from 'react';

import Tasks, { TaskItemType } from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [tasks, setTasks] = useState<TaskItemType[]>([]);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(
        'https://react-http-6b4a6.firebaseio.com/tasks.json'
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const loadedTasks: TaskItemType[] = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Something went wrong!');
      }

    }
    setIsLoading(false);
  };

  useEffect(() => {
    // fetchTasks();
  }, []);

  const taskAddHandler = (task: TaskItemType) => {
    setTasks((prevTasks) => prevTasks!.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
