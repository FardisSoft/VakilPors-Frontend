import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import axios from 'axios';
import { BASE_API_ROUTE } from '../Constants';
import '../css/signup-page-main-style.css';

const Register = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [policyChecked, setPolicyChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorColor, setErrorColor] = useState("red");

    const descriptionUser = "به وکیل پرس خوش اومدی! اینجا میتونی هر سوال حقوقی که داشتی رو بپرسی! همینطور میتونی پرونده هات رو بزاری تا وکیلی که میخوای برات حلش کنه!";
    const descriptionLawyer = "به وکیل پرس خوش اومدی! اینجا میتونی به سوالات حقوقی بقیه جواب بدی و امتیاز بگیری! همینطور میتونی پرونده های مختلف رو ببینی و انتخاب کنی!"
    const roleTitleUser = "من کاربر هستم";
    const roleTitleLawyer = "من وکیل هستم";
    const roleUser = "کاربر";
    const roleLawyer = "وکیل";
    const [role, setRole] = useState("user");
    const [roleName, setRoleName] = useState(roleUser);
    const [roleTitle, setRoleTitle] = useState(roleTitleLawyer);
    const [description, setDescription] = useState(descriptionUser);

    const handleRoleChanger = () => {
        role === "user" ? setDescription(descriptionLawyer) : setDescription(descriptionUser);
        role === "user" ? setRoleTitle(roleTitleUser) : setRoleTitle(roleTitleLawyer);
        role === "user" ? setRoleName(roleLawyer) : setRoleName(roleUser);
        role === "user" ? setRole("lawyer") : setRole("user");
    }   

    const handleSubmit = (event) => {
        event.preventDefault()
        if( validateForm() )
            SignupApi();
    }

    const validateForm = () => {
        if(name === ""){
            setErrorMessage("نام و نام خانوادگی خود را وارد کنید");
            return false;
        }
        if(phone === ""){
            setErrorMessage("شماره موبایل خود را وارد کنید");
            return false;
        }
        if(!/^\d+$/.test(phone)){ // only digit
            setErrorMessage("شماره موبایل خود را به صورت صحیح وارد کنید");
            return false;
        }
        if(email != ""){
            if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
                setErrorMessage("ایمیل خود را به صورت صحیح وارد کنید");
                return false;
            }
        }
        if(password === ""){
            setErrorMessage("رمز خود را وارد کنید");
            return false;
        }
        // password reqirements: length between 6 and 30, only digit and letter, at least one uppercase and one lowercase
        if(!(password.length < 31 && password.length > 5 && /^[A-Za-z0-9]*$/.test(password) &&  /[A-Z]/.test(password) && /[a-z]/.test(password))){ 
            setErrorMessage("رمز خود را به صورت صحیح وارد کنید ( رمز شما باید بین 6 تا 30 کاراکتر باشد، فقط از اعداد و حروف انگلیسی تشکیل شده باشد و حداقل شامل یک حرف بزرگ و حداقل یک حرف کوچک باشد)");
            return false;
        }
        if(password != confirmPassword){
            setErrorMessage("رمز با تکرار رمز مطابقت ندارد");
            return false;
        }
        if(!policyChecked){
            setErrorMessage("برای ثبت نام موافقت با شرایط سایت الزامی است");
            return false;
        }
    }

    const SignupApi = () => {
        const data = JSON.stringify({
        "phoneNumber": phone,
        "password": password,
        "name": name,
        "email": email,
        "isVakil": role === "user" ? false : true
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: BASE_API_ROUTE + 'Auth/register',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
            setErrorColor("green");
            setErrorMessage("ثبت نام با موفقیت انجام شد!");
            // go to homepage
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            const responseData = error.response.data.data;
            if ( responseData.hasOwnProperty('DuplicateUserName') ){
                setErrorMessage("شما قبلا ثبت نام کرده اید! لطفا روی وارد شو کلیک کرده و وارد حساب کاربری خود شوید. ");
            }
            else {
                setErrorMessage("ثبت نام با خطا مواجه شد. لطفا دوباره تلاش کنید.");
            }
            console.log(error.response.data);
        });
    }
    
    document.getElementsByTagName('body')[0].classList.add("form-v4");  

    return (
    <>
    <Helmet>
        <meta charSet="utf-8"/>
        <title>Sign Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    </Helmet>
    <div className="page-content">
        <div className="form-v4-content">
            <div className="form-left">
                <h2>سلام</h2>
                <p className="text-1">{description}</p>
                <div className="form-left-last">
                    <input type="submit" onClick={handleRoleChanger} name="account" className="account" value={roleTitle}/>
                </div>
                <label className="container">
                    <p className="text-1">
                    قبلا ثبت نام کردی؟
                        <Link to="/Login" style={{color: 'var(--bs-link-color)'}}>وارد شو!</Link>
                    </p>
                </label>
            </div>
            <form className="form-detail" id="myform">
                <h2>ثبت نام {roleName}</h2>
                <div className="form-group">
                    <div className="form-row form-row-1">
                        <label htmlFor="full_name">نام و نام خانوادگی</label>
                        <input type="text" name="full_name" id="full_name" className="input-text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className="form-row form-row-1">
                        <label htmlFor="phone_number">شماره موبایل</label>
                        <input type="tel" name="phone_number" id="phone_number" className="input-text" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                    </div>
                </div>
                <div className="form-row">
                    <label htmlFor="your_email">ایمیل</label>
                    <input type="text" name="your_email" id="your_email" className="input-text" value={email} onChange={(e) => setEmail(e.target.value)} pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"/>
                </div>
                <div className="form-group">
                    <div className="form-row form-row-1 ">
                        <label htmlFor="password">رمز</label>
                        <input type="password" name="password" id="password" className="input-text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="form-row form-row-1">
                        <label htmlFor="confirm-password">تکرار رمز</label>
                        <input type="password" name="confirm_password" id="confirm_password" className="input-text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </div>
                </div>
                <div className="form-checkbox">
                    <label className="container"><p>با <Link to="/Policy" className="text">شرایط</Link> سایت موافقم</p>
                        <input type="checkbox" name="checkbox" checked={policyChecked} onChange={(e) => setPolicyChecked(e.target.checked)}/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="form-row-last">
                    <input type="submit" onClick={handleSubmit} name="register" className="register" value="بریم!"/>
                    <label className="container"><p className="text" style={{color:errorColor}}>{errorMessage}</p></label>
                </div>
            </form>
        </div>
    </div>
    </>
    );
}
export default Register;
