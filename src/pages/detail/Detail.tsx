import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { readLoginToken } from "../../utils/readLoginToken";
import { useEffect, useState } from "react";
import { fetchGetTodoById, fetchUpdateTodo } from "../../api/todo";
import { Todo, TodoItem } from "../../types/todo";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";

const Detail = () => {
  const [todo, setTodo] = useState<Todo>();
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState<TodoItem>({
    title: todo?.title || "",
    content: todo?.content || "",
  });

  const loginToken = readLoginToken();
  const params = useParams();
  const navigate = useNavigate();
  const { handleTodoDelete, handleTodoEdit } = useOutletContext<{
    handleTodoDelete: (id: string) => void;
    handleTodoEdit: (id: string) => void;
  }>();

  useEffect(() => {
    if (params.id) {
      fetchGetTodoById(loginToken, params.id).then((res) => setTodo(res.data));
    }

    setEditMode(false);
  }, [params.id]);

  useEffect(() => {
    if (todo) {
      setText({
        title: todo.title,
        content: todo.content,
      });
    }
  }, [todo]);

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

  const handleDelete = () => {
    if (params.id) {
      handleTodoDelete(params.id);
      navigate("/", {
        replace: true,
      });
    }
  };

  const handleEdit = () => {
    if (params.id) {
      handleTodoEdit(params.id);
    }
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handleEditCancel = () => {
    setEditMode(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo) return;

    fetchUpdateTodo(loginToken, todo?.id, text).then((res) => {
      setTodo(res.data);
      setEditMode(false);
    });
  };

  return (
    <>
      {editMode ? (
        <form className='flex flex-col p-4 gap-2' onSubmit={handleSubmit}>
          <Input
            type='text'
            name='title'
            value={text.title}
            onChange={onChangeInput}
          />
          <TextArea
            name='content'
            value={text.content}
            className='h-28'
            onChange={onChangeInput}
          />
          <div className='w-56 h-8 flex gap-2'>
            <Button
              className='w-[108px] h-8 text-sm text-white bg-blue-400'
              onClick={handleEdit}
            >
              확인
            </Button>
            <Button
              className='w-[108px] h-8 text-sm text-white bg-red-400'
              onClick={handleEditCancel}
            >
              취소
            </Button>
          </div>
        </form>
      ) : (
        <>
          <p className='font-bold mb-2 px-4 pt-4'>{todo?.title}</p>
          <p className='text-sm px-4'>{todo?.content}</p>
          <div className='w-56 h-8 flex gap-2 pt-3 px-4'>
            <Button
              className='w-[108px] h-8 text-sm text-white bg-gray-400'
              onClick={handleEditMode}
            >
              수정하기
            </Button>
            <Button
              className='w-[108px] h-8 text-sm text-white bg-red-400'
              onClick={handleDelete}
            >
              삭제하기
            </Button>
          </div>
        </>
      )}
    </>
  );
};
export default Detail;
