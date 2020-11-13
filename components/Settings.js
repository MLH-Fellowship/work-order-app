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
  text: {
    color: theme.colors.text,
  },
  seperatorText:{
    color: "grey"
  },
  seperator: {
    backgroundColor: theme.colors.background,
  },
});

const Settings = () => {
  return (
    <View style={styles.container}>
      <Container style={styles.container}>
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
          <Separator style={styles.seperator}>
            <Text style={styles.seperatorText}>ACCOUNT</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text style={styles.text}>Edit Profile</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={logoutUser}>
            <Left>
              <Text style={styles.text}>Sign Out</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <Separator style={styles.seperator}>
            <Text style={styles.seperatorText}>SUPPORT</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text style={styles.text}>Report a problem</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <Separator style={styles.seperator}>
            <Text style={styles.seperatorText}>ABOUT</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text style={styles.text}>Privacy Policy</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text style={styles.text}>Terms of Service</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem last>
            <Left>
              <Text style={styles.text}>Version: 1.0.0</Text>
            </Left>
          </ListItem>
        </Content>
      </Container>
    </View>
  );
};

export default Settings;
