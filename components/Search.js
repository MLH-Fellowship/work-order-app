import * as React from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchbar:{
    margin: "2%"
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
    </View>
  );
};

export default Search;
