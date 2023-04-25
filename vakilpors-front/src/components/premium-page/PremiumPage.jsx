import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';
import { useAuth } from "../../services/AuthProvider";
import { CircularProgress} from '@mui/material';
import axios from 'axios';
import '../../css/premium-page.css';
import { Link } from 'react-router-dom';

const PremiumPage = () => {



  const [getpremiumdetail, setpremiumdetail] = useState([]);
  const { refUserRole, getAccessToken } = useAuth();
  const [getamountdetail, setamountdetail] = useState({
    amount: " ",
    description: ""
  });


  useEffect(() => {
    const fetchData = async () => {
      console.log(refUserRole);
      const token = await getAccessToken();
      if (token) {
        const tokenData = jwt(token);
        let url = "";
        if (refUserRole.current === "User") {
          url = `https://api.fardissoft.ir/Customer/GetUserById?userId=${tokenData.uid}`;
        }
        if (refUserRole.current === "Vakil") {
          url = `https://api.fardissoft.ir/Lawyer/GetLawyerById?lawyerId=${tokenData.uid}`;
        }
        try {
          const response = await axios.get(url);
          console.log('response : ', response);
          setpremiumdetail(response.data.data);
        } catch (error) {
          console.log('error : ', error);
        }
      }
    };
    fetchData();
  }, []);


  const payroll = async () => {
    const url = "https://api.fardissoft.ir/Payment/request";
    const data = {
      "amount": getamountdetail.amount,
      "description": getamountdetail.description
    }
    console.log(data);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("accessToken")
    }
    const response = await axios.post(url, data, {
      headers: headers
    });
    window.location.replace(response.data.paymentUrl);
  }

  const setUserInfo = (event) => {
    setamountdetail({
      ...getamountdetail,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div class="container">
      <div classNameName="col-12">
        <div className="row" id="all">
          <div className="col-12 d-flex align-items-center justify-content-between mt-2 d-lg-none">
            <h4 className="font-weight-bold ">داشبورد من</h4>
            <a href="client.php#buy" className="btn btn-sm btn-buy scroll px-4">
              تمدید اشتراک
            </a>
          </div>
          <div className="col-12 col-lg-8 mt-3 mt-lg-0">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="profile shadow-sm text-center bg-white" id="showprofile">
                  <img src="https://cdn2.iconfinder.com/data/icons/man-user-human-profile-person-business-avatar/100/13-1User-3-512.png" style={{ width: "150px", height: "150px" }} />
                  <h5 className="mt-4 text-dark mb-0">خوش آمدید</h5>
                  <h4 className="mb-4 mt-3 text-dark username tahoma" id="username">{getpremiumdetail.name}</h4>
                  <Link to="/edit-user" className="edit-profile-link">
                    ویرایش پروفایل
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6 mt-4 mt-md-0">
                <div className="expire shadow-sm text-center bg-white" id="untilexpire">
                  <CircularProgress variant="determinate" value={89} size="6rem" />
                  <h4 className="mt-4 text-dark mb-0 font-weight-bold">تعداد روزهای باقی مانده</h4>
                  <div className="d-flex justify-content-between mt-3">
                    <span>نوع سرویس</span>
                    <span>
                      <b>پلاس</b>
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <span>آخرین خرید:</span>
                    <span>پلاس 3 ماهه</span>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <span>تاریخ انقضا:</span>
                    ۱۴۰۲/۰۴/۰۹ ۱۱:۵۶
                  </div>
                </div>
              </div>
              <input type="hidden" id="exp" value="72" />
              <input type="hidden" id="aday" value="۲۱,۶۰۰ تومان" />
              <div className="col-12 d-none d-lg-block">
                <div className="report-box shadow-sm mt-3 bg-white" id="history">
                  <div className="row">
                    <div className="col-12 col-md-6 mt-4 mt-lg-0">
                      



                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-4 mt-lg-0" >
            <div className="buy-account shadow-md bg-white" id="buy">
              <h3 className="text-center font-weight-bold">تمدید اشتراک</h3>
              <br />
              <span className="error">از تمدید طولانی مدت اکانت خود پرهیز کنید ، پیشنهاد ما تمدید ماهانه میباشد</span>
              <div className="form-group mt-3 psc" id="p_1">
                <label for="service">انتخاب مدت زمان</label>
                <select className="form-control tamdid" onClick={(x) => { console.log(x.target.value) }}>
                  <option value="0">--- انتخاب کنید ---</option>
                  <option name="description" value="150000" rel="۱۵۰,۰۰۰ تومان" data-price="150000" data-cat="2" onClick={setUserInfo}>پلاس 1 ماهه</option>
                  <option name="amount" value="300000" rel="۳۹۰,۰۰۰ تومان" data-price="390000" data-cat="2" onClick={setUserInfo}>پلاس 3 ماهه</option>
                </select>

              </div>
              <input type="hidden" id="updateid" value="" />
              <input type="hidden" id="user_plus" value="1" />
              <input type="hidden" id="user_cach" value="0" />
              <input type="hidden" id="user_wallet" value="0" />
              <input type="hidden" id="orprice" value="" />
              <div className="form-group mt-4">
                <label for="coupon">کد تخفیف</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="کد تخفیف" id="copun" name="copun" />
                  <div className="input-group-append">
                    <button className="btn btn-coupon" type="button" id="check1">اعمال</button>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <span>پرداخت با کیف پول</span>
                <label className="cl-switch cl-switch-green">
                  <input type="checkbox" id="paywallet" value="1" />
                  <span className="switcher"></span>
                </label>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span>میزان تخفیف</span>
                <span id="discount">-</span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span>مبلغ سرویس</span>
                <span id="prices">۰ تومان
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span>مبلغ نهایی</span>
                <span id="prices2">۰ تومان + مالیات درگاه
                </span>
              </div>
              <div className="form-group mt-3 psc" id="p_1">
                <label for="service">انتخاب درگاه پرداخت</label>
                <select className="form-control" name="gateway" id="gateway">
                  <option value="panispaynet">Panis Pay</option>
                  <option value="nowpayments">ارز دیجیتال</option>
                </select> </div>
              <div className="text-center mt-5">
                <button className="btn btn-primary px-5 text-lg w-100" onClick={payroll}>پرداخت</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumPage;