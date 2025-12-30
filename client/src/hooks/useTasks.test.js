import { renderHook, act, waitFor } from '@testing-library/react';
import { useTasks } from './useTasks';

const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...originalEnv,
    REACT_APP_API_URL: 'http://localhost:3000',
    REACT_APP_API_KEY: 'test-api-key',
  };
  global.fetch = jest.fn();
});

afterEach(() => {
  process.env = originalEnv;
  jest.restoreAllMocks();
});

describe('useTasks', () => {
  describe('fetchTasks', () => {
    it('should fetch tasks successfully', async () => {
      const mockTasks = [
        { id: 1, description: 'Task 1', created_at: '2024-01-01' },
        { id: 2, description: 'Task 2', created_at: '2024-01-02' },
      ];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks,
      });

      const { result } = renderHook(() => useTasks());

      await act(async () => {
        await result.current.fetchTasks();
      });

      await waitFor(() => {
        expect(result.current.tasks).toEqual(mockTasks);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/tasks',
        {
          headers: {
            'Authorization': 'Bearer test-api-key',
          },
        }
      );
    });

    it('should handle fetch error gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useTasks());

      await act(async () => {
        await result.current.fetchTasks();
      });

      expect(result.current.tasks).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching tasks:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('should not update tasks when response is not ok', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Server error' }),
      });

      const { result } = renderHook(() => useTasks());

      await act(async () => {
        await result.current.fetchTasks();
      });

      expect(result.current.tasks).toEqual([]);
    });

    it('should set empty array when no tasks exist', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const { result } = renderHook(() => useTasks());

      await act(async () => {
        await result.current.fetchTasks();
      });

      await waitFor(() => {
        expect(result.current.tasks).toEqual([]);
      });
    });
  });

  describe('createTask', () => {
    it('should create task successfully and refetch tasks', async () => {
      const mockTask = { id: 1, description: 'New task', created_at: '2024-01-01' };
      const mockTasks = [mockTask];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTask,
      });
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks,
      });

      const { result } = renderHook(() => useTasks());

      let createResult;
      await act(async () => {
        createResult = await result.current.createTask('New task');
      });

      expect(createResult).toEqual({ success: true });
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/tasks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-api-key',
          },
          body: JSON.stringify({ task: { description: 'New task' } }),
        }
      );

      await waitFor(() => {
        expect(result.current.tasks).toEqual(mockTasks);
      });
    });

    it('should return error when create fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Validation failed' }),
      });

      const { result } = renderHook(() => useTasks());

      let createResult;
      await act(async () => {
        createResult = await result.current.createTask('');
      });

      expect(createResult).toEqual({
        success: false,
        error: 'Failed to create task',
      });
    });

    it('should handle network error during create', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const networkError = new Error('Network error');
      
      global.fetch.mockRejectedValueOnce(networkError);

      const { result } = renderHook(() => useTasks());

      let createResult;
      await act(async () => {
        createResult = await result.current.createTask('New task');
      });

      expect(createResult).toEqual({
        success: false,
        error: 'Network error',
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error creating task:',
        networkError
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('initial state', () => {
    it('should initialize with empty tasks array', () => {
      const { result } = renderHook(() => useTasks());
      expect(result.current.tasks).toEqual([]);
    });

    it('should provide all required functions', () => {
      const { result } = renderHook(() => useTasks());
      expect(typeof result.current.fetchTasks).toBe('function');
      expect(typeof result.current.createTask).toBe('function');
    });
  });
});
