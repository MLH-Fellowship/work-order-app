import React, { useState } from 'react';
import {
  StyleSheet
} from 'react-native';
import {
  Toast, Text, Content, Body, Title, Header, Button, 
  Spinner, Input, Item, Label, View, Picker, Icon
} from 'native-base';
// import { emailValidator, passwordValidator } from '../core/utils';
import { registerUser } from '../api/auth';


export const CreateAccount = () => {

    const [loading, setLoading] = useState(false);
    const [newEmail, setNewEmail] = useState({ value: '', error: undefined });
    const [newPassword, setNewPassword] = useState({ value: '', error: undefined });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: undefined });
    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: undefined });
    const [altPhoneNumber, setAltPhoneNumber] = useState({ value: '', error: undefined });
    const [serviceRole, setServiceRole] = useState({ value: undefined });
    
      const onSubmitAccountPressed = async () => {
        if (loading) return;
    
        // validate email
        // const emailEnding = '@socom.mil';
        const domain1 = '@socom.mil';
        const domain2 = '@mail.mil';
    
        let emailError;
        if (!newEmail.value //|| 
           //(!newEmail.value.endsWith(domain1) && !newEmail.value.endsWith(domain2))) {
        ) {
          emailError = 'invalid email';
        }
    
        // Validate password
        // Contains at least one capital letter, lowercase letter, number, and a special character
        // Is at least 9 characters long or at most 30 characters
        const passwordRegex1 = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$=+%^!*_])\S{9,30}/g;
        // Make sure that the password consists of only these characters
        const passwordRegex2 = /[^A-Za-z0-9@$=+%^!*_.]+/g;
    
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
    
        if (emailError
          || passwordError
          || confirmPasswordError
          || phoneNumberError
          || altPhoneNumberError) {
            Toast.show({
                text: "One or more fields invalid",
                type: 'danger',
                duration: 3000,
              });
        }
        else {
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
            
            if(response.message.length > 0) {
              Toast.show({
                text: response.message,
                type: 'success',
                duration: 3000,
              });
            }
            if(response.error.length > 0) {
              Toast.show({
                    text: response.error,
                    type: 'danger',
                    duration: 3000,
                  });
            }

            setLoading(false);
        }
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
          <Content>
            <View
                style={{marginLeft: '5%', marginRight: '5%'}}
            >
            <Item
              floatingLabel
              error={newEmail.error !== undefined}
              style={{ marginVertical: 10 }}
            >
              <Label>Email</Label>
              <Input
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
                textContentType="password"
                autoCompleteType="password"
                returnKeyType="done"
                autoCapitalize="none"
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
                textContentType="password"
                autoCompleteType="password"
                returnKeyType="done"
                autoCapitalize="none"
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
              style={{ 
                marginVertical: 10 
              }}>
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
            <Item 
                picker
                style={{ 
                    marginVertical: 15,
                    paddingLeft: 0,
                    marginLeft: 0
                }}
            >
              <Label style={{ 
                  marginRight: '22%',
                  //justifyContent: 'left',
              }}>Service Role:</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select Your Role"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={serviceRole.value}
                onValueChange={(temp) => {setServiceRole({value:temp})}}
              >
                    <Picker.Item label="Tenant" value="tenant" />
                    <Picker.Item label="Technician" value="techincian" />
                    <Picker.Item label="Admin" value="admin" />
                </Picker>
            </Item>
    
            <Button
              disabled={loading}
              primary={!loading}
              block
              onPress={onSubmitAccountPressed}
              style={{
                marginVertical: 10,
                marginBottom: 10,
              }}
            >
              {loading ? <Spinner /> : <Text>Submit</Text>}
            </Button>
            </View>
          </Content>
        </View>
    );
};
