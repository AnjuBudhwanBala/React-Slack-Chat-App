import React, { useState, useEffect, useCallback } from "react";
import { Menu, Icon } from "semantic-ui-react";

import { useDispatch } from "react-redux";
import * as actionTypes from "../../../../store/actionTypes/actionTypes";

const StarredChannel = () => {
  const [starChannel, setStarChannel] = useState([]);
  const [activeChannelId, setActiveChannelId] = useState("");

  const dispatch = useDispatch();

  //setting active current channel onChange
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
  //display channels on UI
  const displayChannels = () => {
    starChannel.length > 0 &&
      starChannel.map(channel => (
        <Menu.Item
          key={channel.id}
          onClick={() => changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.id === activeChannelId}
        >
          # {channel.name}
        </Menu.Item>
      ));
  };
  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="star" /> STARRED
        </span>{" "}
        ({starChannel.length})
      </Menu.Item>
      {displayChannels(starChannel)}
    </Menu.Menu>
  );
};

export default StarredChannel;
