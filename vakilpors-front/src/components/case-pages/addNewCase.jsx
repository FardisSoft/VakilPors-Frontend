import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useAuth } from "../../context/AuthProvider";
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { Typography, Grid, TextField, InputAdornment, IconButton, Box, OutlinedInput, InputLabel, FormControl } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { MuiFileInput } from 'mui-file-input'
import '../../css/Newcase.css';

const filter = createFilterOptions();

const AddNewCase = () => {

  const [DocumentId, setDocumentId] = useState();
  const [isEdit, setisEdit] = useState(false); 
  const [Title, setTitle] = useState('');
  const [File, setFile] = useState(null);
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
        }
        catch (error) {
          console.log("error in Getting Document Data!!! : ",error);
        }
      }
    };
    getDocData();
  },[]);

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
    // data.append('UserId', '');
    data.append('MinimumBudget', MinimumBudget);
    data.append('FileUrl', '');
    data.append('Title', Title);
    data.append('DocumentCategory', DocumentCategory);
    // data.append('Id', '');
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
      } catch (error) {
          console.log('error in adding doc : ',error);
      }
    }
  };

  const handleEditCase = async () => {
    const data = new FormData();
    data.append('MaximumBudget', MaximumBudget);
    data.append('MinimumBudget', MinimumBudget);
    data.append('FileUrl', '');
    data.append('Title', Title);
    data.append('DocumentCategory', DocumentCategory);
    data.append('Id', DocumentId);
    if(File != null){
      data.append('File', File);
    }
    data.append('Description', Description);
    data.append('caseName', caseName);
    
    const token = await getAccessToken();
    if(token){
      const url = BASE_API_ROUTE + 'Document/UpdateDocument';
      try {
          const response = await axios.post(url,data,{headers: {Authorization: `Bearer ${token}`}});
          // console.log('response in updating Document : ', response);
      } catch (error) {
          console.log('error in updating Document : ',error);
      }
    }
  };

  return (
    <>
    <Helmet>
        <title>{isEdit ? "ویرایش پرونده" : "افزودن پرونده"}</title> 
    </Helmet>
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* <div> */}
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">حداقل</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">تومان</InputAdornment>}
                label="Amount"
                value={MinimumBudget}
                onChange={(e) => setMinimumBadget(e.target.value)}
              />
            </FormControl>
            {/* <TextField
              label="شماره موبایل"
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
              variant="outlined"
              inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
              InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "17px",color:"black",} }}
              sx={{
                width: {xs:'100%',sm:'80%'},
                padding: 0,
                backgroundColor: 'rgba(255,255,255,0.5)',
                mb: '10px',
                borderRadius:"5px",
              }}/> */}
          {/* </div> */}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">حداکثر</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">تومان</InputAdornment>}
                label="Amount"
                value={MaximumBudget}
                onChange={(e) => setMaximumBadget(e.target.value)}
              />
            </FormControl>
          </div>
        </Box>
        <br></br>
        <br></br>
        <button onClick={() => {isEdit ? handleEditCase() : handleCreateCase()}} class="btn btn-p-primary btn-lg btn-block" id="create-new-project">
          {isEdit ? "ویرایش پرونده" : "ایجاد پرونده"} 
        </button>
      </Grid>
    </Grid>
    </>
  );
}

export default AddNewCase;