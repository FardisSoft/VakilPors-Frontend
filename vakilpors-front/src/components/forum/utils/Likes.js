import React, { useEffect, useState } from "react";
import Badge from '@mui/material/Badge';
import { useAuth } from "../../../context/AuthProvider";
import axios from 'axios';
import { BASE_API_ROUTE } from "../../../Constants";

const Likes = ({ threadOrComment, IsThread }) => {

	const { getAccessToken } = useAuth();
	const [numberOfLikes, setNumberOfLikes] = useState(0);
	const [isCurrentUserLiked, setIsCurrentUserLiked] = useState(false);

	useEffect(() => {
		setNumberOfLikes(Number(threadOrComment.likeCount));
		setIsCurrentUserLiked(IsThread ? threadOrComment.isCurrentUserLikedThread : threadOrComment.isCurrentUserLikedComment);
	}, []);

	const handleLikeOrDisLike = async () => {
		const token = await getAccessToken();
		const lOrDLThread = isCurrentUserLiked ? 'UndoLikeThread' : 'LikeThread';
		const lOrDLComment = isCurrentUserLiked ? 'UndoLikeComment' : 'LikeComment';
		if(token){
			const url = BASE_API_ROUTE + (IsThread ? `Thread/${lOrDLThread}?threadId=${threadOrComment.id}` : `ThreadComment/${lOrDLComment}?commentId=${threadOrComment.id}`);
			try{
				const response = await axios.get(url,{headers: {Authorization: `Bearer ${token}`}});
				setNumberOfLikes(Number(response.data.data));
				setIsCurrentUserLiked(prevState => !prevState);
			} catch (error) {
				console.log('error in liking/disLiking : ',error);
		    }
		}
	};

	return (
		<Badge badgeContent={numberOfLikes} color="secondary" anchorOrigin={{vertical: 'top',horizontal: 'left',}}>
			<div className='likes__container' >
				<svg
					style={{
						...( isCurrentUserLiked &&{
							backgroundColor: 'lightgreen',
							 borderRadius: '15px', padding:'3px',
							color: 'green'
						})
					}}
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='currentColor'
					className='w-4 h-4 likesBtn'
					onClick={handleLikeOrDisLike}
				>
					<path d='M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z' />
				</svg>
			</div>
		</Badge>
	);
};

export default Likes;
