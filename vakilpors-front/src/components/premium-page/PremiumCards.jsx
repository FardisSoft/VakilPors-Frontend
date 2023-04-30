import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const PremiumCard = () => {


  const navigate = useNavigate();

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

  const showSuccesMessage = (payam) => {
    toast.success(payam, {
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
  
  const onClick1 = async () => {

    showSuccesMessage('پکیج رایگان با موفقیت خریداری شد.');
    await delay(5000);
    navigate('/');
};



const onClick2 = async () => {

  showSuccesMessage('در حال انتقال به صفحه پریمیوم');
  await delay(5000);
  navigate('/PremiumPage');
};


const onClick3 = async () => {

  showSuccesMessage('در حال انتقال به صفحه پریمیوم');
  await delay(5000);
  navigate('/PremiumPage');
};





  return (
    <div class="container">
      <div class="row">
        <div class="col-4 card mb-4 box-shadow" style={{borderTopRightRadius : "20px", borderBottomLeftRadius : "20px"}}>
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">رایگان!</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">رایگان!</h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>ماهانه پاسخ به 10 سوال</li>
              <li>بررسی پرسش و پاسخ های دیگر</li>
              <li>اطلاع از پاسخ های دربافتی از طریق ایمیل</li>
            </ul>
            <button onClick={onClick1} type="button" class="btn btn-lg btn-block btn-outline-primary"><Link to="/PremiumPage">خرید</Link></button>
            <ToastContainer />
          </div>
        </div>
        <div class="col-4 card mb-4 box-shadow" style={{borderTopRightRadius : "20px", borderBottomLeftRadius : "20px"}}>
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">تک ستاره</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title"> 2000000ريال  <small class="text-muted">/ ماهانه</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>درخواست بررسی پرونده توسط وکلای مورد تایید</li>
              <li>پرسش و پاسخ بدون محدودیت!</li>
              <li>برگزاری میتینگ و هماهنگی با وکلای درخواستی</li>
              <li>چت آنلاین با وکلای درخواستی</li>
            </ul>
            <button onClick={onClick2} type="button" class="btn btn-lg btn-block btn-outline-primary"><Link to="/PremiumPage">خرید</Link></button>
            <ToastContainer />
          </div>
        </div>
        <div class="col-4 card mb-4 box-shadow" style={{borderTopRightRadius : "20px", borderBottomLeftRadius : "20px"}}>
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">دو ستاره</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title"> 3000000ريال <small class="text-muted">/ ماهانه</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
            <li>درخواست بررسی پرونده توسط وکلای مورد تایید</li>
              <li>پرسش و پاسخ بدون محدودیت!</li>
              <li>برگزاری میتینگ و هماهنگی با وکلای درخواستی</li>
              <li>چت آنلاین با وکلای درخواستی</li>
            </ul>
            <button onClick={onClick3} type="button" class="btn btn-lg btn-block btn-outline-primary"><Link to="/PremiumPage">خرید</Link></button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumCard;