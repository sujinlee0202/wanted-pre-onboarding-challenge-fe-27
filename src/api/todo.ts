import { BASE_URL } from ".";
import { TodoItem } from "../types/todo";

// todo 추가
export const fetchCreateTodo = async (todo: TodoItem, loginToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginToken}`,
      },
      body: JSON.stringify({
        title: todo.title,
        content: todo.content,
      }),
    });

    if (!response.ok) {
      throw new Error("create todo error");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

// todo 불러오기
export const fetchGetTodos = async (loginToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("read todo error");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

// todo 삭제
export const fetchDeleteTodos = async (
  loginToken: string | null,
  id: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("delete todo error");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

// id를 통해 todo 불러오기
export const fetchGetTodoById = async (loginToken: string, id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("read todo error");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
