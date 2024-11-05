import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import TextArea from "./TextArea";
import { TodoItem } from "../types/todo";

interface InputBoxType {
  addTodo: (text: TodoItem) => void;
}

const InputBox = ({ addTodo }: InputBoxType) => {
  const [text, setText] = useState({
    todoTitle: "",
    todoDesc: "",
  });

  const onChangeInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(text);
    setText({
      todoTitle: "",
      todoDesc: "",
    });
  };

  return (
    <form className='flex flex-col p-4 gap-2' onSubmit={handleSubmit}>
      <Input
        type='text'
        name='todoTitle'
        placeholder='할 일의 제목을 입력하세요.'
        value={text.todoTitle}
        onChange={onChangeInput}
      />
      <TextArea
        name='todoDesc'
        className='h-28'
        value={text.todoDesc}
        placeholder='할 일의 상세정보를 입력하세요'
        onChange={onChangeInput}
      />
      <Button className='w-20 h-8 bg-gray-500 text-white'>추가</Button>
    </form>
  );
};
export default InputBox;
