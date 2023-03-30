import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100">
                    <form class="login100-form validate-form" onSubmit={createUser}>
                        <span class="login100-form-title p-b-26">
                            به وکیل پرس خوش آمدی!
                        </span>
                        <span class="login100-form-title p-b-48">
                            <i class="zmdi zmdi-font"></i>
                        </span>

                        <div class="wrap-input100 validate-input" data-validate="">
                            <h5 class="txt2-bold">شماره موبایل</h5>
                            <input
                                class="input100"
                                type="text"
                                name="phoneNumber"
                                value={getUser.phoneNumber}
                                onChange={setUserInfo} />

                            <label class="focus-input100"></label>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter password">

                            <h5 class="txt2-bold">رمز عبور</h5>
                            <input
                                class="input100"
                                type={isRevealPwd ? "text" : "password"}
                                name="password"
                                value={getUser.password}
                                onChange={setUserInfo}
                            />
                            <span class="btn-show-pass mx-5 my-2">
                                <i class="zmdi zmdi-eye mx-5" title={isRevealPwd ? "Hide password" : "Show password"}
                                    src={isRevealPwd ? hidePwdImg : showPwdImg}
                                    onClick={() => setIsRevealPwd(prevState => !prevState)}><FaEye /></i>
                            </span>
                            <span class="focus-input100"></span>
                        </div>

                        <div class="container-login100-form-btn text-center" >
                            <div class="wrap-login100-form-btn" >
                                <div class="login100-form-bgbtn"></div>
                                <button type="submit">

                                    <p style={{ color: "white" }}>ورود</p>
                                </button>
                            </div>
                        </div>
                        <label className="container"><p className="text" style={{ color: errorColor }}>{errorMessage}</p></label>
                        <div class="text-center p-t-46 p-b-20">
                            <span class="txt2">
                                اکانت نداری؟ <Link to="/Register">ثبت نام</Link> کن!
                            </span>
                        </div>
                    </form>
                </div>
            </div >
        </div >

    );
}

export default Login;


