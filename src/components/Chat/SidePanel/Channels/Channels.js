import React, { useState, useEffect } from "react";
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  Button,
  Message
} from "semantic-ui-react";
import firebase from "../../../../firebase";
import { useSelector } from "react-redux";

const Channels = props => {
  // const [submitting, setSubmitting] = useState(false);
  // const [errors, setErrors] = useState({});
  const [channels, setChannels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState({
    channelName: "",
    channelDetails: ""
  });

  const userID = useSelector(state => state.user.currentUser.uid);

  const userName = useSelector(state => state.user.currentUser.displayName);
  const userPhoto = useSelector(state => state.user.currentUser.photoURL);

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

  const addChannels = () => {
    closeModal();
    setModalInput({});
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(modalInput.channelName, modalInput.channelDetails);
    if (modalInput.channelName !== "" && modalInput.channelDetails !== "") {
      addChannels();
    }
  };

  // let displayChannel = null;
  //
  // if (channels.length > 0) {
  //   displayChannel = channels.map(channel => {
  //     return (
  //       <Menu.Item
  //         key={channel.id}
  //         name={channel.name}
  //         style={{ opacity: 0.7 }}
  //       >
  //         #{channel.name}
  //       </Menu.Item>
  //     );
  //   });
  // }

  return (
    <>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" />
            CHANNELS(
          </span>
          {channels.length} )
          <Icon name="add" onClick={openModal} />
        </Menu.Item>
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
