import React from 'react';

function PrivacyPolicy() {
  return (
    <html>
      <head>
        {/* basic /}
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/ mobile metas /}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        {/ site metas /}
        <title>Privacy Policy</title>
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        {/ bootstrap css /}
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
        {/ style css /}
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        {/ Responsive*/}
        <link rel="stylesheet" href="css/responsive.css" />
        {/* fevicon /}
        <link rel="icon" href="images/fevicon.png" type="image/gif" />
        {/ font css /}
        <link
          href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        {/ Scrollbar Custom CSS /}
        <link
          rel="stylesheet"
          href="css/jquery.mCustomScrollbar.min.css"
        />
        {/ Tweaks for older IEs*/}
        <link
          rel="stylesheet"
          href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
        />
      </head>
      <body>
        <div className="header_section">
          <div className="container-fluid"></div>
        </div>
        {/* header section end /}
        {/ about section start */}
        <div className="about_section layout_padding margin_top90">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="about_img">
                  <img src="images/about-img.png" alt="about" />
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
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default PrivacyPolicy;
