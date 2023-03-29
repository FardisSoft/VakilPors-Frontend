import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../css/signup-page-main-style.css';

const Register = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [policyChecked, setPolicyChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

    const props = {
        role: role,
        name: name,
        phone: phone,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        policyChecked: policyChecked,
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if( validateForm() )
            SignupApi();
    }

    const validateForm = () => {
        return true;
    }

    const SignupApi = () => {
        axios.post('/api/signup', props)
        .then((response) => response.json())
        .then((data) => {
            // Handle response from API
            setErrorMessage("success");
            console.log(data);
        })
        .catch(error => {
            setErrorMessage("Error signing up. Please try again.");
            console.error(error);
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
                    <label className="container"><p>با <a href="#" className="text">شرایط </a> سایت موافقم</p>
                        <input type="checkbox" name="checkbox" checked={policyChecked} onChange={(e) => setPolicyChecked(e.target.checked)}/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="form-row-last">
                    <input type="submit" onClick={handleSubmit} name="register" className="register" value="بریم!"/>
                </div>
            </form>
        </div>
    </div>
    </>
    );
}
export default Register;