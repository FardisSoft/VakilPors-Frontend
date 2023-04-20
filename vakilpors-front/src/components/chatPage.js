import React, { useState, useEffect } from 'react';
import { Avatar, Box, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, InputAdornment, Typography } from '@mui/material';
import { Delete, Edit, Send, AttachFile, DownloadForOfflineOutlined } from '@mui/icons-material';
import moment from 'moment';

const messages = [
[
  {
    messageId: 1,
    sender: {
      id: 1,
      name: 'person 1',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    content: 'Hi there!',
    sentAt: moment().subtract(1, 'hours').toISOString(),
    deleted: false,
    edited: false,
    file: false,
  },
  {
    messageId: 2,
    sender: {
      id: 2,
      name: 'user',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    content: 'Hello!',
    sentAt: moment().subtract(30, 'minutes').toISOString(),
    deleted: false,
    edited: false,
    file: false,
  },
  {
    messageId: 3,
    sender: {
      id: 2,
      name: 'user',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    content: 'how are you',
    sentAt: moment().subtract(30, 'minutes').toISOString(),
    deleted: false,
    edited: true,
    file: false,
  },
],
[
  {
    messageId: 1,
    sender: {
      id: 3,
      name: 'person 3',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    content: 'سلام',
    sentAt: moment().subtract(30, 'minutes').toISOString(),
    deleted: false,
    edited: false,
    file: false,
  },
  {
    messageId: 2,
    sender: {
      id: 2,
      name: 'user',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    content: 'سلام عزیزم',
    sentAt: moment().subtract(30, 'minutes').toISOString(),
    deleted: true,
    edited: false,
    file: false,
  },
  {
    messageId: 3,
    sender: {
      id: 2,
      name: 'user',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    content: 'خوبی',
    sentAt: moment().subtract(30, 'minutes').toISOString(),
    deleted: false,
    edited: false,
    file: false,
  },
]];

const chats = [
  {
    listId: 1,
    avatar: 'https://i.pravatar.cc/150?img=1',
    name: 'person 1'
  },
  {
    listId: 2,
    avatar: 'https://i.pravatar.cc/150?img=3',
    name: 'person 3'
  },
  {
    listId: 3,
    avatar: 'https://i.pravatar.cc/150?img=4',
    name: 'person 4'
  },
  {
    listId: 4,
    avatar: 'https://i.pravatar.cc/150?img=5',
    name: 'person 5'
  },{
    listId: 5,
    avatar: 'https://i.pravatar.cc/150?img=6',
    name: 'person 6'
  },
  {
    listId: 6,
    avatar: 'https://i.pravatar.cc/150?img=7',
    name: 'person 7'
  },{
    listId: 7,
    avatar: 'https://i.pravatar.cc/150?img=8',
    name: 'person 8'
  },
  {
    listId: 8,
    avatar: 'https://i.pravatar.cc/150?img=9',
    name: 'person 9'
  },{
    listId: 9,
    avatar: 'https://i.pravatar.cc/150?img=10',
    name: 'person 10'
  },
  {
    listId: 10,
    avatar: 'https://i.pravatar.cc/150?img=11',
    name: 'person 11'
  },
];

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState();
  const [chatLists, setChatLists] = useState(chats);
  const [user, setUser] = useState({
    id: 2,
    name: 'user',
    avatar: 'https://i.pravatar.cc/150?img=2',
  });
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', updateChatSize);
    return () => window.removeEventListener('resize', updateChatSize);
  }, []);

  const updateChatSize = () => {
    setPageWidth(window.innerWidth);
  }

  const handleChatSelect = (chatindex) => {
    setSelectedChat(chatindex);
    setChatMessages(messages[chatindex - 1]);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendClick = () => {
    if (inputText.trim() === '') {
      return;
    }
    const newMessage = {
      messageId: chatMessages.length + 1,
      sender: user,
      content: inputText.trim(),
      sentAt: new Date().toISOString(),
      deleted: false,
      edited: false,
      file: false,
    };
    setChatMessages([...chatMessages, newMessage]);
    setInputText('');
  };

  const handleEditClick = (messageId) => {
    const messageIndex = chatMessages.findIndex((message) => message.messageId === messageId);
    if (messageIndex === -1) {
      return;
    }
    const editedMessage = {
      ...chatMessages[messageIndex],
      content: inputText.trim(),
      edited: true,
    };
    const newMessages = [...chatMessages];
    newMessages.splice(messageIndex, 1, editedMessage);
    setChatMessages(newMessages);
    setInputText('');
  };

  const handleDeleteClick = (messageId) => {
    const messageIndex = chatMessages.findIndex((message) => message.messageId === messageId);
    if (messageIndex === -1) {
      return;
    }
    const deletedMessage = {
      ...chatMessages[messageIndex],
      content: 'This message was deleted',
      deleted: true,
    };
    const newMessages = [...chatMessages];
    newMessages.splice(messageIndex, 1, deletedMessage);
    setChatMessages(newMessages);
  };

  const handleAttachFileClick = (event) => {
    // Get the file from the input element
    const file = event.target.files[0];
    // Create a new message with the file name and attach icon
    const newMessage = {
      messageId: chatMessages.length + 1,
      sender: user,
      content: (
        <Box backgroundColor={'white'} borderRadius={2} padding={1}>
          <span>{file.name}</span>
          <IconButton size="small">
            <a href={URL.createObjectURL(file)} download={file.name}>
              <DownloadForOfflineOutlined />
            </a>
          </IconButton>
        </Box>
      ),
      sentAt: new Date().toISOString(),
      deleted: false,
      edited: false,
      file: true,
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  const renderMessage = (message) => {
    const isCurrentUser = message.sender.id === user.id;
    const isDeleted = message.deleted;
    const isEdited = message.edited;
    const isFile = message.file;
    return (
      <Grid key={message.messageId} sx={{
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
          <Avatar src={message.sender.avatar} alt={message.sender.name} />
          <Grid marginRight={'10px'} container direction={'row'} display={'flex'} justifyContent={'space-around'}>
            <Typography fontSize={'17px'} fontFamily={'shabnam'} marginLeft={'10px'}>{message.sender.name}</Typography>
          </Grid>
        </Grid>
        <Grid sx={{ margin: '10px', whiteSpace: 'pre-wrap', wordBreak: 'break-word',}}>
          <Typography fontFamily={'shabnam'} sx={isDeleted && {color:'red'}}>{ isDeleted ? 'This message was deleted' : message.content }</Typography>
        </Grid>
        <Grid container direction={'row'} display={'flex'} justifyContent={'flex-start'}>
          {!isCurrentUser || isDeleted ? null : (
            <>
            {!isFile && <IconButton size="small" onClick={() => handleEditClick(message.messageId)}>
              <Edit />
            </IconButton>}
            <IconButton size="small" onClick={() => handleDeleteClick(message.messageId)}>
              <Delete />
            </IconButton>
            { isEdited && <Typography fontSize={'15px'} marginRight={'10px'} position={'relative'} top={'5px'}>edited</Typography>}
            </>
          )}
          <Typography marginRight={'15px'} fontSize={'15px'} position={'relative'} top={'6px'}>{moment(message.sentAt).format('MMM D YYYY, h:mm A')}</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container direction={{ xs: 'column', sm: 'row' }} height={{xs:'auto', sm:'calc(100vh - 65px)'}} sx={{ backgroundColor: 'rgba(173,216,230,0.7)', display:'flex', justifyContent:'space-around', alignItems:'stretch'}}>
      <Grid container direction={'column'} width={{ xs: '100%', sm: '20%' }} sx={{ borderBottom: { xs: '1px solid grey', sm: '0px solid grey' } }}>
        <Grid display="flex" flexDirection="column" alignItems="center" justifyContent={'center'} padding={1} border={'1px solid grey'} borderRadius={2}>
          <Avatar src={user.avatar} alt={user.name} />
          <Typography>{user.name}</Typography>
        </Grid>
        <Grid container direction={'column'} height={'80%'} >
        {/* border={'1px solid grey'} borderRadius={2} */}
          <List sx={{height: '100%', flex: {xs:'0 0 auto', sm:'1 0 0'}, overflow: 'overlay'}}>
            {chatLists.map((chatlist) => (
              <ListItem sx={{cursor:'pointer',...(selectedChat === chatlist.listId && {backgroundColor:'skyblue',borderRadius:2})}} key={chatlist.listId} onClick={() => handleChatSelect(chatlist.listId)} >
                <ListItemAvatar>
                  <Avatar src={chatlist.avatar} alt={chatlist.name} />
                </ListItemAvatar>
                <ListItemText primary={chatlist.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid> 
      {pageWidth > 1020 && <Divider color='black' orientation="vertical" variant="middle" flexItem/>}
      <Grid height={'100%'} width={{ xs: '100%', sm: '80%' }} maxWidth={800} sx={{ display: 'flex', flexDirection: 'column'}}>
        {selectedChat ? (
          <>
            <Grid container direction={'column'} height={'85%'} >
            {/* border={'1px solid grey'} borderRadius={2} */}
              <Grid height={'100%'} sx={{ flex: '0 0 auto', overflow: 'overlay'}}>
                {chatMessages.map((message) => renderMessage(message))}
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
  );
};

export default ChatPage;