import React from "react";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { BASE_API_ROUTE } from '../Constants';
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FmdGood, Phone, Email, Chat } from '@mui/icons-material';
import { Button, Typography } from "@mui/material";
import { toast } from 'react-toastify';

const ContactUs = () => {

	const { getAccessToken, refUserRole } = useAuth();
    const navigate = useNavigate();

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
		  rtl:true,
		});
	};

	const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

	const handleChatStart = async () => {
        const token = await getAccessToken();
        if(!token){
            showErrorMessage('جهت پیام به ادمین ابتدا باید وارد سایت شوید.');
			await delay(3000);
            navigate("/Login");
        }
        else{
            const url = BASE_API_ROUTE + 'Chat/StartChat?recieverUserId=1';
            try { 
                const response = await axios.post(url,'', {headers: {Authorization: `Bearer ${token}`}});
                // console.log('response in starting chat : ', response);
                navigate("/chatPage");
            } catch (error) {
                console.log('error in starting chat : ', error);
            }
        }
    };

	return (
		<>
		<Helmet>
			<title>تماس با ما</title>
		</Helmet>

		<div style={{display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					backgroundColor: '#fffbf5'}}>
					<h1 style={{paddingBottom:15, fontSize:34, color: '#000000', alignSelf:'center'}}>تماس با ما</h1>
			<div style={{display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						justifyContent: 'center',
						padding: '40px 10%',
						border: '1px solid blue',
						backgroundColor: '#fffbf5',
						borderRadius: '25px',
						alignItems: 'center'}}>
				<FmdGood/>
				<p style={{fontSize: 15, color: '#444cc6'}}>استان تهران - شهر تهران - نارمک - خیابان حیدرخانی - دانشگاه علم و صنعت ایران - دانشکده مهندسی کامپیوتر</p>
				<p style={{fontsize: 15, color: '#444cc6'}}> <a href="https://goo.gl/maps/BVieC2q9PMVLP5UV9">نمایش در Google Maps</a></p>
				<Phone/>
				<p style={{fontSize: 15, color: '#444cc6'}}>021-77240540</p>
				<Email/>
				<p style={{fontSize: 15, color: '#444cc6'}}>info@mail.fardissoft.ir</p>
				{refUserRole.current != 'Admin' &&
				<Button onClick={handleChatStart}>
					<Chat sx={{ml:'5px'}}/>
					<Typography fontFamily={'shabnam'} fontsize={15}>{'پیام به ادمین'}</Typography>
				</Button>}
			</div>
		</div>
		</>
	);
};

export default ContactUs;