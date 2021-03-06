import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel/UserPanel";
import Channels from "./Channels/Channels";
import DirectMessage from "./DirectMessage/DirectMessage";
import StarredChannel from "./StarredChannel/StarredChannel";

const SidePanel = () => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
    >
      <UserPanel />
      <StarredChannel />
      <Channels />
      <DirectMessage />
    </Menu>
  );
};

export default SidePanel;
