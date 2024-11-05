export interface TodoItem {
  todoTitle: string;
  todoDesc: string;
}

export interface Todo {
  id: number;
  text: TodoItem;
  isCompleted: boolean;
}
