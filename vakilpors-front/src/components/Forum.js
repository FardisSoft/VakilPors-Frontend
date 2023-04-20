import React, { useEffect, useState } from "react";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";
import { useNavigate } from "react-router-dom";
import '../css/forum.css';
import { useAuth } from "../services/AuthProvider";
import axios from 'axios';
import { BASE_API_ROUTE } from "../Constants";
import jwt from 'jwt-decode';
import useStateRef from "react-usestateref";
import { Helmet } from 'react-helmet-async';

const Forum = () => {
	const [thread, setThread] = useState("");
	const [threadList, setThreadList, refThreadList] = useStateRef([]);
	const [userId, setUserId, refUserId] = useStateRef("");
	const navigate = useNavigate();
	const { getAccessToken } = useAuth();

	useEffect(() => {
		const checkUser = async () => {
			const token = await getAccessToken();
			if(token){
				const tokenData = jwt(token);
				setUserId(tokenData.uid);
				const url = BASE_API_ROUTE + "Thread/GetThreadList";
				try {
					const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
					setThreadList(response.data.data);
					console.log('threadList : ',response.data.data);
				} catch (error) {
					console.log('error : ',error);
				}
			}
		};
		checkUser();
	}, [navigate]);

    const createThread = async () => {
		const token = await getAccessToken();
		if(token){
			const url = BASE_API_ROUTE + "Thread/CreateThread";
			const data = {
				"id": refThreadList.current.length,
				"title": thread,
				"description": "no description",
				"likeCount": 0,
				"userId": refUserId.current,
      			"commentCount": 0
			};
			const response = await axios.post(url,data,{headers: {Authorization: `Bearer ${token}`}});
			// setThreadList(response.data.data);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		createThread();
		setThread("");
	};

	return (
		<>
			<Helmet>
              <title>Forum</title>
          	</Helmet>
			{/* <Nav /> */}
			<main className='home'>
					<h2 className='homeTitle'>یک موضوع جدید ایجاد کنید یا موضوع مورد نظر خود را از لیست پایین انتخاب کنید</h2>
					<form className='homeForm' onSubmit={handleSubmit}>
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
						<button className='homeBtn' onClick={createThread}>ساخت موضوع جدید</button>
					</form>
				
				<div className='thread__container'>
					{threadList.map((thread) => (
						<div className='thread__item' key={thread.id}>
							<p>{thread.title}</p>
							<div className='react__container'>
								<Likes
									thread={thread}
									user={refUserId.current}
								/>
								<Comments
									// thread={thread}
									// numberOfComments={thread.replies.length} // does not supported by backend
									threadId={thread.id}
									title={thread.title}
								/>
							</div>
						</div>
					))}
				</div>
			</main>
		</>
	);
};

export default Forum;