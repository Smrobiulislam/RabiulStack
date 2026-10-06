const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(url, options = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  return response.json();
}

export const registerUser = (data) =>
  request("/users/register", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const loginUser = (data) =>
  request("/users/login", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const getProfile = (token) =>
  request("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });