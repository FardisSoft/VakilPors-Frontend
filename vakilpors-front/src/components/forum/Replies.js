import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { BASE_API_ROUTE } from "../../Constants";
import { useAuth } from "../../context/AuthProvider";
import moment from 'moment';
import { Typography, IconButton, Grid } from "@mui/material";
import Likes from "./utils/Likes";
import { Delete, Edit, TaskAlt } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const showSuccesMessage = (message) => {
        toast.success(message, {
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
		<div className='replies'>
			<h1 className='repliesTitle'>{title}</h1>
			<div className='modal__content'>
				<label htmlFor='reply'>به این موضوع نظر بدهید</label>
				<textarea
					ref={inputRef}
					rows={5}
					value={reply}
					onChange={(e) => setReply(e.target.value)}
					type='text'
					name='reply'
					className='modalInput'
				/>
				<Grid flexDirection={'row'}>
					<button style={{display:'inline', marginLeft:'20px'}} className='modalBtn' onClick={isEditActive ? handleEditReply : handleSubmitReply}>{isEditActive ? 'ویرایش' : 'ارسال'}</button>
					{isEditActive && <button style={{display:'inline'}} className='modalBtn' onClick={handleCancelEdit}>انصراف</button>}
				</Grid>
			</div>
			<div className='thread__container'>
				{replyList.map((reply) => (
					<div className='thread__item' key={reply.id}>
						{/* {console.log(reply.user.isPremium)} */}
						<p style={{color: '#071e22'}}>
							{reply.isSetAsAnswer && <TaskAlt sx={{
								color:'green',
								backgroundColor:'lightgreen',
								borderRadius: '12px',
								padding:'1px',
								width: '27px',
								marginLeft: '10px',
							...(reply.user.isLawyer && {
								color : 'lightyellow',
								backgroundColor:'gold',
							}),
							//   ...(reply.user.isPremium && {
							// 	color : 'purple',
							// 	backgroundColor:'gold',
							//   }),
							}}/>}
							{reply.text}
						</p>
						<div className='react__container_1_1'>
							<Likes
								threadOrComment={reply}
								IsThread={false}
							/>
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
							<div className="react__container">
								<p style={{color:'#071e22'}}> 
									<Typography sx={{marginRight:'5px', fontSize: '15px', fontFamily: 'shabnam', ml: '10px'}}>توسط {reply.user.name} </Typography>
								</p>
								<Typography sx={{fontSize:'10px'}}>{moment(reply.createDate).format('MMM D YYYY, h:mm A')}</Typography>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Replies;
