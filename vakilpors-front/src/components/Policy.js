import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
// import '../css/policy-page-main-style.css';

const Policy = () => {
  return (
    <>
    <Helmet>
     <title>Privacy Policy</title>
     {/* <link rel="stylesheet" href="css/responsive.css" /> */}
     {/* <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"/> */}
    </Helmet>
    <div className="header_section">
      <div className="container-fluid"></div>
    </div>
    <div className="about_section layout_padding margin_top90">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="about_img">
              {/* <img src="images/about-img.png" alt="about" /> */}
            </div>
          </div>
          <div className="col-md-6">
            <div className="about_text_main">
              <h1 className="about_taital">قوانین وکیل پرس</h1>
              <p className="about_text">
                1. کاربر تعهد میدهد تمام اطلاعاتی که در این سایت وارد
                کرده است، واقعی بوده و عواقب هرگونه اسم جعل یا هویت جعلی
                برعهد وی است.
              </p>

              <p className="about_text">
                وکلا تعهد می دهند، از اطلاعات موکلان صیانت نمایند .2.
              </p>

              <p className="about_text">
                3. وکلا تعهد می دهند از هرگونه راهنمایی انحرافی خودداری
                نمایند
              </p>

              <p className="about_text">
                4. کاربر تعهد میدهد، برای حقوق وکیل احترام قائل باشد. و
                در صورت استفاده از مطلب وکیل حتما نام وکیل را قید نماید.
              </p>
            </div>
          </div>
          <Link to="/Register">بازگشت</Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default Policy;
