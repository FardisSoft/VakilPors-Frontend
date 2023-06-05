import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_API_ROUTE } from '../../Constants';
import '../../css/Wallet.css'
import { useAuth } from "../../context/AuthProvider";
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import walletPic from '../../assests/images/Wallet-pana.svg'; 

const Wallet = () => {

    const { refUserRole, getAccessToken } = useAuth();
    const [getamountdetail, setamountdetail] = useState({
        amount: "",
        description: "شارژ کیف پول"
    });
    const [getbalance, setbalance] = useState([]);
    const [tokens, setTokens] = useState(0);

    const fetchData = async () => {
        const token = await getAccessToken();
        if (token) {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            };
            try {
                const balance = await axios.get(BASE_API_ROUTE + `Wallet/GetBalance`, {
                    headers: headers
                });
                setbalance(balance.data);
            } catch (error) {
                console.log('error in getting Balance : ', error);
            }
            if(refUserRole.current == 'Vakil'){
                try {
                    const response = await axios.get(BASE_API_ROUTE + `Lawyer/GetCurrentLawyer`, {
                        headers: headers
                    });
                    setTokens(response.data.data.tokens);
                    // console.log('response in getting lawyer data for tokens : ', response);
                } catch (error) {
                    console.log('error in getting lawyer data for tokens : ', error);
                }
            }
        }
    };

    const showSuccesMessage = (successMessage) => {
        toast.success(successMessage, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          rtl: true,
        });
    };
    
    const showErrorMessage = (errorMessage) => {
    toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        rtl: true,
    });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const payroll = async () => {
        const token = await getAccessToken();
		if(token){
            const url = BASE_API_ROUTE + "Payment/request";
            const data = {
                "amount": getamountdetail.amount,
                "description": getamountdetail.description
            }
            try {
                const response = await axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
                window.location.replace(response.data.paymentUrl);
            } catch (err) {
                console.log('error in Payment/request : ',err);
            }
        }
    };

    const payrollLawyer = async () => {
        // const token = await getAccessToken();
		// if(token){
        //     const url = BASE_API_ROUTE + "Payment/request"; //
        //     const data = {
        //         "amount": getamountdetail.amount,
        //         "description": 'برداشت از کیف پول'
        //     }
        //     try {
        //         const response = await axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
        //         showSuccesMessage('مبلغ مورد نظر به حساب شما واریز شد.');
        //         fetchData();
        //     } catch (err) {
        //         console.log('error in Payment/request in taking money : ',err);
        //     }
        // }
    };

    const transferToken = async () => {
        if(tokens < 10){
            showErrorMessage('شما برای انتقال توکن به کیف پول حداقل باید 10 توکن داشته باشید.');
            return;
        }
        const token = await getAccessToken();
        if (token) {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            };
            try {
                const response = await axios.get(BASE_API_ROUTE + 'Lawyer/TransferToken', {
                    headers: headers
                });
                fetchData();
                showSuccesMessage('توکن شما با موفقیت به کیف پول شما منتقل شد');
                // console.log('response in transferToken : ', response);
            } catch (error) {
                showErrorMessage('خطا در انتقال توکن به کیف پول');
                console.log('error in transferToken : ', error);
            }
        }
    };

    const setpayroll = (event) => {
        setamountdetail({
            ...getamountdetail,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
        <Helmet>
            <title>کیف پول</title>
        </Helmet>
        <div class="col-12">
            <div class="row" id="all">
                <div class="col-12 col-sm-10 col-md-7 col-xl-5 mx-auto ">
                    <div class="shadow-sm p-0  bg-white" id="form">
                        <div class="bg-wallet d-flex flex-column align-items-center justify-content-center">
                            <img class="img-wallet img-fluid" src={walletPic} />
                            <p class="font-weight-bold text-wallet mt-md-2 pt-md-2">موجودی کیف پول :</p>
                            <p class="my-1 tahoma text-xxl">{getbalance}  تومان</p>
                            {refUserRole.current == "Vakil" && <>
                                <p class="font-weight-bold text-wallet mt-md-2 pt-md-2 mt-2">توکن شما در وکیل پرس :</p>
                                <p class="my-1 tahoma text-xxl">{tokens}</p>
                                <button class="btn btn-primary mr-2 mt-3 mt-sm-0" style={{ width: "80%" }} onClick={transferToken}>
                                    انتقال توکن به کیف پول
                                </button>
                            </>}
                        </div>
                        {
                            refUserRole.current == "User" ? (
                                <div class="p-5 ">
                                    <div class="d-flex flex-wrap w-100">
                                        <div class="text-center w-100 mb-4">
                                            <h3>شارژ کیف پول</h3>
                                        </div>
                                        <div class="w-100">
                                            
                                            <div class="form-group mt-3 psc my-5" id="p_1">
                                                <label for="service">مبلغ مورد نظر خود را به تومان وارد نمایید</label>
                                                <input
                                                    class="form-control"
                                                    name="amount"
                                                    onChange={setpayroll}
                                                    value={getamountdetail.amount} />
                                            </div>

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
                            )
                                :
                                (
                                    <>
                                        <div class="p-5 col-12">
                                            <div class="d-flex flex-wrap w-100">
                                                <div class="text-center w-100 mb-4">
                                                    <h3>برداشت از حساب</h3>
                                                </div>
                                                <div class="w-100">

                                                    <div class="form-group mt-3 psc my-5" id="p_1">
                                                        <label for="service">مبلغ مورد نظر خود را به تومان وارد نمایید</label>
                                                        <input
                                                            class="form-control"
                                                            name="amount"
                                                            onChange={setpayroll}
                                                            value={getamountdetail.amount} />
                                                    </div>
                                                    <div class="form-group mt-3 psc my-5" id="p_1">
                                                        <label for="service">شماره کارت خود را وارد نمایید</label>
                                                        <input
                                                            class="form-control"
                                                            id="mu-text-field"
                                                            name="creditNumber" />
                                                    </div>
                                                    <hr class="my-4" />
                                                    <button class="btn btn-primary mr-2 mt-3 mt-sm-0" style={{ width: "100%" }} onClick={payrollLawyer}>
                                                        برداشت از حساب
                                                    </button>
                                                </div>
                                                <p class="text-under mt-4">کاربر محترم،حداقل مبلغ برای شارژ کیف پول 10.000 تومان میباشد</p>
                                            </div>
                                        </div>
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Wallet;