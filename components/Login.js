import React, { memo, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Toast, Text, Container, Button, Spinner } from "native-base";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import { emailValidator, passwordValidator } from "../core/utils";
import { loginUser } from "../api/auth-api";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);

  const onLoginPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

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

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
          autoCapitalize="none"
        />
        <Button disabled={loading} primary={!loading} block onPress={onLoginPressed}>
          {loading && <Spinner /> || <Text>Login</Text>}
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default memo(LoginScreen);
