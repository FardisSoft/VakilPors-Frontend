import axios from "axios";
import { BASE_API_ROUTE } from '../Constants';

const SERVER_URL = BASE_API_ROUTE ;


export const LoginUser = (User) => {
  const url = `${SERVER_URL}Auth/login`;
  return axios.post(url, User);
};


export const updateUser = (User, Userid) => {
  const url = `${SERVER_URL}/${Userid}`;
  return axios.put(url, User);
};


export const deleteUser = (Userid) => {
  const url = `${SERVER_URL}/${Userid}`;
  return axios.delete(url);
};
