import React, { memo } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Text, Title } from 'native-base';

const styles = StyleSheet.create({
  upperView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-start', // vertical alignment
    alignItems: 'flex-start', // horizontal alignment
    padding: '2%',
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
    image,
  } = route.params;

  console.log(image);

  return (
    <Container>
      <View style={styles.upperView}>
        {image == null ? (
          <Title style={styles.text}>No image uploaded</Title>
        ) : (
          <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
        )}
      </View>

      <View style={styles.bottomView}>
        <Title>Room:</Title>
        <Text>{room}</Text>
        <Title>Work Order Description:</Title>
        <Text>{description}</Text>
        <Title>Work Order Problem:</Title>
        <Text>{problem}</Text>
      </View>
    </Container>
  );
};

export default memo(DashboardDetail);
