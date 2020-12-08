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

const DashboardAdmin = ({ navigation }) => {
  const orderState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  const getOrderArray = () => {
    let orderValues = Object.values(orderState.orders);
    let orderKeys = Object.keys(orderState.orders);
    let orderArray = [];

    if (orderValues.length === orderKeys.length) {
      for (let i = 0; i < orderKeys.length; i++) {
        orderArray.push([orderKeys[i], orderValues[i]]);
      }
    }
    return orderArray;
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

export default memo(DashboardAdmin);
