import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';
import { useAuth } from "../../context/AuthProvider";
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import '../../css/premium-page.css';
import { Link } from 'react-router-dom';
import { BASE_API_ROUTE } from '../../Constants';

import Moment from 'moment-jalaali';
import "moment/locale/fa";
Moment.locale("fa");

const PremiumPage = () => {



  const [getpremiumdetail, setpremiumdetail] = useState([]);
  const { refUserRole, getAccessToken } = useAuth();
  const [gettransactions, settransactions] = useState([]);
  const [getsub, setsub] = useState([]);
  const [maxIdData, setMaxIdData] = useState([]);
  const [getamountdetail, setamountdetail] = useState({
    amount: "",
    description: "خرید اشتراک ماهانه"
  });


  useEffect(() => {
    const fetchData = async () => {
      console.log(refUserRole);
      const token = await getAccessToken();
      if (token) {
        const tokenData = jwt(token);
        let url = "";
        if (refUserRole.current === "User") {
          url = BASE_API_ROUTE + `Customer/GetUserById?userId=${tokenData.uid}`;
        }
        if (refUserRole.current === "Vakil") {
          url = BASE_API_ROUTE + `Lawyer/GetLawyerById?lawyerId=${tokenData.uid}`;
        }
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("accessToken")
          }
          const response = await axios.get(url);
          const premiumdetail = await axios.get(BASE_API_ROUTE + `Wallet/GetTransactions`, {
            headers: headers
          });

          const getsubstatus = await axios.get(BASE_API_ROUTE + `Premium/GetSubscriptionStatus`,
            {
              headers: headers
            });
          setsub(getsubstatus.data.data);
          settransactions(premiumdetail.data);
          setpremiumdetail(response.data.data);
          handleFindMaxId();
        } catch (error) {
          console.log('error : ', error);
        }
      }
    };
    fetchData();
  }, []);


  const payroll = async () => {
    const url = BASE_API_ROUTE + "Payment/request";
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




  const handleFindMaxId = () => {
    let maxId = -Infinity;
    let maxIdItem = null;

    gettransactions.forEach((item) => {
      if (item.id > maxId && item.isSuccess === true) {
        maxId = item.id;
        maxIdItem = item;
      }
    });

    setMaxIdData(maxIdItem);
  }

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

                  <h4 className="mb-4 mt-3 text-dark username tahoma" id="username">{getpremiumdetail.name}</h4>
                  <Link to="/edit-user" className="edit-profile-link">
                    ویرایش پروفایل
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6 mt-4 mt-md-0">
                <div className="expire shadow-sm text-center bg-white" id="untilexpire">
                  <CircularProgress variant="determinate" value={getsub.remainingDays} size="6rem" />
                  <h4 className="mt-4 text-dark mb-0 font-weight-bold">تعداد روزهای باقی مانده : {getsub.remainingDays}</h4>
                  <div className="d-flex justify-content-between mt-3">
                    <span>نوع سرویس</span>
                    <span>
                      <b>پلاس</b>
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <span>آخرین خرید:</span>
                    <span>
                      {getsub.id}

                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <span>تاریخ شروع:</span>
                      <div>
                          <div key={getsub.id}>
                              <span>
                                  {Moment(getsub.expireDate).locale("fa").format('jD/jM/jYYYY') + ' ساعت ' + Moment(getsub.expireDate).format('HH:mm')}
                              </span>
                          </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-12 d-none d-lg-block">
                <div className="report-box shadow-sm mt-3 bg-white" id="history">
                  <div className="row">
                    <div className="col-12 col-md-6 mt-4 mt-lg-0">

                      {gettransactions.map((x) =>

                        x.isSuccess === true ?
                          (
                            <>
                              <p>مبلغ : {x.amount}</p>
                              <p>تاريخ خريد : </p>
                              <div>
                                <div key={x.id}>
                                    <span>
                                        {Moment(x.date).locale("fa").format('jD/jM/jYYYY') + ' ساعت ' + Moment(x.date).format('HH:mm')}
                                    </span>
                                </div>
                              </div>
                              <p>توضيحات : {x.description}</p>
                              <hr></hr>
                            </>

                          )
                          :
                          (
                            <p></p>
                          )
                      )}

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

                <select className="form-control tamdid" name="amount" value={getamountdetail.amount} onChange={setUserInfo}>
                  <option value=" ">--- انتخاب کنید ---</option>
                  <option value="300000" >پلاس 1 ساله</option>
                  <option value="150000">پلاس 3 ماهه</option>
                </select>

              </div>
              <div className="form-group mt-4">
                <label for="coupon">کد تخفیف</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="کد تخفیف" id="copun" name="copun" />
                  <div className="input-group-append">
                    <button className="btn btn-coupon" type="button" id="check1">اعمال</button>
                  </div>
                </div>
              </div>

             <br/>
                <div className="d-flex justify-content-between mt-3">
                <span>میزان تخفیف</span>
                <span id="discount">-</span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span>مبلغ سرویس</span>
                <span id="prices">{getamountdetail.amount} تومان
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span>مبلغ نهایی</span>
                <span id="prices2">{getamountdetail.amount} تومان + مالیات درگاه
                </span>
              </div>
              <br/>
              <div className="form-group mt-3 psc" id="p_1">
                <label for="service">انتخاب درگاه پرداخت</label>
                <select className="form-control" name="gateway" id="gateway">
                  <option value="panispaynet">زرین پال</option>
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