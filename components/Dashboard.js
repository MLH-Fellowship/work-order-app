import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from '../actions'
import Button from './Button'
import { theme } from "../core/theme";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

const Dashboard = () => {
  const orderState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  console.log('ORDER STATE', orderState)

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => dispatch(getOrders())}>
          Get Orders
      </Button>
      <Button mode="contained" onPress={() => dispatch(getUserOrders('testuser'))}>
          Get User Orders
      </Button>
    </View>
  );
};

export default Dashboard;