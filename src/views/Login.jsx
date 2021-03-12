import React, { memo, useState } from 'react';
import {
  StyleSheet, KeyboardAvoidingView, Platform, Modal,
} from 'react-native';
import {
  Toast, Text, Container, Button, Spinner, Input, Item, Label, View, Root
} from 'native-base';
import Logo from '@/components/Logo';
// import { emailValidator, passwordValidator } from '@/core/utils';
import { loginUser } from '@/api/auth';
import { ScrollView } from 'react-native-gesture-handler';
import {CreateAccount} from '@/components/CreateAccount';

const LoginScreen = ({ navigation }) => {
  // todo: use useEffect to get rid of error
  // :: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  const [email, setEmail] = useState({ value: '', error: undefined });
  const [password, setPassword] = useState({ value: '', error: undefined });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
    });

    if (response.error.length > 0) {
      console.log(response.error);
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
        {error && <Toast message={error} onDismiss={() => setError('')} />}
      </KeyboardAvoidingView>
    </Container>
  );
};

export default memo(LoginScreen);
