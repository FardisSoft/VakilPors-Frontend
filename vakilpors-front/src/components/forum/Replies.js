import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { BASE_API_ROUTE } from "../../Constants";
import { useAuth } from "../../context/AuthProvider";
import moment from 'moment';
import { Typography, IconButton } from "@mui/material";
import Likes from "./utils/Likes";
import { Delete, Edit, TaskAlt } from '@mui/icons-material';

const Replies = () => {
	const [replyList, setReplyList] = useState([]);
	const [reply, setReply] = useState("");
	const [title, setTitle] = useState("");
	const [IsSelfThread, setIsSelfThread] = useState(false);
	const { threadId, userId } = useParams();
	const { getAccessToken } = useAuth(); 

	const addReply = async () => {
		const token = await getAccessToken();
		if(token){
			const url = BASE_API_ROUTE + "ThreadComment/CreateComment";
			const data = {
					"id": 0, // It doesn't matter what it is
					"text": reply,
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
			}
		}
	};

	const handleSubmitReply = (e) => {
		e.preventDefault();
		if(reply.trim() != "")
			addReply();
		setReply("");
	};

	const fetchReplies = async () => {
		const token = await getAccessToken();
		if(token){
			const url = BASE_API_ROUTE + `Thread/GetThreadWithComments?threadId=${threadId}`;
			console.log(url);
			try{
				const response = await axios.get(url,{headers: {Authorization: `Bearer ${token}`}});
				console.log('fetch reply response : ',response);
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

	const handleEditClick = async (commentId) => {
		if(reply.trim() == ''){
			alert('لطفا متن جدید نظر را وارد کنید و سپس دکمه ویرایش را بزنید')
			return;
		}
		const token = await getAccessToken();
		if(token){
			const url = BASE_API_ROUTE + "ThreadComment/UpdateComment";
			const data = {
				"id": ''+commentId, // It doesn't matter what it is
				"text": reply,
				"likeCount": 0, // It doesn't matter what it is
				"userId": userId, // It doesn't matter what it is
				"threadId": Number(threadId),
				"createDate": new Date().toISOString(),
				"isSetAsAnswer": false,
				"user": {
					"userId": userId,
					"name": "",
					"isLawyer": false,
					"isPremium": false
				}
			};
			try{
				const response = await axios.put(url,data,{headers: {Authorization: `Bearer ${token}`}});
				console.log('update reply response : ',response);
				fetchReplies();
			} catch (error) {
				console.log('update reply error : ',error);
			}
		}
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
		<main className='replies'>
			<h1 className='repliesTitle'>{title}</h1>

			<form className='modal__content'>
				<label htmlFor='reply'>به این موضوع نظر بدهید</label>
				<textarea
					rows={5}
					value={reply}
					onChange={(e) => setReply(e.target.value)}
					type='text'
					name='reply'
					className='modalInput'
				/>
				<button className='modalBtn' onClick={handleSubmitReply}>ارسال</button>
			</form>

			<div className='thread__container'>
				{replyList.map((reply) => (
					<div className='thread__item' key={reply.id}>
						{reply.isSetAsAnswer && <TaskAlt sx={{
							color:'green',
						...(reply.user.isLawyer && {
							color : 'red',
							// color: 'grey',
						  }),
						}}/>}
						<p style={{color: '#071e22'}}>{reply.text}</p>
						<div className='react__container'>
							<p style={{ opacity: "0.5" }}>توسط {reply.user.name}</p>
							<Typography sx={{fontSize:'10px'}}>{moment(reply.createDate).format('MMM D YYYY, h:mm A')}</Typography>
							<Likes threadOrComment={reply} IsThread={false}/>
							{(reply.user.userId === Number(userId) && !reply.isSetAsAnswer) && <>
								<IconButton size="small" onClick={() => handleEditClick(reply.id)}>
									<Edit />
								</IconButton>
								<IconButton size="small" onClick={() => handleDeleteClick(reply.id)}>
									<Delete />
								</IconButton>
							</>}
							{(IsSelfThread && reply.user.userId !== Number(userId) && !reply.isSetAsAnswer) && 
								<IconButton size="small" onClick={() => handleSetAsAnswerClick(reply.id)}>
									<TaskAlt />
								</IconButton>}
						</div>
					</div>
				))}
			</div>
		</main>
	);
};

export default Replies;
