import React, { useState, useEffect, memo } from "react";
import * as Location from "expo-location";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Building from "./MapMarkers/Building";
import { Title, Text } from "react-native-paper";
import MapViewDirections from "react-native-maps-directions";
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 2,
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-start", // vertical alignment
    alignItems: "flex-start", // horizontal alignment
    padding: "2%",
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.text,
  },
});

const DashboardDetail = ({ route, navigation }) => {
  const {
    building,
    coordinates,
    description,
    problem,
    room,
    user,
  } = route.params;

  const origin = { latitude: 32.346449, longitude: -84.973891 };
  const destination = { latitude: coordinates[0], longitude: coordinates[1] };
  const GOOGLE_MAPS_APIKEY = "AIzaSyAY6tGYbs1FdLLDopXBWRQAMqEhhvyFtRU";

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
          latitude: 32.344,
          longitude: -84.976813,
          latitudeDelta: 0.011,
          longitudeDelta: 0.003,
        }}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor="hotpink"
          strokeWidth={3}
        />

        <Marker coordinate={origin} title={"My Location"} />
        <Marker coordinate={destination}>
          <Building />
        </Marker>
      </MapView>
      <View style={styles.bottomView}>
        <Title style={styles.text}>Room:</Title>
        <Text style={styles.text}>{room}</Text>
        <Title style={styles.text}>Work Order Description:</Title>
        <Text style={styles.text}>{description}</Text>
        <Title style={styles.text}>Work Order Problem:</Title>
        <Text style={styles.text}>{problem}</Text>
      </View>
    </View>
  );
};

export default memo(DashboardDetail);
