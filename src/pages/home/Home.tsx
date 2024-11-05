import { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import InputBox from "../../components/InputBox";
import TodoList from "../../components/TodoList";
import { Todo, TodoItem } from "../../types/todo";
import {
  fetchCreateTodo,
  fetchDeleteTodos,
  fetchGetTodos,
} from "../../api/todo";
import { readLoginToken } from "../../utils/readLoginToken";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const loginToken = readLoginToken();

  useEffect(() => {
    fetchGetTodos(loginToken).then((res) => setTodos(res.data));
  }, []);

  const addTodo = (text: TodoItem) => {
    if (!loginToken) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    fetchCreateTodo(text, loginToken)
      .then((res) => {
        const newTodo = { ...res.data, isCompleted: false };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      })
      .catch(() => alert("할일의 제목을 입력해주세요"));
  };

  const handleTodoDelete = useCallback(
    (id: string) => {
      if (!loginToken) {
        alert("로그인이 필요한 서비스입니다.");
        return;
      }

      fetchDeleteTodos(loginToken, id).then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      });
    },
    [loginToken]
  );

  return (
    <main className='item-middle min-h-[100vh] m-auto gap-4'>
      <div className='w-[500px] h-[700px] flex flex-col bg-gray-100 border border-gray-500 rounded-xl'>
        <Header />
        <InputBox addTodo={addTodo} />
        <TodoList todos={todos} />
      </div>

      <div className='w-[500px] h-[700px] flex flex-col bg-gray-100 border border-gray-500 rounded-xl'>
        <div className='w-full flex items-center justify-between border-b px-4 py-2'>
          <h2 className='h-11 flex items-center font-bold text-xl'>
            Todo 상세정보
          </h2>
        </div>
        <Outlet context={{ handleTodoDelete }} />
      </div>
    </main>
  );
};

export default Home;
