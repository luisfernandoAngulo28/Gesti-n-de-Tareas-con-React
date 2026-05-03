import { useState, useEffect, useCallback } from 'react';
import { useAxios } from './useAxios';
import type { Task, TasksResponse, CreateTaskDto, UpdateTaskDto } from '../models/task.model';

export const useTasks = () => {
  const axios = useAxios();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<TasksResponse>('tasks');
      // La API devuelve { total, page, pages, data: [...] }
      const data = response.data?.data;
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      setError('Error al cargar las tareas');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  const createTask = async (data: CreateTaskDto): Promise<boolean> => {
    try {
      const response = await axios.post<Task>('tasks', data);
      setTasks((prev) => [response.data, ...prev]);
      return true;
    } catch {
      setError('Error al crear la tarea');
      return false;
    }
  };

  const updateTask = async (id: number, data: UpdateTaskDto): Promise<boolean> => {
    try {
      const response = await axios.put<Task>(`tasks/${id}`, data);
      setTasks((prev) => prev.map((t) => (t.id === id ? response.data : t)));
      return true;
    } catch {
      setError('Error al actualizar la tarea');
      return false;
    }
  };

  const toggleStatus = async (id: number, currentDone: boolean): Promise<boolean> => {
    try {
      const response = await axios.patch<Task>(`tasks/${id}`, { done: !currentDone });
      setTasks((prev) => prev.map((t) => (t.id === id ? response.data : t)));
      return true;
    } catch {
      setError('Error al cambiar el estado');
      return false;
    }
  };

  const deleteTask = async (id: number): Promise<boolean> => {
    try {
      await axios.delete(`tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch {
      setError('Error al eliminar la tarea');
      return false;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    toggleStatus,
    deleteTask,
  };
};
