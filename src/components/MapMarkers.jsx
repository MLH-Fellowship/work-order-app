import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },
});

export const Barracks = memo(() => (<Image source={require('!/assets/barracks.png')} style={styles.image} />));
export const Building = memo(() => (<Image source={require('!/assets/building.png')} style={styles.image} />));
export const CarShop = memo(() => (<Image source={require('!/assets/carshop.png')} style={styles.image} />));
export const Dining = memo(() => (<Image source={require('!/assets/dining.png')} style={styles.image} />));
export const Gym = memo(() => (<Image source={require('!/assets/gym.png')} style={styles.image} />));
export const Medical = memo(() => (<Image source={require('!/assets/medical.png')} style={styles.image} />));
export const Office = memo(() => (<Image source={require('!/assets/office.png')} style={styles.image} />));
