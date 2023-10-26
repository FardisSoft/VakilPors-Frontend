import {useEffect,useState} from 'react'
import axios from 'axios'
import  {BASE_API_ROUTE}  from '../../Constants';

export default function useLawyerShowSearch(Pagenumber,Pagesize,sort,click) {
  const[loading,setloading]=useState(true);
  const[error,seterror]=useState(false);
  const[lawyerdetail1, setlawyerdetail]=useState([]);
  const[hasMore,sethasMore]=useState(false);

  useEffect(()=>{
    setlawyerdetail([])
  },[sort,click])

  useEffect(() => {
    setloading(true);
    seterror(false);
  
    let cancel;
  
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_API_ROUTE + `Lawyer/GetAllPaged?PageNumber=${Pagenumber}&PageSize=${Pagesize}&sort=${sort}`, {
          cancelToken: new axios.CancelToken(c => (cancel = c))
        });
        const data = response.data;  
        setlawyerdetail(prevlawyer => {
          return [...prevlawyer, ...data.data.results];
        });
        // setlawyerdetail(data.data.results)
        sethasMore(data.data.nextPage != null)
        setloading(false)
        console.log(sort)
        console.log(data.data.nextPage != null);
        console.log(data.data.nextPage);
        console.log(data.data.results);
      } catch (error) {
        if (axios.isCancel(error)) return;
        seterror(true)
      }
    };  
    fetchData();  
    return () => cancel();
  }, [Pagenumber, Pagesize, sort]);
  
  return {lawyerdetail1,loading,error,hasMore};
}
