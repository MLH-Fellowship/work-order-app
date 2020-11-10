import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  container: {
    padding: "2%"
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
      />
    </Card>
  </View>
);

export default SearchTile;