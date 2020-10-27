import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { deactivateModal } from "../actions/index";

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
  const modalState = useSelector((state) => state);
  const dispatch = useDispatch();

  const removeModal = () => {
    console.log(modalState);
    dispatch(deactivateModal());
  };

  return (
    <Modal isVisible={modalState.modalReducer.modalActive}>
      <View style={styles.modalView}>
        <Text>{modalState.modalReducer.buildingNumber}</Text>

        <Button title="Hide modal" onPress={() => removeModal()} />
      </View>
    </Modal>
  );
};

export default MapModal;
