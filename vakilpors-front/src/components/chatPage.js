import React, { useState, useEffect, useRef } from 'react';
import useStateRef from 'react-usestateref';
import { Avatar, Box, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, InputAdornment, Typography } from '@mui/material';
import { Delete, Edit, Send, AttachFile, DownloadForOfflineOutlined, DoneAll } from '@mui/icons-material';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import * as signalR from '@microsoft/signalr';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BASE_API_ROUTE } from '../Constants';
import axios from 'axios';
import jwt from 'jwt-decode';

const ChatPage = () => {
  const [selectedChat, setSelectedChat, refSelectedChat] = useStateRef(null);
  const [inputText, setInputText] = useState('');
  const [chats, setChats, refChats] = useStateRef([]);
  const [user, setUser] = useState(null);

  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const lastMessageRef = useRef(null);
	const { getAccessToken } = useAuth();
  const navigate = useNavigate();
  const [connection, setConnection, refConnection] = useStateRef(null);

//////////////////////////////////////////////////////////// util functions

  const getChatIndexByChatId = (chatId) => {
    return refChats.current.findIndex((chat) => chat.id === chatId);
  };

  const getUserIndex = (chatId) => {
    return refChats.current[getChatIndexByChatId(chatId)].users[0].id == user.id ? 1 : 0;
  };

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const showLastMessage = async () => {
    await delay(300);
    lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

//////////////////////////////////////////////////////////// get initial data

  useEffect( () => {
    window.addEventListener('resize', updateChatPageSize);
    const doEveryThing = async () => {
      const token = await getAccessToken();
      if(!token){
        console.log('login required');
        navigate("/Login");
      }
      else{
        await getUserData(token);
        await getChats(token);
        await startConversation(token);
      }
    };
    doEveryThing();
    return () => window.removeEventListener('resize', updateChatPageSize);
  }, []);

  const getUserData = async (token) => {
    const tokenData = jwt(token);
    const url = BASE_API_ROUTE + `Customer/GetUserById?userId=${tokenData.uid}`;
    try { 
      const response = await axios.get(url);
      // console.log('response in getting user data : ', response);
      setUser(response.data.data);
    } catch (error) {
      console.log('error in getting user data : ', error);
    }
  };

  const getChats = async (token) => {
    const url = BASE_API_ROUTE + 'Chat/GetChatsWithMessages';
    try { 
      const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
      // console.log('response in geting chats : ', response);
      setChats(response.data.data);
    } catch (error) {
      console.log('error in getting chats : ', error);
    }
  };

  const startConversation = (token) => {

    setConnection( new signalR.HubConnectionBuilder()
      .withUrl(BASE_API_ROUTE + "chatHub",{
        accessTokenFactory: () => token,
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build()
    );
    const start = async () => {
      try {
        await refConnection.current.start();
        console.log("SignalR Connected.");
      } catch (err) {
        console.log('error in connecting SignalR : ',err);
      }
    };

    refConnection.current.on("ReceiveMessage", (message) => {
      setChatsAddMessage(message);
      if(refSelectedChat.current == message.chatId){
        readChatMessage(refSelectedChat.current);
      }
      showLastMessage();
    });
    refConnection.current.on("ReadMessages", (chatId) => {
      setChatsReadMessage(parseInt(chatId));
      showLastMessage();
    });
    refConnection.current.on("DeleteMessage", (message) => {
      setChatsDeleteMessage(message);
    });
    refConnection.current.on("EditMessage", (message) => {
      setChatsEditMessage(message);
    });

    start();
  };

//////////////////////////////////////////////////////////// setChats - On functions

  const setChatsAddMessage = (message) => {
    const chatIndex = getChatIndexByChatId(message.chatId);
    const updatedChat = {
      ...refChats.current[chatIndex],
      chatMessages: [...refChats.current[chatIndex].chatMessages, message],
    };
    const updatedChats = [...refChats.current];
    updatedChats[chatIndex] = updatedChat;
    setChats(updatedChats);
  };

  const setChatsReadMessage = (chatId) => {
    const chatIndex = getChatIndexByChatId(chatId);
    const updatedChatMessages = refChats.current[chatIndex].chatMessages.map((message) => {
      return {
        ...message,
        isRead: true,
      };
    });
    const updatedChat = {
      ...refChats.current[chatIndex],
      chatMessages: updatedChatMessages,
    };
    const updatedChats = [...refChats.current];
    updatedChats[chatIndex] = updatedChat;
    setChats(updatedChats);
  };

  const setChatsDeleteMessage = (message) => {
    const chatIndex = getChatIndexByChatId(message.chatId);
      const updatedChatMessages = refChats.current[chatIndex].chatMessages.map((messag) => {
        if (messag.id === message.id) {
          return {
            ...messag,
            isDeleted: true,
          };
        }
        return messag;
      });
      const updatedChat = {
        ...refChats.current[chatIndex],
        chatMessages: updatedChatMessages,
      };
      const updatedChats = [...refChats.current];
      updatedChats[chatIndex] = updatedChat;
      setChats(updatedChats);
  };

  const setChatsEditMessage = (message) => {
    const chatIndex = getChatIndexByChatId(message.chatId);
    const updatedChatMessages = refChats.current[chatIndex].chatMessages.map((messag) => {
      if (messag.id === message.id) {
        return {
          ...messag,
          message: message.message,
          isEdited: true,
        };
      }
      return messag;
    });
    const updatedChat = {
      ...refChats.current[chatIndex],
      chatMessages: updatedChatMessages,
    };
    const updatedChats = [...refChats.current];
    updatedChats[chatIndex] = updatedChat;
    setChats(updatedChats);
  };

///////////////////////////////////////////////////////////// Invoke functions

  const sendMessage = async (message) => {
    try {
      await refConnection.current.invoke("SendMessage", message);
    } catch (err) {
      console.log('error in SendMessage : ',err);
    }
  };

  const readChatMessage = async (chatId) => {
    try {
      await refConnection.current.invoke("ReadChatMessages", ''+chatId);
    } catch (err) {
      console.log('error in ReadChatMessages : ',err);
    }
  };

  const deleteChatMessage = async (chatId,id) => {
    try {
      await refConnection.current.invoke("DeleteChatMessage", ''+chatId, ''+id);
    } catch (err) {
      console.log('error in DeleteChatMessage : ',err);
    }
  };

  const editChatMessage = async (message) => {
    try {
      await refConnection.current.invoke("EditChatMessage", message);
    } catch (err) {
      console.log('error in EditChatMessage : ',err);
    }
  };

  const addToChat = async (chatId) => {
    try {
      await refConnection.current.invoke("AddToChat", chatId.toString());
    } catch (err) {
      console.log('error in AddToChat : ',err);
    }
  };

//////////////////////////////////////////////////////////// UI

  const updateChatPageSize = () => {
    setPageWidth(window.innerWidth);
  };

  const handleEnter = (event) => {
    if(event.key == 'Enter'){
      handleInputChange(event);
      handleSendClick();
    }
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    addToChat(chatId);
    readChatMessage(chatId);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendClick = () => {
    if (inputText.trim() == '') {
      return;
    }
    const newMessage = {
      id: 0,
      sender: null,
      message: inputText.trim(),
      sendTime: new Date().toISOString(),
      isDeleted: false,
      isEdited: false,
      isFile: false,
      isRead: false,
      senderId: user.id,
      chatId: refSelectedChat.current,
      chat: null,
    };
    setInputText('');
    sendMessage(newMessage);
  };

  const handleEditClick = (message) => {
    if (inputText.trim() === '') {
      alert('لطفا متن جدید پیام را وارد کنید و سپس دکمه ویرایش را بزنید.');
      return;
    }
    const updatedMessage = {
      ...message,
      message: inputText.trim(),
      isEdited: true,
    };
    setInputText('');
    editChatMessage(updatedMessage);
  };

  const handleDeleteClick = (message) => {
    const deletedMessage = {
      ...message,
      isDeleted: true,
    };
    deleteChatMessage(deletedMessage.chatId, deletedMessage.id);
  };

  const handleAttachFileClick = (event) => {
    // const file = event.target.files[0];
    // const newMessage = {
    //   id: chatMessages.length + 1,
    //   sender: user,
    //   message: (
    //     <Box backgroundColor={'white'} borderRadius={2} padding={1}>
    //       <span>{file.name}</span>
    //       <IconButton size="small">
    //         <a href={URL.createObjectURL(file)} download={file.name}>
    //           <DownloadForOfflineOutlined />
    //         </a>
    //       </IconButton>
    //     </Box>
    //   ),
    //   sendTime: new Date().toISOString(),
    //   IsDeleted: false,
    //   IsEdited: false,
    //   IsFile: true,
    //   IsRead: false,
    //   senderId: 0,
    //   chatId: 0,
    //   chat: null
    // };
    // setChatMessages([...chatMessages, newMessage]);
  };

///////////////////////////////////////////////////////////// components

  const renderMessage = (message) => {
    const chatIndex = getChatIndexByChatId(refSelectedChat.current);
    const messageIndex = refChats.current[chatIndex].chatMessages.findIndex((messag) => messag.id === message.id);
    const isCurrentUser = message.sender.id === user.id;
    const isDeleted = message.isDeleted;
    const isEdited = message.isEdited;
    const isFile = message.isFile;
    const isRead = message.isRead;
    return (
      <Grid ref={messageIndex === refChats.current[chatIndex].chatMessages.length - 1 ? lastMessageRef : null}
        key={message.id} display="flex" flexDirection={isCurrentUser ? "row" : "row-reverse"}>
        <Grid
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          margin: '10px',
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: 'skyblue',
          ...(isCurrentUser && {
            alignSelf: 'flex-end',
            backgroundColor: 'lightsteelblue',
            // color: 'grey',
          }),
          ...(isDeleted && {
            // backgroundColor: 'lightsteelblue',
            fontStyle: 'italic',
          }),
          ...(isEdited && {
            // backgroundColor: 'blueviolet',
          }),
        }}>
          <Grid sx={{ display: 'flex', alignItems: 'center',}}>
            <Avatar src={message.sender.profileImageUrl} alt={message.sender.name} />
            <Grid marginRight={'10px'} container direction={'row'} display={'flex'} justifyContent={'space-around'}>
              <Typography fontSize={'17px'} fontFamily={'shabnam'} marginLeft={'10px'}>{message.sender.name}</Typography>
            </Grid>
          </Grid>
          <Grid sx={{ margin: '10px', whiteSpace: 'pre-wrap', wordBreak: 'break-word',}}>
            <Typography fontFamily={'shabnam'} color={isDeleted ? 'red' : 'black'}>{ isDeleted ? 'This message was deleted' : message.message }</Typography>
          </Grid>
          <Grid container direction={'row'} display={'flex'} justifyContent={'flex-start'}>
            {!isCurrentUser || isDeleted ? null : (
              <>
              {!isFile && <IconButton size="small" onClick={() => handleEditClick(message)}>
                <Edit />
              </IconButton>}
              <IconButton size="small" onClick={() => handleDeleteClick(message)}>
                <Delete />
              </IconButton>
              </>
            )}
            { (isEdited && !isDeleted) && <Typography fontSize={'13px'} marginRight={'10px'} position={'relative'} top={'7px'}>edited</Typography>}
            {isRead && <IconButton size="small"> <DoneAll /> </IconButton>}
            <Typography marginRight={'15px'} fontSize={'13px'} position={'relative'} top={'7px'}>{moment(message.sendTime).format('MMM D YYYY, h:mm A')}</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
    <Helmet>
      <title>Chat Page</title>
    </Helmet>

    <Grid container direction={{ xs: 'column', sm: 'row' }} height={{xs:'auto', sm:'calc(100vh - 65px)'}} sx={{ backgroundColor: 'rgba(173,216,230,0.7)', display:'flex', justifyContent:'space-around', alignItems:'stretch'}}>
      <Grid container direction={'column'} width={{ xs: '100%', sm: '20%' }} sx={{ borderBottom: { xs: '1px solid grey', sm: '0px solid grey' } }}>
        {user && <Grid display="flex" flexDirection="column" alignItems="center" justifyContent={'center'} padding={1} border={'1px solid grey'} borderRadius={2}>
          <Avatar src={user.profileImageUrl} alt={user.name} />
          <Typography>{user.name}</Typography>
        </Grid>}
        <Grid container direction={'column'} height={'80%'} >
        {/* border={'1px solid grey'} borderRadius={2} */}
          <List sx={{height: '100%', flex: {xs:'0 0 auto', sm:'1 0 0'}, overflow: 'overlay'}}>
            {refChats.current.map((chat) => (
              <ListItem sx={{cursor:'pointer',...(refSelectedChat.current === chat.id && {backgroundColor:'skyblue',borderRadius:2})}} key={chat.id} onClick={() => handleChatSelect(chat.id)} >
                <ListItemAvatar>
                  <Avatar src={chat.users[getUserIndex(chat.id)].profileImageUrl} alt={chat.users[getUserIndex(chat.id)].name} />
                </ListItemAvatar>
                <ListItemText primary={chat.users[getUserIndex(chat.id)].name} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid> 
      {pageWidth > 1255 && <Divider color='black' orientation="vertical" variant="middle" flexItem/>}
      <Grid height={'100%'} width={{ xs: '100%', sm: '80%' }} maxWidth={1000} sx={{ display: 'flex', flexDirection: 'column'}}>
        {refSelectedChat.current ? (
          <>
            <Grid container direction={'column'} height={'85%'} >
            {/* border={'1px solid grey'} borderRadius={2} */}
              <Grid height={'100%'} sx={{ flex: '0 0 auto', overflow: 'overlay'}}>
                {refChats.current && refChats.current[getChatIndexByChatId(refSelectedChat.current)].chatMessages.map((message) => renderMessage(message))}
              </Grid>
            </Grid>
            <Grid sx={{ display: 'flex', alignItems: 'center', padding: '10px',}}>
              <TextField sx={{ flexGrow: 1 }}
                variant="outlined"
                dir='rtl'
                fullWidth
                placeholder="پیام خود را بنویسید..."
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" component="label">
                        <AttachFile />
                        <input type="file" style={{ display: 'none' }} onChange={handleAttachFileClick} />
                      </IconButton>
                      <IconButton size="small" onClick={handleSendClick}>
                        <Send />
                      </IconButton>
                    </InputAdornment>
                  ),}}
              />
            </Grid>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', marginTop: '50%' }}>
            <Typography fontFamily={'shabnam'}>یکی از افراد را برای چت انتخاب کنید.</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
    </>
  );
};

export default ChatPage;