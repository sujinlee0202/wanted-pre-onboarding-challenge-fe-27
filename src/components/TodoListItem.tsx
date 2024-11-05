import React from "react";
import { Todo } from "../types/todo";
import { Link } from "react-router-dom";

interface TodoListItemType {
  todo: Todo;
}

const TodoListItem = ({ todo }: TodoListItemType) => {
  const { id, title } = todo;

  return (
    <Link to={`/todos/${id}`}>
      <li className='flex items-center bg-white border border-gray-500 rounded-lg px-2'>
        <div className=' w-full h-11 flex items-center px-2'>{title}</div>
      </li>
    </Link>
  );
};
export default React.memo(TodoListItem);
