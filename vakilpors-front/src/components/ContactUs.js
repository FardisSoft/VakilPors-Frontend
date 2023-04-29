import React from "react";
import { Helmet } from 'react-helmet-async';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import FmdGoodIcon from '@mui/icons-material/FmdGood'; // location icon
import PhoneIcon from '@mui/icons-material/Phone'; // Phone icon
import EmailIcon from '@mui/icons-material/Email'; // Email Icon
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice'; // Post icon

const ContactUs = () => {
	return (
		<>
		<Helmet>
			<title>Contact Us</title>
		</Helmet>

		<div style={{display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					backgroundColor: '#ABC0C0'}}>
					<h1 style={{paddingBottom:15, fontSize:30, color: '#000000', alignSelf:'center'}}>تماس با ما</h1>
			<div style={{display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						justifyContent: 'center',
						padding: '40px 80px',
						border: '1px solid blue',
						backgroundColor: '#fffbf5',
						borderRadius: '25px',}}>

				<p style={{fontSize: 15, color: '#444cc6'}}>آدرس : تهران - تهران - دانشگاه علم و صنعت</p>
				<p style={{fontSize: 15, color: '#444cc6'}}>تلفن گویا : 77240540</p>
				<p style={{fontSize: 15, color: '#444cc6'}}>ایمیل : pub@iust.ac.ir</p>
				<p style={{fontSize: 15, color: '#444cc6'}}>کد پستی : 1684613114</p>
			</div>
		</div>
		</>
	);
};

export default ContactUs;