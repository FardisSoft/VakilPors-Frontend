import React, { useState, useEffect, useRef } from "react";
import useStateRef from "react-usestateref";
import { Helmet } from "react-helmet-async";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Button, Chip, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import "../../css/signup-and-profile-edit-pages-style.css";
import jwt from "jwt-decode";
import axios from "axios";
import { BASE_API_ROUTE } from "../../Constants";
import { useAuth } from "../../context/AuthProvider";
import { updateLawyer } from "../../services/userService";
import { toast } from "react-toastify";
import StyledButton from "../ButtonComponent";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import ReactLoading from "react-loading";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

// mui rtl
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// mui rtl

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
// mui rtl

const filter = createFilterOptions();

const Lawyer_Jobinfo = () => {
  const navigate = useNavigate();
  const { getAccessToken } = useAuth();
  const [getdetail, setdetail, refdetail] = useStateRef({});
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const fileInputRef = useRef(null);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingocr, setloadingocr] = useState(false);
  const [code, setcode] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionUser =
    "کاربر گرامی! در این قسمت می‌توانید تمامی اطلاعات شغلی خود را به‌روزرسانی و یا ویرایش کنید. لطفا از صحت اطلاعات وارد شده اطمینان حاصل نمائید.";

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
  const getTextFieldValue = () => {
    if (refdetail.current && refdetail.current.resumeLink) {
      return refdetail.current.resumeLink.endsWith(".pdf")
        ? refdetail.current.resumeLink
        : "download.pdf";
    }
    return "download.pdf";
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

  const titles = [
    { title: "وکیل پایه یک دادگستری" },
    { title: "وکیل پایه دو دادگستری" },
    { title: "وکیل پایه سه دادگستری" },
    { title: "وکیل کانون مشاوران قوه قضائیه" },
    { title: "کارشناس حقوقی" },
    { title: "کارآموز وکالت" },
  ];

  const specialtieses = [
    { title: "ثبت احوال" },
    { title: "بیمه" },
    { title: "ملکی" },
    { title: "مالیات" },
    { title: "شرکت ها" },
    { title: "انحصار وراثت" },
    { title: "دیوان عدالت اداری" },
    { title: "مالکیت معنوی" },
    { title: "بین الملل" },
    { title: "اداره کار" },
    { title: "جرایم اینترنتی" },
    { title: "قراردها" },
    { title: "وصول مطالبات" },
    { title: "خانواده" },
    { title: "کیفری (جرائم)" },
    { title: "اجرای احکام" },
    { title: "جرایم علیه اشخاص" },
    { title: "جرایم علیه اموال" },
    { title: "جرایم علیه امنیت کشور" },
    { title: "اموال و مالکیت" },
    { title: "ثبت اسناد" },
    { title: "داوری" },
    { title: "سربازی و نظام وظیفه" },
  ];

  const getDefaultTakhasos = (data) => {
    const tt = [];
    data.split("/").map((temp) => {
      tt.push({ title: temp });
    });
    setSpecialties(tt);
  };

  const handleMelliCardChange = (event) => {
    // setdetail({
    //   ...refdetail.current,
    //   ["nationalCardImage"]: file,
    // });

    const file = event.target.files[0];
    console.log(file);

    if (file && file instanceof Blob) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const fileString = reader.result;
        // console.log(fileString);
        setdetail({
          ...refdetail.current,
          ["nationalCardImage"]: file,
        });
        setdetail({
          ...refdetail.current,
          nationalCardImageUrl: URL.createObjectURL(file),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const specialtiesList = () => {
    return (
      <Autocomplete
        multiple
        id="size-small-standard"
        ListboxProps={{ style: { maxHeight: 300, overflow: "auto" } }}
        size="small"
        options={specialtieses}
        filterSelectedOptions
        getOptionLabel={(option) => option.title}
        getOptionSelected={(option, value) => option.title === value.title}
        filterOptions={(options, state) =>
          options.filter(
            (option) =>
              !specialties.find(
                (valueOption) => valueOption.title === option.title
              )
          )
        }
        defaultValue={specialties}
        value={specialties}
        onChange={(event, newValue) => setSpecialties(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="filled"
              color="primary"
              dir="rtl"
              label={option.title}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            size="small"
            variant="outlined"
            label="تخصص ها"
            {...params}
          />
        )}
      />
    );
  };

  const OCRDialog = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontWeight: "600",
                color: "#42a7f5",
              }}
            >
              شماره کد ملی
            </div>
            <div
              style={{
                fontSize: "12px",
                lineHeight: "2",
                textAlign: "justify",
                width: "80%",
                marginTop: "2%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              از کیفیت و صحت کارت ملی خود مطمئن شوید و پس از ان دکمه ارسال را
              فشار دهید تا شماره ملی شما استخراج شود اگر شماره ملی درست نیود
              خودتان اصلاح کنید
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                style={{
                  borderRadius: "10px",
                  width: "500px",
                  height: "300px",
                }}
                src={refdetail.current.nationalCardImageUrl}
                variant="square"
              />
              <StyledButton
                style={{
                  marginTop: "5px",
                  fontFamily: "shabnam",
                  width: "10rem",
                  marginTop: "10px",
                }}
                type="submit"
                onClick={HandleOcr}
              >
                {!loadingocr && <span> ارسال</span>}
                {loadingocr && (
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
              </StyledButton>
              <div style={{marginTop:'5px'}}>کد ملی شما:</div>
              <div>{code}</div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>بستن</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleCallingCardChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file && file instanceof Blob) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const fileString = reader.result;
        console.log(fileString);
        setdetail({
          ...refdetail.current,
          ["callingCardImage"]: file,
        });
        setdetail({
          ...refdetail.current,
          callingCardImageUrl: URL.createObjectURL(file),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (event) => {
    // setdetail({
    //   ...refdetail.current,
    //   ["resume"]: file,
    // });
    const file = event.target.files[0];
    const fileName = file.name;
    setdetail({
      ...refdetail.current,
      resumeLink: fileName,
      resume: file,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (token) {
        const tokenData = jwt(token);
        const url =
          BASE_API_ROUTE + `Lawyer/GetLawyerByUserId?userId=${tokenData.uid}`;
        try {
          const response = await axios.get(url);
          // console.log('response in getting lawyer data : ', response);
          setdetail(response.data.data);
          console.log(response.data.data);
          setTitle(response.data.data.title);
          getDefaultTakhasos(response.data.data.specialties);
        } catch (error) {
          console.log("error in getting lawyer data : ", error);
        }
      }
    };
    fetchData();
  }, []);

  const updateuser = async (event) => {
    setloading(true);
    event.preventDefault();
    const formData = new FormData();
    for (const key in refdetail.current) {
      if (key != "user" && key != "specialties") {
        formData.append(
          key,
          refdetail.current[key] == null ? "" : refdetail.current[key]
        );
      }
      if (key == "user")
        for (const keyUser in refdetail.current["user"]) {
          formData.append(
            "user." + keyUser,
            refdetail.current["user"][keyUser] == null
              ? ""
              : refdetail.current["user"][keyUser]
          );
        }
    }
    let specialtiesString = "";
    specialties.map((takh) => {
      specialtiesString =
        specialtiesString == ""
          ? takh.title
          : specialtiesString + "/" + takh.title;
    });
    formData.append("specialties", specialtiesString);
    console.log(formData);
    const token = await getAccessToken();
    if (token) {
      const tokenData = jwt(token);
      try {
        const success = await updateLawyer(formData);
        // console.log("success in updating lawyer data : ",success);
        setloading(false);
        showSuccesMessage("اطلاعات شما با موفقیت تغییر کرد.");
      } catch (error) {
        console.log("error in updating lawyer data : ", error);
        setloading(false);
        showErrorMessage("تغییر اطلاعات با خطا مواجه شد.");
      }
    }
  };
  async function convertImageUrlToFile(url, fileName) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], fileName, {
        lastModified: new Date().getTime(),
        lastModifiedDate: new Date(),
        type: blob.type,
      });
      return file;
    } catch (error) {
      console.error("خطا:", error);
      throw error;
    }
  }
  const HandleOcr = async (event) => {
    setcode("")
    console.log(refdetail.current.nationalCardImage);
    const img1 = await convertImageUrlToFile(
      refdetail.current.nationalCardImageUrl,
      "ocr.jpeg"
    );
    console.log(img1);
    const url = BASE_API_ROUTE + `Ocr`;
    const file = refdetail.current.nationalCardImage;

    const formData1 = new FormData();
    if (refdetail.current.nationalCardImage === null) {
      console.log("dfdf");
      formData1.append("imageFile", img1);
    } else {
      console.log("sdfdsf");
      formData1.append("imageFile", file);
    }
    console.log(formData1);
    setloadingocr(true);
    axios
      .post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setcode(response.data.data.nationalCode);
        console.log(response.data.data.nationalCode);
        setloadingocr(false);
      })
      .catch((error) => {
        console.log(error);
        setloadingocr(false);
      });
  };

  const setUserInfo = (event) => {
    event.target.name.includes("user")
      ? setdetail({
          ...refdetail.current,
          ["user"]: {
            ...refdetail.current.user,
            [event.target.name.slice(5)]: event.target.value,
          },
        })
      : setdetail({
          ...refdetail.current,
          [event.target.name]: event.target.value,
        });
  };

  return (
    <>
      <Helmet>
        <title>ویرایش اطلاعات وکیل</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          <div className="page-content2">
            <div className="form-v4-content2">
              <div className="form-left2">
                <h3>ویرایش اطلاعات شغلی</h3>
                <p
                  className="text-1"
                  style={{
                    lineHeight: "2",
                    textAlign: "justify",
                    marginTop: "10px",
                  }}
                >
                  {descriptionUser}
                </p>
                <p
                  className="text-1"
                  style={{
                    lineHeight: "2",
                    textAlign: "justify",
                    marginTop: "10px",
                  }}
                >
                  با رفتن به صفحه زیر نیز می توانید اطلاعات کاربری خود را به روز
                  رسانی کنید.
                </p>

                <div
                  className="form-row-last"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <StyledButton
                    style={{
                      width: "10rem",
                    }}
                    type="submit"
                    onClick={() => navigate("/edit_lawyer")}
                  >
                    اطلاعات کاربری
                  </StyledButton>
                </div>
              </div>
              <form className="form-detail" id="myform">
                <h3 style={{ textAlign: "center" }}> اطلاعات شغلی</h3>
                <div
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    display: "flex",
                  }}
                >
                  <Avatar
                    style={{
                      borderRadius: "10px",
                      width: "150px",
                      height: "90px",
                    }}
                    src={refdetail.current.callingCardImageUrl}
                    variant="square"
                  />
                  <div
                    style={{
                      marginRight: "20px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      variant="contained"
                      component="label"
                      style={{
                        backgroundColor: "#1976D2",
                        borderRadius: "5px",
                        color: "white",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      sx={{
                        color: "white",
                        width: "130px",
                        mt: 1,
                        height: "40px",
                      }}
                    >
                      کارت ویزیت
                      <input
                        type="file"
                        onChange={handleCallingCardChange}
                        hidden
                        accept=".jpg,.jpeg,.png"
                      />
                    </Button>
                    <h3 style={{ marginTop: "8px", fontSize: "0.7rem" }}>
                      می توانبد یک عکس برای کارت ویزیت خود انتخاب کنید.
                    </h3>
                  </div>
                </div>
                <div className="form-group2">
                  <div className="form-row form-row-1">
                    <TextField
                      id="outlined-basic"
                      label="شماره پرونده وکالت"
                      variant="outlined"
                      size="small"
                      name="licenseNumber"
                      value={
                        refdetail.current ? refdetail.current.licenseNumber : ""
                      }
                      onChange={setUserInfo}
                      fullWidth
                      autoComplete="licenseNumber"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>

                  <div className="form-row form-row-1">
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        عنوان
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={title}
                        label=" جنسیت"
                        onChange={(event) => {
                          setTitle(event.target.value);
                          setdetail({
                            ...refdetail.current,
                            ["title"]: event.target.value,
                          });
                        }}
                      >
                        {titles.map((specialty, index) => (
                          <MenuItem key={index} value={specialty.title}>
                            {specialty.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="form-group2">
                  <div className="form-row form-row-1">
                    <TextField
                      id="outlined-basic"
                      label="سابقه کار"
                      variant="outlined"
                      size="small"
                      name="yearsOfExperience"
                      value={
                        refdetail.current
                          ? refdetail.current.yearsOfExperience
                          : ""
                      }
                      onChange={setUserInfo}
                      fullWidth
                      autoComplete="work"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div className="form-row form-row-1">
                    <TextField
                      id="outlined-basic"
                      label="تحصیلات"
                      variant="outlined"
                      size="small"
                      name="education"
                      value={
                        refdetail.current ? refdetail.current.education : ""
                      }
                      onChange={setUserInfo}
                      fullWidth
                      autoComplete="work"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div style={{ marginTop: "20px" }}>{specialtiesList()}</div>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: "20px" }}>
                  <div className="form-row">
                    <TextField
                      id="outlined-basic"
                      label="آدرس محل کار"
                      variant="outlined"
                      size="small"
                      name="officeAddress"
                      value={
                        refdetail.current ? refdetail.current.officeAddress : ""
                      }
                      onChange={setUserInfo}
                      fullWidth
                      autoComplete="work"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row " style={{ marginTop: "20px" }}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="رزومه"
                      variant="outlined"
                      size="small"
                      value={getTextFieldValue()}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              style={{
                                backgroundColor: "orange",
                                borderRadius: "5px",
                                height: "25px",
                              }}
                              variant="contained"
                              onClick={() => fileInputRef.current.click()}
                            >
                              آپلود
                            </Button>
                            <input
                              ref={fileInputRef}
                              type="file"
                              hidden
                              accept=".pdf"
                              onChange={handleResumeChange}
                            />
                            {refdetail.current.resumeLink && (
                              <Button
                                style={{
                                  backgroundColor: "#42f551",
                                  borderRadius: "5px",
                                  height: "25px",
                                  marginRight: "4px",
                                }}
                                variant="contained"
                              >
                                <a
                                  style={{ color: "white" }}
                                  href={refdetail.current.resumeLink}
                                  download
                                  target="_blank"
                                >
                                  دانلود
                                </a>
                              </Button>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "20px", display: "flex" }}>
                  <Avatar
                    style={{
                      borderRadius: "10px",
                      width: "150px",
                      height: "90px",
                    }}
                    src={refdetail.current.nationalCardImageUrl}
                    variant="square"
                  />
                  <div
                    style={{
                      marginRight: "20px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <Button
                        variant="contained"
                        component="label"
                        style={{
                          backgroundColor: "#1976D2",
                          borderRadius: "5px",
                          color: "white",
                          fontSize: "12px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        sx={{
                          color: "white",
                          width: "130px",
                          mt: 1,
                          height: "40px",
                        }}
                      >
                        کارت ملی
                        <input
                          type="file"
                          onChange={handleMelliCardChange}
                          hidden
                          accept=".jpg,.jpeg,.png"
                        />
                      </Button>
                      {refdetail.current.nationalCardImageUrl && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            height: "100%",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            component="label"
                            style={{
                              backgroundColor: "orange",
                              borderRadius: "5px",
                              color: "white",
                              fontSize: "10px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "5px",
                            }}
                            sx={{
                              color: "white",
                              width: "80px",
                              mt: 1,
                              height: "30px",
                            }}
                            onClick={handleClickOpen}
                          >
                            تست ocr
                          </Button>
                          {OCRDialog()}
                        </div>
                      )}
                    </div>
                    <h3 style={{ marginTop: "8px", fontSize: "0.7rem" }}>
                      کارت ملی شما در پروفایل شما نمایش داده نخواهد شد و تنها
                      جهت احراز هویت شما توسط ادمین مورد بررسی قرار می گیرد
                    </h3>
                  </div>
                </div>
                <div
                  className="form-row-last"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <StyledButton
                    style={{
                      marginTop: "5px",
                      fontFamily: "shabnam",
                      width: "10rem",
                    }}
                    type="submit"
                    onClick={updateuser}
                  >
                    {!loading && <span>ثبت اطلاعات</span>}
                    {loading && (
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
                  </StyledButton>
                </div>
              </form>
            </div>
          </div>
        </CacheProvider>
      </ThemeProvider>
    </>
  );
};
export default Lawyer_Jobinfo;
