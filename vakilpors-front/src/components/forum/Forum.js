import React, { useEffect, useState } from "react";
import useStateRef from "react-usestateref";
import { Helmet } from 'react-helmet-async';
import Moment from 'moment-jalaali';
import { Typography, IconButton, Badge, Grid, TextField, Button } from "@mui/material";
import { Delete } from '@mui/icons-material';
import Likes from "./utils/Likes";
import Comments from "./utils/Comments";
import { useAuth } from "../../context/AuthProvider";
import axios from 'axios';
import { BASE_API_ROUTE } from "../../Constants";
import jwt from 'jwt-decode';

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

const Forum = () => {
	const [thread, setThread] = useState("");
	const [threadList, setThreadList, refThreadList] = useStateRef([]);
	const [userId, setUserId, refUserId] = useStateRef("");
	const { getAccessToken } = useAuth();

	useEffect(() => {
		const getThreadList = async () => {
			const token = await getAccessToken();
			if(token){
				const tokenData = jwt(token);
				setUserId(tokenData.uid);
				const url = BASE_API_ROUTE + "Thread/GetThreadList";
				try {
					const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
					setThreadList(response.data.data);
					// console.log('threadList : ',response.data.data);
				} catch (error) {
					console.log('error in getting thread list : ',error);
				}
			}
		};
		getThreadList();
	}, []);

	const getThreadIndexByThreadId = (threadId) => {
		return refThreadList.current.findIndex((thread) => thread.id === threadId);
	};

    const createThread = async () => {
		const token = await getAccessToken();
		if(token){
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
				const response = await axios.post(url,data,{headers: {Authorization: `Bearer ${token}`}});
				setThreadList(prevThreadList => {
					const updatedThreadList = [...prevThreadList, response.data.data];
					return updatedThreadList;
				});
			} catch (err) {
				console.log('error in creating thread : ',err);
			}
		}
	};

	const handleDeleteThread = async (thread) => {
		const token = await getAccessToken();
		if(token){
			const url = BASE_API_ROUTE + `Thread/DeleteThread?threadId=${thread.id}`;
			try{
				const response = await axios.get(url,{headers: {Authorization: `Bearer ${token}`}});
				const newThreadList = [...refThreadList.current];
				newThreadList.splice(getThreadIndexByThreadId(thread.id), 1);
				setThreadList(newThreadList);
			} catch (err){
				console.log('error in deleteing thread : ,',err);
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if(thread.trim() != '')
			createThread();
		setThread("");
	};

	return (
		<>
		<Helmet>
			<title>فروم</title>
		</Helmet>
		<ThemeProvider theme={theme}>
    	<CacheProvider value={cacheRtl}>
		<Grid container width={'100%'} minHeight={'100vh'} paddingY={'30px'} backgroundColor={'#fffbf5'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
		<Grid container direction={'column'} width={{xs:'100%',md:'90%',lg:'80%'}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
			<Typography fontFamily={'shabnam'} fontSize={'18px'} sx={{mb:'30px'}}>یک تاپیک جدید ایجاد کنید یا تاپیک مورد نظر خود را از لیست پایین انتخاب کنید.</Typography>
			<Grid container direction={{xs:'column',md:'row'}} width={{xs:'97%',sm:'90%'}} backgroundColor={'#8eb1e5'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{mb:'50px', p:'20px', borderRadius:'25px', boxShadow:'0 0 1px 1px #444cc6'}}>
				<TextField label="تاپیک جدید" multiline rows={2} variant="outlined"
				value={thread}
				onChange={(e) => setThread(e.target.value)}
				inputProps={{ dir: "rtl", style: { fontFamily:"shabnam", fontSize: "15px", color:"black",} }}
				InputLabelProps={{ align: "right", dir: "rtl", style: { fontFamily:"shabnam", fontSize: "15px", color:"black", } }}
				sx={{ width: {xs:'100%',md:'80%'}, backgroundColor: 'rgba(255,255,255,0)',}}/>
				<Button variant="contained" onClick={handleSubmit} sx={{fontFamily:"shabnam", mt: {xs:'10px',md:'0'}}}>ساخت تاپیک جدید</Button>
			</Grid>
			<Grid container direction={'column'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
				{threadList.map((thread) => (
					<Grid container key={thread.id} direction={{xs:'column',sm:'row'}} width={{xs:'97%',sm:'90%'}} backgroundColor={'#8eb1e5'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{mb:'30px', p:'20px', borderRadius:'25px', boxShadow:'0 0 1px 1px #444cc6', 
					...(thread.userId == '1' && { backgroundColor:'lightskyblue',})}}>
						<Typography sx={{fontSize:'15px', fontFamily:'shabnam'}}>{thread.title}</Typography>
						<Grid display={'flex'} flexDirection={'row'} marginTop={{xs:'10px',sm:'0'}}>
							<Likes threadOrComment={thread} IsThread={true}/>
							<Badge badgeContent={thread.commentCount} color="primary">
								<Comments threadId={thread.id} userId={refUserId.current}/>
							</Badge>
							{(thread.userId == refUserId.current && !thread.hasAnswer) && 
							<IconButton onClick={() => handleDeleteThread(thread)}>
								<Delete sx={{color: '#0d6efd'}}/>
							</IconButton>}
						</Grid>
						<Grid display={'flex'} flexDirection={'row'} marginTop={{xs:'10px',sm:'0'}}>
							<Typography sx={{fontSize: '15px', fontFamily: 'shabnam', mr: '10px'}}>توسط {thread.user.name}</Typography>
							<Typography fontFamily={'shabnam'} fontSize={'14px'}>{Moment(thread.createDate).locale("fa").format('jYYYY/jM/jD') + ' ساعت ' + Moment(thread.createDate).format('HH:mm')}</Typography>
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

export default Forum;