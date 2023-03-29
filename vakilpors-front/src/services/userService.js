import axios from "axios";

const SERVER_URL = "https://fardissoft.ir/api/Auth/login";


export const LoginUser = (User) => {
  const url = `${SERVER_URL}/Login`;
  return axios.post(url, User);
};


export const updateUser = (User, Userid) => {
  const url = `${SERVER_URL}/Login/${Userid}`;
  return axios.put(url, User);
};


export const deleteUser = (Userid) => {
  const url = `${SERVER_URL}/Login/${Userid}`;
  return axios.delete(url);
};
