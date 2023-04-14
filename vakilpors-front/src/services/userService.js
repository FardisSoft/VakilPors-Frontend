import axios from "axios";
import { BASE_API_ROUTE } from '../Constants';

const SERVER_URL = BASE_API_ROUTE ;


export const LoginUser = (User) => {
  const url = `${SERVER_URL}Auth/login`;
  return axios.post(url, User);
};


export const updateUser = (User) => {
  const url = `https://api.fardissoft.ir/Customer/UpdateUser`;
  return axios.put(url, User);
};

export const updateLawyer = (User) => {
  const url = `https://api.fardissoft.ir/Lawyer/UpdateLawyer`;
  return axios.put(url, User);
};

export const deleteUser = (Userid) => {
  const url = `${SERVER_URL}/${Userid}`;
  return axios.delete(url);
};

export const getAlllawyer  = () => {
  const url = `https://api.fardissoft.ir/Lawyer/GetAll`;
  return axios.get(url);
};

export const getlawyer = (LawyerId) => {
  const url = `http://localhost:8000/Lawyer/${LawyerId}`;
  return axios.get(url);
};