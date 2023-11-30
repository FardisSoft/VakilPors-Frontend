import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthProvider";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import "../../css/premium-page.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_ROUTE } from "../../Constants";
import Moment from "moment-jalaali";
import { toast } from "react-toastify";
import Transaction from "../transaction/Transaction";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";
import StyledButton from "../ButtonComponent";
import ProgressCircle from "./ProgressCircle";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ReactApexChart from "react-apexcharts";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import transitions from "@material-ui/core/styles/transitions";
import moment from "moment-jalaali";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import TextField from "@mui/material/TextField";
import money from "../../assests/images/money.jpg";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ReactLoading from "react-loading";
import {
  Audio,
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Hearts,
  Oval,
  Puff,
  Rings,
  SpinningCircles,
  TailSpin,
  ThreeDots,
} from "@agney/react-loading";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
  typography: {
    fontFamily: "shabnam",
  },
});

const theme = createTheme({
  typography: {
    fontFamily: "shabnam",
  },
  direction: "rtl",
});

const PremiumPage = () => {
  const navigate = useNavigate();
  const [getpremiumdetail, setpremiumdetail] = useState([]);
  const { refUserRole, getAccessToken } = useAuth();
  const [getsub, setsub] = useState([]);
  const [getbalance, setbalance] = useState([]);
  const [getamountdetail, setamountdetail] = useState({
    amount: "",
    description: "شارژ کیف پول",
    premiumPlan: "",
  });

  const [gettransactions, settransactions] = useState([]);
  const [parent, setpar] = useState("");
  const [loadingbuy, setloadingbuy] = useState(false);
  const [monthtransaction, setmonthtransaction] = useState([]);
  const [month, setmonth] = useState([]);
  const [loadingpage, setloadingpage] = useState(true);

  const showSuccesMessage = (successMessage) => {
    toast.success(successMessage, {
      position: "bottom-right",
      autoClose: 5000,
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
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
    });
  };

  const fetchData = async () => {
    const token = await getAccessToken();
    if (token) {
      const tokenData = jwt(token);
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      try {
        const url =
          BASE_API_ROUTE + `Customer/GetUserById?userId=${tokenData.uid}`;
        const response = await axios.get(url);
        setpremiumdetail(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.log("error in getting user data : ", err);
      } finally {
        setloadingpage(false);
      }
      try {
        const balance = await axios.get(BASE_API_ROUTE + `Wallet/GetBalance`, {
          headers: headers,
        });
        setbalance(balance.data);
      } catch (err) {
        console.log("error in getting Balance : ", err);
      } finally {
        setloadingpage(false);
      }
      try {
        const getsubstatus = await axios.get(
          BASE_API_ROUTE + `Premium/GetSubscriptionStatus`,
          {
            headers: headers,
          }
        );
        setsub(getsubstatus.data.data);
        console.log(getsubstatus.data.data);
      } catch (err) {
        console.log("error in getting SubscriptionStatus : ", err);
      } finally {
        setloadingpage(false);
      }

      try {
        const premiumdetail = await axios.get(
          BASE_API_ROUTE +
            `Wallet/GetTransactions?PageNumber=${1}&PageSize=${5}&IsAscending=false`,
          {
            headers: headers,
          }
        );
        settransactions(premiumdetail.data.results);
        console.log("scfdfaa");
        console.log(premiumdetail.data.results);
        console.log(premiumdetail.data.totalPages);
      } catch (err) {
        console.log("error in getting Transactions : ", err);
      } finally {
        setloadingpage(false);
      }

      try {
        const transactionmonth = await axios.get(
          BASE_API_ROUTE + `Wallet/GetMonthlyTransactionsAmount`,
          {
            headers: headers,
          }
        );
        console.log("sfdxf");
        console.log(transactionmonth.data);
        console.log(transactionmonth.data);
        console.log("sfdgaaa");
        console.log(transactionmonth.data.data.length);
        setmonthtransaction([]);
        setmonth([]);
        for (let i = 0; i < transactionmonth.data.data.length; i++) {
          const newData =Math.floor(transactionmonth.data.data[i].amount);
          const newmonth = transactionmonth.data.data[i].month;
          console.log(transactionmonth.data.data[i].amount);
          setmonthtransaction((prevState) => [...prevState, newData]);
          setmonth((prev) => [...prev, newmonth]);
          setloadingpage(false);
        }
      } catch (err) {
        console.log("error in getting Transactions month : ", err);
      } finally {
        setloadingpage(false);
      }
    }
  };

  useEffect(() => {
    if (refUserRole.current && refUserRole.current !== "User") {
      navigate("*");
    }
    fetchData();
  }, []);
  console.log(monthtransaction);
  console.log(loadingpage);

  const activateSubscription = async (premiumPlan) => {
    setloadingbuy(true);
    const url =
      BASE_API_ROUTE +
      `Premium/ActivateSubscription?PremiumPlan=${premiumPlan}`;
    const token = await getAccessToken();
    if (token) {
      try {
        const response = await axios.post(url, "", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response in Premium/ActivateSubscription : ", response);
        setloadingbuy(false);
        showSuccesMessage(`اشتراک ${premiumPlan} شما با موفقیت فعال شد!`);
        fetchData();
      } catch (err) {
        console.log("error in Premium/ActivateSubscription : ", err);
        setloadingbuy(false);
        showErrorMessage("خطا در فعال سازی اشتراک");
      }
    }
  };

  const payroll = async () => {
    const token = await getAccessToken();
    if (token) {
      const url = BASE_API_ROUTE + "Payment/request";
      const data = {
        amount: getamountdetail.amount,
        description: getamountdetail.description,
      };
      try {
        const response = await axios.post(url, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        window.location.replace(response.data.paymentUrl);
      } catch (err) {
        console.log("error in Payment/request : ", err);
      }
    }
  };

  const setamount = (event) => {
    setamountdetail({
      ...getamountdetail,
      amount: event.target.value,
    });
    console.log("sfa");
    console.log(getamountdetail);

    // setamountdetail({
    //   ...getamountdetail,
    //   [event.target.name]: event.target.value,
    // });
  };

  const handleTrasaction = () => {
    console.log("vdcgvf");
    if (getbalance >= getamountdetail.amount) {
      console.log(getamountdetail.amount);
      switch (getamountdetail.amount) {
        case 20000:
          activateSubscription("bronze");
          break;
        case 30000:
          activateSubscription("silver");
          break;
        case 50000:
          console.log("dfd");
          activateSubscription("gold");
          break;
      }
    } else {
      console.log("sdfdf");
      payroll();
    }
  };
  const chartOptions = {
    chart: {
      id: "line-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: month,
      lines: {
        show: false,
      },
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
  };

  const chartData = [
    {
      name: " ",
      data: monthtransaction,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (event) => {
    setpar(event.target.value);
  };
  return (
    <>
      <Helmet>
        <title>داشبورد</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          {loadingpage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height:'80vh'
              }}
            >
              < Oval width="80" color="blue" />
            </div>
          )}
          {!loadingpage && (
            <div class="container">
              <div className="row">
                <div classNameName="col-12">
                  <div className="row" id="alldash">
                    <div className="col-12 col-lg-4 mt-3 mt-lg-0">
                      <div className="row">
                        <div className="col-12 col-md-12">
                          <div
                            className="profile shadow-sm text-center bg"
                            id="showprofile"
                          >
                            <Avatar
                              alt="Remy Sharp"
                              style={{
                                width: "120px",
                                height: "120px",
                                marginTop: "10px",
                              }}
                              src={getpremiumdetail.profileImageUrl}
                            />
                            <p
                              className="mt-3 text-dark username tahoma"
                              id="username"
                              style={{ fontSize: "1.2rem" }}
                            >
                              خوش آمدید
                            </p>
                            <p
                              className="text-dark username tahoma"
                              id="username"
                              style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                marginTop: "-10px",
                              }}
                            >
                              {getpremiumdetail.name}
                            </p>
                            <StyledButton
                              onClick={() => navigate("/edit-user")}
                              style={{
                                borderRadius: "20px",
                                padding: "5px 50px 5px 50px ",
                                fontWeight: "bold",
                                width: "85%",
                                fontSize: "13px",
                              }}
                            >
                              ویرایش پروفایل
                            </StyledButton>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-12">
                          <div
                            className="profile shadow-sm bg-white mt-3"
                            id="show-tr"
                          >
                            <p
                              style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                            >
                              نمودار تراکنش ها
                            </p>
                            <p style={{ marginTop: "-10px" }}>
                              شما نمودار تراکنشی زیر را داشته اید
                            </p>
                            <ReactApexChart
                              options={chartOptions}
                              series={chartData}
                              type="line"
                              width="80%"
                              height="50%"
                            />
                            <div className="d-flex justify-content-between mt-3">
                              <span>موجودی کیف پول: </span>
                              <span>
                                <p
                                  style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {getbalance} ریال
                                </p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4 mt-3 mt-lg-0">
                      <div
                        className="expire shadow-sm text-center bg-white"
                        id="untilexpire"
                      >
                        <div
                          style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={
                              getsub.remainingDays < 100
                                ? getsub.remainingDays
                                : 100
                            }
                            color="inherit"
                            size={120}
                            thickness={2}
                            className="ss"
                          />
                          <Typography
                            variant="h4"
                            component="div"
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              color: "#2196f3",
                            }}
                          >
                            {getsub.remainingDays}
                          </Typography>
                        </div>
                        <p
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: "bold",
                            marginTop: "-10px",
                          }}
                          className="mt-4 text-dark mb-0 font-weight-bold"
                        >
                          تعداد روزهای باقی مانده
                        </p>
                        <div style={{ marginTop: "10px" }}>
                          <div className="d-flex justify-content-between mt-3">
                            <span>نوع سرویس</span>
                            <span>
                              <b>پلاس</b>
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mt-3">
                            <span>آخرین خرید:</span>
                            <span>{getsub.premiumName}</span>
                          </div>
                          <div className="d-flex justify-content-between mt-3">
                            <span>تاریخ پایان:</span>
                            {getsub.premiumName === "Free" ? (
                              <p>نا محدود</p>
                            ) : (
                              <div key={getsub.id}>
                                <span>
                                  {Moment(getsub.expireDate)
                                    .locale("fa")
                                    .format("jYYYY/jM/jD") +
                                    " ساعت " +
                                    Moment(getsub.expireDate).format("HH:mm")}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-12">
                          <div
                            className="profile shadow-sm bg-white mt-3"
                            id="show-tr"
                          >
                            <div className="d-flex justify-content-between ">
                              <p
                                style={{
                                  fontSize: "1.1rem",
                                  fontWeight: "bold",
                                }}
                              >
                                چند تراکنش اخر
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Button onClick={handleOpen} variant="text">
                                  مشاهده همه
                                </Button>
                                <ArrowBackIcon
                                  sx={{ color: "#4A68CA", fontSize: "19px" }}
                                />
                                <Dialog open={isOpen} onClose={handleClose}>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      marginTop: "20px",
                                    }}
                                  >
                                    <Transaction />
                                  </div>
                                  <DialogActions>
                                    <Button onClick={handleClose}>بستن</Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                            </div>
                            <div>
                              {gettransactions.map((item, index) => (
                                <div
                                  className="d-flex justify-content-between mt-4"
                                  key={index}
                                >
                                  <div className="d-flex">
                                    {item.isSuccess && (
                                      <div
                                        style={{
                                          borderRadius: "50%",
                                          backgroundColor: "#90f23f",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <ArrowDownwardIcon
                                          sx={{ color: "#4b9e06" }}
                                        />
                                      </div>
                                    )}

                                    {!item.isSuccess && (
                                      <div
                                        style={{
                                          borderRadius: "50%",
                                          backgroundColor: "red",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <ArrowDownwardIcon
                                          sx={{ color: "#db03fc" }}
                                        />
                                      </div>
                                    )}
                                    <div
                                      style={{
                                        marginRight: "10px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {item.amount} ریال
                                    </div>
                                  </div>
                                  <span style={{ fontSize: "11px" }}>
                                    <span>
                                      تاریخ :{" "}
                                      {moment(item.date).format(
                                        "jYYYY/jM/jD HH:mm:ss"
                                      )}
                                    </span>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4 mt-3 mt-lg-0">
                      <div className="row">
                        <div className="col-12 col-md-12">
                          <div
                            className="buy-account shadow-md bg-white"
                            id="buy"
                          >
                            <p
                              className="text-center font-weight-bold"
                              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                            >
                              تمدید اشتراک
                            </p>
                            <img
                              style={{
                                width: "200px",
                                height: "90px",
                                display: "block",
                                margin: "auto",
                              }}
                              src={money}
                              alt="تصویر پول"
                            />
                            <div className="form-group mt-3 psc" id="p_1">
                              <FormControl
                                fullWidth
                                size="small"
                                sx={{ marginTop: 3 }}
                              >
                                <InputLabel id="demo-simple-select-label">
                                  مدت زمان
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={getamountdetail.amount}
                                  label="مدت زمان"
                                  onChange={setamount}
                                >
                                  <MenuItem value={20000}>برنزی</MenuItem>
                                  <MenuItem value={30000}>نقره ای</MenuItem>
                                  <MenuItem value={50000}>طلایی</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                marginTop: "2.2rem",
                              }}
                            >
                              <TextField
                                id="outlined-basic"
                                label=" کد تخفیف"
                                variant="outlined"
                                size="small"
                                fullWidth
                              />
                              <div style={{ marginRight: "10px" }}>
                                <Button
                                  style={{ backgroundColor: "orange" }}
                                  variant="contained"
                                >
                                  اعمال
                                </Button>
                              </div>
                            </div>
                            <br />
                            <div className="d-flex justify-content-between mt-3">
                              <span style={{ fontWeight: "bold" }}>
                                موجودی كيف پول
                              </span>
                              <p>{getbalance}</p>
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                              <span style={{ fontWeight: "bold" }}>
                                میزان تخفیف
                              </span>
                              <span id="discount">-</span>
                            </div>

                            <div className="d-flex justify-content-between mt-3">
                              <span style={{ fontWeight: "bold" }}>
                                مبلغ سرویس
                              </span>
                              <span id="prices">
                                {getamountdetail.amount} تومان
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                              <span style={{ fontWeight: "bold" }}>
                                مبلغ نهایی
                              </span>
                              <span id="prices2">
                                {getamountdetail.amount} تومان + مالیات درگاه
                              </span>
                            </div>
                            <br />
                            <div className="form-group mt-3 psc" id="p_1">
                              <FormControl
                                fullWidth
                                size="small"
                                sx={{ marginTop: 3 }}
                              >
                                <InputLabel id="demo-simple-select-label">
                                  درگاه پرداخت
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="درگاه پرداخت "
                                  value={parent}
                                  onChange={handleChange}
                                >
                                  <MenuItem value={20000}>زرین پال</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "30px",
                              }}
                            >
                              <StyledButton
                                onClick={handleTrasaction}
                                style={{
                                  borderRadius: "20px",
                                  padding: "5px 50px 5px 50px",
                                  fontWeight: "bold",
                                  fontSize: "19px",
                                  width: "100%",
                                  position: "relative",
                                }}
                              >
                                {!loadingbuy && <span>خرید</span>}
                                {loadingbuy && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "50%",
                                      right: "50%",
                                      transform: "translate(50%, -50%)",
                                    }}
                                  >
                                    <ReactLoading
                                      type="bubbles"
                                      color="#fff"
                                      className="loading-dashboard"
                                    />
                                  </div>
                                )}
                              </StyledButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CacheProvider>
      </ThemeProvider>
    </>
  );
};

export default PremiumPage;
