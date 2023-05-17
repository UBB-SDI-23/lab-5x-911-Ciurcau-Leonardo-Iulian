import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import AppNavBar from "../appNavBar";
import App from "../app";

let stompClient = null;

export const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    nickname: "",
    message: "",
    connected: false,
    nicknameSet: false
  });

  useEffect(() => {
    connectToChat();
  }, []);

  const connectToChat = () => {
    const socket = new SockJS(App.API_URL + "/api/ws/chat");
    stompClient = over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setCurrentUser({ ...currentUser, connected: true });
    stompClient.subscribe("/api/ws/topic/messages", onMessageReceived);
    console.log("Connected");
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setChatMessages((previousMessages) => [...previousMessages, message]);
  };

  const onError = (error) => {
    console.log(error);
  };

  
  const MessagesList = () => {

    const messagesRef = useRef(null);

    useEffect(() => {
      if (messagesRef.current)
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [chatMessages]);


    const messageListItems = chatMessages.map((message, index) => <ListItem key={index}>
        <ListItemText>
          <Container style={{display: 'flex', paddingLeft: '0px'}}>
            <Typography>
              Sent at <span style={{color: 'blue'}}>{message.time}
              </span> by <span style={{color: 'red'}}>{message.from}</span>: 
            </Typography>
            <Typography whiteSpace="pre-line" marginLeft={'5px'}>
              {message.text}
            </Typography>
          </Container>
        </ListItemText>
    </ListItem>);
    return (
          <List ref={messagesRef} marginLeft={'0px'}>
            {messageListItems}
          </List>
        );
  };

  const sendMessage = () => {
      if (!stompClient || !currentUser.connected || !currentUser.nicknameSet || currentUser.message === "") {
        return;
      }

      const chatMessage = {
        from: currentUser.nickname,
        text: currentUser.message,
      };
      stompClient.send("/api/ws/app/chat", {}, JSON.stringify(chatMessage));
      setInputText('');
      setCurrentUser({ ...currentUser, message: "" });
  }

  const sendNickname = () => {
    if (currentUser.nickname !== '') {
      setInputText('');
      setCurrentUser({...currentUser, nicknameSet: true});
    }
  }

  useEffect(() => {
    if (!currentUser.nicknameSet)
      setCurrentUser({ ...currentUser, nickname: inputText });
    else
      setCurrentUser({ ...currentUser, message: inputText });
  }, [inputText]);

  const handleNicknameChange = (event) => {
    setInputText(event.target.value);
  };

  const handleMessageChange = (event) => {
      setInputText(event.target.value);
    };

    return ( 
      <Container maxWidth={false} style={{overflowX: 'hidden'}}>
          <AppNavBar parent={this}/>
          <Container style={{position: 'absolute', left: '35%', overflowX: 'hidden', maxWidth: '1080px'}}>
            <MessagesList/>
            <TextField multiline={currentUser.nicknameSet}
             label={!currentUser.nicknameSet ? 'Set your nickname' : 'Enter message as ' + currentUser.nickname} 
              variant="outlined" value={inputText}
              onChange={!currentUser.nicknameSet ? handleNicknameChange : handleMessageChange}
            />
            <Button onClick={!currentUser.nicknameSet ? sendNickname : sendMessage}>Send</Button>
          </Container>
      </Container>
    );
  }