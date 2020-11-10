import * as React from "react";
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
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={buildingData.buildings}
        renderItem={({ item }) => <SearchTile item={item}></SearchTile>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Search;
