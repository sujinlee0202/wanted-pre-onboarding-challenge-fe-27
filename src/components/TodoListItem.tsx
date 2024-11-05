import { twMerge } from "tailwind-merge";
import React from "react";
import Button from "./Button";
import { Todo } from "../types/todo";
import Checkbox from "./Checkbox";
import { FaTimes } from "react-icons/fa";

interface TodoListItemType {
  todo: Todo;
  handleTodoCompleted: (id: number) => void;
  handleTodoDelete: (id: number) => void;
  handleOpenDetail: (id: number) => void;
}

const TodoListItem = ({
  todo,
  handleTodoCompleted,
  handleTodoDelete,
  handleOpenDetail,
}: TodoListItemType) => {
  const { id, text, isCompleted } = todo;

  return (
    <li
      className={twMerge(
        "flex items-center bg-white border border-gray-500 rounded-lg px-2",
        isCompleted && "line-through"
      )}
      onClick={() => handleOpenDetail(id)}
    >
      <Checkbox
        type='checkbox'
        onChange={() => handleTodoCompleted(id)}
        checked={isCompleted}
      />
      <div className=' w-full h-11 flex items-center px-2'>
        {text.todoTitle}
      </div>

      <div className='flex items-center gap-2 h-11'>
        <Button
          className='w-8 h-8 text-gray-700'
          onClick={() => handleTodoDelete(id)}
        >
          <FaTimes />
        </Button>
      </div>
    </li>
  );
};
export default React.memo(TodoListItem);
