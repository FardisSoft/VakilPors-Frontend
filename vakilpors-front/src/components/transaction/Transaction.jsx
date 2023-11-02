import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import "../../css/premium-page.css";
import { BASE_API_ROUTE } from "../../Constants";
import { Link, useNavigate } from "react-router-dom";
import Moment from 'moment-jalaali';

const Transaction = () => {
  const navigate = useNavigate();
  const { refUserRole, getAccessToken } = useAuth();
  const [gettransactions, settransactions] = useState([]);
  const fetchData = async () => {
    const token = await getAccessToken();
    if (token) {
      const tokenData = jwt(token);
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      try {
        const premiumdetail = await axios.get(
          BASE_API_ROUTE + `Wallet/GetTransactions?PageNumber=1&PageSize=7`,
          {
            headers: headers,
          }
        );
        console.log("fsdfdf");
        console.log(premiumdetail.data.results);
        settransactions(premiumdetail.data.results);
      } catch (err) {
        console.log("error in getting Transactions : ", err);
      }
    }
  };

  useEffect(() => {
    if (refUserRole.current && refUserRole.current !== "User") {
      navigate("*");
    }
    fetchData();
  }, []);

  return (
    <div className="col-12 d-lg-block mt-2">
      <div className="report-box shadow-sm mt-3 bg-white" id="history">
        <div className="row">
          <h3>تراكنش ها</h3>
          {gettransactions.map((x) =>
            x.isSuccess ? (
              <>
                <div class="col-3 my-3 mx-1" id="transactions">
                  <label>مبلغ :</label>
                  <b>
                    <p style={{ textAlign: "center" }}>{x.amount} تومان </p>
                  </b>
                  <label>تاریخ خریداری بسته :</label>
                  <b>
                    <p>
                      {Moment(x.date).locale("fa").format("jYYYY/jM/jD") +
                        " ساعت " +
                        Moment(x.date).format("HH:mm")}
                    </p>
                  </b>
                  <label>توضیحات :</label>
                  <b>
                    <p> {x.description}</p>
                  </b>
                </div>
                <div class="col-1"></div>
              </>
            ) : (
              <p></p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
