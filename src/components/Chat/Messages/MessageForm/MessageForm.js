import React, { useState } from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import classes from "./MessageForm.module.css";
import firebase from "firebase/app";
import FileModal from "../FileModal/FileModal";
import uuidv4 from "uuid/v4";
import ProgressBar from "./ProgressBar/ProgressBar";
import { useSelector } from "react-redux";

const MessageForm = props => {
  const initialState = {
    message: ""
  };

  const isPrivate = useSelector(state => state.channel.isPrivate);

  //firebase storage Ref
  const storageRef = firebase.storage().ref();

  const [inputMessage, setInputMessage] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [uploadTask, setUploadTask] = useState("");
  const [percentUploaded, setPercentUploaded] = useState(0);
  const [uploadState, setUploadState] = useState("");

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setInputMessage(input => ({ ...input, [name]: value }));
  };

  //create message file for database
  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: props.user.uid,
        name: props.user.displayName,
        avatar: props.user.photoURL
      }
    };
    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = inputMessage;
    }

    return message;
  };

  //send Text Messages
  const sendMessage = e => {
    e.preventDefault();
    if (inputMessage.message) {
      setLoading(true);
      const ref = props.getMessagesRef();
      ref
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

  //Send Images/file Messages

  const sendFileMessage = fileUrl => {
    if (fileUrl) {
      const ref = props.getMessagesRef();
      ref
        .child(props.currentChannel.id)
        .push()
        .set(createMessage(fileUrl))
        .then(() => {
          setUploadState("done");
          setErrors([]);
        })
        .catch(err => {
          setLoading(false);

          setErrors(errors.concat(err));
        });
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  //pathName to store Images depend on channels

  const getPath = () => {
    if (isPrivate) {
      return `chat/public-${props.currentChannel.id}`;
    } else {
      return `chat/public`;
    }
  };

  const uploadFile = (file, metaData) => {
    //where files are going to store
    const filePath = `${getPath()}/${uuidv4()}.jpg`;

    const upload = storageRef.child(filePath).put(file, metaData);

    setUploadTask(upload);
    setUploadState("uploading");

    upload.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentUploaded(progress);
      },
      error => {
        setErrors(errors.concat(error));
        setUploadTask(null);
        setUploadState("error");
      },
      () => {
        upload.snapshot.ref.getDownloadURL().then(downloadUrl => {
          sendFileMessage(downloadUrl);
        });
      }
    );

    closeModal();
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
          disabled={loading}
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
        />
        <Button
          color="teal"
          disabled={uploadState === "uploading"}
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
          onClick={openModal}
        />
      </Button.Group>
      <FileModal
        uploadFile={(file, metaData) => uploadFile(file, metaData)}
        modal={modal}
        closeModal={closeModal}
      />
      {uploadState === "uploading" ? (
        <ProgressBar percentUploaded={percentUploaded} />
      ) : null}
    </Segment>
  );
};

export default MessageForm;
