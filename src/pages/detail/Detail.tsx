import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { readLoginToken } from "../../utils/readLoginToken";
import { useEffect, useState } from "react";
import { fetchGetTodoById } from "../../api/todo";
import { Todo } from "../../types/todo";

const Detail = () => {
  const [todo, setTodo] = useState<Todo>();
  const loginToken = readLoginToken();
  const params = useParams();
  const navigate = useNavigate();
  const { handleTodoDelete } = useOutletContext<{
    handleTodoDelete: (id: string) => void;
  }>();

  useEffect(() => {
    if (params.id) {
      fetchGetTodoById(loginToken, params.id).then((res) => setTodo(res.data));
    }
  }, [params]);

  const handleDelete = () => {
    if (params.id) {
      handleTodoDelete(params.id);
      navigate("/", {
        replace: true,
      });
    }
  };

  return (
    <>
      <p className='font-bold mb-2 px-4 pt-4'>{todo?.title}</p>
      <p className='text-sm px-4'>{todo?.content}</p>
      <div className='w-56 h-8 flex gap-2 pt-3 px-4'>
        <Button className='w-[108px] h-8 text-sm text-white bg-gray-400'>
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
  );
};
export default Detail;
