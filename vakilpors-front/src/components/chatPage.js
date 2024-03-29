import React, { useState, useEffect, useRef } from "react";
import useStateRef from "react-usestateref";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  InputAdornment,
  Typography,
  styled,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import {
  Delete,
  Edit,
  Send,
  AttachFile,
  DownloadForOfflineOutlined,
  DoneAll,
  Cancel,
  Reply,
  RateReview,
  VideoCall,
  Call,
  CallEnd,
} from "@mui/icons-material";
import Moment from "moment-jalaali";
import { Helmet } from "react-helmet-async";
import * as signalR from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BASE_API_ROUTE } from "../Constants";
import axios from "axios";
import jwt from "jwt-decode";
import { toast } from "react-toastify";
import backPic from "../assests/images/chatBackGround.png";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 300,
    fontSize: "15px",
    border: "1px solid #dadde9",
    fontFamily: "shabnam",
  },
}));

const ChatPage = () => {
  const [selectedChat, setSelectedChat, refSelectedChat] = useStateRef(null);
  const [chats, setChats, refChats] = useStateRef([]);
  const [user, setUser, refUser] = useStateRef(null);
  const [connection, setConnection, refConnection] = useStateRef(null);

  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  const [isEditActive, setIsEditActive] = useState(false);
  const [editActiveMessage, setEditActiveMessage] = useState("");
  const [isReplyActive, setIsReplyActive] = useState(false);
  const [replyActiveMessage, setReplyActiveMessage] = useState("");
  const [activeChats, setActiveChats] = useState([]);

  const lastMessageRef = useRef(null);
  const messageRefs = useRef([]);
  messageRefs.current.push(React.createRef());

  const { refUserRole, getAccessToken } = useAuth();
  const navigate = useNavigate();

  //////////////////////////////////////////////////////////// util functions

  const getChatIndexByChatId = (chatId) => {
    return refChats.current.findIndex((chat) => chat.id === chatId);
  };

  const showErrorMessage = (errorMessage) => {
    toast.error(errorMessage, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
    });
  };

  const getUserIndex = (chatId) => {
    return refChats.current[getChatIndexByChatId(chatId)].users[0].id ==
      refUser.current.id
      ? 1
      : 0;
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const showLastMessage = async () => {
    await delay(500);
    lastMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  //////////////////////////////////////////////////////////// get initial data

  useEffect(() => {
    const doEveryThing = async () => {
      const token = await getAccessToken();
      if (!token) {
        console.log("login required");
        navigate("/Login");
      } else {
        await getUserData(token);
        await getChats(token);
        await startConversation(token);
      }
    };
    doEveryThing();
  }, []);

  const getUserData = async (token) => {
    const tokenData = jwt(token);
    const url = BASE_API_ROUTE + `Customer/GetUserById?userId=${tokenData.uid}`;
    try {
      const response = await axios.get(url);
      // console.log('response in getting user data : ', response);
      setUser(response.data.data);
    } catch (error) {
      console.log("error in getting user data : ", error);
    }
  };

  const getChats = async (token) => {
    const url = BASE_API_ROUTE + "Chat/GetChatsWithMessages";
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log('response in geting chats : ', response.data.data);
      setChats(response.data.data);
    } catch (error) {
      console.log("error in getting chats : ", error);
    }
  };

  const startConversation = (token) => {
    setConnection(
      new signalR.HubConnectionBuilder()
        .withUrl(BASE_API_ROUTE + "chatHub", {
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
        console.log("error in connecting SignalR : ", err);
      }
    };

    refConnection.current.on("ReceiveMessage", (message) => {
      setChatsAddMessage(message);
    });
    refConnection.current.on("ReadMessages", (chatId) => {
      setChatsReadMessage(parseInt(chatId));
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
    showLastMessage();
    if (
      refSelectedChat.current == message.chatId &&
      message.sender.id != refUser.current.id
    ) {
      readChatMessage(message.chatId);
    }
  };

  const setChatsReadMessage = (chatId) => {
    const chatIndex = getChatIndexByChatId(chatId);
    const updatedChatMessages = refChats.current[chatIndex].chatMessages.map(
      (message) => {
        return {
          ...message,
          isRead: true,
        };
      }
    );
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
    const updatedChatMessages = refChats.current[chatIndex].chatMessages.map(
      (messag) => {
        if (messag.id === message.id) {
          return {
            ...messag,
            isDeleted: true,
          };
        }
        return messag;
      }
    );
    const updatedChat = {
      ...refChats.current[chatIndex],
      chatMessages: updatedChatMessages,
    };
    const updatedChats = [...refChats.current];
    updatedChats[chatIndex] = updatedChat;
    setChats(updatedChats);
  };

  const setChatsEditMessage = async (message) => {
    const chatIndex = getChatIndexByChatId(message.chatId);
    const updatedChatMessages = refChats.current[chatIndex].chatMessages.map(
      (messag) => {
        if (messag.id === message.id) {
          return {
            ...messag,
            message: message.message,
            isEdited: true,
            callStatus: message.callStatus,
          };
        }
        return messag;
      }
    );
    const updatedChat = {
      ...refChats.current[chatIndex],
      chatMessages: updatedChatMessages,
    };
    const updatedChats = [...refChats.current];
    updatedChats[chatIndex] = updatedChat;
    setChats(updatedChats);
    if (message.isCall && message.callStatus == 1) {
      await delay(1000);
      navigate(`/videoCall/${message.message}`);
    }
  };

  ///////////////////////////////////////////////////////////// Invoke functions

  const sendMessage = async (message) => {
    try {
      await refConnection.current.invoke("SendMessage", message);
    } catch (err) {
      console.log("error in SendMessage : ", err);
    }
  };

  const readChatMessage = async (chatId) => {
    try {
      await refConnection.current.invoke("ReadChatMessages", "" + chatId);
    } catch (err) {
      console.log("error in ReadChatMessages : ", err);
    }
  };

  const deleteChatMessage = async (chatId, id) => {
    try {
      await refConnection.current.invoke(
        "DeleteChatMessage",
        "" + chatId,
        "" + id
      );
    } catch (err) {
      console.log("error in DeleteChatMessage : ", err);
    }
  };

  const editChatMessage = async (message) => {
    try {
      await refConnection.current.invoke("EditChatMessage", message);
    } catch (err) {
      console.log("error in EditChatMessage : ", err);
    }
  };

  const addToChat = async (chatId) => {
    try {
      await refConnection.current.invoke("AddToChat", chatId.toString());
    } catch (err) {
      console.log("error in AddToChat : ", err);
    }
  };

  //////////////////////////////////////////////////////////// UI

  const handleEnter = (event) => {
    if (event.key == "Enter") {
      handleInputChange(event);
      isEditActive
        ? handleEditMessage()
        : isReplyActive
        ? handleReplyMessage()
        : handleSendClick();
    }
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    if (!activeChats.includes(chatId)) {
      setActiveChats([...activeChats, chatId]);
      addToChat(chatId);
    }
    const chatIndex = getChatIndexByChatId(chatId);
    const numberOfMessages = refChats.current[chatIndex].chatMessages.length;
    if (
      numberOfMessages > 0 &&
      refChats.current[chatIndex].chatMessages[numberOfMessages - 1].sender
        .id != refUser.current.id
    ) {
      readChatMessage(chatId);
    }
    showLastMessage();
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendClick = () => {
    if (inputText.trim() == "") {
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
      isCall: false,
      callStatus: 0,
      senderId: refUser.current.id,
      chatId: refSelectedChat.current,
      chat: null,
      replyId: null,
      replyMessage: null,
    };
    setInputText("");
    sendMessage(newMessage);
  };

  const handleEditClick = (message) => {
    setInputText(message.message);
    setIsEditActive(true);
    setEditActiveMessage(message);
    inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleEditMessage = () => {
    if (inputText.trim() === "") {
      showErrorMessage(
        "لطفا متن جدید پیام را وارد کنید و سپس دکمه ویرایش را بزنید."
      );
      return;
    }
    const updatedMessage = {
      ...editActiveMessage,
      message: inputText.trim(),
      isEdited: true,
    };
    delete updatedMessage.chat;
    delete updatedMessage.ref;
    setInputText("");
    setIsEditActive(false);
    editChatMessage(updatedMessage);
  };

  const handleCancelEditMessage = () => {
    setIsEditActive(false);
    setInputText("");
  };

  const handleDeleteClick = (message) => {
    deleteChatMessage(message.chatId, message.id);
  };

  const handleAttachFileClick = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    const url = BASE_API_ROUTE + "File/Upload";
    try {
      const response = await axios.post(url, formData);
      const newMessage = {
        id: 0,
        sender: null,
        message: response.data,
        sendTime: new Date().toISOString(),
        isDeleted: false,
        isEdited: false,
        isFile: true,
        isRead: false,
        isCall: false,
        callStatus: 0,
        senderId: refUser.current.id,
        chatId: refSelectedChat.current,
        chat: null,
        replyId: null,
        replyMessage: null,
      };
      sendMessage(newMessage);
    } catch (err) {
      console.log("error in upLoading file : ", err);
    }
  };

  const handleReplyClick = (message) => {
    setIsReplyActive(true);
    setReplyActiveMessage(message);
    inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleReplyMessage = () => {
    if (inputText.trim() === "") {
      showErrorMessage("لطفا متن پاسخ را وارد کنید و سپس دکمه ارسال را بزنید.");
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
      isCall: false,
      callStatus: 0,
      senderId: refUser.current.id,
      chatId: refSelectedChat.current,
      chat: null,
      replyId: replyActiveMessage.id,
      replyMessage: null,
    };
    setInputText("");
    setIsReplyActive(false);
    sendMessage(newMessage);
  };

  const handleCancelReplyMessage = () => {
    setIsReplyActive(false);
    setInputText("");
  };

  const goToReply = (chatIndex, messageReplyIndex) => {
    refChats.current[chatIndex].chatMessages[
      messageReplyIndex
    ].ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleRateClick = (lawyerId) => {
    navigate(`/Rate/${lawyerId}`);
  };

  const handleCallClick = () => {
    const newMessage = {
      id: 0,
      sender: null,
      message: "",
      sendTime: new Date().toISOString(),
      isDeleted: false,
      isEdited: false,
      isFile: false,
      isRead: false,
      isCall: true,
      callStatus: 0,
      senderId: refUser.current.id,
      chatId: refSelectedChat.current,
      chat: null,
      replyId: null,
      replyMessage: null,
    };
    sendMessage(newMessage);
  };

  const handleAnswerCallClick = (message) => {
    const chat =
      refChats.current[getChatIndexByChatId(refSelectedChat.current)];
    const thatGuyUserId = chat.users[getUserIndex(chat.id)].id;
    const unicNum = thatGuyUserId + refUser.current.id * 1000000;
    const hashedRoomId = unicNum.toString(16);

    const updatedMessage = {
      ...message,
      message: hashedRoomId,
      callStatus: 1,
    };
    delete updatedMessage.ref;
    editChatMessage(updatedMessage);
  };

  const handleRejectCallClick = (message) => {
    const updatedMessage = {
      ...message,
      callStatus: 2,
    };
    delete updatedMessage.ref;
    editChatMessage(updatedMessage);
  };

  ///////////////////////////////////////////////////////////// components

  const renderMessage = (message, index) => {
    messageRefs.current[index] = React.createRef();
    message.ref = messageRefs.current[index];
    const chatIndex = getChatIndexByChatId(refSelectedChat.current);
    const messageIndex = refChats.current[chatIndex].chatMessages.findIndex(
      (messag) => messag.id === message.id
    );
    let messageReplyIndex = null;
    let messageReplyContent = "";
    if (message.replyId) {
      messageReplyIndex = refChats.current[chatIndex].chatMessages.findIndex(
        (messag) => messag.id === message.replyId
      );
      messageReplyContent = refChats.current[chatIndex].chatMessages[
        messageReplyIndex
      ].isDeleted
        ? "This message was deleted"
        : refChats.current[chatIndex].chatMessages[messageReplyIndex].isFile
        ? "فایل"
        : refChats.current[chatIndex].chatMessages[messageReplyIndex].message;
    }
    const isCurrentUser = message.sender.id === refUser.current.id;
    const isDeleted = message.isDeleted;
    const isEdited = message.isEdited;
    const isFile = message.isFile;
    const isRead = message.isRead;
    const isCall = message.isCall;
    return (
      <Grid
        ref={
          messageIndex === refChats.current[chatIndex].chatMessages.length - 1
            ? lastMessageRef
            : null
        }
        key={message.id}
        display="flex"
        flexDirection={isCurrentUser ? "row" : "row-reverse"}
      >
        <Grid
          ref={messageRefs.current[index]}
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: "10px",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "skyblue",
            ...(isCurrentUser && {
              alignSelf: "flex-end",
              backgroundColor: "#6699cc",
              // color: 'grey',
            }),
            ...(isDeleted && {
              // backgroundColor: 'lightsteelblue',
              fontStyle: "italic",
            }),
            ...(isEdited &&
              {
                // backgroundColor: 'blueviolet',
              }),
          }}
        >
          {/* reply message */}
          {messageReplyIndex != null && (
            <Grid
              container
              justifyContent="flex-start"
              borderBottom="1px solid gray"
              marginBottom="10px"
            >
              <Grid item xs={12} sx={{ overflow: "hidden", width: "200px" }}>
                <StyledTooltip
                  title={<React.Fragment>{messageReplyContent}</React.Fragment>}
                >
                  <Typography
                    fontFamily="shabnam"
                    fontSize="13px"
                    sx={{
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      marginBottom: "2px",
                      padding: "2px",
                      border: "3px solid lightblue",
                      backgroundColor: "lightblue",
                      borderRadius: "7px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                    onClick={() => goToReply(chatIndex, messageReplyIndex)}
                  >
                    در پاسخ به
                    {" : " + messageReplyContent}
                  </Typography>
                </StyledTooltip>
              </Grid>
            </Grid>
          )}

          {/* name and avatar */}
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={message.sender.profileImageUrl}
              alt={message.sender.name}
            />
            <Grid
              marginRight={"10px"}
              container
              direction={"row"}
              display={"flex"}
              justifyContent={"space-around"}
            >
              <Typography
                fontSize={"17px"}
                fontFamily={"shabnam"}
                marginLeft={"10px"}
              >
                {message.sender.name}
              </Typography>
            </Grid>
          </Grid>

          {/* content */}
          <Grid
            sx={{
              margin: "10px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            <Typography
              fontFamily={"shabnam"}
              color={
                isDeleted || message.callStatus == 2
                  ? "red"
                  : message.callStatus == 1
                  ? "green"
                  : "black"
              }
            >
              {isDeleted ? (
                "This message was deleted"
              ) : isFile ? (
                <Box backgroundColor={"white"} borderRadius={2} padding={1}>
                  <IconButton size="small">
                    <a href={message.message} download={"download"}>
                      <span style={{ marginLeft: "10px", fontSize: "15px" }}>
                        {"download"}
                      </span>
                      {/* file.name */}
                      <DownloadForOfflineOutlined />
                    </a>
                  </IconButton>
                </Box>
              ) : isCall ? (
                message.callStatus == 0 ? ( // wating
                  isCurrentUser ? (
                    "در انتظار پاسخ تماس..."
                  ) : (
                    <Grid>
                      {"تماس تصویری ورودی"}
                      <Grid
                        container
                        direction={"row"}
                        display={"flex"}
                        justifyContent={"space-around"}
                        backgroundColor={"white"}
                        borderRadius={2}
                        padding={1}
                      >
                        <Box
                          backgroundColor="green"
                          width={"44px"}
                          borderRadius={"25px"}
                          padding={"5px"}
                        >
                          <StyledTooltip
                            title={
                              <React.Fragment>{"پذیرفتن تماس"}</React.Fragment>
                            }
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleAnswerCallClick(message)}
                            >
                              <Call sx={{ color: "white" }} />
                            </IconButton>
                          </StyledTooltip>
                        </Box>
                        <Box
                          backgroundColor="red"
                          width={"44px"}
                          borderRadius={"25px"}
                          padding={"5px"}
                        >
                          <StyledTooltip
                            title={<React.Fragment>{"رد تماس"}</React.Fragment>}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleRejectCallClick(message)}
                            >
                              <CallEnd sx={{ color: "white" }} />
                            </IconButton>
                          </StyledTooltip>
                        </Box>
                      </Grid>
                    </Grid>
                  )
                ) : message.callStatus == 1 ? (
                  "تماس پذیرفته شد" // accepted
                ) : (
                  "تماس پذیرفته نشد"
                ) // rejected
              ) : (
                message.message
              )}
            </Typography>
          </Grid>

          {/* icons and date */}
          <Grid
            container
            direction={"row"}
            display={"flex"}
            justifyContent={"flex-start"}
          >
            {!isCurrentUser && !isCall && (
              <StyledTooltip title={<React.Fragment>پاسخ دادن</React.Fragment>}>
                <IconButton
                  size="small"
                  onClick={() => handleReplyClick(message)}
                >
                  <Reply />
                </IconButton>
              </StyledTooltip>
            )}
            {!isCurrentUser || isDeleted || isCall || isFile ? null : (
              <>
                <StyledTooltip
                  title={<React.Fragment>ویرایش پیام</React.Fragment>}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(message)}
                  >
                    <Edit />
                  </IconButton>
                </StyledTooltip>
                <StyledTooltip
                  title={<React.Fragment>حذف پیام</React.Fragment>}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(message)}
                  >
                    <Delete />
                  </IconButton>
                </StyledTooltip>
              </>
            )}
            {isEdited && !isDeleted && !isCall && (
              <StyledTooltip
                title={<React.Fragment>این پیام ویرایش شده است</React.Fragment>}
              >
                <Typography
                  fontSize={"13px"}
                  marginRight={"10px"}
                  position={"relative"}
                  top={"7px"}
                >
                  edited
                </Typography>
              </StyledTooltip>
            )}
            {isRead && (
              <StyledTooltip
                title={<React.Fragment>این پیام خوانده شده است</React.Fragment>}
              >
                <IconButton size="small" sx={{ cursor: "default !important" }}>
                  {" "}
                  <DoneAll />{" "}
                </IconButton>
              </StyledTooltip>
            )}
            <Typography
              fontFamily={"shabnam"}
              marginRight={"15px"}
              fontSize={"13px"}
              position={"relative"}
              top={"9px"}
            >
              {Moment(message.sendTime).locale("fa").format("jYYYY/jM/jD") +
                " ساعت " +
                Moment(message.sendTime).format("HH:mm")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const WhiteIconButton = styled(IconButton)({
    color: "white",
  });

  return (
    <>
      <Helmet>
        <title>چت آنلاین</title>
      </Helmet>

      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        width={"100%"}
        height={{ xs: "auto", sm: "calc(100vh - 65px)" }}
        minHeight={{ xs: "100vh", sm: "calc(100vh - 65px)" }}
        sx={{
          backgroundColor: "rgba(173,216,230,0.7)",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        <Grid
          container
          direction={"column"}
          width={{ xs: "100%", sm: "35%", md: "25%" }}
          sx={{
            backgroundColor: "#1260cc",
            borderBottom: { xs: "1px solid grey", sm: "0px solid grey" },
          }}
        >
          {/* show user him/herself info */}
          {refUser.current && (
            <Grid
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent={"center"}
              padding={1}
              border={"1px solid grey"}
              borderRadius={2}
            >
              <Avatar
                src={refUser.current.profileImageUrl}
                alt={refUser.current.name}
              />
              <Typography fontFamily={"shabnam"} color={"white"}>
                {refUser.current.name}
              </Typography>
            </Grid>
          )}

          {/* show chats (persons that user has chatted with) */}
          <Grid container direction={"column"} height={"80%"}>
            {/* border={'1px solid grey'} borderRadius={2} */}
            <List
              sx={{
                height: "100%",
                flex: { xs: "0 0 auto", sm: "1 0 0" },
                overflow: "overlay",
              }}
            >
              {refChats.current.map((chat) => (
                <ListItem
                  sx={{
                    cursor: "pointer",
                    ...(refSelectedChat.current === chat.id && {
                      backgroundColor: "#6699cc",
                      borderRadius: 2,
                    }),
                  }}
                  key={chat.id}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <ListItemAvatar
                    onClick={() => {
                      if (chat.users[getUserIndex(chat.id)].lawyerId != null)
                        navigate(
                          `/LawyerPage/${
                            chat.users[getUserIndex(chat.id)].lawyerId
                          }`
                        );
                    }}
                  >
                    {chat.users[getUserIndex(chat.id)].lawyerId != null ? (
                      <StyledTooltip
                        title={<React.Fragment>مشاهده پروفایل</React.Fragment>}
                      >
                        <Avatar
                          src={
                            chat.users[getUserIndex(chat.id)].profileImageUrl
                          }
                          alt={chat.users[getUserIndex(chat.id)].name}
                        />
                      </StyledTooltip>
                    ) : (
                      <Avatar
                        src={chat.users[getUserIndex(chat.id)].profileImageUrl}
                        alt={chat.users[getUserIndex(chat.id)].name}
                      />
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{
                      fontFamily: "shabnam",
                      color: "white",
                      ...(refSelectedChat.current === chat.id && {
                        color: "black",
                      }),
                    }}
                    primary={chat.users[getUserIndex(chat.id)].name}
                  />
                  {refUserRole.current === "User" &&
                    chat.users[getUserIndex(chat.id)].lawyerId != null &&
                    chat.chatMessages.length > 2 && (
                      <StyledTooltip
                        title={<React.Fragment>نظر دادن</React.Fragment>}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleRateClick(
                              chat.users[getUserIndex(chat.id)].lawyerId
                            )
                          }
                        >
                          <RateReview />
                        </IconButton>
                      </StyledTooltip>
                    )}
                  {chat.chatMessages.length > 2 &&
                    refSelectedChat.current === chat.id && (
                      <StyledTooltip
                        title={<React.Fragment>تماس تصویری</React.Fragment>}
                      >
                        <IconButton size="small" onClick={handleCallClick}>
                          <VideoCall />
                        </IconButton>
                      </StyledTooltip>
                    )}
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Grid
          height={"100%"}
          width={{ xs: "100%", sm: "65%", md: "75%" }}
          sx={{
            backgroundImage: `url(${backPic})`,
            backgroundRepeat: { xs: "repeat-y", sm: "no-repeat" },
            backgroundSize: { xs: "100%", sm: "cover" },
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {refSelectedChat.current ? (
            <>
              {/* show messages */}
              <Grid
                container
                direction={"column"}
                height={{ xs: "auto", sm: isReplyActive ? "80%" : "85%" }}
              >
                {/* border={'1px solid grey'} borderRadius={2} */}
                <Grid
                  height={{ xs: "auto", sm: "100%" }}
                  sx={{ flex: "0 0 auto", overflow: "overlay" }}
                >
                  {refChats.current &&
                    refChats.current[
                      getChatIndexByChatId(refSelectedChat.current)
                    ].chatMessages.map((message, index) =>
                      renderMessage(message, index)
                    )}
                </Grid>
              </Grid>

              {/* input field */}
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  flexDirection: "column",
                }}
              >
                {isReplyActive && (
                  <Grid container justifyContent="flex-start">
                    <Grid
                      item
                      xs={12}
                      sx={{ overflow: "hidden", width: "200px" }}
                    >
                      <Typography
                        fontFamily="shabnam"
                        fontSize="13px"
                        sx={{
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          marginBottom: "2px",
                          padding: "2px",
                          border: "3px solid lightblue",
                          backgroundColor: "lightblue",
                          borderRadius: "7px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        در پاسخ به
                        {" : " +
                          (replyActiveMessage.isDeleted
                            ? "This message was deleted"
                            : replyActiveMessage.isFile
                            ? "فایل"
                            : replyActiveMessage.message)}
                      </Typography>
                    </Grid>
                  </Grid>
                )}

                <TextField
                  sx={{
                    flexGrow: 1,
                    "& input": {
                      color: "white",
                    },
                    "& svg": {
                      color: "white",
                    },
                  }}
                  ref={inputRef}
                  variant="outlined"
                  dir="rtl"
                  fullWidth
                  placeholder="پیام خود را بنویسید..."
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleEnter}
                  InputProps={{
                    dir: "rtl",
                    style: {
                      fontFamily: "shabnam",
                      fontSize: "15px",
                      color: "white",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        {isEditActive ? (
                          <>
                            <StyledTooltip
                              title={
                                <React.Fragment>ویرایش پیام</React.Fragment>
                              }
                            >
                              <WhiteIconButton
                                size="small"
                                onClick={handleEditMessage}
                              >
                                <Edit />
                              </WhiteIconButton>
                            </StyledTooltip>
                            <StyledTooltip
                              title={<React.Fragment>انصراف</React.Fragment>}
                            >
                              <WhiteIconButton
                                size="small"
                                onClick={handleCancelEditMessage}
                              >
                                <Cancel />
                              </WhiteIconButton>
                            </StyledTooltip>
                          </>
                        ) : isReplyActive ? (
                          <>
                            <StyledTooltip
                              title={
                                <React.Fragment>ارسال پاسخ</React.Fragment>
                              }
                            >
                              <WhiteIconButton
                                size="small"
                                onClick={handleReplyMessage}
                              >
                                <Reply />
                              </WhiteIconButton>
                            </StyledTooltip>
                            <StyledTooltip
                              title={<React.Fragment>انصراف</React.Fragment>}
                            >
                              <WhiteIconButton
                                size="small"
                                onClick={handleCancelReplyMessage}
                              >
                                <Cancel />
                              </WhiteIconButton>
                            </StyledTooltip>
                          </>
                        ) : (
                          <>
                            <StyledTooltip
                              title={
                                <React.Fragment>ارسال فایل</React.Fragment>
                              }
                            >
                              <WhiteIconButton size="small" component="label">
                                <AttachFile />
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={handleAttachFileClick}
                                />
                              </WhiteIconButton>
                            </StyledTooltip>
                            <StyledTooltip
                              title={
                                <React.Fragment>ارسال پیام</React.Fragment>
                              }
                            >
                              <WhiteIconButton
                                size="small"
                                onClick={handleSendClick}
                              >
                                <Send />
                              </WhiteIconButton>
                            </StyledTooltip>
                          </>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </>
          ) : (
            <Box sx={{ textAlign: "center", marginTop: "50%" }}>
              <Typography fontFamily={"shabnam"} color={"white"}>
                یکی از افراد را برای چت انتخاب کنید.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ChatPage;
