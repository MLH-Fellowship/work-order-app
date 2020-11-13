import React, { useState, useEffect, memo } from "react";
import * as Location from "expo-location";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import buildingData from "../buildings.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 2,
  },
  bottomView: {
    flex: 1,
    justifyContent: "center", // vertical alignment
    alignItems: "center", // horizontal alignment
  },
});

const DashboardDetail = () => {
  let userLocation = { latitude: null, longitude: null };

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!errorMsg && location) {
    userLocation.latitude = location.coords.latitude;
    userLocation.longitude = location.coords.longitude;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        moveOnMarkerPress={false}
        style={styles.map}
        initialRegion={{
          latitude: 32.340773,
          longitude: -84.976813,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
      ></MapView>
      <View style={styles.bottomView}>
        <Text> Hello World</Text>
      </View>
    </View>
  );
};

export default memo(DashboardDetail);
