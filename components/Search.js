import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Container, Header, Item, Icon, Input, Text } from "native-base";
import buildingData from "../buildings.json";
import SearchTile from "./SearchTile";
import filter from "lodash/filter";

const styles = StyleSheet.create({
  tile: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  }
})

const Search = () => {
  const jsonData = buildingData.buildings;

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(jsonData);

  const onChangeSearch = (query) => {
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(jsonData, (building) => {
      return contains(building, formattedQuery);
    });
    setData(filteredData.sort((a, b) => a.number > b.number));
    setSearchQuery(query);
  };

  const contains = (item, query) => {
    const name = (item.name + "").toLowerCase();
    const number = item.number + "";
    const numberWithBuilding = `Building ${item.number}`.toLowerCase();

    if (
      name.includes(query) ||
      number.includes(query) ||
      numberWithBuilding.includes(query)
    ) {
      return true;
    }

    return false;
  };

  return (
    <Container>
      <Header searchBar rounded style={{ borderColor: 'transparent' }}>
        <Item >
          <Icon name="ios-search" />
          <Input placeholder="Search" value={searchQuery} onChangeText={onChangeSearch} />
          <Icon name="ios-close" />
        </Item>
      </Header>
      <FlatList
        data={data}
        renderItem={({ item }) => <SearchTile style={styles.tile} item={item}></SearchTile>}
        keyExtractor={({ number }) => number.toString()}
        ListFooterComponent={<Text></Text>}
      />
    </Container>
  );
};

export default Search;
