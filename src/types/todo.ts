export interface TodoItem {
  title: string;
  content: string;
}

export interface Todo extends TodoItem {
  id: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
