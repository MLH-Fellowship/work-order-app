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
  Input,
  Item,
  Label,
} from 'native-base';
import { logoutUser } from '@/api/auth';
import { getUserInfo } from '@/api/user';

const Settings = () => {

  const [visible, setVisible] = useState(false);
  //set change password
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [changePhoneNumberVisible, setChangePhoneNumberVisible] = useState(false);
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);


  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [altPhoneNumber, setAltPhoneNumber] = useState('');

  const [deleteText, setDeleteText] = useState('');

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
                  <Text>Primary Phone: {userInfo.phoneNumber}</Text>
                </ListItem>
                <ListItem>
                  <Text>Alternative Phone: {userInfo.altPhoneNumber}</Text>
                </ListItem>
                <ListItem>
                  <Text>Role: {userInfo['role']} </Text>
                </ListItem>
                {/* Password */}
                <ListItem itemHeader>
                  <Text>PASSWORD</Text>
                </ListItem>
                <ListItem onPress={() => {
                  setChangePasswordVisible(true);
                }}>
                  <Left>
                    <Text>Change/Reset Password</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                {/* Set Phone Numbers */}
                <ListItem itemHeader>
                  <Text>PHONE NUMBERS</Text>
                </ListItem>
                <ListItem onPress={() => {
                  setChangePhoneNumberVisible(true);
                }}>
                  <Left>
                    <Text>Change Phone Number(s)</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                {/* Advanced Options */}
                <ListItem itemHeader>
                  <Text>OTHER OPTIONS</Text>
                </ListItem>
                <ListItem onPress={() => {
                  setDeleteAccountVisible(true);
                }}>
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

        {/* Change password modal */}
        <Modal
        style={{
          justifyContent: "center",
        }}
        animationType="slide"
        presentationStyle="fullScreen"
        visible={changePasswordVisible}
        onRequestClose={() => {
          setChangePasswordVisible(!changePasswordVisible);
        }}>
          <Root>
            <Container>
              <Header>
                <Left>
                  <Button
                    transparent
                    onPress={() => {
                      setChangePasswordVisible(false);
                  }}>
                    <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body style={{flex: 3, alignItems: "center"}}>
                  <Title>Change Password</Title>
                </Body>
                <Right />
              </Header>
              <Content>
              <Item 
                  floatingLabel
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Label>Old Password</Label>
                  <Input
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    value={oldPassword}
                    onChangeText={(value) => setOldPassword(value)}
                  />
                </Item>

                <Item 
                  floatingLabel
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Label>New Password</Label>
                  <Input
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    value={newPassword}
                    onChangeText={(value) => setNewPassword(value)}
                  />
                </Item>

                <Item 
                  floatingLabel
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Label>Confirm New Password</Label>
                  <Input
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    value={confirmNewPassword}
                    onChangeText={(value) => setConfirmNewPassword(value)}
                  />
                </Item>

                <Button
                  block
                  style={{
                    marginBottom: 10,
                }}>
                  <Text style={{color: "white"}}>Confirm Password Change</Text>
                </Button>

                <Button
                  block
                  style={{
                    marginBottom: 10,
                }}>
                  <Text style={{color: "white"}}>Forgot Password</Text>
                </Button>

              </Content>
            </Container>
          </Root>
        </Modal>
        
        {/* Change phone number modal */}
        <Modal
        style={{
          justifyContent: "center",
        }}
        animationType="slide"
        presentationStyle="fullScreen"
        visible={changePhoneNumberVisible}
        onRequestClose={() => {
          setChangePhoneNumberVisible(!changePhoneNumberVisible);
        }}>
          <Root>
            <Container>
              <Header>
                <Left>
                  <Button
                    transparent
                    onPress={() => {
                      setChangePhoneNumberVisible(false);
                  }}>
                    <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body style={{flex: 3, alignItems: "center"}}>
                  <Title>Phone Number</Title>
                </Body>
                <Right />
              </Header>
              <Content>
                <Item 
                  floatingLabel
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Label>New Primary Phone Number</Label>
                  <Input
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    value={phoneNumber}
                    onChangeText={(value) => setPhoneNumber(value)}
                  />
                </Item>

                <Item 
                  floatingLabel
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Label>New Alternate Phone Number</Label>
                  <Input
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    value={altPhoneNumber}
                    onChangeText={(value) => setAltPhoneNumber(value)}
                  />
                </Item>
                
                <Button
                  block
                  style={{
                    marginBottom: 10,
                }}>
                  <Text style={{color: "white"}}>Confirm Changes</Text>
                </Button>

              </Content>
            </Container>
          </Root>
        </Modal>

        {/* Delete account modal */}
        <Modal
        style={{
          justifyContent: "center",
        }}
        animationType="slide"
        presentationStyle="fullScreen"
        visible={deleteAccountVisible}
        onRequestClose={() => {
          setDeleteAccountVisible(!deleteAccountVisible);
        }}>
          <Root>
            <Container>
              <Header>
                <Left>
                  <Button
                    transparent
                    onPress={() => {
                      setDeleteAccountVisible(false);
                  }}>
                    <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body style={{flex: 3, alignItems: "center"}}>
                  <Title>Delete Account</Title>
                </Body>
                <Right />
              </Header>
              <Content>
                <Text>Are you sure you want to delete your account?</Text>
                <Text>If yes, please type "delete my account" the textbox below</Text>

                <Item 
                  floatingLabel
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Label>Type "delete me"</Label>
                  <Input
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    value={deleteText}
                    onChangeText={(value) => setDeleteText(value)}
                  />
                </Item>

                <Button
                  block
                  style={{
                    marginBottom: 10,
                }}>
                  <Text style={{color: "white"}}>Delete Account</Text>
                </Button>
              </Content>
            </Container>
          </Root>
        </Modal>


      </Modal>

      

      

    </Container>

  );
};

export default Settings;
