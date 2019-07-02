import React from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";
import "./Message.css";

const timeNow = timeStamp => moment(timeStamp).fromNow();

const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? "Message_self" : "null";
};

const isImage = (message) => {

  return message.hasOwnProperty("image") && !message.hasOwnProperty("content")
}
const Message = props => (
  <Comment>
    <Comment.Avatar src={props.message.user.avatar} />
    <Comment.Content className={isOwnMessage(props.message, props.user)}>
      <Comment.Author as="a">{props.message.user.name}</Comment.Author>
      <Comment.Metadata>{timeNow(props.message.timestamp)}</Comment.Metadata>
      {isImage(props.message) ? <Image src={props.message.image} className="Message_Image" /> :
        <Comment.Text>{props.message.content.message}</Comment.Text>}
    </Comment.Content>
  </Comment>
);

export default Message;
