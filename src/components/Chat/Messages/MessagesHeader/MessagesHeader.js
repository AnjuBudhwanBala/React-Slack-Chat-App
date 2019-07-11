import React, { useState } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";

const MessagesHeader = props => {
  const currentChannel = useSelector(state => state.channel.currentChannel);
  const isPrivate = useSelector(state => state.channel.isPrivate);

  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {currentChannel ? currentChannel.name : "Channel"}
          {isPrivate ? (
            "@"
          ) : (
            <Icon
              name={props.isChannelStar ? "star" : "star outline"}
              color={props.isChannelStar ? "yellow" : "black"}
              onClick={() => props.click(currentChannel.name)}
              id={currentChannel ? currentChannel.name : null}
            />
          )}
        </span>
        <Header.Subheader>{props.uniqueUsers}</Header.Subheader>
      </Header>

      {/* Channel Search Input */}
      <Header floated="right">
        <Input
          loading={props.searchLoading}
          onChange={props.change}
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
          value={props.searchValue}
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
