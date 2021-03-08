import React, { memo, useState } from 'react';
import {
  StyleSheet, KeyboardAvoidingView, Platform, Modal,
} from 'react-native';
import {
  Toast, Text, Container, Button, Spinner, Input, Item, Label, View, ActionSheet, Picker, Root
} from 'native-base';
import Logo from './Logo';
// import { emailValidator, passwordValidator } from '../core/utils';
import { loginUser, registerUser } from '../api/auth-api';
import theme from '../native-base-theme/variables/commonColor';
//import { createUserInfo } from '../actions';
import { ScrollView } from 'react-native-gesture-handler';
//import { useDispatch } from 'react-redux';
import {CreateAccount} from './CreateAccount';



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: undefined });
  const [password, setPassword] = useState({ value: '', error: undefined });
  const [loading, setLoading] = useState(false);

  const BUTTONS = ["Tenant", "Technician", "Admin", "Cancel"];
  const CANCEL_INDEX = 3;

  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState({ value: '', error: undefined });
  const [newPassword, setNewPassword] = useState({ value: '', error: undefined });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: undefined });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: undefined });
  const [altPhoneNumber, setAltPhoneNumber] = useState({ value: '', error: undefined });
  const [serviceRole, setServiceRole] = useState({ value: BUTTONS[0] });  

  const onCreateAccountPressed = async () => {
    setModalVisible(true);
  };

  const onCancelCreateAccountPressed = async () => {
    setModalVisible(false);
  };

  const onLoginPressed = async () => {
    if (loading) return;

    // TODO: move validation to signup not login
    // const emailError = emailValidator(email.value);
    // const passwordError = passwordValidator(password.value);

    // if (emailError || passwordError) {
    //   setEmail({ ...email, error: emailError });
    //   setPassword({ ...password, error: passwordError });
    //   return;
    // }

    setLoading(true);
    // console.log('loading...');
    const response = await loginUser({
      email: email.value,
      password: password.value,
      phoneNumber: phoneNumber.value,
      altPhoneNumber: altPhoneNumber.value,
      serviceRole: serviceRole.value
    });

    // console.log('response received');
    //if (response.error) {
    //  console.log(response.error);
    //  Toast.show({
    //    text: response.error,
    //    type: 'danger',
    //    duration: 3000,
    //  });
    //}

    setLoading(false);
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

  return (
    <Container>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Logo />

        <Item floatingLabel error={email.error !== undefined}>
          <Label>Email</Label>
          <Input
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCompleteType="email"
            autoCapitalize="none"
            value={email.value}
            onChangeText={(value) => setEmail({ value })}
          />
        </Item>

        <Item floatingLabel error={password.error !== undefined} style={{ marginVertical: 20 }}>
          <Label>Password</Label>
          <Input
            textContentType="password"
            autoCompleteType="password"
            autoCapitalize="none"
            //passwordRules="minlength: 9; maxlength: 30; required: lower; required: upper; required: digit;"
            secureTextEntry
            value={password.value}
            onChangeText={(value) => setPassword({ value })}
          />
        </Item>

        
        <Modal
          style={{
            justifyContent: 'flex-end',
          }}
          animationType="slide"
          presentationStyle="fullScreen"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Root>
            <Container>

            <KeyboardAvoidingView
                enabled
                //style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <ScrollView
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
              >
              
                <CreateAccount/>

              <Button
                disabled={loading}
                primary={!loading}
                block
                onPress={onCancelCreateAccountPressed}
                style={{
                  marginBottom: 10,
                }}
              >
                {loading ? <Spinner /> : <Text>Back</Text>}
              </Button>

              </ScrollView>
              </KeyboardAvoidingView>
          
          </Container>
          </Root>
        </Modal>

        <Button
          disabled={loading}
          primary={!loading}
          block
          onPress={onLoginPressed}
          style={{
            marginBottom: 10,
          }}
        >
          {loading ? <Spinner /> : <Text>Login</Text>}
        </Button>
        <Button
          disabled={loading}
          primary={!loading}
          block
          onPress={onCreateAccountPressed}
        >
          {loading ? <Spinner /> : <Text>Create Account</Text>}
        </Button>
        <Toast message={error} onDismiss={() => setError('')} />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default memo(LoginScreen);
