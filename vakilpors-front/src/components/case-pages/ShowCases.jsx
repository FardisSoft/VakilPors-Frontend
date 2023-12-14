import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import jwt from "jwt-decode";
import {
  Box,
  Grid,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  IconButton,
  styled,
  Avatar,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DownloadForOfflineOutlined } from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { toast } from "react-toastify";
import { Oval } from "@agney/react-loading";
import backgroun from "../../images/background.jpg";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { ThemeProvider } from "@mui/material/styles";
import ReactLoading from "react-loading";
import { CacheProvider } from "@emotion/react";

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

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 300,
    fontSize: "15px",
    border: "1px solid #dadde9",
    fontFamily: "shabnam",
  },
}));

const ShowCases = () => {
  const [Cases, setCases] = useState([]);

  const [access, setaccess] = useState([]);
  const [openDescription, setOpenDescription] = useState(false);
  const [description, setDescription] = useState("");
  const { getAccessToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const { isLawyer } = useParams();

  const [openDialog, setOpenDialog] = useState(
    Array.from({ length: Cases.length }, () => false)
  );

  const [opencon, setOpencon] = useState(
    Array.from({ length: Cases.length }, () => false)
  );

  const [loadingsend, setloadingsend] = useState(
    Array.from({ length: Cases.length }, () => false)
  );

  const [concase, setconcase] = useState([]);

  const handleOpencon = (index) => {
    setOpencon((prevState) => {
      const newArray = [...prevState];
      newArray[index] = true;
      return newArray;
    });
  };

  const handleClosecon = (index) => {
    setOpencon((prevState) => {
      const newArray = [...prevState];
      newArray[index] = false;
      return newArray;
    });
  };

  const handleClickDelete = (index) => {
    setOpenDialog((prevState) => {
      const newArray = [...prevState];
      newArray[index] = true;
      return newArray;
    });
  };

  const handleCloseDialog = (index) => {
    setOpenDialog((prevState) => {
      const newArray = [...prevState];
      newArray[index] = false;
      return newArray;
    });
  };

  const handleCloseDescription = () => {
    setOpenDescription(false);
  };
  const getCases = async () => {
    const token = await getAccessToken();
    if (token) {
      setloading(true);
      const tokenData = jwt(token);
      const url =
        BASE_API_ROUTE +
        (isLawyer.split("_")[0] === "true"
          ? `Document/GetDocumentsThatLawyerHasAccessToByUserId`
          : `Document/GetDocumentsByUserId?userId=${tokenData.uid}`);
      const Data = {
        userId: isLawyer.split("_")[1],
        lawyerId: isLawyer.split("_")[2],
      };
      try {
        const response = await (isLawyer.split("_")[0] === "true"
          ? axios.post(url, Data, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : axios.get(url, { headers: { Authorization: `Bearer ${token}` } }));
        setCases(response.data.data);
        console.log(response.data.data);
        setaccess(response.data.data.accesses);

        if (isLawyer.split("_")[0] === "true") {
          setconcase(
            Array.from({ length: response.data.data.length }, () => 1)
          );
          const Idlawyer = Data["lawyerId"];
          for (let cases in response.data.data) {
            for (let acc in response.data.data[cases].accesses) {
              if (
                response.data.data[cases].accesses[acc].lawyerId.toString() ===
                Idlawyer
              ) {
                console.log(
                  "cds",
                  response.data.data[cases].accesses[acc].documentStatus
                );
                setconcase((prevState) => {
                  const newArray = [...prevState];
                  newArray[cases] =
                    response.data.data[cases].accesses[acc].documentStatus;
                  return newArray;
                });
                break;
              }
            }
          }
        }
        setloading(false);
      } catch (error) {
        setloading(false);
        console.log("error in getDocument : ", error);
      }
    }
  };

  const handlesendstatus = async (id, index) => {
    const token = await getAccessToken();
    console.log("sdsf", token);
    if (token) {
      try {
        const response = await axios.patch(
          BASE_API_ROUTE + `Document/UpdateDocumentStatus`,
          {
            documentId: id,
            documentStatus: concase[index],
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        showSuccesMessage("وضعیت با موفقیت اپدیت شد");
      } catch (error) {
        console.error(error);
        showErrorMessage("خطایی پیش امده است");
      }
    }
  };

  useEffect(() => {
    getCases();
  }, []);

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
  const showSuccesMessage = (payam) => {
    toast.success(payam, {
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
  const handleChooseCase = async (docId, index) => {
    setloadingsend((prevState) => {
      const newArray = [...prevState];
      newArray[index] = true;
      return newArray;
    });
    const token = await getAccessToken();
    if (token) {
      const url = BASE_API_ROUTE + "Document/GrantAccessToLawyer";
      const data = {
        lawyerId: isLawyer.split("_")[1], // or number
        documentId: docId,
      };
      try {
        const response = await axios.post(url, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setloadingsend((prevState) => {
          const newArray = [...prevState];
          newArray[index] = false;
          return newArray;
        });
        // console.log('response in GrantAccessToLawyer : ',response);
        showSuccesMessage(
          "پرونده مورد نظر با موفقیت برای وکیل مورد نظر ارسال شد."
        );
      } catch (error) {
        setloadingsend((prevState) => {
          const newArray = [...prevState];
          newArray[index] = false;
          return newArray;
        });
        console.log("error in GrantAccessToLawyer : ", error);
        showErrorMessage("برای این وکیل قبلا پرونده ارسال کرده اید.");
      }
    }
  };
  const setcaseon = (event, index) => {
    setconcase((prevState) => {
      const newArray = [...prevState];
      newArray[index] = event.target.value;
      return newArray;
    });
  };

  const handleDeleteCase = async (docId, index) => {
    const token = await getAccessToken();
    if (token) {
      const url =
        BASE_API_ROUTE + `Document/DeleteDocument?documentId=${docId}`;
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log('response in deleting case : ',response);
        getCases();
        showSuccesMessage("پرونده مورد نظر با موفقیت حذف شد.");
      } catch (error) {
        console.log("error in deleting case : ", error);
        showErrorMessage("خطا در حذف پرونده");
      }
    }
    setOpenDialog((prevState) => {
      const newArray = [...prevState];
      newArray[index] = false;
      return newArray;
    });
  };

  const showLawyersThatHaveAccessToDoc = (docId) => {
    return null;
  };

  const card = ({ casei, index }) => {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CacheProvider value={cacheRtl}>
            <CardContent sx={{ borderRadius: "5px 5px 5px 5px" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "50%",
                  width: "100%",
                }}
              >
                <img
                  alt="img"
                  src={backgroun}
                  style={{
                    position: "absolute",
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    borderRadius: "5px 5px 0px 0px",
                  }}
                />
              </div>
              <Typography
                sx={{ fontFamily: "shabnam", fontSize: 14, marginTop: "10px" }}
                color="text.secondary"
                gutterBottom
              >
                عنوان : {casei.title}
              </Typography>
              <Typography
                sx={{ fontFamily: "shabnam", mb: 1 }}
                variant="h5"
                component="div"
              >
                نام : {casei.caseName}
              </Typography>
              <Typography
                sx={{ fontFamily: "shabnam", marginTop: "5px" }}
                color="text.secondary"
              >
                گروه : {casei.documentCategory}
              </Typography>
              <Typography
                sx={{ fontFamily: "shabnam", marginTop: "5px" }}
                variant="body2"
              >
                حداقل بودجه : {casei.minimumBudget} تومان
                <br />
                حداکثر بودجه : {casei.maximumBudget} تومان
              </Typography>
              {isLawyer !== "false" && (
                <>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ marginRight: "10px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        وضعیت پرونده
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={concase[index]}
                        label="وضعیت پرونده"
                        onChange={(e) => setcaseon(e, index)}
                      >
                        <MenuItem value={0}>در انتظار</MenuItem>
                        <MenuItem value={1}>پذیرفته</MenuItem>
                        <MenuItem value={2}>رد</MenuItem>
                      </Select>
                    </FormControl>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        style={{ backgroundColor: "orange" }}
                        variant="contained"
                        size="small"
                        sx={{
                          width: "100%",
                        }}
                        onClick={() => handlesendstatus(casei.id, index)}
                      >
                        اعمال
                      </Button>
                    </div>
                  </div>
                  <Box
                    style={{ marginTop: "15px" }}
                    backgroundColor={"lightblue"}
                    borderRadius={2}
                  >
                    <IconButton size="small">
                      <a
                        href={casei.fileUrl === "null" ? null : casei.fileUrl}
                        download={"download"}
                      >
                        <DownloadForOfflineOutlined />
                        <span style={{ marginLeft: "10px", fontSize: "15px" }}>
                          {"دانلود فایل"}
                        </span>
                      </a>
                    </IconButton>
                  </Box>
                </>
              )}
              {showLawyersThatHaveAccessToDoc(casei.id)}
            </CardContent>
            {isLawyer === "false" && (
              <div
                style={{
                  marginTop: "-6px",
                  marginBottom: "10px",
                  marginRight: "15px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: "shabnam",
                    fontSize: "12px",
                    background: "#19c222",
                  }}
                  onClick={() => handleOpencon(index)}
                  size="small"
                >
                  مشاهده وضعیت
                </Button>
                <Button
                  onClick={() => navigate(`/new-case/edit_${casei.id}`)}
                  sx={{ fontFamily: "shabnam", marginRight: "10px" }}
                  size="small"
                  variant="contained"
                >
                  ویرایش
                </Button>
                <Button
                  onClick={() => handleClickDelete(index)}
                  sx={{ fontFamily: "shabnam" }}
                  size="small"
                  color="error"
                >
                  حذف
                </Button>
                <div>{showcasecon({ casei, index })}</div>
                <ThemeProvider theme={theme}>
                  <Dialog
                    open={openDialog[index]}
                    onClose={() => handleCloseDialog(index)}
                  >
                    <DialogTitle>
                      <div>آیا از حذف کردن مطمئنید؟</div>
                      <div>{casei.caseName}</div>
                    </DialogTitle>
                    <DialogActions>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button onClick={handleCloseDialog}>لغو</Button>
                        <Button
                          onClick={() => handleDeleteCase(casei.id, index)}
                          autoFocus
                        >
                          حذف
                        </Button>
                      </div>
                    </DialogActions>
                  </Dialog>
                </ThemeProvider>
              </div>
            )}
            {isLawyer.split("_")[0] === "choose" && (
              <CardActions>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "40px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      fontFamily: "shabnam",
                      mb: 1,
                      width: "50%",
                      fontSize: "12px",
                      background: "#19c222",
                    }}
                    size="large"
                    onClick={() => handleOpencon(index)}
                  >
                    مشاهده وضعیت
                  </Button>
                  <div>{showcasecon({ casei, index })}</div>
                  <Button
                    variant="contained"
                    onClick={() => handleChooseCase(casei.id, index)}
                    sx={{
                      fontFamily: "shabnam",
                      mb: 1,
                      width: "50%",
                      marginRight: "3px",
                    }}
                    size="large"
                  >
                    {!loadingsend[index] && <span>ارسال</span>}
                    {loadingsend[index] && (
                      <div
                        style={{
                          height: "30px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ReactLoading type="bubbles" color="#fff" />
                      </div>
                    )}
                  </Button>
                </div>
              </CardActions>
            )}
          </CacheProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  };

  const ClickNewCase = () => {
    navigate("/new-case/add");
  };

  const showcasecon = ({ casei, index }) => {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Dialog
            open={opencon[index]}
            onClose={() => handleClosecon(index)}
            sx={{ width: "100%" }}
          >
            <DialogTitle>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "600",
                  color: "#0388fc",
                }}
              >
                لیست وکلایی که برای انها پرونده ارسال کردید
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "5px",
                }}
              >
                {casei.accesses.length === 0 ? (
                  <Typography sx={{ fontSize: 24 }}>
                    پرونده ای برای وکیلی ارسال نکردید.
                  </Typography>
                ) : (
                  casei.accesses.map((info, index) => (
                    <>
                      <div
                        style={{
                          marginTop: "30px",
                          display: "flex",
                        }}
                      >
                        <Avatar src={info.lawyer.user.profileImageUrl} />
                        <div
                          style={{
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            marginRight: "10px",
                            fontWeight: "600",
                          }}
                        >
                          {info.lawyer.user.name}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "30px",
                            fontSize: "13px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "100px",
                              fontSize: "13px",
                              color:
                                info.documentStatus === 0
                                  ? "gray"
                                  : info.documentStatus === 1
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {info.documentStatus === 0 && "در انتظار..."}
                            {info.documentStatus === 1 && "قبول"}
                            {info.documentStatus === 2 && "نپذیرفته"}
                          </div>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: "12px",
                              borderRadius: "50px",
                              marginRight: "20px",
                            }}
                            onClick={() =>
                              navigate(`/LawyerPage/${info.lawyerId}`)
                            }
                          >
                            مشاهده پروفایل
                          </Button>
                        </div>
                      </div>
                      <hr style={{ width: "90%" }} />
                    </>
                  ))
                )}
              </div>
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => handleClosecon(index)} color="primary">
                بستن
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </>
    );
  };

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Oval width="80" color="blue" />
        </div>
      )}
      {!loading && (
        <>
          <Grid
            display={"flex"}
            minHeight={"100vh"}
            // alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
          >
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              height={"100%"}
              width={{ xs: "100%", sm: "90%" }}
              borderRadius={"10px"}
              // paddingY={"50px"}
              paddingX={{ xs: "0px", sm: "10px", md: "20px" }}
              display={"flex"}
              m={"2%"}
              backgroundColor={"white"}
            >
              <Grid item xs={12} lg={isLawyer == "false" ? 11 : 12}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontSize: "20px", fontWeight: "600" }}>
                      پرونده های من
                    </div>
                    <div>
                      {isLawyer === "false" && (
                        <ThemeProvider theme={theme}>
                          <Button
                            sx={{ justifyContent: "center" }}
                            variant="contained"
                            onClick={ClickNewCase}
                            // startIcon={<AddIcon />}
                          >
                            پرونده جدید
                          </Button>
                        </ThemeProvider>
                      )}
                    </div>
                  </div>
                  <hr></hr>
                </div>
                <Grid container direction={"row"} justifyContent={"right"}>
                  {Cases.length == 0 ? (
                    <Typography sx={{ fontFamily: "shabnam", fontSize: 24 }}>
                      {isLawyer.split("_")[0] == "true"
                        ? "هنوز پرونده ای برای شما ارسال نشده است."
                        : "شما هنوز پرونده‌ ای ایجاد نکرده اید."}
                    </Typography>
                  ) : (
                    Cases.map((casei, index) => (
                      <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                        <Card sx={{ m: "10px" }} variant="outlined">
                          {card({ casei, index })}
                        </Card>
                      </Grid>
                    ))
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Dialog
            open={openDescription}
            onClose={handleCloseDescription}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography fontFamily={"shabnam"} fontSize={"19px"}>
                متن کامل توضیحات:
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Typography fontFamily={"shabnam"} fontSize={"17px"}>
                  {description}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDescription} autoFocus>
                <Typography fontFamily={"shabnam"} fontSize={"15px"}>
                  بستن
                </Typography>
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};
export default ShowCases;
