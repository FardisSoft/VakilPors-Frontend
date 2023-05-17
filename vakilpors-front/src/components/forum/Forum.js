import React, { useEffect, useState } from "react";
import useStateRef from "react-usestateref";
import { Helmet } from 'react-helmet-async';
import Moment from 'moment-jalaali';
import "moment/locale/fa";
import { Typography, IconButton, Badge } from "@mui/material";
import { Delete } from '@mui/icons-material';
import '../../css/forum.css';
import Likes from "./utils/Likes";
import Comments from "./utils/Comments";
import { useAuth } from "../../context/AuthProvider";
import axios from 'axios';
import { BASE_API_ROUTE } from "../../Constants";
import jwt from 'jwt-decode';

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
			<div className='home'>
				<h2 className='homeTitle'>یک موضوع جدید ایجاد کنید یا موضوع مورد نظر خود را از لیست پایین انتخاب کنید</h2>
				<form className='homeForm'>
					<div className='home__container'>
						<label htmlFor='thread'>موضوع جدید <br/></label>
						<input
							type='text'
							name='thread'
							required
							value={thread}
							onChange={(e) => setThread(e.target.value)}
						/>
					</div>
					<button className='homeBtn' onClick={handleSubmit}>ساخت موضوع جدید</button>
				</form>
				<div className='thread__container'>
					{threadList.map((thread) => (
						<div className='thread__item' key={thread.id}>
							<div className='react__container'>
								<p style={{color: '#071e22'}}>{thread.title}</p>
							</div>
							<div className='react__container_1'>
								<Likes
									threadOrComment={thread}
									IsThread={true}
								/>
								<Badge badgeContent={thread.commentCount} color="primary">
									<Comments
										threadId={thread.id}
										userId={refUserId.current}
									/>
								</Badge>
								{(thread.userId == refUserId.current && !thread.hasAnswer) && 
								<IconButton onClick={() => handleDeleteThread(thread)}>
									<Delete sx={{color: '#0d6efd'}}/>
								</IconButton>}
								<p>
									تاریخ ایجاد
									<Typography fontFamily={'shabnam'} fontSize={'14px'}>
										{Moment(thread.createDate).locale("fa").format('jYYYY/jM/jD') + ' ساعت ' + Moment(thread.createDate).format('HH:mm')}
									</Typography>
									ایجاد شده توسط
									<Typography sx={{fontSize: '15px', fontFamily: 'shabnam', ml: '10px'}}>{thread.user.name} </Typography>
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Forum;