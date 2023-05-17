import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Grid, TextField, InputAdornment, IconButton, Box, OutlinedInput, InputLabel, FormControl } from "@mui/material";
import { toast } from 'react-toastify';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { MuiFileInput } from 'mui-file-input'
import '../../css/Newcase.css';

// mui rtl
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
    direction: 'rtl',
});
// mui rtl

const filter = createFilterOptions();

const AddNewCase = () => {

  const [DocumentId, setDocumentId] = useState();
  const [isEdit, setisEdit] = useState(false); 
  const [Title, setTitle] = useState('');
  const [File, setFile] = useState(null);
  const [FileURL, setFileURL] = useState('');
  const [MinimumBudget, setMinimumBadget] = useState('');
  const [MaximumBudget, setMaximumBadget] = useState('');
  const [Description, setDescription] = useState('');
  const [caseName, setCaseName] = useState('');
  const [DocumentCategory, setDocumentCategory] = useState('');
  const { getAccessToken } = useAuth();
  const { func } = useParams();

  useEffect(() => {
    const getDocData = async () => {
      if(func.split('_')[0] == "edit"){
        setisEdit(true);
      }
      setDocumentId(func.split('_')[1]);
      if(func.split('_')[0] == "edit"){
        const url =  BASE_API_ROUTE + `Document/GetDocumentById?documentId=${func.split('_')[1]}`;
        const token = await getAccessToken();
        try{
          const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
          // console.log("success in Getting Document Data!!! : ",response);
          setTitle(response.data.data.title);
          setMinimumBadget(response.data.data.minimumBudget);
          setMaximumBadget(response.data.data.maximumBudget);
          setCaseName(response.data.data.caseName);
          setDescription(response.data.data.description);
          setDocumentCategory(response.data.data.documentCategory);
          setFileURL(response.data.data.fileUrl);
        }
        catch (error) {
          console.log("error in Getting Document Data!!! : ",error);
        }
      }
    };
    getDocData();
  },[]);

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
      rtl:true,
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
      rtl:true,
    });
  };

  const categories = [
    { category: 'ثبت احوال' },
    { category: 'بیمه' },
    { category: 'ملکی' },
    { category: 'مالیات' },
    { category: 'شرکت ها' },
    { category: 'انحصار وراثت' },
    { category: 'دیوان عدالت اداری' },
    { category: 'مالکیت معنوی' },
    { category: 'بین الملل' },
    { category: 'اداره کار' },
    { category: 'جرایم اینترنتی' },
    { category: 'قراردها' },
    { category: 'وصول مطالبات' },
    { category: 'خانواده' },
    { category: 'کیفری (جرائم)' },
    { category: 'اجرای احکام' },
    { category: 'جرایم علیه اشخاص' },
    { category: 'جرایم علیه اموال' },
    { category: 'جرایم علیه امنیت کشور' },
    { category: 'اموال و مالکیت' },
    { category: 'ثبت اسناد' },
    { category: 'داوری' },
    { category: 'سربازی و نظام وظیفه' },
  ];

  const titles = [
    { title: 'مشاوره حضوری' },
    { title: 'مشاوره تلفنی' },
    { title: 'مشاوره آنلاین' },
    { title: 'وکالت' },
    { title: 'داوری' },
  ]

  const titleLists = () => {
    return (
      <Autocomplete 
        value={Title}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTitle(newValue)
          } else if (newValue && newValue.inputValue) {
            setTitle(newValue.inputValue)
          } else if(newValue && newValue.title) {
            setTitle(newValue.title)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some((option) => inputValue === option.title);
          if (inputValue !== '' && !isExisting) {
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
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(props, option) => <li {...props} style={{fontFamily:'shabnam'}}>{option.title}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField className="autocomplete-textfield" sx={{border:"none"}}{...params}/>
        )}
      />
    );
  };
    
  const categoryList = () => {
    return (
      <Autocomplete
        value={DocumentCategory}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setDocumentCategory(newValue)
          } else if (newValue && newValue.inputValue) {
            setDocumentCategory(newValue.inputValue)
          } else if(newValue && newValue.category) {
            setDocumentCategory(newValue.category)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some((option) => inputValue === option.category);
          if (inputValue !== '' && !isExisting) {
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
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.category;
        }}
        renderOption={(props, option) => <li {...props} style={{fontFamily:'shabnam'}}>{option.category}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField className="autocomplete-textfield" sx={{border:"none"}}{...params}/>
        )}
      />
    );
  };

  const handleCreateCase = async () => {
    const data = new FormData();
    data.append('MaximumBudget', MaximumBudget);
    data.append('MinimumBudget', MinimumBudget);
    data.append('FileUrl', '');
    data.append('Title', Title);
    data.append('DocumentCategory', DocumentCategory);
    data.append('File', File);
    data.append('Description', Description);
    data.append('caseName', caseName);

    // console.log({MaximumBudget, MinimumBudget, Title,  DocumentCategory, File, Description, caseName});

    const token = await getAccessToken();
    if(token){
      const url = BASE_API_ROUTE + 'Document/AddDocument';
      try {
          const response = await axios.post(url,data,{headers: {Authorization: `Bearer ${token}`}});
          // console.log('response in adding doc : ', response);
          showSuccesMessage('پرونده با موفقیت ایجاد شد.');
      } catch (error) {
          console.log('error in adding doc : ',error);
          showErrorMessage('ایجاد پرونده با خطا مواجه شد');
      }
    }
  };

  const handleEditCase = async () => {
    const data = new FormData();
    data.append('MaximumBudget', MaximumBudget);
    data.append('MinimumBudget', MinimumBudget);
    data.append('FileUrl', FileURL);
    data.append('Title', Title);
    data.append('DocumentCategory', DocumentCategory);
    data.append('Id', DocumentId);
    data.append('File', File);
    data.append('Description', Description);
    data.append('caseName', caseName);
    
    const token = await getAccessToken();
    if(token){
      const url = BASE_API_ROUTE + 'Document/UpdateDocument';
      try {
          const response = await axios.post(url,data,{headers: {Authorization: `Bearer ${token}`}});
          // console.log('response in updating Document : ', response);
          showSuccesMessage('پرونده با موفقیت ویرایش شد.');
      } catch (error) {
          console.log('error in updating Document : ',error);
          showErrorMessage('ویرایش پرونده با خطا مواجه شد');
      }
    }
  };

  return (
    <>
    <Helmet>
        <title>{isEdit ? "ویرایش پرونده" : "افزودن پرونده"}</title> 
    </Helmet>
    <ThemeProvider theme={theme}>
    <CacheProvider value={cacheRtl}>
    <Grid display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} width={"100%"} backgroundColor={'#ABC0C0'}>
      <Grid flexDirection={'column'} width={"80%"} borderRadius={"10px"} paddingY={"40px"} paddingX={"50px"} m={'2%'} display={"flex"} justifyContent={"center"} alignSelf={"center"} backgroundColor={'white'}>
        <Typography variant="h4" sx={{fontFamily: "shabnam"}} paddingY={2}>{isEdit ? "ویرایش پرونده" : "افزودن پرونده جدید"}</Typography>
        <hr></hr>
        <Grid container direction={'row'} marginY={'20px'}>
          <div display='inline' style={{marginLeft:"10px"}} class="circle-icon big bgc-3 tc-white text-bold flip">1</div>
          <Typography variant="h6" sx={{fontFamily: "shabnam"}}>چه کاری می خواهید برای شما انجام شود؟</Typography>
        </Grid>
        {titleLists()}
        <br></br>
        <br></br>
        <Grid container direction={'row'} marginBottom={'20px'}>
          <div display='inline' style={{marginLeft:"10px"}} class="circle-icon big bgc-3 tc-white text-bold flip">2</div>
          <Typography variant="h6" sx={{fontFamily: "shabnam"}}>پرونده شما در چه زمینه ای است؟</Typography>
        </Grid>
        {categoryList()}
        <br></br>
        <br></br>
        <Grid container direction={'row'} marginBottom={'20px'}>
          <div display='inline' style={{marginLeft:"10px"}} class="circle-icon big bgc-3 tc-white text-bold flip">3</div>
          <Typography variant="h6" sx={{fontFamily: "shabnam"}}>نام پرونده</Typography>
        </Grid>
        <TextField
          type="text"
          value={caseName}
          onChange={(e) => setCaseName(e.target.value)}
          variant="outlined"
          inputProps={{style: { fontFamily:"shabnam"}}}/>
        <br></br>
        <br></br>
        <Grid container direction={'row'} marginBottom={'20px'}>
          <div display='inline' style={{marginLeft:"10px"}} class="circle-icon big bgc-3 tc-white text-bold flip">4</div>
          <Typography variant="h6" sx={{fontFamily: "shabnam"}}>پرونده خود را توضیح دهید : </Typography>
        </Grid>
        <TextField
            multiline
            rows={7}
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            inputProps={{style: {fontFamily:"shabnam"}}}/>
        <br></br>
        <br></br> 
        <Grid container direction={'row'} marginBottom={'20px'}>
          <div display='inline' style={{marginLeft:"10px"}} class="circle-icon big bgc-3 tc-white text-bold flip">5</div>
          <Typography variant="h6" sx={{fontFamily: "shabnam"}}>اپلود فایل پرونده</Typography>
        </Grid>
        <MuiFileInput fullWidth margin='10px' value={File} onChange={(File) => setFile(File)} />
        <br></br>
        <br></br>
        <Grid container direction={'row'} marginBottom={'20px'}>
          <div display='inline' style={{marginLeft:"10px"}} class="circle-icon big bgc-3 tc-white text-bold flip">6</div>
          <Typography display='inline' variant="h6" sx={{fontFamily: "shabnam"}}>بودجه شما چقدر است ؟  </Typography>                
        </Grid>   
        <TextField
          label="حداقل (تومان)"
          type="text"
          value={MinimumBudget}
          onChange={(e) => setMinimumBadget(e.target.value)}
          variant="outlined"
          inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "15px",color:"black",} }}
          InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "15px",color:"black",} }}
          sx={{width:{xs:'100%',sm:'50%'},mb:'10px'}}/>
        <TextField
          label="حداکثر (تومان)"
          type="text"
          value={MaximumBudget}
          onChange={(e) => setMaximumBadget(e.target.value)}
          variant="outlined"
          inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "15px",color:"black",}}}
          InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "15px",color:"black",} }}
          sx={{width:{xs:'100%',sm:'50%'}}}/>
        <br></br>
        <br></br>
        <button onClick={() => {isEdit ? handleEditCase() : handleCreateCase()}} class="btn btn-p-primary btn-lg btn-block" id="create-new-project">
          {isEdit ? "ویرایش پرونده" : "ایجاد پرونده"} 
        </button>
      </Grid>
    </Grid>
    </CacheProvider>
    </ThemeProvider>
    </>
  );
}

export default AddNewCase;