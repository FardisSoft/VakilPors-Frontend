import React, { useState, useEffect } from 'react';
import { Avatar, Box, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, InputAdornment, Typography } from '@mui/material';
import { Delete, Edit, Send, AttachFile, DownloadForOfflineOutlined, DoneAll } from '@mui/icons-material';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import * as signalR from '@microsoft/signalr';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";
import { BASE_API_ROUTE } from '../Constants';
import axios from 'axios';
import jwt from 'jwt-decode';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState('');
  // const [chatMessages, setChatMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);

  const [pageWidth, setPageWidth] = useState(window.innerWidth);
	const { getAccessToken } = useAuth();
  const navigate = useNavigate();
  let connection;

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
      console.log('response in getting user data : ', response);
      setUser(response.data.data);
    } catch (error) {
      console.log('error in getting user data : ', error);
    }
  };

  const getChats = async (token) => {
    const url = BASE_API_ROUTE + 'Chat/GetChatsWithMessages';
    try { 
      const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
      console.log('response in geting chats : ', response);
      setChats(response.data.data);
    } catch (error) {
      console.log('error in getting chats : ', error);
    }
  };

  const startConversation = (token) => {

    connection = new signalR.HubConnectionBuilder()
      .withUrl(BASE_API_ROUTE + "chathub",{
        accessTokenFactory: () => token,
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    const start = async () => {
      try {
        await connection.start();
        console.log("SignalR Connected.");
      } catch (err) {
        console.log('error in connecting SignalR : ',err);
      }
    };

    connection.on("ReceiveMessage", (message) => {
      createMessage(false, message);
    });
    connection.on("ReadMessages", (chatId) => {
      readMessages(chatId);
    });
    connection.on("DeleteMessage", (message) => {
      deleteMessage(message);
    });
    connection.on("EditMessage", (message) => {
      editMessage(message);
    });

    start();
  };

////////////////////////////////////////////////////////////

  const createMessage = (isSelf, message) => {
    let newMessage = null;
    if(isSelf){
      newMessage = {
        id: chats[selectedChat].chatMessages.length + 1,
        // id: chats.find((chat) => chat.id === selectedChat).chatMessages.length + 1,
        sender: user,
        message: inputText.trim(),
        sendTime: new Date().toISOString(),
        IsDeleted: false,
        IsEdited: false,
        IsFile: false,
        IsRead: false,
        senderId: user.id,
        chatId: selectedChat,
        chat: null,
      };
    }
    if(!isSelf){
      newMessage = message;
    }
    setChats([
      ...chats, {
        ...chats[selectedChat],
        chatMessages: [...chats[selectedChat].chatMessages, newMessage],
      },
    ]);
    return newMessage;
  };

  const readMessages = (chatId) => {
    setChats(prevChats => {
      const updatedChats = [...prevChats];
      updatedChats[chatId] = {
        ...updatedChats[chatId],
        chatMessages: updatedChats[chatId].chatMessages.map(message => ({
          ...message,
          IsRead: true,
        })),
      };
      return updatedChats;
    });
  };

  const deleteMessage = (message) => {
    setChats([
      ...chats, {
        ...chats[message.chatId],
        chatMessages: [
          ...chats[message.chatId].chatMessages, {
            ...chats[message.chatId].chatMessages[message.id],
            message: 'This message was IsDeleted',
            IsDeleted: true,
          },
        ],
      },
    ]);
  };

  const editMessage = (message) => {
    setChats([
      ...chats, {
        ...chats[message.chatId],
        chatMessages: [
          ...chats[message.chatId].chatMessages, {
            ...chats[message.chatId].chatMessages[message.id],
            message: message.message,
            IsEdited: true,
          },
        ],
      },
    ]);
  };

/////////////////////////////////////////////////////////////

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (err) {
      console.log('error in SendMessage : ',err);
    }
  };

  const readChatMessage = async (chatId) => {
    try {
      await connection.invoke("ReadChatMessages", chatId);
    } catch (err) {
      console.log('error in ReadChatMessages : ',err);
    }
  };

  const deleteChatMessage = async (chatId,id) => {
    try {
      await connection.invoke("DeleteChatMessage", chatId, id);
    } catch (err) {
      console.log('error in DeleteChatMessage : ',err);
    }
  };

  const editChatMessage = async (message) => {
    try {
      await connection.invoke("EditChatMessage", message);
    } catch (err) {
      console.log('error in EditChatMessage : ',err);
    }
  };

  const addToChat = async (chatId) => {
    try {
      await connection.invoke("AddToChat", chatId);
    } catch (err) {
      console.log('error in AddToChat : ',err);
    }
  };

////////////////////////////////////////////////////////////

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
    // const token = await getAccessToken();
    // if(!token){
    //   console.log('login required');
    //   navigate("/Login");
    // }
    // else{
    //   setSelectedChat(chatId);
    //   const url = BASE_API_ROUTE + `Chat/GetChatMessages?chatId=${chatId}`;
    //   try { 
    //     const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
    //     console.log('response in geting chats : ', response);
    //     setChatMessages(response.data.data);
    //     // inja ro ham dorost kon
    //     addToChat(chatId);
    //   } catch (error) {
    //     console.log('error in getting chats : ', error);
    //   }
    // }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendClick = () => {
    if (inputText.trim() === '') {
      return;
    }
    const newMessage = createMessage(true,null);
    setInputText('');
    if(newMessage){
      sendMessage(newMessage);
    }
  };

  const handleEditClick = (id) => {
    const messageIndex = chats[selectedChat].chatMessages.findIndex((message) => message.id === id);
    if (messageIndex === -1) {
      return;
    }
    setChats([
      ...chats, {
        ...chats[selectedChat],
        chatMessages: [
          ...chats[selectedChat].chatMessages, {
            ...chats[selectedChat].chatMessages[messageIndex],
            message: inputText.trim(),
            IsEdited: true,
          },
        ],
      },
    ]);
    setInputText('');
    editChatMessage(chats[selectedChat].chatMessages[messageIndex]);
  };

  const handleDeleteClick = (id) => {
    const messageIndex = chats[selectedChat].chatMessages.findIndex((message) => message.id === id);
    if (messageIndex === -1) {
      return;
    }
    setChats([
      ...chats, {
        ...chats[selectedChat],
        chatMessages: [
          ...chats[selectedChat].chatMessages, {
            ...chats[selectedChat].chatMessages[messageIndex],
            message: 'This message was IsDeleted',
            IsDeleted: true,
          },
        ],
      },
    ]);
    setInputText('');
    const deletedMessage = chats[selectedChat].chatMessages[messageIndex];
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

  const renderMessage = (message) => {
    const isCurrentUser = message.sender.id === user.id;
    const isDeleted = message.IsDeleted;
    const isEdited = message.IsEdited;
    const isFile = message.IsFile;
    const isRead = message.IsRead;
    return (
      <Grid display="flex" flexDirection={isCurrentUser ? "row" : "row-reverse"}>
        <Grid key={message.id} sx={{
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
            <Grid marginRight={'10px'} container direction={'row'} display={'flex'} justifymessage={'space-around'}>
              <Typography fontSize={'17px'} fontFamily={'shabnam'} marginLeft={'10px'}>{message.sender.name}</Typography>
            </Grid>
          </Grid>
          <Grid sx={{ margin: '10px', whiteSpace: 'pre-wrap', wordBreak: 'break-word',}}>
            <Typography fontFamily={'shabnam'} color={isDeleted ? 'red' : 'black'}>{ isDeleted ? 'This message was IsDeleted' : message.message }</Typography>
          </Grid>
          <Grid container direction={'row'} display={'flex'} justifymessage={'flex-start'}>
            {!isCurrentUser || isDeleted ? null : (
              <>
              {!isFile && <IconButton size="small" onClick={() => handleEditClick(message.id)}>
                <Edit />
              </IconButton>}
              <IconButton size="small" onClick={() => handleDeleteClick(message.id)}>
                <Delete />
              </IconButton>
              </>
            )}
            { (isEdited && !isDeleted) && <Typography fontSize={'13px'} marginRight={'10px'} position={'relative'} top={'7px'}>edited</Typography>}
            {!isRead && <IconButton size="small"> <DoneAll /> </IconButton>}
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

    <Grid container direction={{ xs: 'column', sm: 'row' }} height={{xs:'auto', sm:'calc(100vh - 65px)'}} sx={{ backgroundColor: 'rgba(173,216,230,0.7)', display:'flex', justifymessage:'space-around', alignItems:'stretch'}}>
      <Grid container direction={'column'} width={{ xs: '100%', sm: '20%' }} sx={{ borderBottom: { xs: '1px solid grey', sm: '0px solid grey' } }}>
        {user && <Grid display="flex" flexDirection="column" alignItems="center" justifymessage={'center'} padding={1} border={'1px solid grey'} borderRadius={2}>
          <Avatar src={user.profileImageUrl} alt={user.name} />
          <Typography>{user.name}</Typography>
        </Grid>}
        <Grid container direction={'column'} height={'80%'} >
        {/* border={'1px solid grey'} borderRadius={2} */}
          <List sx={{height: '100%', flex: {xs:'0 0 auto', sm:'1 0 0'}, overflow: 'overlay'}}>
            {chats.map((chat) => (
              /// inja ro dorost kon
              <ListItem sx={{cursor:'pointer',...(selectedChat === chat.id && {backgroundColor:'skyblue',borderRadius:2})}} key={chat.id} onClick={() => handleChatSelect(chat.id)} >
                <ListItemAvatar>
                  <Avatar src={chat.avatar} alt={chat.name} />
                </ListItemAvatar>
                <ListItemText primary={chat.name} />
              </ListItem>
              /// search here ina chian to swagger?
            ))}
          </List>
        </Grid>
      </Grid> 
      {pageWidth > 1255 && <Divider color='black' orientation="vertical" variant="middle" flexItem/>}
      <Grid height={'100%'} width={{ xs: '100%', sm: '80%' }} maxWidth={1000} sx={{ display: 'flex', flexDirection: 'column'}}>
        {selectedChat ? (
          <>
            <Grid container direction={'column'} height={'85%'} >
            {/* border={'1px solid grey'} borderRadius={2} */}
              <Grid height={'100%'} sx={{ flex: '0 0 auto', overflow: 'overlay'}}>
                {chats && chats[selectedChat].chatMessages.map((message) => renderMessage(message))}
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
            <Typography fontFamily={'shabnam'}>یکی از افراد سمت راست را برای چت انتخاب کنید.</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
    </>
  );
};

export default ChatPage;