const BASE_URL = "http://localhost:8080";

export const fetchSignup = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("login error");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

export const fetchLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("login error");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
