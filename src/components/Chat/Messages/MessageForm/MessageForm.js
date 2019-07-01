import React, { useState } from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import classes from "./MessageForm.module.css";
import firebase from "firebase/app";

const MessageForm = props => {
  const initialState = {
    message: ""
  };
  const [inputMessage, setInputMessage] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setInputMessage(input => ({ ...input, [name]: value }));
  };

  const createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: props.user.uid,
        name: props.user.displayName,
        avatar: props.user.photoURL
      },
      content: inputMessage
    };
    return message;
  };

  const sendMessage = e => {
    e.preventDefault();
    if (inputMessage.message) {
      firebase
        .database()
        .ref("messages")
        .child(props.currentChannel.id)
        .push()
        .set(createMessage())
        .then(() => {
          setLoading(false);
          setInputMessage(initialState);
          setErrors([]);
        })
        .catch(err => {
          setLoading(false);

          setErrors(errors.concat(err));
        });
    } else {
      setErrors(errors.concat({ message: "Add a Message" }));
    }
  };

  return (
    <Segment className={classes.MessageForm}>
      <Input
        onChange={handleChange}
        fluid
        value={inputMessage.message}
        name="message"
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"} />}
        labelPosition="left"
        placeholder="Write your message"
        className={errors.length > 0 ? "error" : null}
      />
      <Button.Group icon widths="2">
        <Button
          onClick={sendMessage}
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  );
};

export default MessageForm;
