import TaskList from './components/TaskList';
import { useEffect, useState } from 'react';
import { useTasks } from './hooks/useTasks';
import './App.css';

function App() {
  const { tasks, fetchTasks, createTask } = useTasks();
  const [description, setDescription] = useState('');
  const [addTask, setAddTask] = useState(false);

  useEffect(() => { fetchTasks() }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const result = await createTask(description);

    if (result.success) {
      setDescription('');
      setAddTask(false);
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">Simple Task Tracker</h1>
          <p className="subtitle">Organize your tasks efficiently</p>
        </header>

        <div className="task-actions">
          {addTask ? (
            <form className="input-group" onSubmit={handleCreateTask}>
              <input 
                type="text" 
                className="task-input"
                placeholder="Enter task description..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
              />
              <div className="button-group">
                <button 
                  type="submit" 
                  className={`btn btn-primary ${description ? 'enabled' : 'disabled'}`}
                >
                  Create Task
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setAddTask(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button className="btn btn-add" onClick={() => setAddTask(true)}>
              <span className="btn-icon">+</span> Add Task
            </button>
          )}
        </div>

        <TaskList tasks={tasks} />  
      </div>
    </div>
  );
}

export default App;
