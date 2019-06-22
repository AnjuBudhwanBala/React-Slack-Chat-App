import React, { useEffect } from "react";
import { Header, Grid, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../../../firebase";
import { useSelector } from "react-redux";

const UserPanel = () => {
  const name = useSelector(state => state.user.currentUser);

  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{name ? name.displayName : null}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={logOut}>Sign Out</span>
    }
  ];
  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(response => console.log("signedOut"))
      .catch(error => console.log(error));
  };
  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          {/* App Header */}
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>DevChat</Header.Content>
          </Header>
          {/* User Dropdown  */}
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={name ? name.photoURL : null}
                    spaced="right"
                    avatar
                  />
                  {name ? name.displayName : null}
                </span>
              }
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
