import React, { memo, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, Modal, View, Text } from "react-native";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator, passwordValidator, serviceRoleValidator, phoneNumberValidator } from "../core/utils";
import { loginUser } from "../api/auth-api";
import Toast from "../components/Toast";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [newAccountEmail, setNewAccountEmail] = useState({ value: "", error: "" });
  const [newAccountPassword, setNewAccountPassword] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
  const [altPhoneNumber, setAltPhoneNumber] = useState({ value: "", error: "" });
  const [serviceRole, setServiceRole] = useState({ value: "", error: "" });


  const _onCreateNewAccountPressed = async () => {
    setModalVisible(true);
  }

  const _onSubmitAccountPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(newAccountEmail.value);
    const passwordError = passwordValidator(newAccountPassword.value);
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    const altPhoneNumberError = phoneNumberValidator(altPhoneNumber.value);
    const serviceRoleError = serviceRoleValidator(serviceRole.value);
    
    if (emailError || passwordError || phoneNumberError || altPhoneNumberError || serviceRoleError) {
      setNewAccountEmail({ ...newAccountEmail, error: emailError });
      setNewAccountPassword({ ...newAccountPassword, error: passwordError });
      setPhoneNumber({ ...phoneNumberError, error: phoneNumberError });
      setAltPhoneNumber({ ...altPhoneNumber, error: altPhoneNumberError });
      setServiceRole({ ...serviceRole, error: serviceRoleError });

      return;
    }

  }

  const _onCancelCreateAccountPressed = async () => {
    setModalVisible(false);
  }

  const _onLoginPressed = async () => {
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
      setError(response.error);
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

      
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >

          
            <TextInput
              label="Email"
              returnKeyType="next"
              value={newAccountEmail.value}
              onChangeText={(text) => setNewAccountEmail({ value: text, error: "" })}
              error={!!newAccountEmail.error}
              errorText={newAccountEmail.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              returnKeyType="done"
            />

            <TextInput
              label="Password"
              returnKeyType="next"
              value={newAccountPassword.value}
              onChangeText={(text) => setNewAccountPassword({ value: text, error: "" })}
              error={!!newAccountPassword.error}
              errorText={newAccountPassword.error}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
            />

            <TextInput
              label="Phone Number"
              //returnKeyType="done"
              value={phoneNumber.value}
              onChangeText={(text) => setPhoneNumber({ value: text, error: "" })}
              error={!!phoneNumber.error}
              errorText={phoneNumber.error}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              returnKeyType="done"
            />  

            <TextInput
              label="Alt. Phone Number"
              //returnKeyType="done"
              value={altPhoneNumber.value}
              onChangeText={(text) => setAltPhoneNumber({ value: text, error: "" })}
              error={!!altPhoneNumber.error}
              errorText={altPhoneNumber.error}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              returnKeyType="done"
            />

            <TextInput
              label="Service Role"
              returnKeyType="done"
              value={serviceRole.value}
              onChangeText={(text) => setServiceRole({ value: text, error: "" })}
              error={!!serviceRole.error}
              errorText={serviceRole.error}
              autoCapitalize="none"
              returnKeyType="done"
            />

            <Button loading={loading} mode="contained" onPress={_onCancelCreateAccountPressed}>
              Cancel
            </Button>
            <Button loading={loading} mode="contained" onPress={_onSubmitAccountPressed}>
              Submit
            </Button>

          
          </KeyboardAvoidingView>
        </Modal>
    


      <Button loading={loading} mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <Button loading={loading} mode="contained" onPress={_onCreateNewAccountPressed}>
        Create Account
      </Button>

      <Toast message={error} onDismiss={() => setError("")} />
    </KeyboardAvoidingView>
  );
};

export default memo(LoginScreen);
