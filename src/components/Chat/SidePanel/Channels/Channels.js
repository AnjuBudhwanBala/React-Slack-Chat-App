import React, { useState, useEffect } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "../../../../firebase";
import { useSelector } from "react-redux";

const Channels = props => {
  const [channels, setChannels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialModalState = {
    channelName: "",
    channelDetails: ""
  };
  const [modalInput, setModalInput] = useState(initialModalState);

  const signedInUser = useSelector(state => state.user.currentUser);

  async function fetchMyAPI() {
    let loadedChannels = [];
    await firebase
      .database()
      .ref("channels")
      .on("child_added", snap => {
        loadedChannels.push(snap.val());
        setChannels(loadedChannels);
      });
  }

  //useEffect

  useEffect(() => {
    fetchMyAPI();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setModalInput(input => ({ ...input, [name]: value }));
  };

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

  let displayChannel = null;

  if (channels.length > 0) {
    displayChannel = channels.map(channel => {
      return (
        <Menu.Item
          key={channel.id}
          name={channel.name}
          style={{ opacity: 0.7 }}
        >
          #{channel.name}
        </Menu.Item>
      );
    });
  }

  return (
    <>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
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
