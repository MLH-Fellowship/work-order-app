import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import buildingData from "../buildings.json";
import MapModal from "./MapModal";
import { useSelector, useDispatch } from "react-redux";
import { activateModal } from "../actions/index";
import Building from "./Building";

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
  const modalState = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  const [trackViewChanges, setTrackViewChanges] = useState(true)

  const createModal = (buildingNumber) => {
    dispatch(activateModal(buildingNumber));
  };

  const stopTrackingViewChanges = () => {
    setTrackViewChanges(false);
  }

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
          <View key={index}>
          <Marker
            key={index}
            coordinate={{
              latitude: marker.coordinates[0],
              longitude: marker.coordinates[1],
            }}
            onPress={() => createModal(marker.number)}
            tracksViewChanges={trackViewChanges}
          >
            <Building onLoad={stopTrackingViewChanges} fadeDuration={0} />
          </Marker>
          </View>
        ))}
      </MapView>
      <MapModal/>
    </View>
  );
};

export default Map;
