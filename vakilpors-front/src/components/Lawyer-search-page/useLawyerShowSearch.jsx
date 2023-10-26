import {useEffect,useState} from 'react'
import axios from 'axios'
import  {BASE_API_ROUTE}  from '../../Constants';

export default function useLawyerShowSearch(Pagenumber,filter,Pagesize) {
  useEffect(()=>{
    axios({
      method:'GET',
      url:BASE_API_ROUTE + `Lawyer/GetAllPaged?PageNumber=${Pagenumber}&PageSize=${Pagesize}`

    }).then(res=>{
      console.log(res.data)
    })
  },[Pagenumber,filter,Pagesize])
  return  null
}
