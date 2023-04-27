import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import '../../css/login-page-main-style.css';
import '../../css/login-page-util-style.css';
import { FaEye } from 'react-icons/fa';
import showPwdImg from '../../assests/images/show-password.svg';
import hidePwdImg from '../../assests/images/hide-password.svg';
import { useAuth } from "../../context/AuthProvider";


const Login = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [errorColor, setErrorColor] = useState("red");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [getUser, setUser] = useState({
        phoneNumber: "",
        password: ""
    });

    const { login } = useAuth();

    const navigate = useNavigate();

    const createUser = async (event) => {
        event.preventDefault();
        if (!getUser.phoneNumber || !getUser.password) {
            setErrorMessage("لطفا شماره موبایل یا رمز عبور را وارد کنید.");
            return;
        }
        else {
            setErrorMessage(" ");
            const success = await login(getUser);
            if(success === "success"){
                setErrorColor("green");
                setErrorMessage("وارد شدید! :)");
                await delay(1000);
                navigate("/");
                setUser({});
            }
            else{
                setErrorColor("red");
                setErrorMessage("ورود با خطا مواجه شد.");
            }
            // console.log(localStorage.getItem('accessToken'),"\n refresh : ", localStorage.getItem('refreshToken'));
            // console.log("main role : ", refUserRole.current);
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

                                    <p style={{ color: "white",width : "200px"}}>ورود</p>
                                </button>
                            </div>
                        </div>
                        <label className="container"><p className="text" style={{ color: errorColor }}>{errorMessage}</p></label>
                        <div className="text-center p-t-46 p-b-20">
                            <span className="txt2">
                                اکانت ندارید؟ <Link to="/Register">ثبت نام</Link> کنید!
                            </span>
                            <br></br>
                            <span className="txt2">
                                <Link to="/Forgot_Password">فراموشی رمز عبور</Link>
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


