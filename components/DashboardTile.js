import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { theme } from "../core/theme";
import { useDispatch } from "react-redux";
import { getDashboardDetailPageName } from "../actions/index";
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

const DashboardTile = ({ item, navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Card
        style={styles.card}
        onPress={() => {
          dispatch(getDashboardDetailPageName(item.building));
          navigation.navigate("DashboardDetail", item);
        }}
      >
        <Card.Title
          title={`Building ${item.building}`}
          titleStyle={styles.cardText}
          subtitleStyle={styles.cardText}
        />
        <Card.Content>
          <Paragraph style={styles.cardText}>{`Room ${item.room}`}</Paragraph>
          <Paragraph style={styles.cardText}>{`${item.description}`}</Paragraph>
          <Paragraph style={styles.cardText}>{`Status: ${
            item.complete ? "complete" : "incomplete"
          }   `}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default memo(DashboardTile);
