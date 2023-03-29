import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import '../css/login-page-main-style.css';
import '../css/login-page-util-style.css';
import {
    LoginUser,
  } from "../services/userService";


const Login = () => {

    const [getUser, setUser] = useState({
        phoneNumber: "",
        password: ""
    });

    const navigate = useNavigate();

    const createUser = async (event) => {
        event.preventDefault();
        if (!getUser.phoneNumber || !getUser.password) {
           alert("لطفا شماره موبایل یا رمز عبور را وارد کنید.");
           return;
        }
        try {
           const { status } = await LoginUser(getUser);
     
           if (status === 201) {
              setUser({});
              navigate("/contacts");
           }
        } catch (err) {
           console.log(err.message);
        }
     };
     
    const setUserInfo = (event) => {
        setUser({
            ...getUser,
            [event.target.name]: event.target.value,
        });
    };


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
                        <h5 class = "txt2-bold">شماره موبایل</h5>
                        <input
                            class="input100"
                            type="text"
                            name="phoneNumber"
                            value={getUser.phoneNumber}
                            onChange={setUserInfo} />
                        
                        <label class="focus-input100"></label>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="Enter password">
                        <span class="btn-show-pass">
                            <i class="zmdi zmdi-eye"></i>
                        </span>
                        <h5 class = "txt2-bold">رمز عبور</h5>
                        <input
                            class="input100"
                            type="password"
                            name="password"
                            value={getUser.password}
                            onChange={setUserInfo} />
                        
                        <span class="focus-input100"></span>
                    </div>

                    <div class="container-login100-form-btn text-center" >
                        <div class="wrap-login100-form-btn" >
                            <div class="login100-form-bgbtn"></div>
                            <button  type="submit">

                                <p style={{ color: "white" }}>ورود</p>
                            </button>
                        </div>
                    </div>

                    <div class="text-center p-t-46 p-b-20">
                        <span class="txt2">
                            اکانت نداری؟ <Link to="/Register">ثبت نام</Link> کن!
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>

);
}

export default Login;


