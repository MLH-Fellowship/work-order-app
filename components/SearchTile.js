import React, { memo } from "react";
import { Card, CardItem, Text, Right, Left } from "native-base";
import { useDispatch } from "react-redux";
import { activateModal } from "../actions/index";

import Building from "./MapMarkers/Building";
import Barracks from "./MapMarkers/Barracks";
import CarShop from "./MapMarkers/CarShop";
import Gym from "./MapMarkers/Gym";
import Medical from "./MapMarkers/Medical";
import Office from "./MapMarkers/Office";
import Dining from "./MapMarkers/Dining";

const purposeToIcon = {
  "Office" : Office,
  "Barracks" : Barracks,
  "Gym" : Gym,
  "Medical" : Medical,
  "Dining Facility" : Dining,
  "Car Shop" : CarShop,
}


const SearchTile = ({ item, style }) => {
  const dispatch = useDispatch();
  const TileIcon = purposeToIcon[item.purpose] || Building
  const title = item.name == null ? `Building ${item.number}` : item.name

  return (
    <Card style={StyleSheet.compose(styles.card, style)} onPress={() => dispatch(activateModal(item))}>
      <CardItem header>
        <Left>
          <Text>{title}</Text>
        </Left>
        <Right>
          <TileIcon/>
        </Right>
      </CardItem>
    </Card>
  );
};

export default memo(SearchTile);
