import React, { useState } from "react"; 
import '../css/fonts.css';
import '../css/line-awesome.css';
import '../css/signup-page-main-style.css';

function Register(){
    const descriptionUser = "به وکیل پرس خوش اومدی! اینجا میتونی هر سوال حقوقی که داشتی رو بپرسی! همینطور میتونی پرونده هات رو بزاری تا وکیلی که میخوای برات حلش کنه!";
    const descriptionLawyer = "به وکیل پرس خوش اومدی! اینجا میتونی به سوالات حقوقی بقیه جواب بدی و امتیاز بگیری!"
    const roleTitleUser = "من کاربر هستم";
    const roleTitleLawyer = "من وکیل هستم";
    const [role, setRole] = useState("user"); 
    const [roleTitle, setRoleTitle] = useState(roleTitleLawyer);
    const [description, setDescription] = useState(descriptionUser);

    const handleRoleChanger = () => {
        role == "user" ? setDescription(descriptionLawyer) : setDescription(descriptionUser);
        role == "user" ? setRoleTitle(roleTitleUser) : setRoleTitle(roleTitleLawyer);
        role == "user" ? setRole("lawyer") : setRole("user");
    }   

    const html = <>
    <head>
        <meta charset="utf-8"/>
        <title>Sign Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    </head>
    <body className="form-v4">
        <div className="page-content">
            <div className="form-v4-content">
                <div className="form-left">
                    <h2>سلام</h2>
                    <p className="text-1">{description}</p>
                    <div className="form-left-last">
                        <input type="submit" onClick={handleRoleChanger} name="account" className="account" value={roleTitle}/>
                    </div>
                </div>
                <form className="form-detail" action="#" method="post" id="myform">
                    <h2>ثبت نام</h2>
                    <div className="form-group">
                        <div className="form-row form-row-1">
                            <label htmlFor="full_name">نام و نام خانوادگی</label>
                            <input type="text" name="full_name" id="full_name" className="input-text" required/>
                        </div>
                        <div className="form-row form-row-1">
                            <label htmlFor="phone_number">شماره موبایل</label>
                            <input type="tel" name="phone_number" id="phone_number" className="input-text" required/>
                        </div>
                    </div>
                    <div className="form-row">
                        <label htmlFor="your_email">ایمیل</label>
                        <input type="text" name="your_email" id="your_email" className="input-text" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"/>
                    </div>
                    <div className="form-group">
                        <div className="form-row form-row-1 ">
                            <label htmlFor="password">رمز</label>
                            <input type="password" name="password" id="password" className="input-text" required/>
                        </div>
                        <div className="form-row form-row-1">
                            <label htmlFor="confirm-password">تکرار رمز</label>
                            <input type="password" name="confirm_password" id="confirm_password" className="input-text" required/>
                        </div>
                    </div>
                    <div className="form-checkbox">
                        <label className="container"><p>با <a href="#" className="text">شرایط </a> سایت موافقم</p>
                            <input type="checkbox" name="checkbox"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="form-row-last">
                        <input type="submit" name="register" className="register" value="بریم!"/>
                    </div>
                </form>
            </div>
        </div>
    </body>
    </>;

    return html;
}
export default Register;