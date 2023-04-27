import { Link } from '@mui/material';
import React, { useState, useEffect } from 'react';

const PremiumCard = () => {

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
            <button type="button" class="btn btn-lg btn-block btn-outline-primary"><Link to="/PremiumPage">خرید</Link></button>
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
            <button type="button" class="btn btn-lg btn-block btn-outline-primary"><Link to="/PremiumPage">خرید</Link></button>
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
            <button type="button" class="btn btn-lg btn-block btn-outline-primary"><Link to="/PremiumPage">خرید</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumCard;