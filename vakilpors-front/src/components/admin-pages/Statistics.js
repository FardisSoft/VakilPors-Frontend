import React, {useState, useEffect} from "react";
import { Helmet } from 'react-helmet-async';

const Statistics = () => {
	return (
		<>
		<Helmet>
			<title>آمار بازدید سایت</title>
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
				
				<p style={{fontSize: 15, color: '#444cc6'}}>استان تهران - شهر تهران - نارمک - خیابان حیدرخانی - دانشگاه علم و صنعت ایران - دانشکده مهندسی کامپیوتر</p>
				<p style={{fontsize: 15, color: '#444cc6'}}> <a href="https://goo.gl/maps/BVieC2q9PMVLP5UV9">نمایش در Google Maps</a></p>
				
				<p style={{fontSize: 15, color: '#444cc6'}}>021-77240540</p>
				
				<p style={{fontSize: 15, color: '#444cc6'}}>pub@iust.ac.ir</p>				
			</div>
		</div>
		</>
	);
};

export default Statistics;