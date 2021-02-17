import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { theme } from "../core/theme";
import { useDispatch } from "react-redux";
import { getDashboardDetailData } from "../actions/index";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

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

const DashboardTile = ({ order, navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Card
        style={styles.card}
        onPress={() => {
          dispatch(getDashboardDetailData(order));
          navigation.navigate("DashboardDetail", order);
        }}
      >
        <Card.Title
          title={`Building ${order.building}`}
          titleStyle={styles.cardText}
          subtitleStyle={styles.cardText}
        />
        <Card.Content>
          <Paragraph style={styles.cardText}>{`Room ${order.room}`}</Paragraph>
          <Paragraph
            style={styles.cardText}
          >{`${order.description}`}</Paragraph>
          <Paragraph style={styles.cardText}>{`Status: ${
            order.complete ? "complete" : "incomplete"
          }   `}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default memo(DashboardTile);
