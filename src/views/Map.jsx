import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Icon, Button, Fab } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import buildingData from '@/buildings.json';
import OrderModal from '@/components/OrderModal';
import { activateModal } from '@/store/modal';
import { purposeToIcon } from '@/components/MapMarkers';

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
  const [pinMarker, setPinMarker] = useState(null);
  const [fabOpen, setFabOpen] = useState(false);

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
            setPinMarker({
              coordinates: e.nativeEvent.coordinate,
            });
          }
        }}
      >

        {pinMarker && (
          <Marker
            draggable
            coordinate={pinMarker.coordinates}
            onPress={() => {
              dispatch(activateModal(pinMarker));
            }}
            onDragEnd={(e) => setPinMarker({ coordinates: e.nativeEvent.coordinate })}
          />
        )
        }

        {buildingData.buildings.map(({ purpose, coordinates: [latitude, longitude]  }, index) => {
          const Icon = purposeToIcon[purpose] || purposeToIcon.Building
          return (
          <View key={index}>
            <Marker
              key={index}
              coordinate={{ latitude, longitude }}
              onPress={() => {
                if (!addMarker) {
                  dispatch(activateModal(marker));
                }
              }}
              tracksViewChanges={trackViewChanges}
              >
                <Icon onLoad={stopTrackingViewChanges} fadeDuration={0}></Icon>
            </Marker>
          </View>
        )})}
      </MapView>
      <View>
        <Fab
          active={fabOpen}
          direction="up"
          containerStyle={{ }}
          style={{
            backgroundColor: '#5067FF',
            marginBottom: 5
          }}
          position="bottomRight"
          onPress={() => setFabOpen(!fabOpen)}
        >
          <Icon name="map"/>
          <Button
            style={{ backgroundColor: '#DD5144' }}
            onPress={() => {
              setAddMarker(!addMarker)
              if (addMarker) {
                setPinMarker(null)
              }
            }}
          >
            <Icon name={addMarker ? 'close' : 'pin'} style={{color: '#fff' }} />
          </Button>
        </Fab>
      </View>
      <OrderModal />
    </View>
  );
};

export default Map;
