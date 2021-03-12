import React from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
} from 'native-base';
import { logoutUser } from '@/api/auth';

const Settings = () => (
  <Container>
    <Content>
      <List>
        <ListItem itemHeader>
          <Text>ACCOUNT</Text>
        </ListItem>
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
        <ListItem itemHeader>
          <Text>SUPPORT</Text>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Report a problem</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem itemHeader>
          <Text>ABOUT</Text>
        </ListItem>
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
        <ListItem>
          <Left>
            <Text>Version: 1.0.0</Text>
          </Left>
        </ListItem>
      </List>
    </Content>
  </Container>
);

export default Settings;
