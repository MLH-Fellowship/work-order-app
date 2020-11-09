import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  <Image source={require("../assets/75RR.png")} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: "40%",
    height: "25%",
    marginBottom: 12,
    backgroundColor: "transparent"
  },
});

export default memo(Logo);
