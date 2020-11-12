import React, {memo} from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
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

const DashboardTile = ({ item }) => (
  <View style={styles.container}>
    <Card style={styles.card}>
      <Card.Title
        title={`Building ${item.building}`}
        titleStyle={styles.cardText}
        subtitleStyle={styles.cardText}
      />
      <Card.Content >
        <Paragraph style={styles.cardText}>{`Room ${item.room}`}</Paragraph>
        <Paragraph style={styles.cardText}>{`${item.description}`}</Paragraph>
      </Card.Content>
    </Card>
  </View>
);

export default memo(DashboardTile);
