export const BASE_URL = "https://api.charlesmickey.nomoredomains.monster";

export const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    headers,
    credentials: 'include',
    method: "POST",
    body: JSON.stringify({ password, email }),
  }).then((res) => checkResponse(res));
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    headers,
    method: "POST",
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then((res) => checkResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: { ...headers, Authorization: `Bearer ${token}` },
    credentials: 'include',
    method: "GET",
  }).then((res) => checkResponse(res));
};
