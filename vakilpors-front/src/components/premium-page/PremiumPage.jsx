import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';
import { useAuth } from "../../context/AuthProvider";
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import '../../css/premium-page.css';
import { Link, Navigate } from 'react-router-dom';
import { BASE_API_ROUTE } from '../../Constants';
import Moment from 'moment-jalaali';
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import "moment/locale/fa";


Moment.locale("fa");

const PremiumPage = () => {

  const navigate = useNavigate();
  const [getpremiumdetail, setpremiumdetail] = useState([]);
  const { refUserRole, refIsLoggedIn, getAccessToken, logout } = useAuth();
  const [gettransactions, settransactions] = useState([]);
  const [getsub, setsub] = useState([]);
  const [getbalance, setbalance] = useState([]);
  const [getamountdetail, setamountdetail] = useState({
    amount: "",
    description: "شارژ کیف پول",
    premiumPlan: ""
  });



  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (token) {
        const tokenData = jwt(token);
        const url = BASE_API_ROUTE + `Customer/GetUserById?userId=${tokenData.uid}`;
        try {
          const response = await axios.get(url);
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
          };
          const premiumdetail = await axios.get(BASE_API_ROUTE + `Wallet/GetTransactions`, {
            headers: headers
          });
          const balance = await axios.get(BASE_API_ROUTE + `Wallet/GetBalance`, {
            headers: headers
          });
          const getsubstatus = await axios.get(BASE_API_ROUTE + `Premium/GetSubscriptionStatus`, {
            headers: headers
          });
          setsub(getsubstatus.data.data);
          setbalance(balance.data);
          settransactions(premiumdetail.data);
          setpremiumdetail(response.data.data);
        } catch (error) {
          console.log('error : ', error);
        }
      }
    };
    fetchData();
  }, []);




  async function activateSubscription(premiumPlan) {

    const url = `https://api.fardissoft.ir/Premium/ActivateSubscription?PremiumPlan=${premiumPlan}`;
    const token = await getAccessToken();
    if (token) {
      const response = await axios.post(url, '', { headers: { Authorization: `Bearer ${token}` } });
      console.log("response : ", response);
    }
  }



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

  const setamount = (event) => {
    setamountdetail({
      ...getamountdetail,
      [event.target.name]: event.target.value,
    });
  };


  const handleTrasaction = () => {

    if (getbalance >= getamountdetail.amount) {
      switch (getamountdetail.amount) {
        case "20000":
          activateSubscription("bronze");
          break;
        case "30000":
          activateSubscription("silver");
          break;
        case "50000":
          activateSubscription("gold");
          break;
      }
    }
    else {
      payroll();
    }
  }


  return (
    <div>
      {
        refUserRole.current == "User" ? (
          <>
            <div class="container">
              <div classNameName="col-12">
                <div className="row" id="all">
                  <div className="col-12 d-flex align-items-center justify-content-between mt-2 d-lg-none">
                    <h4 className="font-weight-bold ">داشبورد من</h4>
                    <p className=" font-weight-bold ">
                      تمدید اشتراک
                    </p>
                  </div>
                  <div className="col-12 col-lg-8 mt-3 mt-lg-0">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="profile shadow-sm text-center bg-white" id="showprofile">
                          <img src={getpremiumdetail.profileImageUrl} style={{ width: "150px", height: "150px" }} />

                          <h4 className="mb-4 mt-3 text-dark username tahoma" id="username">{getpremiumdetail.name}</h4>
                          <br></br>
                          <Link to="/edit-user" className="edit-profile-link">
                            ویرایش پروفایل
                          </Link>
                          <br></br>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 mt-4 mt-md-0">
                        <div className="expire shadow-sm text-center bg-white" id="untilexpire">
                          <CircularProgress variant="determinate" value={getsub.remainingDays < 100 ? getsub.remainingDays : 100} size="6rem" />
                          <h4 className="mt-4 text-dark mb-0 font-weight-bold">تعداد روزهای باقی مانده : {getsub.remainingDays < 100 ? getsub.remainingDays : "رایگان"}</h4>
                          <div className="d-flex justify-content-between mt-3">
                            <span>نوع سرویس</span>
                            <span>
                              <b>پلاس</b>
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mt-3">
                            <span>آخرین خرید:</span>
                            <span>
                              {getsub.premiumName}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mt-3">
                            <span>تاریخ پایان:</span>
                            {getsub.premiumName === "Free" ? (
                              <p>نا محدود</p>
                            ) : (
                              <div key={getsub.id}>
                                <span>
                                  {Moment(getsub.expireDate).locale("fa").format('jYYYY/jM/jD') + ' ساعت ' + Moment(getsub.expireDate).format('HH:mm')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 d-lg-block mt-2">
                        <div className="report-box shadow-sm mt-3 bg-white" id="history">
                          <div className="row">
                            <h3>تراكنش ها</h3>
                            {gettransactions.map((x) =>
                              x.isSuccess ?
                                (
                                  <>
                                    <div class="col-3 my-3 mx-1" style={{ border: "2px solid ", borderColor: "#ABC0C0", borderTopLeftRadius: "25px", borderBottomRightRadius: "20px", }}>
                                      <label>مبلغ :</label>
                                      <b><p style={{ textAlign: "center" }}>{x.amount} تومان </p></b>
                                      <label>تاریخ خریداری بسته :</label>
                                      <b><p>{Moment(x.date).locale("fa").format('jYYYY/jM/jD') + ' ساعت ' + Moment(x.date).format('HH:mm')}</p></b>
                                      <label>توضیحات :</label>
                                      <b><p> {x.description}</p></b>
                                    </div>
                                    <div class="col-1">
                                    </div>
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
                  <div className="col-12 col-lg-4 mt-4 mt-lg-0" >
                    <div className="buy-account shadow-md bg-white" id="buy">
                      <h3 className="text-center font-weight-bold">تمدید اشتراک</h3>
                      <br />
                      <span className="error">با خرید اشتراک ویژه بهترین ضامن پرونده ات باش!</span>
                      <div className="form-group mt-3 psc" id="p_1">
                        <label for="service">انتخاب مدت زمان</label>

                        <select className="form-control tamdid" name="amount" value={getamountdetail.amount} onChange={setamount}>
                          <option value=" ">--- انتخاب کنید ---</option>
                          <option value="20000">برنزی </option>
                          <option value="30000">نقره ای</option>
                          <option value="50000">طلایی</option>
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
                      <br />
                      <div className="d-flex justify-content-between mt-3">
                        <span>موجودی كيف پول</span>
                        <p>{getbalance}</p>
                      </div>
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
                      <br />
                      <div className="form-group mt-3 psc" id="p_1">
                        <label for="service">انتخاب درگاه پرداخت</label>
                        <select className="form-control" name="gateway" id="gateway">
                          <option value="panispaynet">زرین پال</option>
                        </select>
                      </div>
                      <div className="text-center mt-5">
                        <button className="btn btn-primary px-5 text-lg w-100" onClick={handleTrasaction}>خرید</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Box p={3} borderRadius={4} boxShadow={3} bgcolor="white">
            <h2 style={{ color: "blue" }}>
              404 - صفحه پیدا نشد!
            </h2>
            <h2 style={{ color: "textSecondary" }}>
              متاسفیم، صفحه مورد نظر شما پیدا نشد.
            </h2>
          </Box>
        )
      }
    </div >
  );
}

export default PremiumPage;