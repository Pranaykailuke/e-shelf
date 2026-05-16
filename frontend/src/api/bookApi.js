import axios from "axios";

const API = "http://localhost:5000/api/books";

export const getBooks = () => axios.get(API);
export const addBook = (data, token) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });