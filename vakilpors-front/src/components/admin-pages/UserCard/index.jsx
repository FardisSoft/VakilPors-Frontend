import React, { useState } from "react";
import { UserCardStyles } from "./style";
import {
  Box,
  Typography,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Navigate, useNavigate } from "react-router-dom";
import defaultProfilePhoto from "./defaultProfilePhoto.png";
import visitcardNull from "./visitcardNull.jpg";
import { BASE_API_ROUTE} from "../../../Constants"
import axios from 'axios';
import StyledButton from '../../ButtonComponent';
import { AiOutlineDownload, AiOutlineCheckCircle } from "react-icons/ai";
import { toast } from 'react-toastify';

import { Grid, Avatar, Card, CardContent, CardHeader, CardMedia, Button, Link } from "@mui/material";
import LinkMUI from '@mui/material/Link';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../../context/AuthProvider";




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



const UsersCard = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isHovering, setIsHovering] = useState(false);
  const { refUserRole, getAccessToken } = useAuth();




  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const navigate = useNavigate();

  const routeToDetail = () => {
    navigate(`/${props.username}`);
  };
  
  const handleVerify = async (lawyerId) => {
    const token = await getAccessToken();
    if(token){
      const url = BASE_API_ROUTE + `Lawyer/VerifyLawyer?lawyerId=${lawyerId}`;
      try {
        const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
        // console.log('response in verifing lawyer : ',response);
        showSuccesMessage('مدارک وکیل مورد نظر با موفقیت تایید شد');
        handleClose();
      } catch (error) {
        console.log('error in verifing lawyer : ',error);
        showErrorMessage('خطا در تایید مدارک وکیل');
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

  const classes = UserCardStyles();

  return (
    <Box className={classes.cardContainer} sx={{ height: "calc(100% - 5px)" }}>
      <img
        className={classes.imageProfile}
        src={props.image_code ?? defaultProfilePhoto }
        alt="profile"
      />
      <Box
        className={classes.textBoxProfile}
        sx={{ maxWidth: "calc(100%)" }}
      >
        <Tooltip title={props.name.length > 30 ? props.name : ""} arrow>
          <Typography
            fontWeight="700"
            lineHeight="27px"
            fontSize={!isMobile ? "18px" : "16px"}
            color="#284B63"
            fontFamily={'shabnam'}
          >
            {props.name?.length > 30
              ? `${props.name.substring(0, 30)}...`
              : props.name}
          </Typography>
        </Tooltip>
        <Typography
          className={classes.profileStyle}
          fontSize={!isMobile ? "16px" : "14px"}
          lineHeight="24px"
          sx={{ wordBreak: "break-word" }}
          fontFamily={'shabnam'}
        >
          عنوان: {props.username}
        </Typography>
        <Typography
          className={classes.profileStyle}
          fontSize={!isMobile ? "16px" : "14px"}
          lineHeight="24px"
          fontFamily={'shabnam'}
        >
          شماره تلفن:{" "}
          {props.created_at}
        </Typography>
      </Box>
      <Box>
        <Tooltip fontFamily="shabnam" title="تایید پرونده کاربر">
          <Box
            className={classes.blueCircle}
            component="div"
            border={isHovering ? "1px solid #284B63" : "1px solid #B3CEE0"}
            sx={{ cursor: "pointer" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleVerify}
          >
            <ArrowBackRoundedIcon
              sx={{
                color: isHovering ? "#284B63" : "#B3CEE0",
                fontSize: !isMobile ? "20px" : "16px",
              }}
            />
          </Box>
        </Tooltip>
      </Box>
      <Box>
        <Tooltip fontFamily="shabnam" title="جزئیات پرونده کاربر">
          <Box
            className={classes.blueCircle}
            component="div"
            border={isHovering ? "1px solid #284B63" : "1px solid #B3CEE0"}
            sx={{ cursor: "pointer" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClickOpen}
          >
            <ArrowBackRoundedIcon
              sx={{
                color: isHovering ? "#284B63" : "#B3CEE0",
                fontSize: !isMobile ? "20px" : "16px",
              }}
            />
          </Box>
        </Tooltip>
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle fontFamily={"shabnam"} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          جزئیات پرونده وکیل
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        </IconButton>
        <DialogContent dividers>
          
        <Typography sx={{ fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
            در این قسمت می‌توانید اطلاعات تکمیلی وکیل '{props.name}' را مشاهده بفرمایید : 
        </Typography>   


            <CardContent>
                <Typography sx={{fontFamily:"shabnam", fontWeight:"bold"}}>{'نام : '+props.name}</Typography>
                <Typography sx={{fontFamily:"shabnam", fontWeight:"bold"}}>{'عنوان : '+props.username}</Typography>
                <Typography sx={{fontFamily:"shabnam", fontWeight:"bold"}}>{'شماره پرونده : '+props.parvande}</Typography>
                <Typography sx={{fontFamily:"shabnam", fontWeight:"bold"}}>{'شماره موبایل : '+props.created_at}</Typography>
            </CardContent>
            <Grid container direction={'row'} display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'}>
              <Grid flexDirection={'column'} display={'flex'}>
                <CardHeader titleTypographyProps={{ m:0, fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} title="کارت ویزیت "/>
                <CardMedia image={props.callingCardImageUrl || visitcardNull} sx={{ alignSelf:"flex-start", height: 167, width: 300, mb: '20px', ml: '20px' }} title="کارت ویزیت"/>
              </Grid>
              <Grid flexDirection={'column'} display={'flex'}>
                <CardHeader titleTypographyProps={{ m:0, fontFamily:"shabnam", fontWeight:"bold", fontSize:"16px", color:"grayText" }} title="کارت ملی "/>
                <CardMedia image={props.nationalCardImageUrl || "https://cdn.etemadonline.com/servev2/NjhjZjI32ifG/5Uwvb7W7Zm0,/NjhjZjI32ifG.jpeg"} sx={{ alignSelf:"flex-start", height: 167, width: 300, mb: '20px' }} title="کارت ملی"/>
              </Grid>
            </Grid>

            <Typography sx={{ fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
            رزومه : 
        </Typography> 

        <Typography sx={{ fontFamily:"shabnam", fontWeight:"bold" }} color="text.secondary">
          <Link href={props.resumeLink}>
              <AiOutlineDownload />
            دانلود رزومه
          </Link>
        </Typography>


        </DialogContent>
        <DialogActions>
          
        <StyledButton onClick={()=>handleVerify(props.device_id)} style={{fontFamily:"shabnam", maxHeight:'30px', width: '8rem', marginBottom: '1rem', fontSize: '1rem' }}>
                  <AiOutlineCheckCircle style={{ marginLeft: '0.25rem'}}/>
                  تایید مدارک
        </StyledButton>
        </DialogActions>
      </BootstrapDialog>
      </Box>
    </Box>
    
  );
};

export default UsersCard;