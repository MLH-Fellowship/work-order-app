import React from "react";
import { StyleSheet, View} from "react-native";
import MapView from "react-native-maps";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    backgroundColor: "#2BD1FB",
  },
  map: {
      flex: 1
  }
});

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
          latitude: 33.420696,
          longitude: -82.152374,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421
      }} />
    </View>
  );
};

export default Map;