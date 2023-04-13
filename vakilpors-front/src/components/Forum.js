import React, { useEffect, useState } from "react";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";
import { useNavigate } from "react-router-dom";
import '../css/forum.css';
import { useAuth } from "../services/AuthProvider";
import axios from 'axios';
import { BASE_API_ROUTE } from "../Constants";


const Forum = () => {
	const [thread, setThread] = useState("");
	const [threadList, setThreadList] = useState([]);
	const navigate = useNavigate();
	const { getAccessToken } = useAuth();

	useEffect(() => {
		const checkUser = () => {
			if (!localStorage.getItem("_id")) {
				// navigate("/");
			} else {
				fetch("https://api.fardissoft.ir/Thread/GetThreadList")
					.then((res) => res.json())
					.then((data) => setThreadList(data.threads))
					.catch((err) => console.error(err));
			}
		};
		checkUser();
	}, [navigate]);

    const createThread = async () => {
		const url = BASE_API_ROUTE + 'Thread/CreateThread';
		const token = getAccessToken();
		console.log('token gerefte shode : ',token);
		if(token){
			try {
				const response = await axios.post(url, {}, {headers: {Authorization: `Bearer ${token}`}});
				console.log('ba token response : ',response);
				setThreadList(response.data.threads);
			} catch (error) {
				console.log('ba token error : ',error);
			}
		}
		else{
			// go to login
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		createThread();
		setThread("");
	};

	return (
		<>
			{/* <Nav /> */}
			<main className='home' style={{background:'#84a0a0'}}>
					<h2 className='homeTitle' style={{fontFamily:'calibri'}}>یک موضوع جدید ایجاد کنید یا موضوع مورد نظر خود را انتخاب کنید</h2>
					<form className='homeForm' onSubmit={handleSubmit}>
						<div className='home__container' >
							<label htmlFor='thread'style={{fontFamily:'calibri'}}>موضوع</label>
							<input
								type='text'
								name='thread'
								required
								value={thread}
								onChange={(e) => setThread(e.target.value)}
							/>
						</div>
						<button className='homeBtn' style={{fontFamily:'calibri'}}>ساخت موضوع جدید</button>
					</form>
				
				<div className='thread__container' style={{fontFamily:'calibri'}}>
					{threadList.map((thread) => (
						<div className='thread__item' key={thread.id}>
							<p>{thread.title}</p>
							<div className='react__container'>
								<Likes
									numberOfLikes={thread.likes.length}
									threadId={thread.id}
								/>
								<Comments
									numberOfComments={thread.replies.length}
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