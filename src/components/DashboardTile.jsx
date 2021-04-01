import React, { memo } from 'react';
import {
  View, Text, Body, ListItem,
} from 'native-base';
import { useDispatch } from 'react-redux';
import R from 'ramda';
import { getDashboardDetailData } from '@/store/dashboard';
import theme from 'theme';

const StatusDot = ({ done }) => (
  <View style={{
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: done ? theme.brandSuccess : theme.brandDanger,
  }}
  />
);

// needs work on the text display
const DashboardTile = ({ order, navigation }) => {
  const dispatch = useDispatch();
  return (
    <ListItem
      last
      onPress={() => {
        dispatch(getDashboardDetailData(order));
        navigation.navigate('DashboardDetail', { order });
      }}
    >
      <Body>
        <View>
          <Text style={{ fontWeight: 'bold' }}>{order.room || 'No room provided.'}</Text>
        </View>
        <View>
          <Text>{order.description || 'No description provided.'}</Text>
        </View>
      </Body>
      <StatusDot done={order.complete} />
    </ListItem>
  );
};


export default memo(DashboardTile);
