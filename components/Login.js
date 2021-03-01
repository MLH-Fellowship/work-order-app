import React, { memo, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Toast, Text, Container, Button, Spinner, Input, Item, Label } from "native-base";
import Logo from "../components/Logo";;
// import { emailValidator, passwordValidator } from "../core/utils";
import { loginUser } from "../api/auth-api";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: undefined });
  const [password, setPassword] = useState({ value: "", error: undefined });
  const [loading, setLoading] = useState(false);

  const onLoginPressed = async () => {
    if (loading) return;

    // TODO: move this to signup not login
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
      })
    }

    setLoading(false);
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      margin: "5%",
    },
  });

  return (
    <Container>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
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
            onChangeText={value =>  setEmail({ value })}
          />
        </Item>

        <Item floatingLabel error={password.error !== undefined} style={{marginVertical: 20 }}>
          <Label>Password</Label>
          <Input
            textContentType="password"
            autoCompleteType="password"
            autoCapitalize="none"
            passwordRules="minlength: 7; maxlength: 20; required: lower; required: upper; required: digit;"
            secureTextEntry
            value={password.value}
            onChangeText={value =>  setPassword({ value })}
          />
        </Item>
        <Button disabled={loading} primary={!loading} block onPress={onLoginPressed}>
          {loading && <Spinner /> || <Text>Login</Text>}
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default memo(LoginScreen);
