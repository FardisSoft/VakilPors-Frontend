import React, { useState } from "react";
import { Link } from "react-router-dom";
import './css/main.css';
import './css/util.css';



const Login = () => {

    const [usename, setuser] = useState();
    const [pass, setpass] = useState();


    return (

        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100">
                    <form class="login100-form validate-form">
                        <span class="login100-form-title p-b-26">
                            به وکیل پرس خوش آمدی!
                        </span>
                        <span class="login100-form-title p-b-48">
                            <i class="zmdi zmdi-font"></i>
                        </span>

                        <div class="wrap-input100 validate-input" data-validate="">
                            <input class="input100" type="text" name="mobilenumber" />
                            <span class="focus-input100" data-placeholder="شماره همراه"></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter password">
                            <span class="btn-show-pass">
                                <i class="zmdi zmdi-eye"></i>
                            </span>
                            <input class="input100" type="password" name="pass" />
                            <span class="focus-input100" data-placeholder="رمز عبور"></span>
                        </div>

                        <div class="container-login100-form-btn text-center" >
                            <div class="wrap-login100-form-btn" >
                                <div class="login100-form-bgbtn"></div>
                                <button >
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


