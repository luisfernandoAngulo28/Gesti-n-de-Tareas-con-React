// Estructura real que devuelve la API
export interface Task {
  id: number;
  name: string;
  done: boolean;
}

// Respuesta paginada del GET /api/tasks
export interface TasksResponse {
  total: number;
  page: number;
  pages: number;
  data: Task[];
}

export interface CreateTaskDto {
  name: string;
}

export interface UpdateTaskDto {
  name?: string;
  done?: boolean;
}
