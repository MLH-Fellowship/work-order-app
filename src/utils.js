import { Linking, Alert, Platform } from 'react-native';

export const callNumber = (phone) => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};

export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  if (!email.endsWith('@socom.mil')) return 'Invalid email';

  return '';
};

export const isValidPassword = (password) => {

  // Validate password
  // Contains at least one capital letter, lowercase letter, number, and a special character
  // Is at least 9 characters long or at most 30 characters
  const passwordRegex1 = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$=+%^!*_])\S{9,30}/g;
  // Make sure that the password consists of only these characters
  const passwordRegex2 = /[^A-Za-z0-9@$=+%^!*_.]+/g;

  if (!password || 
    !passwordRegex1.test(password) || 
    passwordRegex2.test(password)) {
      return false;
  }

  return true;
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const serviceRoleValidator = (role) => {
  if (!role || role.length <= 0) return 'Service role cannot be empty.';

  return '';
};

export const phoneNumberValidator = (phoneNumber) => {
  const re = /([0-9])\w+/;

  if (!phoneNumber) return 'Phone number cannot be empty';
  if (!re.test(phoneNumber)) return 'Phone number can only consist of numbers';
  if (phoneNumber.length < 10) return 'Phone number not long enough';
  if (phoneNumber.length > 10) return 'Phone number too short';

  return '';
};
