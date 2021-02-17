import React, { useEffect, memo } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../actions";
import { theme } from "../core/theme";
import DashboardTile from "./DashboardTile";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

const Dashboard = ({ navigation }) => {
  const orderState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  const getOrderArray = () => {
    const { orders } = orderState
    return Object.keys(orders)
      .reduce(
        (prev, id) =>
          orders[id].complete
            ? prev
            : [
              ...prev,
              {
                id,
                ...orders[id]
              }
            ],
        [])
  };

  useEffect(
    () => navigation.addListener("focus", () => dispatch(getOrders())),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={getOrderArray()}
        renderItem={({ item }) => (
          <DashboardTile order={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
};

export default memo(Dashboard);
