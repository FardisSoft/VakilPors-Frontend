import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_API_ROUTE } from "../Constants";
import { useAuth } from "../services/AuthProvider";

const Replies = () => {
	const [replyList, setReplyList] = useState([]);
	const [reply, setReply] = useState("");
	const [title, setTitle] = useState("");
	const navigate = useNavigate();
	const { threadId } = useParams();
	const { getAccessToken } = useAuth(); 

	const addReply = async () => {
		const token = await getAccessToken();
		if(token){
			const url = BASE_API_ROUTE + "ThreadComment/CreateComment";
			const data = {
					"id": 1000,
					"text": reply,
					"likeCount": 0,
					"userId": 23000,
					"threadId": Number(threadId)
				  };
			console.log('data : ',data);
			try{
				const response = await axios.post(url,data,{headers: {Authorization: `Bearer ${token}`}});
				console.log('add reply response : ',response);
			// setThreadList(response.data.data);
			} catch (error) {
				console.log('add reply error : ',error);
			}
		}
	};
	const handleSubmitReply = (e) => {
		e.preventDefault();
		addReply();
		setReply("");
	};

	const fetchReplies = async () => {
	  const config = {
		method: 'POST',
		url: 'https://api.fardissoft.ir/ThreadComment/GetCommentsForThread',
		headers: {
		  'Content-Type': 'application/json'
		},
		data: {
		  threadId
		}
	  };
	
	  try {
		const response = await axios(config);
		// setReplyList(response.data.replies);
		setTitle(response.data.title);
	  } catch (error) {
		console.error(error);
	  }
	}
	
	useEffect(() => {
	  fetchReplies();
	}, [threadId]);


	return (
		<main className='replies'>
			<h1 className='repliesTitle'>{title}</h1>

			<form className='modal__content' onSubmit={handleSubmitReply}>
				<label htmlFor='reply' style={{fontFamily:'calibri'}}>به این موضوع نظر بدهید</label>
				<textarea
					rows={5}
					value={reply}
					onChange={(e) => setReply(e.target.value)}
					type='text'
					name='reply'
					className='modalInput'
				/>

				<button className='modalBtn' style={{fontFamily:'calibri'}}>ارسال</button>
			</form>

			<div className='thread__container' style={{fontFamily:'calibri'}}>
				{replyList.map((reply) => (
					<div className='thread__item'>
						<p>{reply.text}</p>
						<div className='react__container'>
							<p style={{ opacity: "0.5" }}>by {reply.name}</p>
						</div>
					</div>
				))}
			</div>
		</main>
	);
};

export default Replies;
