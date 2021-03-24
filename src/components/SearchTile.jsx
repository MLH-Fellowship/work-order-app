import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Card, CardItem, Text, Right, Left,
} from 'native-base';

import { purposeToIcon } from '@/components/MapMarkers';

const SearchTile = ({ navigation, item, style }) => {
  const TileIcon = purposeToIcon[item.purpose] || purposeToIcon.Building;
  const title = item.name == null ? `Building ${item.number}` : item.name;

  return (
    <TouchableOpacity onPress={() => navigation.push('Submit Order', { building: item })}>
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
