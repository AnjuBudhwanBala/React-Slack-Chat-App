import React, { useState, useEffect, useCallback } from "react";
import { Menu, Icon } from "semantic-ui-react";
import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../../store/actionTypes/actionTypes";

const DirectMessage = () => {
  const [users, setUsers] = useState([]);

  const [activeChannel, setActiveChannel] = useState("");

  const currentUser = useSelector(state => state.user.currentUser);

  const dispatch = useDispatch();

  const addListeners = useCallback(currentUserId => {
    //to get all the users which are not logged in
    const loadedUsers = [];
    firebase
      .database()
      .ref("users")
      .on("child_added", snap => {
        if (currentUserId !== snap.key) {
          let user = snap.val();

          user["uid"] = snap.key;
          user["status"] = "offline";
          loadedUsers.push(user);
          setTimeout(() => {
            setUsers(loadedUsers);
          }, 1000);
        }
      });

    //set presence true in database
    firebase
      .database()
      .ref(".info/connected")
      .on("value", snap => {
        if (snap.val() === true) {
          const ref = firebase
            .database()
            .ref("presence")
            .child(currentUserId);
          ref.set(true);
          // When I disconnect, remove this device
          ref.onDisconnect().remove(err => {
            if (err !== null) {
              console.error(err);
            }
          });
        }
      });
    //to setuser status online/offline

    firebase
      .database()
      .ref("presence")
      .on("child_added", snap => {
        if (currentUserId === snap.key) {
          setUsers(users => ({ ...users, [users.status]: "online" }));
        }
      });
    firebase
      .database()
      .ref("presence")
      .on("child_removed", snap => {
        if (currentUserId !== snap.key) {
          console.log(snap.key);
        }
      });
  }, []);

  useEffect(
    () => {
      if (currentUser) {
        addListeners(currentUser.uid);
      }
    },
    [currentUser, addListeners]
  );

  //setDirectChannel
  const setDirectChannel = user => {
    setActiveChannel(user.uid);
  };

  //changeChannel
  const changeChannel = user => {
    if (currentUser) {
      const getChannelId = () => {
        return user.uid > currentUser.uid
          ? `${user.uid}/${currentUser.uid}`
          : `${currentUser.uid}/${user.uid}`;
      };
      const channelData = {
        id: getChannelId(),
        name: user.displayName
      };

      dispatch({
        type: actionTypes.SET_CURRENT_CHANNEL,
        currentChannel: channelData
      });
      dispatch({
        type: actionTypes.SET_PRIVATE_CHANNEL,
        privateChannel: true
      });
      setDirectChannel(user);
    }
  };

  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="mail" /> DIRECT MESSAGES
        </span>{" "}
        ({users ? users.length : 0})
      </Menu.Item>
      {users.length > 0 &&
        users.map(user => (
          <Menu.Item
            key={user.uid}
            style={{ opacity: 0.7, fontStyle: "italic" }}
            onClick={() => changeChannel(user)}
            active={activeChannel === user.uid}
          >
            <Icon
              name="circle"
              color={user.status === "online" ? "green" : "red"}
            />
            @ {user.displayName}
          </Menu.Item>
        ))}
    </Menu.Menu>
  );
};

export default DirectMessage;
