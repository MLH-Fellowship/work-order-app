import React, { memo, useState } from 'react';
import {
  StyleSheet, KeyboardAvoidingView, Platform, Modal,
} from 'react-native';
import {
  Toast, Text, Container, Button, Spinner, Input, Item, Label, View,
} from 'native-base';
import Logo from './Logo';
// import { emailValidator, passwordValidator } from '../core/utils';
import { loginUser } from '../api/auth-api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: undefined });
  const [password, setPassword] = useState({ value: '', error: undefined });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState({ value: '', error: undefined });
  const [newPassword, setNewPassword] = useState({ value: '', error: undefined });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: undefined });
  const [altPhoneNumber, setAltPhoneNumber] = useState({ value: '', error: undefined });
  const [serviceRole, setServiceRole] = useState({ value: '', error: undefined });

  const onCreateAccountPressed = async () => {
    setModalVisible(true);
  }

  const onSubmitAccountPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(newAccountEmail.value);
    const passwordError = passwordValidator(newAccountPassword.value);
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    const altPhoneNumberError = phoneNumberValidator(altPhoneNumber.value);
    //const serviceRoleError = serviceRoleValidator(serviceRole.value);
    
    console.log('phone number: ' + phoneNumber.value);

    if (emailError || passwordError || phoneNumberError || altPhoneNumberError || serviceRoleError) {
      setNewAccountEmail({ ...newAccountEmail, error: emailError });
      setNewAccountPassword({ ...newAccountPassword, error: passwordError });
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
      setAltPhoneNumber({ ...altPhoneNumber, error: altPhoneNumberError });
      //setServiceRole({ ...serviceRole, error: serviceRoleError });

      return;
    }

  }

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

    const response = await loginUser({
      email: email.value,
      password: password.value,
    });

    if (response.error) {
      Toast.show({
        text: response.error,
        type: 'danger',
        duration: 3000,
      });
    }

    setLoading(false);
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5%',
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
            passwordRules="minlength: 7; maxlength: 20; required: lower; required: upper; required: digit;"
            secureTextEntry
            value={password.value}
            onChangeText={(value) => setPassword({ value })}
          />
        </Item>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View>
            <Item floatingLabel error={newEmail.error !== undefined}>
              <Label>Email</Label>
              <Input
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCompleteType="email"
                autoCapitalize="none"
                value={email.value}
                onChangeText={(value) => setNewEmail({ value })}
              />
            </Item>

            <Item
              floatingLabel
              error={newPassword.error !== undefined}
              style={{ marginVertical: 20 }}
            >
              <Label>Password</Label>
              <Input
                textContentType="password"
                autoCompleteType="password"
                autoCapitalize="none"
                passwordRules="minlength: 7; maxlength: 20; required: lower; required: upper; required: digit;"
                secureTextEntry
                value={newPassword.value}
                onChangeText={(value) => setNewPassword({ value })}
              />
            </Item>

            <Item
              floatingLabel
              error={phoneNumber.error !== undefined}
              style={{ marginVertical: 20 }}
            >
              <Label>Phone Number</Label>
              <Input
                returnKeyType="done"
                autoCapitalize="none"
                value={phoneNumber.value}
                onChangeText={(value) => setPhoneNumber({ value })}
              />
            </Item>

            <Item
              floatingLabel
              error={altPhoneNumber.error !== undefined}
              style={{ marginVertical: 20 }}
            >
              <Label>Alt. Phone Number</Label>
              <Input
                returnKeyType="done"
                autoCapitalize="none"
                value={altPhoneNumber.value}
                onChangeText={(value) => setAltPhoneNumber({ value })}
              />
            </Item>

            <Item
              floatingLabel
              error={serviceRole.error !== undefined}
              style={{ marginVertical: 20 }}
            >
              <Label>Service Role</Label>
              <Input
                returnKeyType="done"
                autoCapitalize="none"
                value={serviceRole.value}
                onChangeText={(value) => setServiceRole({ value })}
              />
            </Item>

            <Button
              disabled={loading}
              primary={!loading}
              block
              onPress={onCancelCreateAccountPressed}
            >
              {loading ? <Spinner /> : <Text>Cancel</Text>}
            </Button>
            <Button
              disabled={loading}
              primary={!loading}
              block
              onPress={onSubmitAccountPressed}
            >
              {loading ? <Spinner /> : <Text>Submit</Text>}
            </Button>
          </View>
        </Modal>
        <Button
          disabled={loading}
          primary={!loading}
          block
          onPress={onLoginPressed}
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
