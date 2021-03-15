import React, {useState} from 'react';
import {
  Modal,
} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Root, // for modal
  Header,
  Body,
  Title,
  Button,
} from 'native-base';
import { logoutUser, getUserInfo } from '@/api/auth';

const Settings = () => {

  const [visible, setVisible] = useState(false);
  const userInfo = getUserInfo();

  return (
    <Container>
      <Content>
        <List>
          <ListItem itemHeader>
            <Text>ACCOUNT</Text>
          </ListItem>
          <ListItem onPress={() => {
            setVisible(!visible);
          }}>
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

      <Modal
      style={{
        justifyContent: "center",
      }}
      animationType="slide"
      presentationStyle="fullScreen"
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
        <Root>
          <Container>
            <Header>
              <Left>
                <Button
                  transparent
                  onPress={() => {setVisible(false)}}
                >
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>Edit Profile</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <List>
                {/* Display Email */}
                <ListItem itemHeader>
                  <Text>ACCOUNT</Text>
                </ListItem>
                <ListItem>
                  <Text>Email: {userInfo.email}</Text>
                </ListItem>
                <ListItem>
                  <Text>Primary Phone: </Text>
                </ListItem>
                <ListItem>
                  <Text>Alternative Phone: </Text>
                </ListItem>
                <ListItem>
                  <Text>Role: </Text>
                </ListItem>
                {/* Password */}
                <ListItem itemHeader>
                  <Text>PASSWORD</Text>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text>Change Password</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text>Forgot Password</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                {/* Set Phone Numbers */}
                <ListItem itemHeader>
                  <Text>PHONE NUMBERS</Text>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text>Change Primary Phone Number</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text>Change Alternative Phone Number</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                {/* Advanced Options */}
                <ListItem itemHeader>
                  <Text>OTHER OPTIONS</Text>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text>Delete Account</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Container>
        </Root>
      </Modal>

    </Container>



  );
};

export default Settings;
