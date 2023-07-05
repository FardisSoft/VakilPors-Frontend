import React, {useState, useEffect} from "react";
import useStateRef from "react-usestateref";
import { Helmet } from 'react-helmet-async';
import { BASE_API_ROUTE } from "../../Constants";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import Paper from '@mui/material/Paper';
import { Chart,BarSeries,ArgumentAxis,ValueAxis, } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import Moment from 'moment-jalaali';

const Statistics = () => {

	const [statistics, setStatistics] = useState(null);
	const { getAccessToken } = useAuth();
	const [ maxView, setMaxView ] = useState();
	const [ monthsViews, setMonthsViews, refMonthsViews ] = useStateRef([]);

	const backArray = [26, 13, 99, 88, 77, 66, 55, 44, 130, 100, 10, 4];

	const shamsiMonth = Moment().locale("fa").format('jMMMM');
	const monthIndex = {'Farvardin': 1, 'Ordibehesht': 2, 'Khordad': 3, 'Tir': 4, 'Mordad': 5, 'Shahrivar': 6, 'Mehr': 7, 'Aban': 8, 'Azar': 9, 'Dey': 10, 'Bahman': 11, 'Esfand': 12}
	const indexMonth = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

	useEffect(() => {
		const getMonthsViews = () => {
			if(refMonthsViews.current.length == 0){
				for (let i = monthIndex[shamsiMonth] ; i > 0; i--) {
					setMonthsViews([{ month: indexMonth[i-1], view: backArray[i-1] }, ...refMonthsViews.current]);
				}
				for (let i = 12; i > monthIndex[shamsiMonth]; i--) {
					setMonthsViews([{ month: indexMonth[i-1], view: backArray[i-1] }, ...refMonthsViews.current]);
				}
			}
			setMaxView(Math.max(...backArray));
		}
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
		getMonthsViews();
		getStatistics();
	}, []);

	const getPath = (x, width, y, y1, val) => {
		if(val == 0) return;
		if(val <= (maxView / 10) ) 
			return `M ${x} ${y1}
					L ${x + width } ${y1}
					L ${x + width / 2} ${y}
					Z`;
		return `M ${x} ${y1} 
				L ${width + x} ${y1}
				L ${x + width - 15} ${y + 30}
				L ${width + x} ${y + 40}
				L ${x + width / 2} ${y}
				L ${x} ${y + 40}
				L ${x + 15} ${y + 30} 
				Z`;
	}

	const BarWithLabel = ({ arg, barWidth, maxBarWidth, val, startVal, color, value, style, }) => {
		const width = maxBarWidth * barWidth;
		return (
		  <React.Fragment>
			<path d={getPath(arg - width / 2, width, val, startVal, value)} fill={value > (2 * maxView / 3) ? 'rgba(255,0,0,0.6)' : value > (maxView / 2) ? 'rgba(255,127,39,0.8)' : value > (maxView / 3) ? 'rgba(255,200,0,0.7)' : color} style={style} />
			<Chart.Label
			  x={arg}
			  y={(val + startVal) / 2}
			  dominantBaseline="middle"
			  textAnchor="middle"
			  style={{ fill: 'white' }}
			>
			  {value}
			</Chart.Label>
		  </React.Fragment>
		);
	};

	const Title = () => {
		return (
		  	<React.Fragment>
				<p style={{fontSize:'20px', marginTop:'20px', marginRight:'38%'}}>
					{'بازدید سایت در 12 ماه گذشته'}
				</p>
		  	</React.Fragment>
		);
	};

	const Label = (props) => {
		const { text, x, y } = props;
		return (
			<React.Fragment>
				<Chart.Label
					x={x}
					y={y}
					textAnchor="middle"
					style={{ fill: 'black', fontFamily:'shabnam', fontSize:'15px', }}>
					{text}
				</Chart.Label>
			</React.Fragment>
		);
	};

	return (
		<>
		<Helmet>
			<title>آمار سایت</title>
		</Helmet>
		<div style={{display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '100vh',
					marginTop: '40px',
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
				{window.innerWidth > 1000 && <Paper>
					<Chart dir={'ltr'} width={900} data={refMonthsViews.current} >
						<ArgumentAxis labelComponent={Label} position="top"/>
						<ValueAxis />
						<BarSeries valueField="view" argumentField="month" pointComponent={BarWithLabel}/>
						<Title textComponent={Title} />
						<Animation />
					</Chart>
				</Paper>}
			</div>
		</div>
		</>
	);
};

export default Statistics;