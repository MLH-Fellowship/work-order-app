import React from "react";
import {
  Container,
  Content,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Separator,
} from "native-base";
import { theme } from "../core/theme";
import { StyleSheet, View } from "react-native";
import { logoutUser } from "../api/auth-api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

const Settings = () => {
  return (
    <View style={styles.container}>
      <Container>
        <Content>
          {/* <Separator />
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: "Image URL" }} />
            </Left>
            <Body>
              <Text>User Name</Text>
              <Text note>Rank: Private</Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
            </Right>
          </ListItem> */}
          <Separator>
            <Text>ACCOUNT</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>Edit Profile</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={logoutUser}>
            <Left>
              <Text>Sign Out</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <Separator>
            <Text>SUPPORT</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>Report a problem</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <Separator>
            <Text>ABOUT</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>Privacy Policy</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Terms of Service</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem last>
            <Left>
              <Text>Version: 1.0.0</Text>
            </Left>
          </ListItem>
        </Content>
      </Container>
    </View>
  );
};

export default Settings;
