import React from "react";
import { StyleSheet, View} from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 10,
    backgroundColor: "#2BD1FB",
  },
  map: {
      flex: 1
  }
});

const Dashboard = () => {
  return (
    <View style={styles.container}>
    </View>
  );
};

export default Dashboard;