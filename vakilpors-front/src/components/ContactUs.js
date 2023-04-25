import React from "react";
import { Helmet } from 'react-helmet-async';

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
			<div style={{display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						justifyContent: 'center',
						padding: '40px 80px',
						border: '1px solid blue',
						borderRadius: '5px',
						backgroundColor: '#2A2F33',}}>
				<h1 style={{paddingBottom:15, fontSize:20, color: '#FFBE00', alignSelf:'center'}}>تماس با ما</h1>
				<p style={{fontSize: 15, color: '#FFBE00'}}>آدرس : تهران - تهران - دانشگاه علم و صنعت</p>
				<p style={{fontSize: 15, color: '#FFBE00'}}>تلفن گویا : 77240540</p>
				<p style={{fontSize: 15, color: '#FFBE00'}}>ایمیل : pub@iust.ac.ir</p>
				<p style={{fontSize: 15, color: '#FFBE00'}}>کد پستی : 1684613114</p>
			</div>
		</div>
		</>
	);
};

export default ContactUs;