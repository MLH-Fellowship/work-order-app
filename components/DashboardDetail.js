import React, { useState, useEffect, memo } from "react";
import * as Location from "expo-location";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Building from "./MapMarkers/Building";
import { Title, Text } from "react-native-paper";
import MapViewDirections from "react-native-maps-directions";
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.upperView}>
        <Text>Insert Image Here</Text>
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
