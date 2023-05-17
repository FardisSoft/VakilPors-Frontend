import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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

    showSuccesMessage('در حال انتقال به صفحه پریمیوم.');
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
            <h4 class="my-0 font-weight-normal">برنزی</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">20000 تومان<small class="text-muted">/ ماهانه</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
            <li>درخواست بررسی پرونده توسط وکلای مورد تایید</li>
              <li>پرسش و پاسخ بدون محدودیت!</li>
              <li>برگزاری میتینگ و هماهنگی با وکلای درخواستی</li>
              <li>چت آنلاین با وکلای درخواستی</li>
            </ul>
            <button onClick={onClick1} type="button" class="btn btn-lg btn-block btn-outline-primary"><Link to="/PremiumPage">خرید</Link></button>
          </div>
        </div>
        <div class="col-4 card mb-4 box-shadow" style={{borderTopRightRadius : "20px", borderBottomLeftRadius : "20px"}}>
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">نقره ای</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">30000 تومان<small class="text-muted">/ دو ماهه</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>درخواست بررسی پرونده توسط وکلای مورد تایید</li>
              <li>پرسش و پاسخ بدون محدودیت!</li>
              <li>برگزاری میتینگ و هماهنگی با وکلای درخواستی</li>
              <li>چت آنلاین با وکلای درخواستی</li>
            </ul>
            <button onClick={onClick2} type="button" class="btn btn-lg btn-block btn-outline-primary"><Link to="/PremiumPage">خرید</Link></button>
          </div>
        </div>
        <div class="col-4 card mb-4 box-shadow" style={{borderTopRightRadius : "20px", borderBottomLeftRadius : "20px"}}>
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">طلایی</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">50000 تومان<small class="text-muted">/ سه ماهه</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
            <li>درخواست بررسی پرونده توسط وکلای مورد تایید</li>
              <li>پرسش و پاسخ بدون محدودیت!</li>
              <li>برگزاری میتینگ و هماهنگی با وکلای درخواستی</li>
              <li>چت آنلاین با وکلای درخواستی</li>
            </ul>
            <button onClick={onClick3} type="button" class="btn btn-lg btn-block btn-outline-primary"><Link to="/PremiumPage">خرید</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumCard;