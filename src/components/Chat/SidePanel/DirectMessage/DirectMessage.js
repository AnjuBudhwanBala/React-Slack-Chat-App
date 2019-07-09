import React, { useState, useEffect, useCallback } from "react";
import { Menu, Icon } from "semantic-ui-react";
import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../../store/actionTypes/actionTypes";

const DirectMessage = () => {
  const [users, setUsers] = useState([]);
  const [activeChannel, setActiveChannel] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  let currentUserId = null;
  if (currentUser) {
    currentUserId = currentUser.uid;
  }

  //change UI online/offline status
  const addStatusToUser = (snapKey, loadedUsers, connected = true) => {
    const updatedUsers = loadedUsers.reduce((acc, user) => {
      if (user.key === snapKey) {
        user["status"] = `${connected ? "online" : "offline"}`;
      }
      return acc.concat(user);
    }, []);
    setUsers(updatedUsers);
  };
  //callback funtion from useEffect
  const addListeners = useCallback(
    () => {
      const usersRef = firebase.database().ref("users");
      const connectedRef = firebase.database().ref(".info/connected");
      // This is where we will store data about being online/offline.
      const userStatusDatabaseRef = firebase.database().ref("/status/");

      //to load all the users in our database except the login User
      const loadedUsers = [];
      usersRef.on("child_added", snap => {
        if (currentUserId !== snap.key) {
          let user = snap.val();
          user["key"] = snap.key;
          user["status"] = "offline";
          loadedUsers.push(user);
        }
        setUsers([...loadedUsers]);
      });

      connectedRef.on("value", function(snapshot) {
        if (snapshot.val() === true) {
          const ref = userStatusDatabaseRef.child(currentUserId);
          // When I disconnect, remove this device
          ref.onDisconnect().remove();
          // We're connected (or reconnected)
          ref.set(true);
        }
      });
      userStatusDatabaseRef.on("child_added", snap => {
        addStatusToUser(snap.key, loadedUsers);
      });
      userStatusDatabaseRef.off("child_added", snap => {
        addStatusToUser(snap.key, loadedUsers, false);
      });
    },
    [currentUserId]
  );

  //useEffect
  useEffect(
    () => {
      if (currentUserId) {
        addListeners(currentUserId);
      }
    },
    [currentUserId, addListeners]
  );

  //setDirectChannel
  const setDirectChannel = user => {
    setActiveChannel(user.uid);
  };

  //changeChannel
  const changeChannel = user => {
    if (currentUserId) {
      const getChannelId = () => {
        return user.uid > currentUserId
          ? `${user.uid}/${currentUserId}`
          : `${currentUserId}/${user.uid}`;
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
            key={user.key}
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
