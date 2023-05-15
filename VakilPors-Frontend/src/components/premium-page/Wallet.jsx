import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import '../../css/Wallet.css'

const PremiumCard = () => {


    return (
        <div class="col-12">
            <div class="row" id="all">


                <div class="col-12 col-sm-10 col-md-7 col-xl-5 mx-auto ">
                    <form class="shadow-sm p-0  bg-white" action="./member.php?action=wallet" id="form">
                        <div class="bg-wallet d-flex flex-column align-items-center justify-content-center">
                            <img class="img-wallet img-fluid" src="https://pchospital.bio/img/Wallet-pana.svg" />
                            <p class="font-weight-bold text-wallet mt-md-2 pt-md-2">موجودی کیف پول :</p>
                            <p class="my-1 tahoma text-xxl">۰  تومان</p>
                        </div>
                        <div class="p-5">
                            <div class="d-flex flex-wrap w-100">
                                <div class="text-center w-100 mb-4">
                                    <h3>شارژ کیف پول</h3>
                                </div>
                                <input type="hidden" value="1" name="dopost" />
                                <div class=" w-100">
                                    <input type="text" class="input-wallet" name="walletvalue" id="walletvalue" placeholder="مبلغ مورد نظر خود را به تومان وارد نمایید" />
                                    <div class="form-group mt-3 psc my-5" id="p_1">
                                        <label for="service">انتخاب درگاه پرداخت</label>
                                        <select class="form-control" >
                                            <option>زرین پال</option>
                                        </select>

                                    </div>
                                    <button class="btn btn-primary mr-2 mt-3 mt-sm-0" id="check" style={{ width: "100%" }}>
                                        شارژ کیف پول
                                    </button>
                                </div>
                                <p class="text-under mt-4">کاربر محترم،حداقل مبلغ برای شارژ کیف پول 10.000 تومان میباشد</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PremiumCard;