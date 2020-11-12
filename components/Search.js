import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { theme } from "../core/theme";
import buildingData from "../buildings.json";
import SearchTile from "./SearchTile";

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

  const data = buildingData.buildings;

  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredData = searchQuery 
    ? data.filter(item => {
        const itemData = item.number;
        const textData = searchQuery.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
    : data;
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={data.sort((a,b) => a.number > b.number)}
        renderItem={({ item }) => <SearchTile item={item}></SearchTile>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Search;
