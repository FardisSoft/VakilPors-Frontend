import { createContext, useContext, useEffect } from 'react';
import useState from 'react-usestateref';
import axios from 'axios';
import { BASE_API_ROUTE } from "../Constants";
import jwt from 'jwt-decode';

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [userRole, setUserRole, refUserRole] = useState(null);
    const [accessToken, setAccessToken, refAccessToken] = useState(null);
    const [refreshToken, setRefreshToken, refRefreshToken] = useState(null);

    useEffect(() => {
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
        fetchTokens();
    }, []);

    const login = async (getUser) => {
        const url = BASE_API_ROUTE + 'Auth/login';
        const data = {
            "phoneNumber": getUser.phoneNumber,
            "password": getUser.password
        }
        try{
            const response = await axios.post(url,data);
            const { token, refreshToken } = response.data.data;
            const tokenData = jwt(token);
            setAccessToken(token);
            setRefreshToken(refreshToken);
            setUserRole(tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    const sendPasswordResetSMS = async (email) => {
        
    };

    const getAccessToken = async () => {
        if (!refAccessToken.current) { // login required
            return null; 
        }

        const tokenData = jwt(refAccessToken.current);
        // 604500 = (7 days - 5 minutes) to seconds
        if ( ( tokenData.exp + 604500 ) * 1000 <= Date.now() ) { // refresh token expired. login required.
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
                return token;
            } catch (error) { // error in refreshing token. login required.
                console.log(error);
                return null;
            }
        }
        else {
            return refAccessToken.current;
        }
    };

    const value = {
        refUserRole,
        sendPasswordResetSMS,
        login,
        logout,
        getAccessToken
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
