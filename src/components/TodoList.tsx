import { Todo } from "../types/todo";
import TodoListItem from "./TodoListItem";

interface TodoListType {
  todos: Todo[];
  handleTodoCompleted: (id: number) => void;
  handleTodoDelete: (id: number) => void;
  handleOpenDetail: (id: number) => void;
}

const TodoList = ({
  todos,
  handleTodoCompleted,
  handleTodoDelete,
  handleOpenDetail,
}: TodoListType) => {
  return (
    <ul className='flex flex-col gap-2 mx-4 '>
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          handleTodoCompleted={handleTodoCompleted}
          handleTodoDelete={handleTodoDelete}
          handleOpenDetail={handleOpenDetail}
        />
      ))}
    </ul>
  );
};
export default TodoList;
