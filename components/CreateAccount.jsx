import React, { memo, useState } from 'react';
import {
  StyleSheet, KeyboardAvoidingView, Platform, Modal,
} from 'react-native';
import {
  Toast, Text, Container, Body, Title, Header, Button, Spinner, Input, Item, Label, View, ActionSheet, Picker
} from 'native-base';
import Logo from './Logo';
// import { emailValidator, passwordValidator } from '../core/utils';
import { loginUser, registerUser } from '../api/auth-api';
import theme from '../native-base-theme/variables/commonColor';
import { createUserInfo } from '../actions';
import { ScrollView } from 'react-native-gesture-handler';
//import { useDispatch } from 'react-redux';

export const CreateAccount = () => {

    const [loading, setLoading] = useState(false);
  
    const BUTTONS = ["Tenant", "Technician", "Admin", "Cancel"];
    const CANCEL_INDEX = 3;
  
    //const [error, setError] = useState('');
    //const [modalVisible, setModalVisible] = useState(false);
    const [newEmail, setNewEmail] = useState({ value: '', error: undefined });
    const [newPassword, setNewPassword] = useState({ value: '', error: undefined });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: undefined });
    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: undefined });
    const [altPhoneNumber, setAltPhoneNumber] = useState({ value: '', error: undefined });
    const [serviceRole, setServiceRole] = useState({ value: BUTTONS[0] });

    const onCreateAccountPressed = async () => {
        setModalVisible(true);
      };
    
      const onSubmitAccountPressed = async () => {
        Toast.show({
          text: 'Response on creating account',
          type: 'danger',
          duration: 3000,
        });
        if (loading) return;
    
        
    
        // validate email
        // const emailEnding = '@socom.mil';
        const domain = '@socom.mil';
    
        let emailError;
        if (!newEmail.value
          || newEmail.value.length <= domain.length) {
        //  || !newEmail.value.endsWith(domain)) {
        //  newEmail.length > 320) {
          emailError = 'invalid email';
        }
    
        // Validate password
        // Contains at least one capital letter, lowercase letter, number, and a special character
        // Is at least 9 characters long or at most 30 characters
        const passwordRegex1 = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$=+%^!*_])\S{9,30}/g;
        // Make sure that the password consists of only these characters
        const passwordRegex2 = /[^A-Za-z0-9#@$=+%^!*_]+/g;
    
        let passwordError;
        if (!newPassword.value || !passwordRegex1.test(newPassword.value) || passwordRegex2.test(newPassword.value)) {
          passwordError = 'invalid password';
        }
    
        // Make sure the passwords are the same in both cases
        let confirmPasswordError;
    
        if (!newPassword || newPassword.value !== confirmPassword.value) {
          confirmPasswordError = 'passwords do not match';
        }
    
        // Confirm that provided phone number is valid
        let phoneNumberError;
        const phoneNumberRegex = /([^0-9])*/g;
        if (!phoneNumber.value || phoneNumber.value.length !== 10 || !phoneNumberRegex.test(phoneNumber.value)) {
          phoneNumberError = 'invalid phone number';
        }
    
        // Confirm that alternate phone number is valid if it is entered
        let altPhoneNumberError;
        if (phoneNumber.value
          && altPhoneNumber.value.length > 0
          && (altPhoneNumber.value.length !== 10 || !phoneNumberRegex.test(altPhoneNumber.value))) {
          altPhoneNumberError = 'invalid phone number';
        }
    
        // const serviceRoleError = serviceRoleValidator(serviceRole.value);
    
        setNewEmail({ ...newEmail, error: emailError });
        setNewPassword({ ...newPassword, error: passwordError });
        setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
        setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
        setAltPhoneNumber({ ...altPhoneNumber, error: altPhoneNumberError });
        // setServiceRole({ ...serviceRole, error: serviceRoleError });
    
        if (emailError
          || passwordError
          || confirmPasswordError
          || phoneNumberError
          || altPhoneNumberError) {
          return;
        }
    
        setLoading(true);
    
        //createUserInfo('randomUser1')(data)(dispatch);
    
        const response = await registerUser(
          // name: 'testUser',
          newEmail.value,
          newPassword.value,
          {
            phoneNumber: phoneNumber.value,
            altPhoneNumber: altPhoneNumber.value,
            role: serviceRole.value
          }
        );
        // console.log(response);
        //if (response.error) {
          
        //}
        setLoading(false);
        // setModalVisible(false);
      };
    
      const onCancelCreateAccountPressed = async () => {
        setModalVisible(false);
      };
    
      const styles = StyleSheet.create({
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          margin: '5%',
        },
        fontColor: {
          color: 'white',
        },
      });

    return(
        <View>
            <Header>
                <Body>
                    <Title>Create New Account</Title>
                </Body>
            </Header>

              <Item
                floatingLabel
                error={newEmail.error !== undefined}
                style={{ marginVertical: 10 }}
              >
                <Label>Email</Label>
                <Input
                  // style={{ color: 'black' }}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCompleteType="email"
                  autoCapitalize="none"
                  value={newEmail.value}
                  onChangeText={(value) => setNewEmail({ value })}
                />
              </Item>
              <Text>Use your military email</Text>

              <Item
                floatingLabel
                error={newPassword.error !== undefined}
                style={{ marginVertical: 10 }}
              >
                <Label>Password</Label>
                <Input
                  // style={{ color: 'black' }}
                  textContentType="password"
                  autoCompleteType="password"
                  returnKeyType="done"
                  autoCapitalize="none"
                  // passwordRules="minlength: 7; maxlength: 20; required: lower; required: upper; required: digit;"
                  secureTextEntry
                  value={newPassword.value}
                  onChangeText={(value) => setNewPassword({ value })}
                />
              </Item>
              <Text>Use 9-30 characters and at least one lowercase, uppercase, number, and symbol</Text>

              <Item
                floatingLabel
                error={confirmPassword.error !== undefined}
                style={{ marginVertical: 10 }}
              >
                <Label>Confirm Password</Label>
                <Input
                  // style={{ color: 'black' }}
                  textContentType="password"
                  autoCompleteType="password"
                  returnKeyType="done"
                  autoCapitalize="none"
                  //= "minlength: 7; maxlength: 20; required: lower; required: upper; required: digit;"
                  secureTextEntry
                  value={confirmPassword.value}
                  onChangeText={(value) => setConfirmPassword({ value })}
                />
              </Item>
              
              <Item
                floatingLabel
                error={phoneNumber.error !== undefined}
                style={{ marginVertical: 10 }}
              >
                <Label>Phone Number</Label>
                <Input
                  // style={{ color: 'black' }}
                  keyboardType="phone-pad"
                  returnKeyType="done"
                  autoCapitalize="none"
                  value={phoneNumber.value}
                  onChangeText={(value) => setPhoneNumber({ value })}
                />
              </Item>
              <Text>Use 10-digit phone number</Text>

              <Item
                floatingLabel
                error={altPhoneNumber.error !== undefined}
                style={{ marginVertical: 10 }}
              >
                <Label>Alt. Phone Number</Label>
                <Input
                  // style={{ color: 'black' }}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  autoCapitalize="none"
                  value={altPhoneNumber.value}
                  onChangeText={(value) => setAltPhoneNumber({ value })}
                />
              </Item>
              <Text>Use 10-digit phone number or leave empty</Text>

              <Button
                style={{
                  marginVertical: 10,
                  marginBottom: 10,
                }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Select Service Role"
                    },
                    buttonIndex => {
                      //console.log("selected " + BUTTONS[buttonIndex]);
                      if(buttonIndex != CANCEL_INDEX) {
                        setServiceRole({value: BUTTONS[buttonIndex]});
                      }
                    }
                  )}
              >
                <Text style={{color:'white'}}>{serviceRole.value}</Text>
              </Button>
     
              <Button
                disabled={loading}
                primary={!loading}
                block
                onPress={onSubmitAccountPressed}
                style={{
                  marginBottom: 10,
                }}
              >
                {loading ? <Spinner /> : <Text>Submit</Text>}
              </Button>
              </View>
    );
};

//export default memo(CreateAccount);