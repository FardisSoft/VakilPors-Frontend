import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { BASE_API_ROUTE } from "../../Constants";
import { useAuth } from "../../context/AuthProvider";
import Moment from 'moment-jalaali';
import { Typography, IconButton, Grid, TextField, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Likes from "./utils/Likes";
import { Delete, Edit, TaskAlt, WorkspacePremium } from '@mui/icons-material';
import { toast } from 'react-toastify';
import backgroundbb from "../../assests/images/back.png";
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	InputBase
} from '@mui/material';


// mui rtl
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
	direction: 'rtl',
});
// mui rtl

const StyledTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} arrow />
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

const Replies = () => {
	const [replyList, setReplyList] = useState([]);
	const [reply, setReply] = useState("");
	const [title, setTitle] = useState("");
	const [IsSelfThread, setIsSelfThread] = useState(false);
	const inputRef = useRef(null);
	const [isEditActive, setIsEditActive] = useState(false);
	const [editActiveComment, setEditActiveComment] = useState('');
	const { threadId, userId } = useParams();
	const { getAccessToken } = useAuth();
	const [openReportDialog, setOpenReportDialog] = useState({});
	const [reportDialogStatus, setReportDialogStatus] = useState({});
	const [descriptionReport, setDescriptionReport] = React.useState('');
	const [currentStep, setCurrentStep] = useState(1);

	const handleOpenReportDialog = (threadId) => {
		setCurrentStep(1);
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
	
	const handleChoiceClick = (choice) => {
		setDescriptionReport(choice +" "+ descriptionReport);
		setCurrentStep(2);
	  };
	
	
	const handleReport = (threadId) => {
		setOpenReportDialog(true);
	};
	const handleReportClick = (thread) => {
		handleSubmitReport(thread.id, thread);
	};



	const fetchReplies = async () => {
		const token = await getAccessToken();
		if (token) {
			const url = BASE_API_ROUTE + `Thread/GetThreadWithComments?threadId=${threadId}`;
			try {
				const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
				// console.log('fetch reply response : ',response);
				setTitle(response.data.data.thread.title);
				setIsSelfThread(response.data.data.thread.user.userId === Number(userId));
				setReplyList(response.data.data.comments);
				console.log("replyList :::: ", replyList);
			} catch (error) {
				console.log('fetch reply error : ', error);
			}
		}
	}

	useEffect(() => {
		console.log("replyList :::: ", replyList);
	}, [replyList]);

	useEffect(() => {
		const fetchReplies = async () => {
			const token = await getAccessToken();
			if (token) {
				const url = BASE_API_ROUTE + `Thread/GetThreadWithComments?threadId=${threadId}`;
				try {
					const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
					// console.log('fetch reply response : ',response);
					setTitle(response.data.data.thread.title);
					setIsSelfThread(response.data.data.thread.user.userId === Number(userId));
					setReplyList(response.data.data.comments.results);
					console.log("replyList :::: ", replyList);
				} catch (error) {
					console.log('fetch reply error : ', error);
				}
			}
		}

		fetchReplies();

	}, [threadId]);




	////////////////////////////////////////////////////////////////////////////////////////////////////////
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
				showSuccesMessage("گزارش با موفقیت ثبت شد.");
				setDescriptionReport(null);
				// Add any additional logic or UI updates upon successful submission
			})
			.catch((error) => {
				console.error('Failed to submit report', error);
				showErrorMessage("ارسال گزارش با خطا مواجه شد.")
				// Handle the error or display an error message to the user
			});

		handleCloseReportDialog(threadId);
	};

	////////////////////////////////////////////////////////////////////////////////////////////////////////


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


	const showSuccesMessage = (payam) => {
		toast.success(payam, {
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


	const addReply = async () => {
		const token = await getAccessToken();
		if (token) {
			const url = BASE_API_ROUTE + "ThreadComment/CreateComment";
			const data = {
				"id": 0, // It doesn't matter what it is
				"text": reply.trim(),
				"likeCount": 0, // It doesn't matter what it is
				"userId": 0, // It doesn't matter what it is
				"threadId": Number(threadId),
				"createDate": new Date().toISOString(),
				"isSetAsAnswer": false,
				"user": null
			};
			try {
				const response = await axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
				fetchReplies();
			} catch (error) {
				console.log('add reply error : ', error);
				if (error.response.data.hasOwnProperty('Message') && error.response.data.Message == 'This message is detected as a spam and can not be shown.') {
					showErrorMessage('نظر شما حاوی تبلیغات غیر مجاز است.');
				}
				if (error.response.data.hasOwnProperty("Message") && error.response.data.Message == "The new comment should be sent within 2 minutes after the last comment") {
					showErrorMessage("ارسال کامنت جدید باید حداقل 2 دقیقه پس از کامنت قبلی باشد.");
				}
			}
		}
	};

	const handleSubmitReply = (e) => {
		e.preventDefault();
		if (reply.trim() != "")
			addReply();
		setReply("");
	};

	const handleDeleteClick = async (commentId) => {
		const token = await getAccessToken();
		if (token) {
			const url = BASE_API_ROUTE + `ThreadComment/DeleteComment?commentId=${commentId}`;
			try {
				const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
				fetchReplies();
			} catch (err) {
				console.log('error in deleteing comment : ,', err);
			}
		}
	};

	const handleEditReply = async () => {
		if (reply.trim() == '') {
			return;
		}
		const token = await getAccessToken();
		if (token) {
			const url = BASE_API_ROUTE + "ThreadComment/UpdateComment";
			const data = {
				"id": editActiveComment,
				"text": reply,
			};
			try {
				const response = await axios.put(url, data, { headers: { Authorization: `Bearer ${token}` } });
				fetchReplies();
				setIsEditActive(false);
				setReply('');
			} catch (error) {
				console.log('update reply error : ', error);
				if (error.response.data.hasOwnProperty('Message') && error.response.data.Message == 'This message is detected as a spam and can not be shown.') {
					showErrorMessage('نظر شما حاوی تبلیغات غیر مجاز است.');
				}
			}
		}
	};

	const handleCancelEdit = () => {
		setIsEditActive(false);
		setReply('');
	};

	const handleEditClick = (commentId, text) => {
		setReply(text);
		setIsEditActive(true);
		setEditActiveComment(commentId);
		inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	const handleSetAsAnswerClick = async (commentId) => {
		const token = await getAccessToken();
		if (token) {
			const url = BASE_API_ROUTE + `ThreadComment/SetAsAnswer?commentId=${commentId}`;
			try {
				const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
				fetchReplies();
			} catch (error) {
				console.log('error in setting as answer : ', error);
			}
		}
	};

	return (
		<>
			<Helmet>
				<title>بحث در تاپیک</title>
			</Helmet>
			<ThemeProvider theme={theme}>
				<CacheProvider value={cacheRtl}>
					<Grid container width={'100%'} minHeight={'100vh'} paddingY={'30px'} backgroundColor={'#fffbf5'} display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ background: `url(${backgroundbb})` }} >
						<Grid container direction={'column'} width={{ xs: '100%', md: '90%', lg: '80%' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
							<Typography fontFamily={'shabnam'} fontSize={'18px'} sx={{ mb: '30px' }}>عنوان تاپیک : {title}</Typography>
							<Grid container direction={{ xs: 'column', md: 'row' }} width={{ xs: '97%', sm: '90%' }} backgroundColor={'#8eb1e5'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: '50px', p: '20px', borderBottomLeftRadius: '20px', borderTopRightRadius: '20px', boxShadow: 4 }}>
								<TextField label="نظر خود را بنویسید" multiline rows={4} variant="outlined"
									ref={inputRef}
									value={reply}
									onChange={(e) => setReply(e.target.value)}
									inputProps={{ dir: "rtl", style: { fontFamily: "shabnam", fontSize: "15px", color: "black", } }}
									InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily: "shabnam", fontSize: "15px", color: "black", } }}
									sx={{ width: { xs: '100%', md: '90%' }, backgroundColor: 'rgba(255,255,255,0)', }} />
								<Grid display={'flex'} flexDirection={'column'}>
									<Button variant="contained" sx={{ fontFamily: "shabnam", mt: { xs: '10px', md: '0' } }} onClick={isEditActive ? handleEditReply : handleSubmitReply}>{isEditActive ? 'ویرایش' : 'ارسال'}</Button>
									{isEditActive && <Button variant="contained" sx={{ fontFamily: "shabnam", mt: '10px' }} onClick={handleCancelEdit}>انصراف</Button>}
								</Grid>
							</Grid>

							<Grid container direction={'column'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ boxShadow: 3, padding: 4, borderRadius: 10 }}>
								{Array.isArray(replyList) && replyList.map((reply, index) => (
									<Grid container key={index} direction={{ xs: 'column', sm: 'row' }} width={{ xs: '97%', sm: '90%' }} backgroundColor={'#8eb1e5'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{
										mb: '30px', p: '20px', borderRadius: '25px', boxShadow: 4,
										...(reply.user.userId == 1 && { backgroundColor: 'lightskyblue', })
									}}>
										<Grid display={'flex'} flexDirection={'row'} marginTop={{ xs: '10px', sm: '0' }}>
											{reply.isSetAsAnswer &&
												<StyledTooltip title={<React.Fragment>{'تایید شده به عنوان پاسخ توسط نگارنده تاپیک ، این پاسخ یک '}
													{reply.user.isLawyer ? 'وکیل' : 'کاربر'}{reply.user.isPremium && ' پرمیوم'}{' است.'}</React.Fragment>}>
													<TaskAlt sx={{
														color: 'green',
														backgroundColor: 'lightgreen',
														borderRadius: '12px',
														padding: '1px',
														width: '27px',
														marginRight: '10px',
														...(reply.user.isLawyer && {
															color: 'lightyellow',
															backgroundColor: 'gold',
														}),
														...(reply.user.isPremium && {
															color: 'purple',
															backgroundColor: 'gold',
														}),
													}} />
												</StyledTooltip>}
											<Typography sx={{ fontSize: '15px', fontFamily: 'shabnam' }}>{reply.text}</Typography>
										</Grid>
										<Grid display={'flex'} flexDirection={'column'} >
											<Grid display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} marginTop={{ xs: '15px', sm: '0' }}>
												<Likes threadOrComment={reply} IsThread={false} />
												{(reply.user.userId === Number(userId) && !reply.isSetAsAnswer) && <>
													<IconButton size="large" onClick={() => handleEditClick(reply.id, reply.text)}>
														<Edit />
													</IconButton>
													<IconButton size="large" onClick={() => handleDeleteClick(reply.id)}>
														<Delete />
													</IconButton>


													<Tooltip title="ثبت تخلف کاربر">
														<IconButton onClick={() => handleOpenReportDialog(reply.id)}>
															<ReportRoundedIcon color="primary" />
														</IconButton>
													</Tooltip>

													<Dialog
													open={openReportDialog[reply.id] || false}
													onClose={() => handleCloseReportDialog(reply.id)}
												>
												{currentStep === 1 && (
													<>
													<DialogTitle sx={{fontFamily:"shabnam"}}>گزارش تخلف - مرحله 1</DialogTitle>
													<DialogContent>
													<DialogContent>
													<Typography sx={{fontFamily:"shabnam"}}>لطفاً دسته‌بندی مورد نظر خود را انتخاب کنید:</Typography>


													<RadioGroup  >
														<FormControlLabel onClick={() => handleChoiceClick('محتوا شامل موارد غیراخلاقی است. ')} value="option1" control={<Radio />} label="محتوا شامل کلمات غیراخلاقی است" />
														<FormControlLabel onClick={() => handleChoiceClick('محتوا شامل موارد خلاف قانون کشور است. ')} value="option2" control={<Radio />} label="محتوا شامل موارد خلاف قانون کشور است" />
														<FormControlLabel onClick={() => handleChoiceClick('محتوا بی‌ربط است. ')} value="option3" control={<Radio />} label="گزارش نامناسب" />
														</RadioGroup>

														</DialogContent>
													</DialogContent>
													<DialogActions>
														<Button sx={{fontFamily:"shabnam"}} onClick={() => handleCloseReportDialog(reply.id)} color="primary">
														لغو
														</Button>
													</DialogActions>
													</>
												)}
												{currentStep === 2 && (
													<>
													<DialogTitle sx={{fontFamily:"shabnam"}}>گزارش تخلف - مرحله 2</DialogTitle>
													<DialogContent sx={{fontFamily:"shabnam"}}>
													<TextField
														sx={{ fontFamily: "shabnam", width: "100%" }}
														label="توضیحات تخلف"
														multiline
														rows={8}
														variant="outlined"
														fullWidth
														value={descriptionReport}
														onChange={(event) => setDescriptionReport(event.target.value)}
														/>
													</DialogContent>
													<DialogActions>
														<Button sx={{fontFamily:"shabnam"}} onClick={() => setCurrentStep(1)} color="primary">
														مرحله قبل
														</Button>
														<Button sx={{fontFamily:"shabnam"}} onClick={() => handleSubmitReport(reply.id, reply.userId)} color="primary">
														ثبت گزارش
														</Button>
													</DialogActions>
													</>
												)}
												</Dialog>






												</>}
												{(IsSelfThread && reply.user.userId !== Number(userId) && !reply.isSetAsAnswer) &&
													<StyledTooltip title={<React.Fragment>{'تایید به عنوان پاسخ مناسب'}</React.Fragment>}>
														<IconButton size="large" onClick={() => handleSetAsAnswerClick(reply.id)}>
															<TaskAlt />
														</IconButton>
													</StyledTooltip>}
											</Grid>
											<Grid display={'flex'} flexDirection={'row'} marginTop={'10px'}>
												<Typography sx={{ mr: '3px', fontSize: '15px', fontFamily: 'shabnam' }}>توسط {reply.user.name} </Typography>
												{reply.user.isPremium &&
													<StyledTooltip title={<React.Fragment>{'کاربر پرمیوم'}</React.Fragment>}>
														<WorkspacePremium sx={{
															color: 'purple',
															backgroundColor: 'gold',
															borderRadius: '12px',
															padding: '1px',
															width: '23px',
															mr: '10px',
														}} />
													</StyledTooltip>}
												<Typography sx={{ ml: '10px', fontSize: '13px', fontFamily: 'shabnam' }}>{Moment(reply.createDate).locale("fa").format('jYYYY/jM/jD') + ' ساعت ' + Moment(reply.createDate).format('HH:mm')}</Typography>
											</Grid>
										</Grid>
									</Grid>
								))}
							</Grid>
						</Grid>
					</Grid>
				</CacheProvider>
			</ThemeProvider>
		</>
	);
};

export default Replies;
