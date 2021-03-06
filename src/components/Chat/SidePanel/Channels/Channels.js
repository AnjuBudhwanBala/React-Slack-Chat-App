import React, { useState, useEffect, useCallback } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "firebase/app";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../../../store/actionTypes/actionTypes";

const Channels = props => {
  const [channels, setChannels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [activeChannelId, setActiveChannelId] = useState("");
  const signedInUser = useSelector(state => state.user.currentUser);

  const initialModalState = {
    channelName: "",
    channelDetails: ""
  };

  const [modalInput, setModalInput] = useState(initialModalState);
  const dispatch = useDispatch();

  //load channel data from database
  useEffect(
    () => {
      function onFirebaseUpdate(snap) {
        setChannels(currentChannelValue => {
          return currentChannelValue.concat(snap.val());
        });
      }
      firebase
        .database()
        .ref("channels")
        .on("child_added", onFirebaseUpdate);

      //remove listener when component unmounts
      return function() {
        firebase
          .database()
          .ref("channels")
          .off("child_added", onFirebaseUpdate);
      };
    },
    [signedInUser]
  );

  //setting active current channel
  const changeChannel = useCallback(
    channel => {
      setActiveChannelId(channel.id);
      dispatch({
        type: actionTypes.SET_CURRENT_CHANNEL,
        currentChannel: channel
      });
      dispatch({
        type: actionTypes.SET_PRIVATE_CHANNEL,
        privateChannel: false
      });
    },
    [dispatch]
  );

  //setchannel after render
  useEffect(
    () => {
      const firstChannel = channels[0];
      if (firstLoad && channels.length > 0) {
        changeChannel(firstChannel);
        setFirstLoad(false);
      }
    },
    [firstLoad, channels, changeChannel]
  );

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setModalInput(input => ({ ...input, [name]: value }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //add channel to database
  const addChannel = () => {
    //to generate unique id for every user
    const key = firebase
      .database()
      .ref("channels")
      .push().key;

    const newChannel = {
      id: key,
      name: modalInput.channelName,
      details: modalInput.channelDetails,
      createdBy: {
        name: signedInUser.displayName,
        avatar: signedInUser.photoURL
      }
    };
    firebase
      .database()
      .ref("channels")
      .child(key)
      .set(newChannel)

      .then(response => {
        closeModal();
        setModalInput(initialModalState);
      })
      .catch(error => console.log(error));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (modalInput) {
      if (modalInput.channelName !== "" && modalInput.channelDetails !== "") {
        return addChannel();
      }
    }

    return false;
  };

  //display channelList in userPanel
  let displayChannel = null;
  if (channels.length > 0) {
    displayChannel = channels.map(channel => {
      return (
        <Menu.Item
          key={channel.id}
          name={channel.name}
          style={{ opacity: 0.7 }}
          onClick={() => changeChannel(channel)}
          active={channel.id === activeChannelId}
        >
          #{channel.name}
        </Menu.Item>
      );
    });
  }
  console.log(channels);
  return (
    <>
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="exchange" />
            CHANNELS(
          </span>
          {channels.length})
          <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {displayChannel}
      </Menu.Menu>
      {/* Add Channel Modal */}
      <Modal basic open={isModalOpen} onClose={closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                value={modalInput.channelName}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                value={modalInput.channelDetails}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Channels;
