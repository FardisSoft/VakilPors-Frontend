import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_API_ROUTE } from '../../Constants';
import '../../css/signup-and-profile-edit-pages-style.css';
import { FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [policyChecked, setPolicyChecked] = useState(false);
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const descriptionUser = "به وکیل پرس خوش آمدید! اینجا می‌توانید هر سوال حقوقی که دارید را بپرسید! همینطور می‌توانید پرونده‌هایتان را قرار دهید تا وکیلی که می‌خواهید وکالت پرونده شما را قبول کند !";
    const descriptionLawyer = "به وکیل پرس خوش آمدید! اینجا میتوانید به سوالات حقوقی بقیه جواب دهید و امتیاز بگیرید! همچنین میتوانید پرونده های مختلف رو مشاهده کنید و وکالت پرونده دلخواه را قبول کنید!"
    const roleTitleUser = "من کاربر هستم";
    const roleTitleLawyer = "من وکیل هستم";
    const roleUser = "کاربر";
    const roleLawyer = "وکیل";
    const [role, setRole] = useState("user");
    const [roleName, setRoleName] = useState(roleUser);
    const [roleTitle, setRoleTitle] = useState(roleTitleLawyer);
    const [description, setDescription] = useState(descriptionUser);

    const navigate = useNavigate();

    const handleRoleChanger = () => {
        role === "user" ? setDescription(descriptionLawyer) : setDescription(descriptionUser);
        role === "user" ? setRoleTitle(roleTitleUser) : setRoleTitle(roleTitleLawyer);
        role === "user" ? setRoleName(roleLawyer) : setRoleName(roleUser);
        role === "user" ? setRole("lawyer") : setRole("user");
    };

    const showErrorMessage = (message) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            rtl:true,
            });
    };
    const showSuccesMessage = (message) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            rtl:true,
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if( validateForm() )
            SignupApi();
    }

    const validateForm = () => {
        if(name === ""){
            showErrorMessage("نام و نام خانوادگی خود را وارد کنید");
            return false;
        }
        if(phoneNumber === ""){
            showErrorMessage("شماره موبایل خود را وارد کنید");
            return false;
        }
        if(!/^\d+$/.test(phoneNumber)){ // only digit
            showErrorMessage("شماره موبایل خود را به صورت صحیح وارد کنید");
            return false;
        }
        if(email === ""){
            showErrorMessage("ایمیل خود را وارد کنید");
            return false;
        }
        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            showErrorMessage("ایمیل خود را به صورت صحیح وارد کنید");
            return false;
        }
        if(password === ""){
            showErrorMessage("رمز خود را وارد کنید");
            return false;
        }
        // password reqirements: length between 6 and 30, only digit and letter, at least one uppercase and one lowercase
        if(!(password.length < 31 && password.length > 5 && /^[A-Za-z0-9]*$/.test(password) &&  /[A-Z]/.test(password) && /[a-z]/.test(password))){ 
            showErrorMessage("رمز خود را به صورت صحیح وارد کنید ( رمز شما باید بین 6 تا 30 کاراکتر باشد، فقط از اعداد و حروف انگلیسی تشکیل شده باشد و حداقل شامل یک حرف بزرگ و حداقل یک حرف کوچک باشد)");
            return false;
        }
        if(password !== confirmPassword){
            showErrorMessage("رمز با تکرار رمز مطابقت ندارد");
            return false;
        }
        if(!policyChecked){
            showErrorMessage("برای ثبت نام موافقت با شرایط سایت الزامی است");
            return false;
        }
        return true;
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const SignupApi = async () => {
        const url = BASE_API_ROUTE + 'Auth/register';
        const data = {
            "phoneNumber": phoneNumber,
            "password": password,
            "name": name,
            "email": email,
            "isVakil": role === "user" ? false : true
        }
        try{
            const response = await axios.post(url,data);
            showSuccesMessage('ایجاد حساب کاربری با موفقیت انجام شد');
            const url_2 = BASE_API_ROUTE + `Auth/sendactivationcode?phoneNumber=${phoneNumber.trim()}`;
            try{
                const response_2 = await axios.post(url_2);
                showSuccesMessage('ارسال کد تایید با موفقیت انجام شد');
                await delay(5000);
                navigate(`/Activation_Account/${phoneNumber}`);
            } catch (error) {
                console.log("error in sending activation code : ",error);
                showErrorMessage('ارسال کد تایید با خطا مواجه شد');
            }
        } catch (error) {
            const responseData = error.response.data;
            if (responseData.hasOwnProperty('data')){
                if ( responseData.data.hasOwnProperty('DuplicateUserName') ){
                    showErrorMessage("شما قبلا ثبت نام کرده اید! لطفا روی وارد شو کلیک کرده و وارد حساب کاربری خود شوید. ");
                }
                else {
                    showErrorMessage("ثبت نام با خطا مواجه شد. لطفا دوباره تلاش کنید.");
                }
            }
            else {
                showErrorMessage("ثبت نام با خطا مواجه شد. لطفا دوباره تلاش کنید.");
            }
        }
    } 

    return (
    <>
    <Helmet>
        <title>Sign Up</title>
    </Helmet>
    <div className="page-content" >
        <div className="form-v4-content">
            <div className="form-left">
                <h2>سلام</h2>
                <p className="text-1">{description}</p>
                <div className="form-left-last">
                    <input type="submit" onClick={handleRoleChanger} name="account" className="account" value={roleTitle}/>
                </div> 
                <label>
                    <p className="text-1">
                    قبلا ثبت نام کردید؟
                        <Link to="/Login" style={{color: 'lightskyblue', marginRight:'10px'}}>وارد شوید!</Link>
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
                        <input type="tel" name="phone_number" id="phone_number" className="input-text" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} required/>
                    </div>
                </div>
                <div className="form-row">
                    <label htmlFor="your_email">ایمیل</label>
                    <input type="text" name="your_email" id="your_email" className="input-text" value={email} onChange={(e) => setEmail(e.target.value)} required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"/>
                </div>
                <div className="form-group">
                    <div className="form-row form-row-1 ">
                        <label htmlFor="password">رمز</label>
                        <span className="show-password-btn">
                            <i title={isRevealPwd ? "Hide password" : "Show password"}
                                onClick={() => setIsRevealPwd(prevState => !prevState)}><FaEye /></i>
                        </span>
                        <input type={isRevealPwd ? "text" : "password"} name="password" id="password" className="input-text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="form-row form-row-1">
                        <label htmlFor="confirm-password">تکرار رمز</label>
                        <input type={isRevealPwd ? "text" : "password"} name="confirm_password" id="confirm_password" className="input-text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </div>
                </div>
                <div className="form-checkbox">
                    <label><p>با <Link to="/Policy" className="text">شرایط</Link> سایت موافقم</p>
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
