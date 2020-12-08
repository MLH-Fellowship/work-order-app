import React, { useState, useEffect, memo } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Title, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-start", // vertical alignment
    alignItems: "flex-start", // horizontal alignment
    padding: "2%",
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.text,
  },
});

const DashboardDetail = ({ route, navigation }) => {
  const {
    building,
    coordinates,
    description,
    problem,
    room,
    user,
    image,
  } = route.params;

  console.log(image);

  return (
    <View style={styles.container}>
      <View style={styles.upperView}>
        {image == null ? (
          <Title style={styles.text}>No image uploaded</Title>
        ) : (
          <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
        )}
      </View>

      <View style={styles.bottomView}>
        <Title style={styles.text}>Room:</Title>
        <Text style={styles.text}>{room}</Text>
        <Title style={styles.text}>Work Order Description:</Title>
        <Text style={styles.text}>{description}</Text>
        <Title style={styles.text}>Work Order Problem:</Title>
        <Text style={styles.text}>{problem}</Text>
      </View>
    </View>
  );
};

export default memo(DashboardDetail);
