
import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Text, View, Container } from 'native-base';
import CreateOrder from '@/components/CreateOrder';
import { ScrollView } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  modalContents: {
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'column',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
});

const OrderModal = ({ navigation, route: { params: { building } }}) => {
  const buildingName = !building.name
    ? `Building ${building.number}`
    : building.name;
  const buildingNameParts = buildingName.split('-', 2) || `Building ${building.number}`;
  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{buildingNameParts[0]}</Text>
        {buildingNameParts[1] && <Text style={styles.headerSubtitle}>{buildingNameParts[1]}</Text>}
      </View>
      <ScrollView>
        <View style={styles.modalContents}>
          <CreateOrder
            building={building}
            onSubmit={() => {
              navigation.goBack();
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default OrderModal;
