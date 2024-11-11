import { fetchRequest } from ".";

export const fetchSignup = async (email: string, password: string) => {
  try {
    const data = await fetchRequest.post("/users/create", {
      email,
      password,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchLogin = async (email: string, password: string) => {
  try {
    const data = await fetchRequest.post("/users/login", {
      email,
      password,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
