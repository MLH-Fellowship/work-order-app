import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from '../actions'
import Button from './Button'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    backgroundColor: "#2BD1FB",
  },
  map: {
    flex: 1,
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
    </View>
  );
};

export default Dashboard;