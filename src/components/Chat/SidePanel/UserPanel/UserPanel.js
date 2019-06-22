import React from "react";
import { Header, Grid, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../../../firebase";
import { useSelector } from "react-redux";

const UserPanel = () => {

  const signedInUserName = useSelector(
    state => state.user.currentUser.displayName
  );
  const userPhoto = useSelector(state => {
    return state.user.currentUser.photoURL;
  });

  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{signedInUserName}</strong>
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
      text: <span onClick={signOut}>Sign Out</span>
    }
  ];
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(response => console.log(response))
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
                  <Image src={userPhoto} spaced="right" avatar />
                  {signedInUserName}
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
