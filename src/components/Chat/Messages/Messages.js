import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader/MessagesHeader";
import MessageForm from "./MessageForm/MessageForm";
import classes from "./Messages.module.css";

const Messages = () => {
  return (
    <>
      <MessagesHeader />
      <Segment>
        <Comment.Group className={classes.Messages} />
      </Segment>
      <MessageForm />
    </>
  );
};

export default Messages;
