import { useState } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
    
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      const data = await response.json();

      if (response.ok) setTasks(data);
    } catch(error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async (description) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify({ task: { description } }),
      });

      if (response.ok) {
        await fetchTasks();
        return { success: true };
      } else {
        return { success: false, error: 'Failed to create task' };
      }
    } catch (error) {
      console.error('Error creating task:', error);
      return { success: false, error: error.message };
    }
  };

  return { tasks, fetchTasks, createTask };
}