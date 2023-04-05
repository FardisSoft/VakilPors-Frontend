import axios from "axios";
import { useJwt } from "react-jwt";
import { BASE_API_ROUTE } from "../Constants";
import { useState } from "react";

const useApiRequestsTokenHandler = () => {

    const [isTokenValid, setIsTokenValid] = useState(false);

    const isCookieExists = (cookieName) => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith(`${cookieName}=`));
        if (cookie) {
            return true;
        }
        return false;
    }

    const tokenRefresher = () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken=')).split('=')[1];
        // console.log("token : ", token,"refreshToken : ",refreshToken);
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
            setIsTokenValid(true);
            // console.log("response in refreshing token : ",response);
            const days = 3;
            const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
            document.cookie = `token=${response.data.data.token}; path=/; expires=${expires}; Secure; SameSite=Strict`;
            document.cookie = `refreshToken=${response.data.data.refreshToken}; path=/; expires=${expires}; Secure; SameSite=Strict`;
        })
        .catch((error) => {
            setIsTokenValid(false);
            // const responseData = error.response.data.data;
            // console.log("error in refreshing token : ",error);
        });
    };

    if( !isCookieExists('token') ){
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
            // console.log("niazi be refresh nist");
            setIsTokenValid(true);
        })
        .catch((error) => {
            // console.log("mikhad bere refresh kone");
            tokenRefresher();
        });
        if(isTokenValid){
            return "request can send. token is valid";
        }
        else{
            return "request cant send. error in refreshing token";
        }
    }
}

export default useApiRequestsTokenHandler;