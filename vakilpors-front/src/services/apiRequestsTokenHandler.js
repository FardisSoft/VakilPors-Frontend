import axios from "axios";
import { useJwt } from "react-jwt";
import { BASE_API_ROUTE } from "../Constants";

const ApiRequestsTokenHandler = () => {


    const IsCookieExists = (cookieName) => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith(`${cookieName}=`));
        if (cookie) {
            return true;
        }
        return false;
    }

    const IsCookieExpired = (cookieName) => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith(`${cookieName}=`));
        const cookieValue = cookie.split('=')[1];
        const { decodedToken } = useJwt(cookieValue);
        const expirationDate = new Date(decodedToken.exp * 1000);
        return expirationDate < new Date();
    };

    const tokenRefresher = () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken=')).split('=')[1];
        const data = JSON.stringify({
        "token": token,
        "refreshToken": refreshToken
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: BASE_API_ROUTE + 'Auth/refreshtoken',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
            console.log("response : ",response);
            // console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            // const responseData = error.response.data.data;
            console.log("error : ",error);
        });
    };

    if( !IsCookieExists('token') ){
        return "cant send request. login expired. user must login.";
    }
    if( IsCookieExpired('token') ){
        return "cant send request. login expired. user must login.";
    }
    else{
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        let data = '';
        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: BASE_API_ROUTE + 'Test',
        headers: {
            'Authorization': `Bearer ${token}`
            },
        data : data
        };
        axios.request(config)
        .then((response) => {
            return "request can send. token is valid";
        })
        .catch((error) => {
            tokenRefresher();
            return "request can send. token is valid";
        });
    }
}

export default ApiRequestsTokenHandler;