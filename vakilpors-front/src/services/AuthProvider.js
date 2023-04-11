import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_API_ROUTE } from "../Constants";
import jwt from 'jwt-decode'

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    useEffect(() => {
        const fetchTokens = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            if(accessToken){
                setAccessToken(accessToken);
            }
            if(refreshToken){
                setRefreshToken(refreshToken);
            }
        };
        fetchTokens();
    }, []);

    const login = async (getUser) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BASE_API_ROUTE + 'Auth/login',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                    "phoneNumber": getUser.phoneNumber,
                    "password": getUser.password
                })
        };

        axios.request(config)
        .then((response) => {
            console.log(response);
            const { token, refreshToken } = response.data.data;
        
            setAccessToken(token);
            setRefreshToken(refreshToken);
            // setUserRole(userRole);
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', refreshToken);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUserRole(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    const sendPasswordResetSMS = async (email) => {
        
    };

    const getAccessToken = async () => {
        if (!refreshToken) { // login required
            return null; 
        }

        if(!accessToken) { // refresh required
            try {
                const data = JSON.stringify({
                    "token": "",
                    "refreshToken": refreshToken
                });
                const url = BASE_API_ROUTE + 'Auth/refreshtoken';
                
                const response = await axios.post(url, data);

                const newAccessToken = response.data.data.token;
                setAccessToken(newAccessToken);
                localStorage.setItem('accessToken', newAccessToken);
                return newAccessToken;

            } catch (error) { // error in refreshing token. login required.
                return null;
            }
        }

        return accessToken;
    };

    const value = {
        userRole,
        sendPasswordResetSMS,
        login,
        logout,
        getAccessToken
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
