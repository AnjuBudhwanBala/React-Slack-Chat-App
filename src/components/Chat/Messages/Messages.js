import React, { useEffect, useState } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader/MessagesHeader";
import MessageForm from "./MessageForm/MessageForm";
import Message from "./Message/Message";
import classes from "./Messages.module.css";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { join } from "path";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const user = useSelector(state => state.user.currentUser);
  const currentChannel = useSelector(state => state.channel.currentChannel);

  useEffect(
    () => {
     const loadedMessages = [];
       function firebaseMessagesLoader(snap) {
           loadedMessages.push(snap.val())
           setMessages(loadedMessages)
       }

      if (currentChannel) {
        firebase
          .database()
          .ref("messages")
          .child(currentChannel.id)
          .on("child_added", firebaseMessagesLoader);
      }
      return function() {
        firebase
          .database()
          .ref("channels")
          .off("child_added", firebaseMessagesLoader);
      };
    },
    [currentChannel,setMessages]
  );

  //display messages from database
  const displayMessages = () =>
    messages.length > 0 &&
    messages.map(message => (
      <Message key={message.timestamp} message={message} user={user} />
    ));
  return (
    <>
      <MessagesHeader />
      <Segment>
        <Comment.Group className={classes.Messages}>
          {displayMessages()}
        </Comment.Group>
      </Segment>
      <MessageForm user={user} currentChannel={currentChannel} />
    </>
  );
};

export default Messages;
