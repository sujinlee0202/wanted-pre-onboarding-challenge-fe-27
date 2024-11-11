export const BASE_URL = "http://localhost:8080";

const options = (method: string, body: unknown, accessToken?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
};

export const fetchRequest = {
  get: async (url: string, accessToken?: string) => {
    const response = await fetch(
      BASE_URL + url,
      options("GET", undefined, accessToken)
    );
    if (!response.ok) throw new Error("GET request error");

    return response.json();
  },

  post: async (url: string, body: unknown, accessToken?: string) => {
    const response = await fetch(
      BASE_URL + url,
      options("POST", body, accessToken)
    );
    if (!response.ok) throw new Error("POST request error");

    return response.json();
  },

  put: async (url: string, body: unknown, accessToken?: string) => {
    const response = await fetch(
      BASE_URL + url,
      options("PUT", body, accessToken)
    );
    if (!response.ok) throw new Error("PUT request error");

    return response.json();
  },

  delete: async (url: string, accessToken?: string) => {
    const response = await fetch(
      BASE_URL + url,
      options("DELETE", undefined, accessToken)
    );
    if (!response.ok) throw new Error("DELETE request error");

    return response.json();
  },
};
