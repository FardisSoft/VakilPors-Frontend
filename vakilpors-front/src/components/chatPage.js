import { useState } from "react";
import { Avatar,Grid,Box,IconButton,InputAdornment,TextField,Typography,} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function ChatPage() {
  const [messages, setMessages] = useState([
    {
        text: "hff",
        sender: "thisuser",
        time: new Date().toLocaleTimeString(),
    },
    {
        text: "hljcllhc",
        sender: "thatuser",
        time: new Date().toLocaleTimeString(),
    },
    {
        text: "nandak",
        sender: "thisuser",
        time: new Date().toLocaleTimeString(),
    },
    {
        text: "yes",
        sender: "thisuser",
        time: new Date().toLocaleTimeString(),
    },
    {
        text: "kkkkkkkkkkkkkkkkkk",
        sender: "thatuser",
        time: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        text: inputValue,
        sender: "thatuser",
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleAttachFileClick = () => {
    // TODO: implement file attachment functionality
  };

  return (
    <Grid display="flex" bgcolor={'lightblue'} sx={{justifyContent:'space-around',alignItems:'stretch'}}>
         {/* 'rgb(204,212,143)' */}
    <Grid display="flex" flexDirection="column" height="100%" maxWidth={800} width={'100vw'}>
      <Grid display="flex" flexDirection="column" alignItems="center" justifyContent={'center'} padding={2} border={'1px solid blue'} borderRadius={2}>
        <Avatar />
        <Box marginLeft={2}>
          <Typography variant="h6">John Doe</Typography>
          {/* <Typography variant="subtitle2" color="textSecondary">
            Online
          </Typography> */}
        </Box>
      </Grid>
      <Grid flexGrow={1} overflow="auto" padding={2}>
        {messages.map((message, index) => (
          <Grid
            key={index}
            display="flex"
            flexDirection={message.sender === "thisuser" ? "row-reverse" : "row"}
            marginBottom={1}
          >
            <Avatar />
            <Box
              borderRadius={5}
              padding={1.5}
              marginLeft={message.sender === "thisuser" ? 1 : 2}
              marginRight={message.sender === "thisuser" ? 2 : 1}
              bgcolor={message.sender === "thisuser" ? "primary.main" : '#2A2F33'}
              color={message.sender === "thisuser" ? "primary.contrastText" : "textPrimary"}
            >
              <Typography variant="body1" paddingBottom={2} color={ message.sender === "thisuser" ? 'white' : '#FFBE00'} fontFamily={"shabnam"}>{message.text}</Typography>
              <Typography variant="body2" color="textSecondary">
                {message.time}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid display="flex" alignItems="center" padding={2}>
        <TextField
          dir="rtl"
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAttachFileClick}>
                  <AttachFileIcon />
                </IconButton>
                <IconButton onClick={handleSendClick}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
    </Grid>
  );
}

export default ChatPage;