import { useCallback, useState } from "react";
import Header from "../../components/Header";
import InputBox from "../../components/InputBox";
import TodoList from "../../components/TodoList";
import { Todo, TodoItem } from "../../types/todo";
import Button from "../../components/Button";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isOpenTodoDetail, setIsOpenTodoDetail] = useState(false);

  const addTodo = (text: TodoItem) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Math.random(),
        text,
        isCompleted: false,
      },
    ]);
  };

  const handleTodoCompleted = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      })
    );
  }, []);

  const handleTodoDelete = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleOpenDetail = useCallback((id: number) => {
    if (id) {
      setIsOpenTodoDetail(true);
    } else {
      setIsOpenTodoDetail(false);
    }
  }, []);

  return (
    <main className='item-middle min-h-[100vh] m-auto gap-4'>
      <div className='w-[500px] h-[700px] flex flex-col bg-gray-100 border border-gray-500 rounded-xl'>
        <Header />
        <InputBox addTodo={addTodo} />
        <TodoList
          todos={todos}
          handleTodoCompleted={handleTodoCompleted}
          handleTodoDelete={handleTodoDelete}
          handleOpenDetail={handleOpenDetail}
        />
      </div>
      {isOpenTodoDetail && (
        <div className='w-[500px] h-[700px] flex flex-col bg-gray-100 border border-gray-500 rounded-xl'>
          <div className='w-full flex items-center justify-between border-b px-4 py-2'>
            <h2 className='h-11 flex items-center font-bold text-xl'>
              Todo 상세정보
            </h2>
          </div>
          <p className='font-bold mb-2 px-4 pt-4'>청소</p>
          <p className='text-sm px-4'> 청소하기</p>
          <div className='w-56 h-8 flex gap-2 pt-3 px-4'>
            <Button className='w-[108px] h-8 text-sm text-white bg-gray-400'>
              수정하기
            </Button>
            <Button className='w-[108px] h-8 text-sm text-white bg-red-400'>
              삭제하기
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
