import { createContext, useContext, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import axios from 'axios';
import { BASE_API_ROUTE } from "../Constants";
import jwt from 'jwt-decode';

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [userRole, setUserRole, refUserRole] = useStateRef(null);
    const [accessToken, setAccessToken, refAccessToken] = useStateRef(null);
    const [refreshToken, setRefreshToken, refRefreshToken] = useStateRef(null);
    const [isLoggedIn, setIsLoggedIn, refIsLoggedIn] = useStateRef(false);

    useEffect(() => {
        fetchTokens();
    }, []);

    const fetchTokens = async () => {
        const accesstoken = localStorage.getItem('accessToken');
        const refreshtoken = localStorage.getItem('refreshToken');
        if(accesstoken){
            setAccessToken(accesstoken);
            const tokenData = jwt(accesstoken);
            setUserRole(tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
        }
        if(refreshtoken){
            setRefreshToken(refreshtoken);
        }
    };

    const login = async (phoneNumber, password) => {
        const url = BASE_API_ROUTE + 'Auth/login';
        const data = {
            "phoneNumber": phoneNumber,
            "password": password
        }
        try{
            const response = await axios.post(url,data);
            const { token, refreshToken } = response.data.data;
            const tokenData = jwt(token);
            setAccessToken(token);
            setRefreshToken(refreshToken);
            setUserRole(tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
            setIsLoggedIn(true);
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', refreshToken);
            return "success";
        } catch (error) {
            console.log(error);
            return "error";
        }
    };

    

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUserRole(null);
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    const getAccessToken = async () => {
        
        fetchTokens();

        if (!refAccessToken.current) { // login required
            console.log("no token exists");
            return null; 
        }

        const tokenData = jwt(refAccessToken.current);
        // 604500 = (7 days - 5 minutes) to seconds
        if ( ( tokenData.exp + 604500 ) * 1000 <= Date.now() ) { // refresh token expired. login required.
            console.log("refresh token expired");
            return null;
        }

        if(tokenData.exp * 1000 <= Date.now()) { // refresh required
            const url = BASE_API_ROUTE + 'Auth/refreshtoken';
            const data = {
                "token": refAccessToken.current,
                "refreshToken": refRefreshToken.current
            }
            try{
                const response = await axios.post(url,data);
                const { token, refreshToken } = response.data.data;
                setAccessToken(token);
                setRefreshToken(refreshToken);
                localStorage.setItem('accessToken', token);
                localStorage.setItem('refreshToken', refreshToken);
                console.log('token expired but refreshed');
                return token;
            } catch (error) { // error in refreshing token. login required.
                console.log(error);
                return null;
            }
        }
        else {
            console.log('token not expired');
            return refAccessToken.current;
        }
    };

    // const getImage = async (imageURL) => {
    //     try {
    //         const response = await axios.get(imageURL, {
    //             responseType: 'arraybuffer'
    //         });
    //         const base64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte),''));
    //         const imageSrc = `data:image/jpeg;base64,${base64}`;
    //         return imageSrc;
    //     } catch (error) {
    //       console.log('error in convertnig image to base64 : ', error);
    //     }
    // };

    const value = {
        refUserRole,
        refIsLoggedIn,
        login,
        logout,
        getAccessToken
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
