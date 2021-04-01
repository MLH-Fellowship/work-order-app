import React, { useState, useEffect } from 'react';
import firebase from '@/api/firebase';
import MainNavigation from './main';
import LoginNavigation from './login';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function NavigationController (){
  // todo access store user
  const [user, setUser] = useState();

  // eslint-disable-next-line consistent-return
  async function onAuthStateChanged(newUserState) {
    // if (newUserState && !newUserState.emailVerified) {
    //   try {
    //     await newUserState.sendEmailVerification();
    //     console.log('Verification email sent.');
    //   } catch (e) {
    //     console.error('Error sending verification email:', e);
    //   }
    //   return firebase.auth().signOut();
    // }
    setUser(newUserState);
  }
  useEffect(() => firebase.auth().onAuthStateChanged(onAuthStateChanged), []);

  return user
    ? <MainNavigation Tab={Tab} user={user} />
    : <LoginNavigation Tab={Tab} user={user} />
}

export default NavigationController;