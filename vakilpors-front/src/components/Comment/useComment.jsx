import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_ROUTE } from "../../Constants";
import { useAuth } from "../../context/AuthProvider";
import { useParams } from "react-router-dom";
import jwt from "jwt-decode";

export default function useComment(Pagenumber, Pagesize,LawyerId) {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [Commentdetail1, setCommentdetail1] = useState([]);
  const [hasMore, sethasMore] = useState(false);
  const { getAccessToken, refUserRole } = useAuth();
  useEffect(()=>{
    setCommentdetail1([]);
  },[])
  useEffect(() => {
    let cancel;
    const fetchData = async () => {  
      setloading(true);
      seterror(false);
      const token = await getAccessToken();
      if (token) {
        const urlRate =
          BASE_API_ROUTE +
          `Rate/GetRatesPaged?lawyerId=${LawyerId}&PageNumber=${Pagenumber}&PageSize=${Pagesize}`;
        try {
          const responseRate = await axios.get(urlRate, {
            headers: { Authorization: `Bearer ${token}` },
            cancelToken: new axios.CancelToken(c => (cancel = c))
          });
          setloading(false);
          sethasMore(responseRate.data.nextPage !== null)
          setCommentdetail1(prevcomment => {
            return [...prevcomment, ...responseRate.data.results];
          });
          console.log(responseRate.data.results);
          console.log(responseRate.data.nextPage,Pagenumber,Pagesize);
        } catch (error) {
          seterror(true);
          if (error.response.data.Message != "NO RATES FOUND!") {
            console.log("error in getting lawyer rates : ", error);
          }
        }
      }
    };
    fetchData();
    return () => cancel;
  }, [Pagenumber]);
  return { Commentdetail1, loading, error, hasMore };
}