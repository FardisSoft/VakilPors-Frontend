import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_API_ROUTE } from '../../Constants';
import '../../css/Wallet.css'
import jwt from 'jwt-decode';
import { useAuth } from "../../context/AuthProvider";
import axios from 'axios';

const PremiumCard = () => {


    const [getamountdetail, setamountdetail] = useState({
        amount: "",
        description: "شارژ کیف پول"
    });
    const { getAccessToken } = useAuth();
    const [getbalance, setbalance] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
          const token = await getAccessToken();
          if (token) {
;            try {
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
              };

              const balance = await axios.get(BASE_API_ROUTE + `Wallet/GetBalance`, {
                headers: headers
              });
              setbalance(balance.data);
              
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

    const setpayroll = (event) => {
        setamountdetail({
            ...getamountdetail,
            [event.target.name]: event.target.value,
        });
    };



    return (
        <div class="col-12">
            <div class="row" id="all">


                <div class="col-12 col-sm-10 col-md-7 col-xl-5 mx-auto ">
                    <div class="shadow-sm p-0  bg-white" id="form">
                        <div class="bg-wallet d-flex flex-column align-items-center justify-content-center">
                            <img class="img-wallet img-fluid" src="https://pchospital.bio/img/Wallet-pana.svg" />
                            <p class="font-weight-bold text-wallet mt-md-2 pt-md-2">موجودی کیف پول :</p>
                            <p class="my-1 tahoma text-xxl">{getbalance}  تومان</p>
                        </div>
                        <div class="p-5">
                            <div class="d-flex flex-wrap w-100">
                                <div class="text-center w-100 mb-4">
                                    <h3>شارژ کیف پول</h3>
                                </div>
                                <div class=" w-100">
                                    <input type="text" class="input-wallet" name="amount" id="walletvalue" placeholder="مبلغ مورد نظر خود را به تومان وارد نمایید" onChange={setpayroll} />
                                    <div class="form-group mt-3 psc my-5" id="p_1">
                                        <label for="service">انتخاب درگاه پرداخت</label>
                                        <select class="form-control" >
                                            <option>زرین پال</option>
                                        </select>
                                    </div>
                                    <button class="btn btn-primary mr-2 mt-3 mt-sm-0" style={{ width: "100%" }} onClick={payroll}>
                                        شارژ کیف پول
                                    </button>
                                </div>
                                <p class="text-under mt-4">کاربر محترم،حداقل مبلغ برای شارژ کیف پول 10.000 تومان میباشد</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PremiumCard;