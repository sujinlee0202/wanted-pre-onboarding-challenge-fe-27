import { Todo } from "../types/todo";
import TodoListItem from "./TodoListItem";

interface TodoListType {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListType) => {
  return (
    <ul className='flex flex-col gap-2 mx-4 '>
      {todos.map((todo) => (
        <TodoListItem todo={todo} />
      ))}
    </ul>
  );
};
export default TodoList;
