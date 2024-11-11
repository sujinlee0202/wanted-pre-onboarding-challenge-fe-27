import { fetchRequest } from ".";
import { TodoItem } from "../types/todo";

// todo 추가
export const fetchCreateTodo = async (todo: TodoItem, accessToken: string) => {
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    const data = await fetchRequest.post(
      "/todos",
      {
        title: todo.title,
        content: todo.content,
      },
      accessToken
    );

    return data;
  } catch (error) {
    throw error;
  }
};

// todo 불러오기
export const fetchGetTodos = async (accessToken: string) => {
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    const data = await fetchRequest.get("/todos", accessToken);

    return data;
  } catch (error) {
    throw error;
  }
};

// todo 삭제
export const fetchDeleteTodos = async (accessToken: string, id: string) => {
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    const data = await fetchRequest.delete(`/todos/${id}`, accessToken);

    return data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

// id를 통해 todo 불러오기
export const fetchGetTodoById = async (accessToken: string, id: string) => {
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    const data = await fetchRequest.get(`/todos/${id}`, accessToken);

    return data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

// todo 수정하기
export const fetchUpdateTodo = async (
  accessToken: string,
  id: string,
  todo: TodoItem
) => {
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    const data = await fetchRequest.put(
      `/todos/${id}`,
      {
        title: todo.title,
        content: todo.content,
      },
      accessToken
    );

    return data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
