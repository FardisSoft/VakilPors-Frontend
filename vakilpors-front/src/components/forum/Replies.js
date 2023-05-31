import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { BASE_API_ROUTE } from "../../Constants";
import { useAuth } from "../../context/AuthProvider";
import Moment from 'moment-jalaali';
import { Typography, IconButton, Grid, TextField, Button } from "@mui/material";
import Likes from "./utils/Likes";
import { Delete, Edit, TaskAlt, WorkspacePremium } from '@mui/icons-material';
import { toast } from 'react-toastify';

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

	const fetchReplies = async () => {
		const token = await getAccessToken();
		if(token){
			const url = BASE_API_ROUTE + `Thread/GetThreadWithComments?threadId=${threadId}`;
			try{
				const response = await axios.get(url,{headers: {Authorization: `Bearer ${token}`}});
				// console.log('fetch reply response : ',response);
				setTitle(response.data.data.thread.title);
				setIsSelfThread(response.data.data.thread.user.userId === Number(userId));
				setReplyList(response.data.data.comments);
			} catch (error) {
				console.log('fetch reply error : ',error);
			}
		}
	}
	
	useEffect(() => {
	  fetchReplies();
	}, [threadId]);

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
            rtl:true,
        });
    };

	const addReply = async () => {
		const token = await getAccessToken();
		if(token){
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
			try{
				const response = await axios.post(url,data,{headers: {Authorization: `Bearer ${token}`}});
				fetchReplies();
			} catch (error) {
				console.log('add reply error : ',error);
				if(error.response.data.hasOwnProperty('Message') && error.response.data.Message == 'This message is detected as a spam and can not be shown.'){
					showErrorMessage('نظر شما حاوی تبلیغات غیر مجاز است.');
				}
			}
		}
	};

	const handleSubmitReply = (e) => {
		e.preventDefault();
		if(reply.trim() != "")
			addReply();
		setReply("");
	};

	const handleDeleteClick = async (commentId) => {
		const token = await getAccessToken();
		if(token){
			const url = BASE_API_ROUTE + `ThreadComment/DeleteComment?commentId=${commentId}`;
			try{
				const response = await axios.get(url,{headers: {Authorization: `Bearer ${token}`}});
				fetchReplies();
			} catch (err){
				console.log('error in deleteing comment : ,',err);
			}
		}
	};

	const handleEditReply = async () => {
		if(reply.trim() == ''){
			// alert('لطفا متن جدید کامنت را وارد کنید و سپس دکمه ویرایش را بزنید');
			return;
		}
		const token = await getAccessToken();
		if(token){
			const url = BASE_API_ROUTE + "ThreadComment/UpdateComment";
			const data = {
				"id": editActiveComment,
				"text": reply,
			};
			try{
				const response = await axios.put(url,data,{headers: {Authorization: `Bearer ${token}`}});
				fetchReplies();
				setIsEditActive(false);
				setReply('');
			} catch (error) {
				console.log('update reply error : ',error);
				if(error.response.data.hasOwnProperty('Message') && error.response.data.Message == 'This message is detected as a spam and can not be shown.'){
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
		if(token){
			const url = BASE_API_ROUTE + `ThreadComment/SetAsAnswer?commentId=${commentId}`;
			try{
				const response = await axios.get(url,{headers: {Authorization: `Bearer ${token}`}});
				fetchReplies();
			} catch (error) {
				console.log('error in setting as answer : ',error);
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
		<Grid container width={'100%'} minHeight={'100vh'} paddingY={'30px'} backgroundColor={'#fffbf5'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
		<Grid container direction={'column'} width={{xs:'100%',md:'90%',lg:'80%'}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
			<Typography fontFamily={'shabnam'} fontSize={'18px'} sx={{mb:'30px'}}>عنوان تاپیک : {title}</Typography>
			<Grid container direction={{xs:'column',md:'row'}} width={{xs:'97%',sm:'90%'}} backgroundColor={'#8eb1e5'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{mb:'50px', p:'20px', borderRadius:'25px', boxShadow:'0 0 1px 1px #444cc6'}}>
				<TextField label="نظر خود را بنویسید" multiline rows={4} variant="outlined"
				ref={inputRef}
				value={reply}
				onChange={(e) => setReply(e.target.value)}
				inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "15px", color:"black",} }}
				InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "15px", color:"black", } }}
				sx={{ width: {xs:'100%',md:'90%'}, backgroundColor: 'rgba(255,255,255,0)',}}/>
				<Grid display={'flex'} flexDirection={'column'}>
					<Button variant="contained" sx={{fontFamily:"shabnam", mt: {xs:'10px',md:'0'}}} onClick={isEditActive ? handleEditReply : handleSubmitReply}>{isEditActive ? 'ویرایش' : 'ارسال'}</Button>
					{isEditActive && <Button variant="contained" sx={{fontFamily:"shabnam", mt:'10px'}} onClick={handleCancelEdit}>انصراف</Button>}
				</Grid>				
			</Grid>
			<Grid container direction={'column'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
				{replyList.map((reply) => (
					<Grid container key={reply.id} direction={{xs:'column',sm:'row'}} width={{xs:'97%',sm:'90%'}} backgroundColor={'#8eb1e5'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{mb:'30px', p:'20px', borderRadius:'25px', boxShadow:'0 0 1px 1px #444cc6', 
					...(reply.user.userId == 1 && { backgroundColor:'gold',})}}>
						<Grid display={'flex'} flexDirection={'row'} marginTop={{xs:'10px',sm:'0'}}>
							{reply.isSetAsAnswer && <TaskAlt sx={{
									color:'green',
									backgroundColor:'lightgreen',
									borderRadius: '12px',
									padding:'1px',
									width: '27px',
									marginRight: '10px',
								...(reply.user.isLawyer && {
									color : 'lightyellow',
									backgroundColor:'gold',
								}),
								...(reply.user.isPremium && {
									color : 'purple',
									backgroundColor:'gold',
								}),
								}}/>}
							<Typography sx={{fontSize:'15px', fontFamily:'shabnam'}}>{reply.text}</Typography>
						</Grid>
						<Grid display={'flex'} flexDirection={'row'} marginTop={{xs:'15px',sm:'0'}}>
							<Likes threadOrComment={reply} IsThread={false}/>
							{(reply.user.userId === Number(userId) && !reply.isSetAsAnswer) && <>
								<IconButton size="large" onClick={() => handleEditClick(reply.id,reply.text)}>
									<Edit />
								</IconButton>
								<IconButton size="large" onClick={() => handleDeleteClick(reply.id)}>
									<Delete />
								</IconButton>
							</>}
							{(IsSelfThread && reply.user.userId !== Number(userId) && !reply.isSetAsAnswer) && 
								<IconButton size="large" onClick={() => handleSetAsAnswerClick(reply.id)}>
									<TaskAlt />
								</IconButton>}
						</Grid>
						<Grid display={'flex'} flexDirection={'row'} marginTop={{xs:'10px',sm:'0'}}>
							<Typography sx={{mr:'3px', fontSize: '15px', fontFamily: 'shabnam'}}>توسط {reply.user.name} </Typography>
							{reply.user.isPremium && <WorkspacePremium sx={{color:'purple',
									backgroundColor:'gold',
									borderRadius: '12px',
									padding:'1px',
									width: '23px',
									mr:'10px',}}/>}
							<Typography sx={{ml:'10px', fontSize:'13px', fontFamily:'shabnam'}}>{Moment(reply.createDate).locale("fa").format('jYYYY/jM/jD') + ' ساعت ' + Moment(reply.createDate).format('HH:mm')}</Typography>
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
