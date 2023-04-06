import React, { useState } from "react";

const Replies = () => {
	const [replyList, setReplyList] = useState([]);
	const [reply, setReply] = useState("");
	const [title, setTitle] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();

    const addReply = () => {
		fetch("http://localhost:3000/api/create/reply", {
			method: "POST",
			body: JSON.stringify({
				id,
				userId: localStorage.getItem("_id"),
				reply,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
    }
    const handleSubmitReply = (e) => {
        e.preventDefault();
        console.log({ reply });
        setReply("");
    };

    return (
        <main className='replies'>
            <form className='modal__content' onSubmit={handleSubmitReply}>
                <label htmlFor='reply'>Reply to the thread</label>
                <textarea
                    rows={5}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    type='text'
                    name='reply'
                    className='modalInput'
                />

                <button className='modalBtn'>SEND</button>
            </form>
        </main>
    );
};

export default Replies;