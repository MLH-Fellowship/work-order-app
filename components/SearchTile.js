import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import { theme } from "../core/theme";
import Building from "./MapMarkers/Building";
import Barracks from "./MapMarkers/Barracks";
import CarShop from "./MapMarkers/CarShop";
import Gym from "./MapMarkers/Gym";
import Medical from "./MapMarkers/Medical";
import Office from "./MapMarkers/Office";
import Dining from "./MapMarkers/Dining";

const styles = StyleSheet.create({
  container: {
    padding: "2%",
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: theme.colors.primary,

    elevation: 5,
  },
  cardText: {
    color: "white",
  },
});

const SearchTile = ({ item }) => (
  <View style={styles.container}>
    <Card style={styles.card}>
      <Card.Title
        title={`Building ${item.number}`}
        titleStyle={styles.cardText}
        subtitleStyle={styles.cardText}
        left={(props) =>
          item.purpose === "Office" ? (
            <Office />
          ) : item.purpose === "Barracks" ? (
            <Barracks />
          ) : item.purpose === "Gym" ? (
            <Gym />
          ) : item.purpose === "Medical" ? (
            <Medical />
          ) : item.purpose === "Dining Facility" ? (
            <Dining />
          ) : item.purpose === "Car Shop" ? (
            <CarShop />
          ) : (
            <Building />
          )
        }
      />
    </Card>
  </View>
);

export default SearchTile;
