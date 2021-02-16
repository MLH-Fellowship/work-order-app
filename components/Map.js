import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import buildingData from "../buildings.json";
import OrderModal from "./OrderModal";
import { useSelector, useDispatch } from "react-redux";
import { activateModal } from "../actions/index";
import Building from "./MapMarkers/Building";
import Barracks from "./MapMarkers/Barracks";
import CarShop from "./MapMarkers/CarShop";
import Gym from "./MapMarkers/Gym";
import Medical from "./MapMarkers/Medical";
import Office from "./MapMarkers/Office";
import Dining from "./MapMarkers/Dining";
import { some } from "lodash";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

const Map = () => {
  const dispatch = useDispatch();

  const [trackViewChanges, setTrackViewChanges] = useState(true);
  const [addMarker, setAddMarker] = useState(false);
  const [pinMarker, setPinMarker] = useState([]);

  const [someText, setSomeText] = useState('Add Pin to Custom Location');

  const stopTrackingViewChanges = () => {
    setTrackViewChanges(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        moveOnMarkerPress={false}
        style={styles.map}
        initialRegion={{
          latitude: 32.340773,
          longitude: -84.976813,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
        onPress={(e) => {
          if(addMarker) {
            setPinMarker(
              [
                e.nativeEvent.coordinate
              ]
            );
          }
        }}
      >

        {pinMarker.map((added, index) => (
          <View key={index}>
            <Marker draggable
              key={index}
              coordinate={{
                latitude: added.latitude,
                longitude: added.longitude,
              }}
              onPress={() => {
                dispatch(activateModal(added));
              }}
              onDragEnd={(e) => setPinMarker([e.nativeEvent.coordinate])}
            >
            </Marker>
          </View>
        ))}



        {buildingData.buildings.map((marker, index) => (
          <View key={index}>
            <Marker
              key={index}
              coordinate={{
                latitude: marker.coordinates[0],
                longitude: marker.coordinates[1],
              }}
              onPress={() => {
                if(!addMarker) {
                  dispatch(activateModal(marker));
                }
              }}
              tracksViewChanges={trackViewChanges}
            >
              {marker.purpose === "Office" ? (
                <Office onLoad={stopTrackingViewChanges} fadeDuration={0} />
              ) : marker.purpose === "Barracks" ? (
                <Barracks onLoad={stopTrackingViewChanges} fadeDuration={0} />
              ) : marker.purpose === "Gym" ? (
                <Gym onLoad={stopTrackingViewChanges} fadeDuration={0} />
              ) : marker.purpose === "Medical" ? (
                <Medical onLoad={stopTrackingViewChanges} fadeDuration={0} />
              ) : marker.purpose === "Dining Facility" ? (
                <Dining onLoad={stopTrackingViewChanges} fadeDuration={0} />
              ) : marker.purpose === "Car Shop" ? (
                <CarShop onLoad={stopTrackingViewChanges} fadeDuration={0} />
              ) : (
                <Building onLoad={stopTrackingViewChanges} fadeDuration={0} />
              )}
            </Marker>
          </View>
        ))}
      </MapView>
        <View>
          <TouchableOpacity
            onPress={() => {
              setAddMarker(!addMarker);
              if(addMarker) {
                setSomeText('Add Pin to Custom Location');
                setPinMarker([]);
              }
              else {
                setSomeText('Cancel');
              }
            }}
          >
            <Text>{someText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('remove button');
              setPinMarker([]);
            }}
          >
            <Text>Remove Marker from Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('remove button');
              setPinMarker([]);
            }}
          >
            <Text>Add Marker at my Location</Text>
          </TouchableOpacity>
        </View>
      <OrderModal />
    </View>
  );
};

export default Map;
