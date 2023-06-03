import axios from "axios";
import { BASE_API_ROUTE } from '../Constants';


export const LoginUser = (User) => {
  const url = BASE_API_ROUTE + 'Auth/login';
  return axios.post(url, User);
};


export const updateUser = (User) => {
  const url = BASE_API_ROUTE + 'Customer/UpdateUser';
  return axios.put(url, User);
};

export const updateLawyer = (User) => {
  const url = BASE_API_ROUTE + 'Lawyer/UpdateLawyer';
  return axios.put(url, User);
};

export const deleteUser = (Userid) => {
  const url = `${BASE_API_ROUTE}/${Userid}`;
  return axios.delete(url);
};

export const getAlllawyer  = () => {
  const url = BASE_API_ROUTE + 'Lawyer/GetAll';
  return axios.get(url);
};

export const getlawyer = (LawyerId) => {
  const url = BASE_API_ROUTE + 'Lawyer/${LawyerId}';
  return axios.get(url);
};