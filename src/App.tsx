import React, { useEffect, useState } from 'react';

import Tasks, { TaskItemType } from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState<TaskItemType[]>([]);

  const transformTaks = (tasksObj: { [x: string]: { text: string; }; }) => {
    const loadedTasks: TaskItemType[] = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  // sendRequest: fetchTasks -> alias syntax
  const { isLoading, error, sendRequest: fetchTasks } = useHttp(
    { url: 'https://react-http-484a5-default-rtdb.firebaseio.com/tasks.json' },
    transformTaks
  );

  useEffect(() => {
    fetchTasks();
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
