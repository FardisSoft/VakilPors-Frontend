import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { MuiFileInput } from "mui-file-input";
import "../../css/Newcase.css";
import { AddCircleOutline } from "@mui/icons-material";
import StyledButton from "../ButtonComponent";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// mui rtl
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
  typography: {
    fontFamily: "shabnam",
  },
  direction: "rtl",
});
// mui rtl

const filter = createFilterOptions();

const AddNewCase = () => {
  const navigate = useNavigate();
  const [DocumentId, setDocumentId] = useState();
  const [isEdit, setisEdit] = useState(false);
  const [Title, setTitle] = useState("");
  const [File, setFile] = useState(null);
  const [FileURL, setFileURL] = useState("");
  const [MinimumBudget, setMinimumBadget] = useState("");
  const [MaximumBudget, setMaximumBadget] = useState("");
  const [Description, setDescription] = useState("");
  const [caseName, setCaseName] = useState("");
  const [DocumentCategory, setDocumentCategory] = useState("");
  const [loading, setloading] = useState(false);

  const { getAccessToken } = useAuth();
  const { func } = useParams();

  useEffect(() => {
    const getDocData = async () => {
      if (func.split("_")[0] == "edit") {
        setisEdit(true);
      }
      setDocumentId(func.split("_")[1]);
      if (func.split("_")[0] == "edit") {
        const url =
          BASE_API_ROUTE +
          `Document/GetDocumentById?documentId=${func.split("_")[1]}`;
        const token = await getAccessToken();
        try {
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // console.log("success in Getting Document Data!!! : ",response);
          console.log(response.data.data);
          setTitle(response.data.data.title);
          setMinimumBadget(response.data.data.minimumBudget);
          setMaximumBadget(response.data.data.maximumBudget);
          setCaseName(response.data.data.caseName);
          setDescription(response.data.data.description);
          setDocumentCategory(response.data.data.documentCategory);
          setFileURL(response.data.data.fileUrl);
        } catch (error) {
          console.log("error in Getting Document Data!!! : ", error);
        }
      }
    };
    getDocData();
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

  const categories = [
    { category: "ثبت احوال" },
    { category: "بیمه" },
    { category: "ملکی" },
    { category: "مالیات" },
    { category: "شرکت ها" },
    { category: "انحصار وراثت" },
    { category: "دیوان عدالت اداری" },
    { category: "مالکیت معنوی" },
    { category: "بین الملل" },
    { category: "اداره کار" },
    { category: "جرایم اینترنتی" },
    { category: "قراردها" },
    { category: "وصول مطالبات" },
    { category: "خانواده" },
    { category: "کیفری (جرائم)" },
    { category: "اجرای احکام" },
    { category: "جرایم علیه اشخاص" },
    { category: "جرایم علیه اموال" },
    { category: "جرایم علیه امنیت کشور" },
    { category: "اموال و مالکیت" },
    { category: "ثبت اسناد" },
    { category: "داوری" },
    { category: "سربازی و نظام وظیفه" },
  ];

  const titles = [
    { title: "مشاوره حضوری" },
    { title: "مشاوره تلفنی" },
    { title: "مشاوره آنلاین" },
    { title: "وکالت" },
    { title: "داوری" },
  ];

  const titleLists = () => {
    return (
      <Autocomplete
        value={Title}
        size="small"
        sx={{ marginTop: "5px" }}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTitle(newValue);
          } else if (newValue && newValue.inputValue) {
            setTitle(newValue.inputValue);
          } else if (newValue && newValue.title) {
            setTitle(newValue.title);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.title
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={titles}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(props, option) => (
          <li {...props} style={{ fontFamily: "shabnam" }}>
            {option.title}
          </li>
        )}
        freeSolo
        renderInput={(params) => (
          <TextField
            className="autocomplete-textfield"
            sx={{ border: "none" }}
            {...params}
          />
        )}
      />
    );
  };

  const categoryList = () => {
    return (
      <Autocomplete
        value={DocumentCategory}
        size="small"
        ListboxProps={{ style: { maxHeight: 300, overflow: "auto" } }}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setDocumentCategory(newValue);
          } else if (newValue && newValue.inputValue) {
            setDocumentCategory(newValue.inputValue);
          } else if (newValue && newValue.category) {
            setDocumentCategory(newValue.category);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.category
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              category: `Add "${inputValue}"`,
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={categories}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.category;
        }}
        renderOption={(props, option) => (
          <li {...props} style={{ fontFamily: "shabnam" }}>
            {option.category}
          </li>
        )}
        freeSolo
        renderInput={(params) => (
          <TextField
            className="autocomplete-textfield"
            sx={{ border: "none" }}
            {...params}
          />
        )}
      />
    );
  };
  const Check = () => {
    if ((Title === "") | (Title === null)) {
      showErrorMessage("باید حتما انتخاب کنید چه کاری می خواهید انجام دهید");
      return false;
    }
    if (MaximumBudget <= MinimumBudget) {
      showErrorMessage("مقدار حداکثر بودجه باید بیشتر از حداقل آن باشد.");
      return false;
    }
    if ((caseName === "") | (caseName === null)) {
      showErrorMessage("باید حتما نام پرونده خود را انتخاب کنید.");
      return false;
    }
    if ((DocumentCategory === "") | (DocumentCategory === null)) {
      showErrorMessage("باید زمینه پرونده را حتما انتخاب کنید.");
      return false;
    }
    return true;
  };
  const handleCreateCase = async () => {
    if (Check() === false) {
      return;
    }
    setloading(true);
    const data = new FormData();
    data.append("MaximumBudget", MaximumBudget);
    data.append("MinimumBudget", MinimumBudget);
    data.append("FileUrl", "");
    data.append("Title", Title);
    data.append("DocumentCategory", DocumentCategory);
    data.append("File", File);
    data.append("Description", Description);
    data.append("caseName", caseName);

    // console.log({MaximumBudget, MinimumBudget, Title,  DocumentCategory, File, Description, caseName});

    const token = await getAccessToken();
    if (token) {
      const url = BASE_API_ROUTE + "Document/AddDocument";
      try {
        const response = await axios.post(url, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log('response in adding doc : ', response);
        setloading(false);
        showSuccesMessage("پرونده با موفقیت ایجاد شد.");
        navigate("/show-cases/false");
      } catch (error) {
        console.log("error in adding doc : ", error);
        setloading(false);
        showErrorMessage("ایجاد پرونده با خطا مواجه شد");
      }
    }
  };

  const handleEditCase = async () => {
    if (Check() === false) {
      return;
    }
    if ((Title === "") | (Title === null)) {
      showErrorMessage("باید حتما انتخاب کنید چه کاری می خواهید انجام دهید");
      return;
    }
    if (MaximumBudget <= MinimumBudget) {
      showErrorMessage("مقدار حداکثر بودجه باید بیشتر از حداقل آن باشد.");
      return;
    }
    setloading(true);
    const data = new FormData();
    data.append("MaximumBudget", MaximumBudget);
    data.append("MinimumBudget", MinimumBudget);
    data.append("FileUrl", FileURL);
    data.append("Title", Title);
    data.append("DocumentCategory", DocumentCategory);
    data.append("Id", DocumentId);
    data.append("File", File);
    data.append("Description", Description);
    data.append("caseName", caseName);

    const token = await getAccessToken();
    if (token) {
      const url = BASE_API_ROUTE + "Document/UpdateDocument";
      try {
        const response = await axios.post(url, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setloading(false);
        // console.log('response in updating Document : ', response);
        showSuccesMessage("پرونده با موفقیت ویرایش شد.");
        navigate("/show-cases/false");
      } catch (error) {
        console.log("error in updating Document : ", error);
        setloading(false);
        showErrorMessage("ویرایش پرونده با خطا مواجه شد");
      }
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
          >
            <Grid container spacing={2}>
              <Grid
                item
                sm={12}
                md={7}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid
                  display={"flex"}
                  flexDirection={"column"}
                  borderRadius={"10px"}
                  width={{ xs: "97%", sm: "90%" }}
                  paddingY={"40px"}
                  paddingX={{ xs: "10px", sm: "10px", md: "5px" }}
                  justifyContent={"center"}
                  alignSelf={"center"}
                  backgroundColor={"white"}
                >
                  <Typography
                    sx={{
                      fontFamily: "shabnam",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#3477eb",
                      display: "flex",
                      alignItems: "center",
                    }}
                    paddingY={1}
                  >
                    {isEdit ? "ویرایش پرونده" : "افزودن پرونده جدید"}
                  </Typography>
                  <hr></hr>
                  <Grid container direction={"row"} marginY={"10px"}>
                    <div
                      display="inline"
                      style={{ marginLeft: "10px", backgroundColor: "#1f61d1" }}
                      className="circle-icon big bgc tc-white text-bold flip"
                    >
                      1
                    </div>
                    <Typography
                      sx={{
                        fontFamily: "shabnam",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      چه کاری می خواهید برای شما انجام شود؟
                    </Typography>
                  </Grid>
                  {titleLists()}
                  <br></br>
                  <Grid container direction={"row"} marginBottom={"20px"}>
                    <div
                      display="inline"
                      style={{ marginLeft: "10px", backgroundColor: "#1f61d1" }}
                      className="circle-icon big bgc tc-white text-bold flip"
                    >
                      2
                    </div>
                    <Typography
                      sx={{
                        fontFamily: "shabnam",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      پرونده شما در چه زمینه ای است؟
                    </Typography>
                  </Grid>
                  {categoryList()}
                  <br></br>
                  <Grid container direction={"row"} marginBottom={"20px"}>
                    <div
                      display="inline"
                      style={{ marginLeft: "10px", backgroundColor: "#1f61d1" }}
                      className="circle-icon big bgc tc-white text-bold flip"
                    >
                      3
                    </div>
                    <Typography
                      sx={{
                        fontFamily: "shabnam",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      نام پرونده
                    </Typography>
                  </Grid>
                  <TextField
                    type="text"
                    value={caseName}
                    size="small"
                    onChange={(e) => setCaseName(e.target.value)}
                    variant="outlined"
                    inputProps={{ style: { fontFamily: "shabnam" } }}
                  />
                  <br></br>
                  <Grid container direction={"row"} marginBottom={"20px"}>
                    <div
                      display="inline"
                      style={{ marginLeft: "10px", backgroundColor: "#1f61d1" }}
                      className="circle-icon big bgc tc-white text-bold flip"
                    >
                      4
                    </div>
                    <Typography
                      sx={{
                        fontFamily: "shabnam",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      پرونده خود را توضیح دهید :{" "}
                    </Typography>
                  </Grid>
                  <TextField
                    multiline
                    rows={3}
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    inputProps={{ style: { fontFamily: "shabnam" } }}
                  />
                  <br></br>
                  <Grid container direction={"row"} marginBottom={"20px"}>
                    <div
                      display="inline"
                      style={{ marginLeft: "10px", backgroundColor: "#1f61d1" }}
                      className="circle-icon big bgc tc-white text-bold flip"
                    >
                      5
                    </div>
                    <Typography
                      sx={{
                        fontFamily: "shabnam",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      اپلود فایل پرونده
                    </Typography>
                  </Grid>
                  <div style={{ display: "flex" }}>
                    <MuiFileInput
                      fullWidth
                      margin="10px"
                      value={File}
                      size="small"
                      onChange={(File) => setFile(File)}
                    />
                    {FileURL && (
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
                          href={FileURL}
                          download
                          target="_blank"
                        >
                          دانلود
                        </a>
                      </Button>
                    )}
                  </div>
                  <br></br>
                  <Grid container direction={"row"} marginBottom={"20px"}>
                    <div
                      display="inline"
                      style={{ marginLeft: "10px", backgroundColor: "#1f61d1" }}
                      className="circle-icon big bgc tc-white text-bold flip"
                    >
                      6
                    </div>
                    <Typography
                      display="inline"
                      sx={{
                        fontFamily: "shabnam",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      بودجه شما چقدر است ؟{" "}
                    </Typography>
                  </Grid>
                  <TextField
                    label="حداقل (تومان)"
                    type="text"
                    value={MinimumBudget}
                    onChange={(e) => setMinimumBadget(e.target.value)}
                    variant="outlined"
                    inputProps={{
                      dir: "rtl",
                      style: {
                        fontFamily: "shabnam",
                        fontSize: "15px",
                        color: "black",
                      },
                    }}
                    InputLabelProps={{
                      align: "right",
                      dir: "rtl",
                      style: {
                        fontFamily: "shabnam",
                        fontSize: "15px",
                        color: "black",
                      },
                    }}
                    sx={{ width: { xs: "100%", sm: "50%" }, mb: "10px" }}
                    size="small"
                  />
                  <TextField
                    label="حداکثر (تومان)"
                    type="text"
                    value={MaximumBudget}
                    onChange={(e) => setMaximumBadget(e.target.value)}
                    variant="outlined"
                    inputProps={{
                      dir: "rtl",
                      style: {
                        fontFamily: "shabnam",
                        fontSize: "15px",
                        color: "black",
                      },
                    }}
                    InputLabelProps={{
                      align: "right",
                      dir: "rtl",
                      style: {
                        fontFamily: "shabnam",
                        fontSize: "15px",
                        color: "black",
                      },
                    }}
                    sx={{ width: { xs: "100%", sm: "50%" } }}
                    size="small"
                  />
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <StyledButton
                      style={{
                        marginTop: "5px",
                        fontFamily: "shabnam",
                        width: "10rem",
                      }}
                      type="submit"
                      onClick={() => {
                        isEdit ? handleEditCase() : handleCreateCase();
                      }}
                    >
                      {!loading && (
                        <span>
                          {" "}
                          {isEdit ? "ویرایش پرونده" : "ایجاد پرونده"}{" "}
                        </span>
                      )}
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
                </Grid>
              </Grid>
              <Grid
                item
                sm={12}
                md={5}
                sx={{
                  width: "100%",
                }}
              >
                <Grid
                  display={"flex"}
                  flexDirection={"column"}
                  borderRadius={"10px"}
                  width={{ xs: "97%", sm: "90%" }}
                  paddingY={{ sm: "0px", md: "80px" }}
                  paddingX={{ xs: "10px", sm: "10px", md: "5px" }}
                  justifyContent={"center"}
                  alignSelf={"center"}
                  backgroundColor={"white"}
                >
                  <Typography
                    sx={{
                      fontFamily: "shabnam",
                      fontSize: "20px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }}
                    paddingY={1}
                  >
                    راهنمای پرونده
                  </Typography>
                  <div
                    style={{
                      marginTop: "15px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    کار مورد انتظار
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "15px",
                      lineHeight: "2",
                      textAlign: "justify",
                    }}
                  >
                    در این قسمت در میخواهید مشاوره حضوری یا غیر حضوری یا داوری
                    میخواهید باید یکی از گزینه های مورد نظر را انتخاب کنید
                  </div>

                  <div
                    style={{
                      marginTop: "15px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    زمینه پرونده
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "15px",
                      lineHeight: "2",
                      textAlign: "justify",
                    }}
                  >
                    در این قسمت، توضیح دهید که پرونده شما در چه زمینه‌ای قرار
                    دارد و چه نوع فعالیتی را پوشش می‌دهد.
                  </div>

                  <div
                    style={{
                      marginTop: "15px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    انتخاب نام
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "15px",
                      lineHeight: "2",
                      textAlign: "justify",
                    }}
                  >
                    یک نام برای پرونده خودتان انتخاب کنید تا وکیل مورد نظر از
                    روی نام متوجه موضوع مورد نظر بشود
                  </div>

                  <div
                    style={{
                      marginTop: "15px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    توضیح پرونده
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "15px",
                      lineHeight: "2",
                      textAlign: "justify",
                    }}
                  >
                    نکاتی که در رابطه با پرونده تان ضروری هست را توضیح دهید تا
                    وکیل مورد نظر بتواند کمکتان کند
                  </div>

                  <div
                    style={{
                      marginTop: "15px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    آپلود اسناد
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "15px",
                      lineHeight: "2",
                      textAlign: "justify",
                    }}
                  >
                    مدرک و اسنادی که در رابطه با پرونده خود دارید را اپلود کنید
                    تا وکیل مورد نظر بعد بررسی اسناد بتواند مشاوره بهتری به شما
                    بدهد
                  </div>

                  <div
                    style={{
                      marginTop: "15px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    هزینه مورد نظر
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "15px",
                      lineHeight: "2",
                      textAlign: "justify",
                    }}
                  >
                    حداقل و حداکثر هزینه خود را وارد کنید تا بتوانیم شما را کمک
                    کنید فقط هزینه حداقل کمتر از حداکثر باشد
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CacheProvider>
      </ThemeProvider>
    </>
  );
};

export default AddNewCase;
