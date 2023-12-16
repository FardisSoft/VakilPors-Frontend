import React, { useEffect, useState } from "react";
import useStateRef from "react-usestateref";
import { Helmet } from 'react-helmet-async';
import Moment from 'moment-jalaali';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import { Typography, 
	IconButton, 
	Badge, 
	Grid, 
	TextField, 
	Button, 
	Paper, 
	Table, 
	TableBody, 
	TableCell, 
	TableContainer, 
	TableHead, 
	TablePagination, 
	TableRow, 
	Card, 
	CardHeader, 
	CardMedia, 
	CardContent, 
	Divider,
	CardActions } from "@mui/material";
import { Delete, WorkspacePremium } from '@mui/icons-material';
import Likes from "./utils/Likes";
import Comments from "./utils/Comments";
import { useAuth } from "../../context/AuthProvider";
import axios from 'axios';
import { BASE_API_ROUTE } from "../../Constants";
import jwt from 'jwt-decode';
import { toast } from 'react-toastify';
import StyledButton from "../ButtonComponent";
import { FcSms, FcEditImage } from "react-icons/fc";
import Lottie from 'react-lottie';
import animationData from "../../assests/lotttie-animations/Animation-empty.json";
import ReactPaginate from 'react-paginate';
import './Forum.css';
import Flag from '@mui/icons-material/Flag';
import { Dialog, 
	DialogTitle,
	DialogContent,
	DialogActions,
	InputBase
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';


// mui rtl
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';


const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [rtlPlugin]
});
const theme = createTheme({
	direction: 'rtl',
	typography: {
		fontFamily: 'shabnam',
	}
});
// mui rtl

const StyledTooltip = styled (({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} arrow/>
	))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 300,
		fontSize: '15px',
		border: '1px solid #dadde9',
		fontFamily: 'shabnam',
	},
}));


const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};


const Forum = () => {
	const [thread, setThread] = useState("");
	const [threadList, setThreadList, refThreadList] = useStateRef([]);
	const [userId, setUserId, refUserId] = useStateRef("");
	const { getAccessToken } = useAuth();
	const [openReportDialog, setOpenReportDialog] = useState({});
	const [title, setTitle] = useState("");
	const [descriptionReport, setDescriptionReport] = React.useState('');
	const [reportDialogStatus, setReportDialogStatus] = useState({});


	// handling pagination and sort with this state
	// const [lazyParams, setLazyParams] = useState({
	// 	first: 0,
	// 	rows: 10,
	// 	page: 1,
	// 	sortField: sortField,
	// 	sortOrder: sortOrder,
	// });

	// for table
	const [currentPage, setCurrentPage] = useState(0);
	const pageSize = 2;

	const handlePageChange = (selectedObject) => {
		setCurrentPage(selectedObject.selected);
	};

	const pageCount = Math.ceil(threadList.length / pageSize);

	const currentThreads = threadList.slice(
		currentPage * pageSize,
		(currentPage + 1) * pageSize
	);


	useEffect(() => {
		const getThreadList = async () => {
			const token = await getAccessToken();
			if (token) {
				const tokenData = jwt(token);
				setUserId(tokenData.uid);
				const url = BASE_API_ROUTE + "Thread/GetThreadList";
				try {
					const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
					setThreadList(response.data.data);
					// console.log('threadList : ',response.data.data);
				} catch (error) {
					console.log('error in getting thread list : ', error);
				}
			}
		};
		getThreadList();
	}, []);

	const threadSearchHandler = async () => {
		console.log(`---------------------------- IN SEARCH HANDLER -------------------------`);

		let URL = BASE_API_ROUTE + "Thread/SearchThread";
	
		let params = {
			title: title,
			PageSize: 2,
			PageNumber: 1,
			Sort: null,
			IsAscending: null
		};
		// console.log(`The params are: ${params.roleId.code}`);
	
		const token = await getAccessToken();
		axios({
			method: "get",
			url: URL,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			params: params,
			})
			.then((res) => {
				let search_results = res.data.data.results;
				console.log(`Hereeeeeee`)
				for (let i = 0; i < search_results.length; i++)
				{
					search_results[i].user = {
								"userId": 1,
								"name": "Admin",
								"isLawyer": false,
								"isPremium": false
								}
				}
				setThreadList(res.data.data.results);
			})
			.catch((err) => {
				toast.error(
				"مشکلی در دریافت اطلاعات فروم‌ها وجود دارد. لطفا دوباره تلاش کنید.", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					rtl: true,
				}
				);
			});
	};
	const showErrorMessage = (message) => {
		toast.error(message, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			rtl: true,
		});
	};

	const getThreadIndexByThreadId = (threadId) => {
		return refThreadList.current.findIndex((thread) => thread.id === threadId);
	};

	const createThread = async () => {
		const token = await getAccessToken();
		if (token) {
			const url = BASE_API_ROUTE + "Thread/CreateThread";
			const data = {
				"id": 0,
				"title": thread.trim(),
				"description": "no description",
				"likeCount": 0,
				"userId": 0,
				"commentCount": 0,
				"createDate": new Date().toISOString(),
				"hasAnswer": false,
				"user": null,
			};
			try {
				const response = await axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
				setThreadList(prevThreadList => {
					const updatedThreadList = [...prevThreadList, response.data.data];
					return updatedThreadList;
				});
			} catch (err) {
				console.log('error in creating thread : ', err);
				if (err.response.data.hasOwnProperty('Message') && err.response.data.Message == 'This message is detected as a spam and can not be shown.') {
					showErrorMessage('نظر شما حاوی تبلیغات غیر مجاز است.');
				}
			}
		}
	};

	const handleDeleteThread = async (thread) => {
		const token = await getAccessToken();
		if (token) {
			const url = BASE_API_ROUTE + `Thread/DeleteThread?threadId=${thread.id}`;
			try {
				const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
				const newThreadList = [...refThreadList.current];
				newThreadList.splice(getThreadIndexByThreadId(thread.id), 1);
				setThreadList(newThreadList);
			} catch (err) {
				console.log('error in deleteing thread : ,', err);
			}
		}
	};

	const handleOpenReportDialog = (threadId) => {
		setOpenReportDialog((prevStatus) => ({
			...prevStatus,
			[threadId]: true,
		}));
	};
	
	const handleCloseReportDialog = (threadId) => {
		setOpenReportDialog((prevStatus) => ({
			...prevStatus,
			[threadId]: false,
		}));
	};

	const handleReport = (threadId) => {
		  setOpenReportDialog(true);
	  };
	const handleReportClick = (thread) => {
		handleSubmitReport(thread.id, thread);
	};
	  

	  const handleSubmitReport = (threadId, userId) => {
		const reportData = {
		  description: descriptionReport,
		  userId: userId,
		  commentId: threadId,
		};
	
		axios
		  .post('https://api.fardissoft.ir/Report/PostReport', reportData, {
			headers: {
			  'Content-Type': 'application/json',
			  'accept': '*/*',
			},
		  })
		  .then((response) => {
			console.log('Report submitted successfully', response);
			// Add any additional logic or UI updates upon successful submission
		  })
		  .catch((error) => {
			console.error('Failed to submit report', error);
			// Handle the error or display an error message to the user
		  });
	
		  handleCloseReportDialog(threadId);
		};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (thread.trim() != '')
			createThread();
		setThread("");
	};

	console.log("--------------------- The threads are: ", threadList);

	return (
		<>
			<Helmet>
				<title>فروم</title>
			</Helmet>
			<ThemeProvider theme={theme}>
				<CacheProvider value={cacheRtl}>
					<Grid container width={'100%'} minHeight={'100vh'} paddingY={'30px'} display={'flex'} justifyContent={'center'} alignItems={'center'} 
					sx={{ backgroundColor: '#dadde9' }}>
						<Grid container direction={'column'} width={{ xs: '100%', md: '90%', lg: '80%' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
							{/* <Grid sx={{boxShadow : 4 , padding : 0.5 , mb : 7 , borderRadius : 5, mt: -10}}  alignItems={'center'} display={'flex'} justifyContent={'center'}> */}
							<Typography fontFamily={'shabnam'} fontSize={'18px'} sx={{ mb: '30px' }} >
							یک تاپیک جدید ایجاد کنید یا تاپیک مورد نظر خود را از لیست پایین انتخاب کنید.
							<FcEditImage size={25}/>
							</Typography>
							{/* </Grid> */}
							<Grid container direction={{ xs: 'column', md: 'row' }} width={{ xs: '97%', sm: '90%' }} backgroundColor={'#8eb1e5'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: '50px', p: '20px', borderBottomLeftRadius: '20px',borderTopRightRadius : '20px', boxShadow: 4 }}>
								<TextField label="تاپیک جدید" multiline rows={2} variant="outlined"
									value={thread}
									onChange={(e) => setThread(e.target.value)}
									inputProps={{ dir: "rtl", style: { fontFamily: "shabnam", fontSize: "15px", color: "black" } }}
									InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily: "shabnam", fontSize: "15px", color: "black" } }}
									sx={{ width: { xs: '100%', md: '80%' }, backgroundColor: 'rgba(255,255,255,0)', borderRadius: '50px' }} />
								<StyledButton onClick={handleSubmit} style={{ fontFamily: "shabnam", marginTop: '1rem', width: '12rem' }}>ساخت تاپیک جدید</StyledButton>
							</Grid>
							
							{threadList.length === 0 && (
								<Lottie options={defaultOptions}
									height={400}
									width={400}
								/>
							)}
							{threadList.length > 0 && 
							<Grid container direction={'column'} width={'70%'} display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ boxShadow: 3, padding: 4, border: '5px solid #082640',
							backgroundColor: '#FCF2F1',
							borderRadius: '25px', }}>
								<Paper
									component="form"
									sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginBottom: "2rem" }}
									>
									<InputBase
										sx={{ ml: 1, flex: 1 }}
										placeholder="جست‌وجو در بین فرم‌ها"
										inputProps={{ 'aria-label': 'search google maps' }}
										value={title}
										onChange={(title) => {
											setTitle(title.target.value);
										}}
									/>
									<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={threadSearchHandler}>
										<SearchIcon />
									</IconButton>
								</Paper>
								<Grid>
									{currentThreads.map((thread) => (
									<Grid
										container
										key={thread.id}
										direction={{ xs: 'column', sm: 'row' }}
										// width={{ xs: '97%', sm: '90%' }}
										backgroundColor={'#8eb1e5'}
										display={'flex'}
										justifyContent={'space-between'}
										alignItems={'center'}
										sx={{
											width: '30rem',
											mb: '30px',
											p: '20px',
											borderRadius: '1rem',
											boxShadow: 4,
											height: '8rem',
											...(thread.userId == '1' && { backgroundColor: 'lightskyblue' }),
										}}
									>
									<Typography
										sx={{ fontSize: '20px', fontFamily: 'shabnam', fontWeight: 'bold', mt: '-4.5rem' }}
										>
										{thread.title}
									</Typography>
									{/* <Divider sx={{ height: '2rem', mt: '2rem', mr: '1rem' }}/> */}
									<Grid display={'flex'} flexDirection={'column'}>
										<Grid
											display={'flex'}
											flexDirection={'row'}
											justifyContent={'flex-end'}
											// marginTop={{ xs: '15px', sm: '0' }}
											sx={{ mr: '-1rem' }}
										>
										<Likes threadOrComment={thread} IsThread={true} />
										<Badge badgeContent={thread.commentCount} color="primary">
											<Comments
												threadId={thread.id}
												userId={refUserId.current}
											/>
										</Badge>

										<Tooltip title="ثبت تخلف کاربر">
											<IconButton onClick={() => handleOpenReportDialog(thread.id)}>
												<ReportRoundedIcon color="primary" />
											</IconButton>
										</Tooltip>
										<Dialog
											open={openReportDialog[thread.id] || false}
											onClose={() => handleCloseReportDialog(thread.id)}
										>										
										<DialogTitle>گزارش تخلف</DialogTitle>
										<DialogContent>
										<TextField
											label="توضیحات تخلف"
											multiline
											rows={4}
											variant="outlined"
											fullWidth
											value={descriptionReport}
											onChange={(event) => setDescriptionReport(event.target.value)}
											/>
										</DialogContent>
										<DialogActions>
											<Button onClick={() => handleCloseReportDialog(thread.id)} color="primary">
												لغو
											</Button>
											<Button onClick={() => handleSubmitReport(thread.id, thread.userId)} color="primary">
												ثبت گزارش
											</Button>
										</DialogActions>
										</Dialog>

										{thread.userId == refUserId.current &&
										!thread.hasAnswer && (
										<IconButton
										onClick={() => handleDeleteThread(thread)}
										>
										<Delete sx={{ color: '#0d6efd' }} />
										</IconButton>
										)}
										</Grid>
										<Grid
										display={'flex'}
										flexDirection={'row'}
										marginTop={'10px'}
										>
										<Typography
										sx={{
										fontSize: '15px',
										fontFamily: 'shabnam',
										mr: '5px',
										}}
										>
									توسط {thread.user.isLawyer && '(وکیل)'}{' '}
									{thread.user.name}
									</Typography>
									{thread.user.isPremium && (
									<StyledTooltip
									title={
									<React.Fragment>
									{'کاربر پرمیوم'}
									</React.Fragment>
									}
									>
									<WorkspacePremium
									sx={{
									color: 'purple',
									backgroundColor: 'gold',
									borderRadius: '12px',
									padding: '1px',
									width: '23px',
									mr: '10px',
									}}
									/>
									</StyledTooltip>
									)}
									<Typography
									fontFamily={'shabnam'}
									fontSize={'14px'}
									>
									{Moment(thread.createDate)
									.locale('fa')
									.format('jYYYY/jM/jD') +
									' ساعت ' +
									Moment(thread.createDate).format('HH:mm')}
									</Typography>
									</Grid>
									</Grid>
									</Grid>
									))}
									<ReactPaginate
										previousLabel={'قبلی'}
										nextLabel={'بعدی'}
										pageCount={pageCount}
										onPageChange={handlePageChange}
										containerClassName={'pagination'}
										pageClassName={'page-item'}
										pageLinkClassName={'page-link'}
										activeClassName={'active'}
										previousLinkClassName={'page-link'}
										nextLinkClassName={'page-link'}
									/>
									</Grid>
							</Grid>
							}
						</Grid>
					</Grid>
				</CacheProvider>
			</ThemeProvider>
		</>
	);
};

export default Forum;