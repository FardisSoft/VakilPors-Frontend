import React, {useState, useEffect} from "react";
import useStateRef from "react-usestateref";
import { BASE_API_ROUTE } from "../../Constants";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import Paper from '@mui/material/Paper';
import { Chart } from '@devexpress/dx-react-chart-material-ui';
import Moment from 'moment-jalaali';
import { AiOutlineAreaChart, AiFillCheckSquare } from "react-icons/ai";
import AnimatedCounter from "./AnimatedCounter";
import { Column, Line, Pie, Area, Rose } from '@ant-design/plots';
import { Grid, Card } from '@mui/material';



const VisitPannelStatistics = () => {
	const [ data_1, setData_1 ] = useState([]);
	const [ weekVisits, setWeekVisits ] = useState([]);
	const [ lawyerCityCount, setLawyerCityCount ] = useState([]);
	const [ lawyerTitleCount, setLawyerTitleCount ] = useState([]);
	const [ transactionMonthlyCount, setTransactionMonthlyCount ] = useState([]);

	const [statistics, setStatistics] = useState(null);
	const { getAccessToken } = useAuth();
	const [ maxView, setMaxView ] = useState();
	const [ minView, setMinView ] = useState();
	const [ monthsViews, setMonthsViews, refMonthsViews ] = useStateRef([]);

	const [ temp, setTemp, refTemp ] = useStateRef([]);

	const backArray = [26, 13, 99, 88, 77, 66, 55, 44, 130, 100, 10, 4];

	const shamsiMonth = Moment().locale("fa").format('jMMMM');
	const monthIndex = {'Farvardin': 1, 'Ordibehesht': 2, 'Khordad': 3, 'Tir': 4, 'Mordad': 5, 'Shahrivar': 6, 'Mehr': 7, 'Aban': 8, 'Azar': 9, 'Dey': 10, 'Bahman': 11, 'Esfand': 12}
	const indexMonth = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

	useEffect(() => {
		const getStatistics = async () => {				  
			const token = await getAccessToken();
			if(token){
				const url = BASE_API_ROUTE + 'Statistics/GetStatistics';
				try {
					const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
					setStatistics(response.data);
					setWeekVisits(response.data.weekVisits);
					setLawyerCityCount(response.data.lawyerCityCount);
					setLawyerTitleCount(response.data.lawyerTitleCount);
					setTransactionMonthlyCount(response.data.transactionMonthlyCount);

					// console.log(`The statistics are: ${response.data.weekVisits}`);
					setData_1([
						...data_1,
						{ period: 'بازدید امروز', count: response.data.dailyVisits },
						{ period: 'بازدید ماهانه', count: response.data.monthlyVisits },
						{ period: 'بازدید سالانه', count: response.data.yearlyVisits },
					]);
					if(refMonthsViews.current.length == 0){
						for (let i = monthIndex[shamsiMonth] ; i > 0; i--) {
							setMonthsViews([{ month: indexMonth[i-1], view: backArray[i-1] }, ...refMonthsViews.current]);
						}
						for (let i = 12; i > monthIndex[shamsiMonth]; i--) {
							setMonthsViews([{ month: indexMonth[i-1], view: backArray[i-1] }, ...refMonthsViews.current]);
						}
					}
					if(refTemp.current.length == 0){
						setTemp([{month: ` ( ${response.data.dailyVisits} ) امروز`, view: response.data.dailyVisits},...refTemp.current]);
						setTemp([{month: 'این ماه', view: response.data.monthlyVisits},...refTemp.current]);
						setTemp([{month: 'امسال', view: response.data.yearlyVisits},...refTemp.current]);
					}
					setMaxView(Math.max(...[response.data.dailyVisits,response.data.monthlyVisits,response.data.yearlyVisits]));
					setMinView(Math.min(...[response.data.dailyVisits,response.data.monthlyVisits,response.data.yearlyVisits]));
					// console.log('response in getting Statistics : ',response);
				} catch (error) {
					console.log('error in getting Statistics : ',error);
				}
			}
		};
		getStatistics();
	}, []);

	const config = {
		data: data_1,
		xField: 'period',
		yField: 'count',
		label: {
			// 可手动配置 label 数据标签位置
			position: 'middle',
			// 'top', 'bottom', 'middle',
			// 配置样式
			style: {
				fill: '#FFFFFF',
				opacity: 0.6,
			},
		},
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false,
			},
		},
		meta: {
			period: {
				alias: 'بازه',
			},
			count: {
				alias: 'تعداد',
			},
		},
	};

	// Config for line chart
	const lineConfig = {
		data: weekVisits,
		xField: 'day',
		yField: 'count',
		point: {
		size: 5,
		shape: 'diamond',
		},
	};
	
	// Data for pie chart
	// const pieData = [
	// 	{ type: 'تهران', value: 27 },
	// 	{ type: 'اصفهان', value: 25 },
	// 	{ type: 'بندرعباس', value: 18 },
	// 	{ type: 'شیراز', value: 15 },
	// 	{ type: 'بابل', value: 10 },
	// ];
	
	lawyerCityCount.sort((a, b) => b.count - a.count);

	// Get the top 5 items
	const top5 = lawyerCityCount.slice(0, 5);

	const totalCount = top5.reduce((sum, item) => sum + item.count, 0);

	const pieData = top5.map(item => ({
		value: Math.round((item.count / totalCount) * 100),
		type: item.city
	}));

	// Config for pie chart
	const pieConfig = {
		appendPadding: 10,
		data: pieData,
		angleField: 'value',
		colorField: 'type',
		radius: 0.8,
		legend: false,
		label: {
		type: 'outer',
		content: '{value}',
		style: {
			textAlign: 'left',
			textBaseline: 'middle',
			fontWeight: 'bold',
		},
		adjustColor: true,
		},
		interactions: [
		{
			type: 'element-active',
		},
		],
	};

	// Config for area chart
	const areaConfig = {
		data: transactionMonthlyCount,
		xField: 'month',
		yField: 'count',
		xAxis: {
			range: [0, 1],
		},
	};

	// Data for rose chart
	lawyerTitleCount.sort((a, b) => b.count - a.count);

	// Get the top 5 items
	const _top5 = lawyerTitleCount.slice(0, 5);

	const _totalCount = _top5.reduce((sum, item) => sum + item.count, 0);

	const roseData = _top5.map(item => ({
		value: Math.round((item.count / _totalCount) * 100),
		type: item.title
	}));

	// Config for rose chart
	const roseConfig = {
		data: roseData,
		xField: 'type',
		yField: 'value',
		seriesField: 'type',
		radius: 0.9,
		legend: false
	};

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
			<path d={getPath(arg - width / 2, width, val, startVal, value)} 
			fill={
				// value > (2 * maxView / 3) ? 'rgba(255,0,0,0.6)' : value > (maxView / 2) ? 'rgba(255,127,39,0.8)' : value > (maxView / 3) ? 'rgba(255,200,0,0.7)' : color
				value == maxView ? 'rgba(255,0,0,0.6)' : value == minView ? 'rgba(255,200,0,0.7)' : 'rgba(255,127,39,0.8)'
			} 
			style={style} />
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
				<p style={{fontSize:'20px', marginTop:'20px', marginRight:'30%'}}>
					{'آمار بازدید سایت'}
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


  console.log(`-------------------- The statistics are: ${statistics} -------------------`);
  document.getElementById("root")


	return (
		<>
			<div style={{display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: '100vh',
						backgroundColor: '#fffbf5'}}>
				
				<h1 style={{ paddingBottom:15, fontSize:24, color: '#000000', alignSelf:'center', marginTop: "2rem", fontWeight: "bold" }}><AiOutlineAreaChart /> آمار سایت</h1>
				<div style={{display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							justifyContent: 'center',
							padding: '40px 10%',
							border: '5px solid #082640',
							backgroundColor: '#FCF2F1',
							borderRadius: '25px',
				marginBottom: '1rem',
							alignItems: 'center'}}>

					{statistics && 
			<div style={{ flexDirection: 'row',
											justifyContent: 'center',
											display: 'flex',
											}}>
				{window.innerWidth <= 400 && 
				<>
					<p style={{fontSize: 15, color: '#444cc6' }}>بازدید امروز : {statistics.dailyVisits}</p>
					<p style={{fontSize: 15, color: '#444cc6', fontWeight: "bold"}}>بازدید این ماه : {statistics.monthlyVisits}</p>
					<p style={{fontSize: 15, color: '#444cc6', fontWeight: "bold"}}>بازدید امسال : {statistics.yearlyVisits}</p>
				</>
				}
				<p style={{fontSize: 15, color: '#11447D', fontWeight: "bold", marginLeft: "1rem", marginRight: "0.25rem" }}>
				<AiFillCheckSquare size='1.75rem' style={{ marginLeft: "0.25rem" }} />
				تعداد کاربران <span style={{ marginLeft: "0.5rem" }}>:</span> 
				<AnimatedCounter start={0} end={statistics.usersCount} duration={2.5} delay={1000} />
				</p>
				<p style={{fontSize: 15, color: '#11447D', fontWeight: "bold", marginLeft: "1rem", marginRight: "0.25rem" }}>
				<AiFillCheckSquare size='1.75rem' style={{ marginLeft: "0.25rem" }}/>
				تعداد وکلا <span style={{ marginLeft: "0.5rem" }}>:</span> 
				<AnimatedCounter start={0} end={statistics.lawyersCount} duration={2.5} delay={1000} />
				</p>
				<p style={{fontSize: 15, color: '#11447D', fontWeight: "bold", marginLeft: "1rem", marginRight: "0.25rem" }}>
				<AiFillCheckSquare size='1.75rem' style={{ marginLeft: "0.25rem" }}/>
				تعداد پرونده‌ها <span style={{ marginLeft: "0.5rem" }}>:</span>  
				<AnimatedCounter start={0} end={statistics.casesCount} duration={2.5} delay={1000} />
				</p>		
				<p style={{fontSize: 15, color: '#11447D', fontWeight: "bold", marginLeft: "1rem", marginRight: "0.25rem" }}>
				<AiFillCheckSquare size='1.75rem' style={{ marginLeft: "0.25rem" }}/>
				تعداد پیام‌ها <span style={{ marginLeft: "0.5rem" }}>:</span>  
				<AnimatedCounter start={0} end={statistics.messagesCount} duration={2.5} delay={1000} />
				</p>
			</div>
			}
					{window.innerWidth > 400 && 
					<Paper style={{ padding: '2rem'}}>
						<Column {...config} />
					</Paper>}
				</div>
				<Grid container spacing={5} sx={{ mb: '2rem' }} lg={10}>
					<Grid item xs={12} sm={6}>
						<Card sx={{ p: 2 }}>
							<h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>تعداد بازدید در روزهای هفته</h2>
							<Line {...lineConfig} />
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card sx={{ p: 2 }}>
							<h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>بیشینه شهرها با تعداد وکلای ثبت‌نام شده</h2>
							<Pie {...pieConfig} />
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card sx={{ p: 2 }}>
							<h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>تعداد تراکنش‌های مالی در ساعات شبانه‌روز</h2>
							<Area {...areaConfig} />
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card sx={{ p: 2 }}>
							<h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>تعداد وکلا براساس زمینه کاری</h2>
							<Rose {...roseConfig} />
						</Card>
					</Grid>
				</Grid>
			</div>

		</>
	);
}

export default VisitPannelStatistics
