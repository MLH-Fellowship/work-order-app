import React, { useEffect, memo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Container, Text } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../actions";
import DashboardTile from "./DashboardTile";

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  }
})

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
    <Container>
      <FlatList
        data={getOrderArray()}
        renderItem={({ item }) => (
          <DashboardTile style={styles.listItem} order={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<Text></Text>}
      />
    </Container>
  );
};

export default memo(DashboardAdmin);
