import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_API_ROUTE } from "../../Constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { InputAdornment , IconButton} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import  NewCase from "../case-pages/Newcase.css";
import { Classes } from "@mui/styles/mergeClasses/mergeClasses";
import { Paper } from "@mui/material";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import useStateRef from 'react-usestateref';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { MuiFileInput } from 'mui-file-input'

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';


const filter = createFilterOptions();



const AddNewCase = () => {


  const [getdetail, setdetail, refdetail] = useStateRef({});

  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    const textValue = event.target.value;
    setText(textValue);

  };
  


  const titles = [
    
    { title: 'ثبت احوال' },
    { title: 'بیمه' },
    { title: 'ملکی' },
    { title: 'مالیات' },
    { title: 'شرکت ها' },
    { title: 'انحصار وراثت' },
    { title: 'دیوان عدالت اداری' },
    { title: 'مالکیت معنوی' },
    { title: 'بین الملل' },
    { title: 'اداره کار' },
    { title: 'جرایم اینترنتی' },
    { title: 'قراردها' },
    { title: 'وصول مطالبات' },
    { title: 'خانواده' },
    { title: 'کیفری (جرائم)' },
    { title: 'اجرای احکام' },
    { title: 'جرایم علیه اشخاص' },
    { title: 'جرایم علیه اموال' },
    { title: 'جرایم علیه امنیت کشور' },
    { title: 'اموال و مالکیت' },
    { title: 'ثبت اسناد' },
    { title: 'داوری' },
    { title: 'سربازی و نظام وظیفه' },
    
  ];

  const jobs = [

    { job: 'مشاوره حضوری' },
    { job: 'مشاوره تلفنی' },
    { job: 'مشاوره آنلاین' },
    { job: 'وکالت' },
    { job: 'داوری' },

  ]

  const handleDescriptChange = (file) => {
    setdetail({
      ...refdetail.current,
      ['Descript']: file,
    });
  }


  const jobLists = () => {
    return (
      <Autocomplete 
        value={refdetail.current.job}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setdetail({
              ...refdetail.current,
              ['job']: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setdetail({
              ...refdetail.current,
              ['job']: newValue.inputValue,
            });
          } else if(newValue && newValue.job) {
            setdetail({
              ...refdetail.current,
              ['job']: newValue.job,
            });
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some((option) => inputValue === option.job);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              job: `Add "${inputValue}"`,
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={jobs}
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
          return option.job;
        }}
        renderOption={(props, option) => <li {...props}>{option.job}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField sx={{border:"none"}}{...params}/>
        )}
      />
    );
  }
    
  const titleList = () => {
    return (
      <Autocomplete
        value={refdetail.current.title}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setdetail({
              ...refdetail.current,
              ['title']: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setdetail({
              ...refdetail.current,
              ['title']: newValue.inputValue,
            });
          } else if(newValue && newValue.title) {
            setdetail({
              ...refdetail.current,
              ['title']: newValue.title,
            });
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
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField sx={{border:"none"}}{...params}/>
        )}
      />
    );
  };

    return (
        <>
        <Helmet>
           <title>افزودن پرونده</title> 
        </Helmet>



    <Grid display={"flex"} flexDirection={"column"} margin={"auto"} alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100%"} backgroundColor={'#ABC0C0'}>
        <Grid flexDirection={'column'} height={"100%"}  width={"80%"} borderRadius={"10px"} padding={"10px"} paddingTop={"50px"} paddingX={"50px"} paddingBottom={"50px"} display={"flex"} position={"relative"} m={"2%"} justifyContent={"center"} item xs={4} spacing={5} alignSelf={"center"} backgroundColor={'white'}>

            <Typography variant="h4" sx={{fontFamily: "shabnam"}} padding={4}>افزودن پرونده جدید</Typography>
                <hr></hr>
                



                  <div class="circle-icon big bgc-3 tc-white text-bold visible-xs-inline-block flip mr -mt">1</div>
                  <Typography variant="h6" sx={{fontFamily: "shabnam"}} padding={4}>چه کاری می‌خواهید برای شما انجام شود؟</Typography>
                  {jobLists()}
                
                <br></br>
                <br></br>

                <div class="circle-icon big bgc-3 tc-white text-bold visible-xs-inline-block flip mr -mt">2</div>

                <Typography variant="h6" sx={{fontFamily: "shabnam"}} padding={4}>پرونده شما در چه زمینه ای است؟</Typography>
                {titleList()}


                <br></br>
                <br></br>

                <div class="circle-icon big bgc-3 tc-white text-bold visible-xs-inline-block flip mr -mt">3</div>


                <label style={{ position: "relative", top: "5px" }}><p>نام پرونده</p></label>
                <div style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
                <input
                  className="input100"
                  type="text"
                  name="case.name"
                  // onChange={setUserInfo}
                  margin="normal" />
                </div>

                <br></br>
                <br></br>

              
                <div class="circle-icon big bgc-3 tc-white text-bold visible-xs-inline-block flip mr -mt">4</div>

                <Typography variant="h6" sx={{fontFamily: "shabnam"}} padding={4}>پرونده خود را توضیح دهید : </Typography>



                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <textarea 
                  style={{ 
                    fontSize: '18px', 
                    lineHeight: '1.5',
                    width: '100%',
                    minHeight: '200px'
                  }} 
                  value={text} 
                  onChange={handleTextChange}
                />
              </div>
              <br></br>
              <br></br>
              
              <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>

                <label style={{ position: "relative", top: "5px" }}><p>توضیحات پرونده</p></label>
                <MuiFileInput fullWidth margin='10px' value={refdetail.current.Descript} onChange={handleDescriptChange} />

              </div>
              <br></br>
              <br></br>

              <div class="circle-icon big bgc-3 tc-white text-bold visible-xs-inline-block flip mr -mt">5</div>
              <Typography variant="h6" sx={{fontFamily: "shabnam"}} padding={4}>بودجه شما چقدر است ؟  </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">حداقل</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={<InputAdornment position="start">تومان</InputAdornment>}
                      label="Amount"
                    />
                  </FormControl>
                </div>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">حداکثر</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={<InputAdornment position="start">تومان</InputAdornment>}
                      label="Amount"
                    />
                  </FormControl>
                </div>
              </Box>

              <br></br>
              <br></br>
              <button type="submit" class="btn btn-p-primary btn-lg btn-block" id="create-new-project">
              ایجاد پرونده  
              </button>

        </Grid>
    </Grid>







        </>



    );
}

export default AddNewCase;
