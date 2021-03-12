import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '40%',
    marginVertical: '5%',
    backgroundColor: 'transparent',
  },
});

// console.log(require('~/utils'))`;

const Logo = () => (
  <Image source={require('!/assets/75RR.png')} style={styles.image} />
);

export default memo(Logo);
