import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import buildingData from "../buildings.json";
import MapModal from "./MapModal";
import { useSelector, useDispatch } from "react-redux";
import { activateModal } from "../actions/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  map: {
    flex: 1,
  },
  modalView: {
    marginTop: "10%",
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Map = () => {
  const modalState = useSelector((state) => state);
  const dispatch = useDispatch();

  const createModal = (buildingNumber) => {
    console.log(modalState);
    dispatch(activateModal(buildingNumber));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 32.340773,
          longitude: -84.976813,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
      >
        {buildingData.buildings.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.coordinates[0],
              longitude: marker.coordinates[1],
            }}
            // title={`Building: ${marker.number}`}
            onPress={() => createModal(marker.number)}
          />
        ))}
      </MapView>
      <MapModal></MapModal>
    </View>
  );
};

export default Map;
