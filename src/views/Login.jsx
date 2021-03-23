import React, { memo, useState } from 'react';
import {
  StyleSheet, KeyboardAvoidingView, Platform, Modal,
} from 'react-native';
import {
  Toast, Text, Container, Button, Spinner, Input, Item, Label, View, Root, Header, Title, Body
} from 'native-base';
import Logo from '@/components/Logo';
// import { emailValidator, passwordValidator } from '@/core/utils';
import { loginUser } from '@/api/auth';
import { ScrollView } from 'react-native-gesture-handler';
import {CreateAccount} from '@/components/CreateAccount';
{/* account reset */}
import { resetPasswordForUser } from '../api/auth';

const LoginScreen = ({ navigation }) => {
  // todo: use useEffect to get rid of error
  // :: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  const [email, setEmail] = useState({ value: '', error: undefined });
  const [password, setPassword] = useState({ value: '', error: undefined });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [accountCreationModalVisible, setAccountCreationModalVisible] = useState(false);

  const [passwordResetModalVisible, setPasswordResetModalVisible] = useState(false);
  const [passwordResetEmail, setPasswordResetEmail] = useState({ value: '', error: undefined });

  const onCreateAccountPressed = async () => {
    setAccountCreationModalVisible(true);
  };

  const onCancelCreateAccountPressed = async () => {
    setAccountCreationModalVisible(false);
  };

  const onPasswordResetPressed = async () => {
    setPasswordResetModalVisible(true);
  };

  const onSendPasswordResetRequest = async () => {
    if(passwordResetEmail.value && passwordResetEmail.value.length > 0) {
      resetPasswordForUser(passwordResetEmail.value);
    }
    console.log(passwordResetEmail);
  }

  const onCancelPasswordResetPressed = async () => {
    setPasswordResetModalVisible(false);
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
    });

    if (response && response.error.length > 0) {
      console.log(response.error);
      Toast.show({
        text: response.error,
        type: 'danger',
        duration: 3000,
      });
    }

    setLoading(false);

    // If password is valid, but does not fit the criteria, prompt password reset


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
            secureTextEntry
            value={password.value}
            onChangeText={(value) => setPassword({ value })}
          />
        </Item>

        {/* Account Creation */}
        <Modal
          style={{
            justifyContent: 'flex-end',
          }}
          animationType="slide"
          presentationStyle="fullScreen"
          visible={accountCreationModalVisible}
          onRequestClose={() => {
            setAccountCreationModalVisible(!accountCreationModalVisible);
          }}
        >
          <Root>
            <Container>
            <KeyboardAvoidingView 
              enabled
            >
              <ScrollView
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
              >
                <CreateAccount/>
                <View
                  style={{marginLeft: '5%', marginRight: '5%'}}
                >
                <Button
                  disabled={loading}
                  primary={!loading}
                  block
                  onPress={onCancelCreateAccountPressed}
                  style={{marginBottom: 10}}
                >
                  {loading ? <Spinner /> : <Text>Back</Text>}
                </Button>
                </View>
              </ScrollView>
              </KeyboardAvoidingView>
          
          </Container>
          </Root>
        </Modal>

        {/* Password Reset */}
        <Modal
          style={{
            justifyContent: "center",
          }}
          animationType="slide"
          presentationStyle="fullScreen"
          visible={passwordResetModalVisible}
          onRequestClose={() => {
            setPasswordResetModalVisible(!passwordResetModalVisible);
          }}
        >
          <Root>
            <Container>
              <Header>
                <Body>
                  <Title>Reset Password</Title>
                </Body>
              </Header>
              <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                {/* Enter Email */}
                <Item 
                  floatingLabel
                  error={email.error !== undefined}
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Label>Email</Label>
                  <Input
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    value={passwordResetEmail.value}
                    onChangeText={(value) => setPasswordResetEmail({ value })}
                  />
                </Item>
                
                {/* Submit Password Reset Request */}
                <Button
                    disabled={loading}
                    primary={!loading}
                    block
                    onPress={onSendPasswordResetRequest}
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    {loading ? <Spinner /> : <Text>Submit</Text>}
                  </Button>
                  
                {/* Cancel Password Reset */}
                <Button
                    disabled={loading}
                    primary={!loading}
                    block
                    onPress={onCancelPasswordResetPressed}
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    {loading ? <Spinner /> : <Text>Cancel</Text>}
                </Button>
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
          style={{
            marginBottom: 10,
          }}
        >
          {loading ? <Spinner /> : <Text>Create Account</Text>}
        </Button>

        <Button
          disabled={loading}
          primary={!loading}
          block
          onPress={onPasswordResetPressed}
        >
          {loading ? <Spinner /> : <Text>Forgot Password?</Text>}
        </Button>

        {error ? <Toast message={error} onDismiss={() => setError('')} /> : null}
      </KeyboardAvoidingView>
    </Container>
  );
};

export default memo(LoginScreen);
