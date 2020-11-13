import React, { useState, useMemo } from "react";
import { Searchbar } from "react-native-paper";

import { StyleSheet, View, FlatList, Text } from "react-native";
import { theme } from "../core/theme";
import buildingData from "../buildings.json";
import SearchTile from "./SearchTile";
import filter from "lodash/filter";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchbar: {
    margin: "2%",
  },
});

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
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <SearchTile item={item}></SearchTile>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Search;
