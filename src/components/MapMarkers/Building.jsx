import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Building = () => (
  <Image source={require('!/assets/building.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },
});

export default memo(Building);
