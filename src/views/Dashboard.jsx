import React, { useEffect, memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Container, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '@/store/order';
import DashboardTile from '@/components/DashboardTile';

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});

const Dashboard = ({ navigation }) => {
  const orderState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  const getOrderArray = () => {
    const { orders } = orderState;
    return Object.keys(orders)
      .reduce(
        (prev, id) => (orders[id].complete
          ? prev
          : [
            ...prev,
            {
              id,
              ...orders[id],
            },
          ]),
        [],
      );
  };

  useEffect(
    () => navigation.addListener('focus', () => dispatch(getOrders())),
    [],
  );

  return (
    <Container>
      <FlatList
        data={getOrderArray()}
        renderItem={({ item }) => (
          <DashboardTile style={styles.listItem} order={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<Text />}
      />
    </Container>
  );
};

export default memo(Dashboard);
