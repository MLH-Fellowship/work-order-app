import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Card, CardItem, Text, Right, Left,
} from 'native-base';
import { useDispatch } from 'react-redux';
import { activateModal } from '@/store/modal';

import {
  Building, Barracks, CarShop, Gym, Medical, Office, Dining
} from '@/components/MapMarkers';

const purposeToIcon = {
  Office,
  Barracks,
  Gym,
  Medical,
  'Dining Facility': Dining,
  'Car Shop': CarShop,
};

const SearchTile = ({ item, style }) => {
  const dispatch = useDispatch();
  const TileIcon = purposeToIcon[item.purpose] || Building;
  const title = item.name == null ? `Building ${item.number}` : item.name;

  return (
    <TouchableOpacity onPress={() => dispatch(activateModal(item))}>
      <Card style={style}>
        <CardItem header>
          <Left>
            <Text>{title}</Text>
          </Left>
          <Right>
            <TileIcon />
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default memo(SearchTile);
