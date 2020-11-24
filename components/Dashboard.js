import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../actions";
import Button from "./Button";
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

  useEffect(
    () =>
      navigation.addListener("focus", () =>
        dispatch(getUserOrders("testuser"))
      ),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orderState.userOrders}
        renderItem={({ item }) => <DashboardTile item={item} navigation={navigation}/>}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
};

export default Dashboard;
