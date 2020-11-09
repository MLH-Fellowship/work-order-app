import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Barracks = () => (
  <Image source={require('../../assets/barracks.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },
});

export default memo(Barracks);