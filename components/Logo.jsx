import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/75RR.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '40%',
    marginVertical: '5%',
    backgroundColor: 'transparent',
  },
});

export default memo(Logo);
