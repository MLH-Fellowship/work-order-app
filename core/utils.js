export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  if(!email.endsWith('@socom.mil')) return "Invalid email";

  return "";
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const serviceRoleValidator = (role) => {
  if (!role || role.length <= 0) return "Service role cannot be empty.";

  return "";
};

export const phoneNumberValidator = (phoneNumber) => {
  const re = /([0-9])\w+/;

  if (!phoneNumber) return "Phone number cannot be empty"
  if (!re.test(phoneNumber)) return "Phone number can only consist of numbers";
  if(phoneNumber.length < 10) return "Phone number not long enough";
  if(phoneNumber.length > 10) return "Phone number too short";
  

  return "";
};