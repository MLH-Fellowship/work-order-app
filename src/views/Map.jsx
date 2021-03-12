import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import buildingData from '@/buildings.json';
import OrderModal from '@/components/OrderModal';
import { activateModal } from '@/store/modal';
import Building from '@/components/MapMarkers/Building';
import Barracks from '@/components/MapMarkers/Barracks';
import CarShop from '@/components/MapMarkers/CarShop';
import Gym from '@/components/MapMarkers/Gym';
import Medical from '@/components/MapMarkers/Medical';
import Office from '@/components/MapMarkers/Office';
import Dining from '@/components/MapMarkers/Dining';

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
        showsUserLocation
        moveOnMarkerPress={false}
        style={styles.map}
        initialRegion={{
          latitude: 32.340773,
          longitude: -84.976813,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
        onPress={(e) => {
          if (addMarker) {
            setPinMarker(
              [
                {
                  coordinates: e.nativeEvent.coordinate,
                },
              ],
            );
          }
        }}
      >

        {pinMarker.map((added, index) => (
          <View key={index}>
            <Marker
              draggable
              key={index}
              coordinate={{
                latitude: added.coordinates.latitude,
                longitude: added.coordinates.longitude,
              }}
              onPress={() => {
                dispatch(activateModal(added));
              }}
              onDragEnd={(e) => setPinMarker([
                {
                  coordinates: e.nativeEvent.coordinate,
                },
              ])}
            />
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
                if (!addMarker) {
                  dispatch(activateModal(marker));
                }
              }}
              tracksViewChanges={trackViewChanges}
            >
              {marker.purpose === 'Office' ? (
                <Office onLoad={stopTrackingViewChanges} fadeDuration={0} />
              ) : marker.purpose === 'Barracks' ? (
                <Barracks onLoad={stopTrackingViewChanges} fadeDuration={0} />
              ) : marker.purpose === 'Gym' ? (
                <Gym onLoad={stopTrackingViewChanges} fadeDuration={0} />
              ) : marker.purpose === 'Medical' ? (
                <Medical onLoad={stopTrackingViewChanges} fadeDuration={0} />
              ) : marker.purpose === 'Dining Facility' ? (
                <Dining onLoad={stopTrackingViewChanges} fadeDuration={0} />
              ) : marker.purpose === 'Car Shop' ? (
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
          style={
            {
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#3c343c',
            }
}
          onPress={() => {
            setAddMarker(!addMarker);
            if (addMarker) {
              setSomeText('Add Pin to Custom Location');
              setPinMarker([]);
            } else {
              setSomeText('Cancel');
            }
          }}
        >
          <Text style={
            {
              color: 'white',
            }
}
          >
            {someText}
          </Text>
        </TouchableOpacity>
      </View>
      <OrderModal />
    </View>
  );
};

export default Map;
