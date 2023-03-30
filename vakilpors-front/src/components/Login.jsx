import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import '../css/login-page-main-style.css';
import '../css/login-page-util-style.css';
import { FaEye } from 'react-icons/fa';
import showPwdImg from '../show-password.svg';
import hidePwdImg from '../hide-password.svg';

import {
    LoginUser,
} from "../services/userService";


const Login = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [errorColor, setErrorColor] = useState("red");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [getUser, setUser] = useState({
        phoneNumber: "",
        password: ""
    });
  

    const navigate = useNavigate();

    const createUser = async (event) => {
        event.preventDefault();
        if (!getUser.phoneNumber || !getUser.password) {
            setErrorMessage("لطفا شماره موبایل یا رمز عبور را وارد کنید.");
            return;
        }
        else {
            setErrorMessage(" ");
            try {
                const { status } = await LoginUser(getUser);
                console.log(status);
                if (status === 200) {
                    setErrorColor("green");
                    setErrorMessage("وارد شدید! :)");
                    await delay(1000);
                    navigate("/");
                    setUser({});

                }
            } catch (err) {
                setErrorMessage("ورود با خطا مواجه شد :(");
            }
        }
    };

    const setUserInfo = (event) => {
        setUser({
            ...getUser,
            [event.target.name]: event.target.value,
        });
    };

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    return (
        <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form" onSubmit={createUser}>
                        <span className="login100-form-title p-b-26">
                            به وکیل پرس خوش آمدید!
                        </span>
                        <span className="login100-form-title p-b-48">
                            <i className="zmdi zmdi-font"></i>
                        </span>

                        <div className="wrap-input100 validate-input" data-validate="">
                            <h5 className="txt2-bold">شماره موبایل</h5>
                            <input
                                className="input100"
                                type="text"
                                name="phoneNumber"
                                value={getUser.phoneNumber}
                                onChange={setUserInfo} />

                            <label className="focus-input100"></label>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter password">

                            <h5 className="txt2-bold">رمز عبور</h5>
                            <input
                                className="input100"
                                type={isRevealPwd ? "text" : "password"}
                                name="password"
                                value={getUser.password}
                                onChange={setUserInfo}
                            />
                            <span className="btn-show-pass mx-5 my-2">
                                <i className="zmdi zmdi-eye mx-5" title={isRevealPwd ? "Hide password" : "Show password"}
                                    src={isRevealPwd ? hidePwdImg : showPwdImg}
                                    onClick={() => setIsRevealPwd(prevState => !prevState)}><FaEye /></i>
                            </span>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="container-login100-form-btn text-center" >
                            <div className="wrap-login100-form-btn" >
                                <div className="login100-form-bgbtn"></div>
                                <button type="submit">

                                    <p style={{ color: "white" }}>ورود</p>
                                </button>
                            </div>
                        </div>
                        <label className="container"><p className="text" style={{ color: errorColor }}>{errorMessage}</p></label>
                        <div className="text-center p-t-46 p-b-20">
                            <span className="txt2">
                                اکانت ندارید؟ <Link to="/Register">ثبت نام</Link> کنید!
                            </span>
                        </div>
                    </form>
                </div>
            </div >
        </div >
        </>
    );
}

export default Login;


