import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import AppNavBar from "../appNavBar";

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
    const socket = new SockJS("http://localhost:8080/chat");
    stompClient = over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setCurrentUser({ ...currentUser, connected: true });
    stompClient.subscribe("/topic/messages", onMessageReceived);
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


    const messageListItems = chatMessages.map((message, index) => <ListItem id={index}>
      Sent at {message.time} by {message.from}: {message.text}
    </ListItem>);
    return (<Container ref={messagesRef}><List>{messageListItems}</List></Container>);
  };

  const sendMessage = () => {
      if (!stompClient || !currentUser.connected || !currentUser.nicknameSet || currentUser.message === "") {
        return;
      }

      const chatMessage = {
        from: currentUser.nickname,
        text: currentUser.message,
      };
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setInputText('');
      setUserData({ ...currentUser, message: "" });
  }

  const sendNickname = () => {
    if (currentUser.nickname !== '') {
      setInputText('');
      setCurrentUser({...currentUser, nicknameSet: true});
    }
  }

  const handleNicknameChange = (event) => {
    setInputText(event.target.value);
    setCurrentUser({ ...currentUser, nickname: inputText });
  };


  const handleMessageChange = (event) => {
      setInputText(event.target.value);
      setCurrentUser({ ...currentUser, message: inputText });
    };

    return ( 
      <Container maxWidth={false}>
          <AppNavBar parent={this}/>
          <MessagesList/>
          <Container maxWidth={false}>
            <TextField label={!currentUser.nicknameSet ? 'Set your nickname' : 'Enter message as ' + currentUser.nickname} 
            variant="outlined" value={inputText}
              onChange={!currentUser.nicknameSet ? handleNicknameChange : handleMessageChange}
            />
            <Button onClick={!currentUser.nicknameSet ? sendNickname : sendMessage}>Send</Button>
          </Container>
      </Container>
    );
  }