import React, {useState, useEffect} from "react";
import { Helmet } from 'react-helmet-async';
import { BASE_API_ROUTE } from "../../Constants";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";

const Statistics = () => {

	const [statistics, setStatistics] = useState(null);
	const { getAccessToken } = useAuth();

	useEffect(() => {
		const getStatistics = async () => {
			const token = await getAccessToken();
			if(token){
				const url = BASE_API_ROUTE + 'Statistics/GetStatistics';
				try {
					const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
					setStatistics(response.data);
					// console.log('response in getting Statistics : ',response);
				} catch (error) {
					console.log('error in getting Statistics : ',error);
				}
			}
		};
		getStatistics();
	}, []);

	return (
		<>
		<Helmet>
			<title>آمار سایت</title>
		</Helmet>
		<div style={{display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					backgroundColor: '#fffbf5'}}>
					<h1 style={{paddingBottom:15, fontSize:24, color: '#000000', alignSelf:'center'}}>آمار سایت</h1>
			<div style={{display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						justifyContent: 'center',
						padding: '40px 10%',
						border: '1px solid blue',
						backgroundColor: '#fffbf5',
						borderRadius: '25px',
						alignItems: 'center'}}>
				{statistics && <>
					<p style={{fontSize: 15, color: '#444cc6'}}>بازدید امروز : {statistics.dailyVisits}</p>
					<p style={{fontSize: 15, color: '#444cc6'}}>بازدید این ماه : {statistics.monthlyVisits}</p>
					<p style={{fontSize: 15, color: '#444cc6'}}>بازدید امسال : {statistics.yearlyVisits}</p>
					<p style={{fontSize: 15, color: '#444cc6'}}>تعداد کاربران : {statistics.usersCount}</p>
					<p style={{fontSize: 15, color: '#444cc6'}}>تعداد وکلا : {statistics.lawyersCount}</p>
					<p style={{fontSize: 15, color: '#444cc6'}}>تعداد پرونده ها : {statistics.casesCount}</p>		
					<p style={{fontSize: 15, color: '#444cc6'}}>تعداد پیام ها : {statistics.messagesCount}</p>
				</>}
			</div>
		</div>
		</>
	);
};

export default Statistics;