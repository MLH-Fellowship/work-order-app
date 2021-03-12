import React, { useEffect, memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  Container, Text, List, Separator,
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import R from 'ramda';
import { getOrders } from '@/store/order';
import DashboardTile from '@/components/DashboardTile';

const DashboardTileSepatator = ({ group }) => (
  <Separator bordered><Text style={{ fontWeight: 'bold' }}>{group === 'MISC' ? 'MISC' : `Building ${group}`.toUpperCase() }</Text></Separator>
);

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});

const DashboardAdmin = ({ navigation }) => {
  const orderState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  const getOrderArray = () => {
    const { orders } = orderState;
    const ordersArray = Object.keys(orders).map((id) => ({
      id,
      ...orders[id],
    }));

    const grouped = R.groupBy(R.propOr('MISC', 'building'), ordersArray);
    const orderedWithSeparators = Object.keys(grouped)
      .sort(R.identity)
      .reduce((col, group) => [...col, { group }, ...grouped[group]], []);
    // console.log(orderedWithSeparators);
    // console.log(, ordersArray));
    // return Object.keys(orders)
    //   .reduce(
    //     (prev, id) => (orders[id].complete
    //       ? prev
    //       : [
    //         ...prev,
    //         {
    //           id,
    //           ...orders[id],
    //         },
    //       ]),
    //     [],
    //   );
    return orderedWithSeparators;
  };

  useEffect(
    () => navigation.addListener('focus', () => dispatch(getOrders())),
    [],
  );
  { /* <ListItem itemHeader>
          <Text>ACCOUNT</Text>
        </ListItem> */ }
  return (
    <Container>
      <List>
        <FlatList
          data={getOrderArray()}
          renderItem={({ item }) => (
            item.group ? <DashboardTileSepatator {...item} /> : <DashboardTile order={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<Text />}
        />
      </List>
    </Container>
  );
};

export default memo(DashboardAdmin);
