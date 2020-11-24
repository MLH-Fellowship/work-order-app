import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getOrders} from "../actions";
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

  let orders = Object.values(orderState.orders);
  orders.filter((order) => order.complete == false);

  useEffect(
    () => navigation.addListener("focus", () => dispatch(getOrders())),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <DashboardTile item={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
};

export default Dashboard;
