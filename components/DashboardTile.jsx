import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  View, Card, CardItem, Text, H1, Body,
} from 'native-base';
import { useDispatch } from 'react-redux';
import { getDashboardDetailData } from '../actions/index';

// needs work on the text display
const DashboardTile = ({ order, navigation, style }) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => {
      dispatch(getDashboardDetailData(order));
      navigation.navigate('DashboardDetail', order);
    }}
    >
      <Card style={style}>
        <CardItem header>
          <H1>{`Building ${order.building}`}</H1>
        </CardItem>
        <CardItem>
          <Text>Room:</Text>
          <Body />
          <Text>{order.room}</Text>
        </CardItem>
        <CardItem>
          <View style={{ flex: 1 }}>
            <Text>Description:</Text>
            <View style={{ marginTop: 10 }}>
              <Text>{order.description || 'No description provided.' }</Text>
            </View>
          </View>
        </CardItem>
        <CardItem>
          <Text>Status:</Text>
          <Body />
          <Text>{order.complete ? 'Complete' : 'Incomplete'}</Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default memo(DashboardTile);
