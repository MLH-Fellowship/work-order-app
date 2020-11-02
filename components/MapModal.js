import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { deactivateModal } from "../actions/index";
import CreateOrder from "./CreateOrder";

const styles = StyleSheet.create({
  modalView: {
    marginTop: "10%",
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

const MapModal = () => {
  const modalState = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  console.log(modalState);

  return (
    <Modal isVisible={modalState.modalActive}>
      <View style={styles.modalView}>
        <Text>{`Building ${modalState.buildingNumber}`}</Text>
        <CreateOrder></CreateOrder>
        <Button
          title="Hide modal"
          onPress={() => dispatch(deactivateModal())}
        />
      </View>
    </Modal>
  );
};

export default MapModal;
