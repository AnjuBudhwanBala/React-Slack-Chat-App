import React, { useEffect, useState, useCallback } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader/MessagesHeader";
import MessageForm from "./MessageForm/MessageForm";
import Message from "./Message/Message";
import classes from "./Messages.module.css";
import firebase from "firebase/app";
import { useSelector } from "react-redux";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const user = useSelector(state => state.user.currentUser);
  const currentChannel = useSelector(state => state.channel.currentChannel);
  //get boolean value
  const isPrivate = useSelector(state => state.channel.isPrivate);

  const getMessagesRef = useCallback(
    () => {
      const privateMessagesRef = firebase.database().ref("privateMessages");
      const messagesRef = firebase.database().ref("messages");
      return isPrivate ? privateMessagesRef : messagesRef;
    },
    [isPrivate]
  );
  useEffect(
    () => {
      const ref = getMessagesRef();
      const loadedMessages = [];
      function firebaseMessagesLoader(snap) {
        loadedMessages.push(snap.val());
        console.log(loadedMessages);
        setMessages([...loadedMessages]);

        //count unique users
        countUniqueUsers(loadedMessages);
      }
      if (currentChannel) {
        ref.child(currentChannel.id).once("value", snap => {
          setMessages([]);
          ref
            .child(currentChannel.id)
            .on("child_added", firebaseMessagesLoader);
        });
      }

      return function() {
        firebase
          .database()
          .ref("channels")
          .off("child_added", firebaseMessagesLoader);
      };
    },
    [setMessages, currentChannel, isPrivate, getMessagesRef]
  );

  //display messages from database
  const displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message key={message.timestamp} message={message} user={user} />
    ));

  // count Number of Unique Users
  const countUniqueUsers = loadedMessages => {
    const uniqueUsers = loadedMessages.reduce((acc, messg) => {
      if (!acc.includes(messg.user.name)) {
        acc.push(messg.user.name);
      }
      return acc;
    }, []);
    const plural =
      uniqueUsers.length === 0 || uniqueUsers.length === 1 ? "user" : "users";
    const numberOfUniqueUsers = `${uniqueUsers.length} ${plural}`;
    setUniqueUsers(numberOfUniqueUsers);
  };

  //search messages or Username
  const handleSearch = event => {
    //store search Value
    setSearchInput(event.target.value);
    setSearchLoading(true);
    //copy of messages
    setSearchResult(messages);

    if (searchResult.length > 0) {
      const regex = new RegExp(searchInput, "gi");

      const searchOutput = searchResult.reduce((acc, message) => {
        if (
          (message.content && message.content.message.match(regex)) ||
          message.user.name.match(regex)
        ) {
          acc.push(message);
        }
        return acc;
      }, []);

      setSearchResult(searchOutput);
      setTimeout(() => {
        setSearchLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <MessagesHeader
        uniqueUsers={uniqueUsers}
        change={handleSearch}
        searchValue={searchInput}
        searchLoading={searchLoading}
      />
      <Segment>
        <Comment.Group className={classes.Messages}>
          {searchInput
            ? displayMessages(searchResult)
            : displayMessages(messages)}
        </Comment.Group>
      </Segment>
      <MessageForm
        user={user}
        currentChannel={currentChannel}
        getMessagesRef={getMessagesRef}
      />
    </>
  );
};

export default Messages;
