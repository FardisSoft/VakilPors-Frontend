import React from "react";
import { Helmet } from 'react-helmet-async';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import FmdGoodIcon from '@mui/icons-material/FmdGood'; // location icon
import PhoneIcon from '@mui/icons-material/Phone'; // Phone icon
import EmailIcon from '@mui/icons-material/Email'; // Email Icon
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice'; // Post icon
import { IconButton } from "@mui/material";

const ContactUs = () => {
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
						padding: '40px 80px',
						border: '1px solid blue',
						backgroundColor: '#fffbf5',
						borderRadius: '25px',
						alignItems: 'center'}}>
				<FmdGoodIcon></FmdGoodIcon>
				<p style={{fontSize: 15, color: '#444cc6'}}>استان تهران - شهر تهران - نارمک - خیابان حیدرخانی - دانشگاه علم و صنعت ایران - دانشکده مهندسی کامپیوتر</p>
				<p style={{fontsize: 15, color: '#444cc6'}}> <a href="https://goo.gl/maps/BVieC2q9PMVLP5UV9">نمایش در Google Maps</a></p>
				<PhoneIcon></PhoneIcon>
				<p style={{fontSize: 15, color: '#444cc6'}}>021-77240540</p>
				<EmailIcon></EmailIcon>
				<p style={{fontSize: 15, color: '#444cc6'}}>pub@iust.ac.ir</p>				
			</div>
		</div>
		</>
	);
};

export default ContactUs;