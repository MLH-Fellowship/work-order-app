import React, { useEffect, memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  Container, Text, List, Separator, View, ListItem, Body
} from 'native-base';
import { useSelector, useDispatch, connect } from 'react-redux';
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

const Dashboard = ({ userReducer, navigation }) => {
  const orderState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  // console.log('userReducer', userReducer)

  const getOrderArray = () => {
    const { orders } = orderState;
    const ordersArray = Object.keys(orders).map((id) => ({
      id,
      ...orders[id],
    }));

    const filteredOrdersArray = {
      admin: () => ordersArray,
      tenant: () => ordersArray.filter(R.propEq('submitted_by', userReducer.username)),
      techincian: () => ordersArray.filter(R.propEq('assigned_to', userReducer.username)),
    }[userReducer.role]()
      
    const grouped = R.groupBy(R.propOr('MISC', 'building'), filteredOrdersArray);
    const orderedWithSeparators = Object.keys(grouped)
      .sort(R.identity)
      .reduce((col, group) => [...col, { group }, ...grouped[group]], []);
    return orderedWithSeparators;
  };

  useEffect(
    () => navigation.addListener('focus', () => dispatch(getOrders())),
    [],
  );
  return (
    <Container>
      <List>
        <FlatList
          style={{ height: '100%' }}
          data={getOrderArray()}
          renderItem={({ item }) => (
            item.group ? <DashboardTileSepatator {...item} /> : <DashboardTile order={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<Text />}
          ListEmptyComponent={
            <ListItem last>
              <Body>
                <Text>{'No work orders found...'}</Text>
              </Body>
           </ListItem>
          }
        />
      </List>
    </Container>
  );
};

export default memo(connect(R.pick(['userReducer']))(Dashboard));
