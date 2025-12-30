import { render, screen, within } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList', () => {
  describe('when tasks array is empty', () => {
    it('should display empty message', () => {
      render(<TaskList tasks={[]} />);
      
      const emptyMessage = screen.getByText(/No tasks found! Enjoy the free time./i);
      expect(emptyMessage).toBeInTheDocument();
    });

    it('should not render task list', () => {
      render(<TaskList tasks={[]} />);
      
      const list = screen.queryByRole('list');
      expect(list).not.toBeInTheDocument();
    });
  });

  describe('when tasks exist', () => {
    const mockTasks = [
      { id: 1, description: 'First task', created_at: '2024-01-15T10:30:00Z' },
      { id: 2, description: 'Second task', created_at: '2024-01-16T14:45:00Z' },
      { id: 3, description: 'Third task', created_at: '2024-01-17T09:15:00Z' },
    ];

    it('should render all tasks', () => {
      render(<TaskList tasks={mockTasks} />);
      
      expect(screen.getByText('First task')).toBeInTheDocument();
      expect(screen.getByText('Second task')).toBeInTheDocument();
      expect(screen.getByText('Third task')).toBeInTheDocument();
    });

    it('should not display empty message', () => {
      render(<TaskList tasks={mockTasks} />);
      
      const emptyMessage = screen.queryByText(/No tasks found/i);
      expect(emptyMessage).not.toBeInTheDocument();
    });
  });

  describe('formatDateTime', () => {
    it('should format date time correctly', () => {
      const tasks = [
        { id: 1, description: 'Task', created_at: '2024-01-15T10:30:00Z' }
      ];
      
      render(<TaskList tasks={tasks} />);
      
      const dateElement = screen.getByText(/January 15, 2024.*\d{1,2}:\d{2}/i);
      expect(dateElement).toBeInTheDocument();
      expect(dateElement).toHaveClass('task-date');
    });
  });
});
