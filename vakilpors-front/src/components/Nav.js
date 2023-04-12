import React from "react";
import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

const Nav = () => {
	const navigate = useNavigate();

	const onNotificationClick = (notification) =>
		navigate(notification.cta.data.url);

	const signOut = () => {
		localStorage.removeItem("_id");
		navigate("/");
	};
	return (
		<nav className='navbar' >
			<h2 style={{fontFamily:'calibri'}} >فروم وکیل‌پرس</h2>
		</nav>
	);
};

export default Nav;
