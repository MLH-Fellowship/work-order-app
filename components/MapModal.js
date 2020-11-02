import React from "react";
import { StyleSheet, View, Text, Button, Card } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { deactivateModal } from "../actions/index";
import CreateOrder from "./CreateOrder";

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 6,
    backgroundColor: "#2BD1FB",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    height: "80%",
  },
});

const MapModal = () => {
  const modalState = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  console.log(modalState);

  return (
    <Modal
      isVisible={modalState.modalActive}
      swipeDirection="down"
      onSwipeComplete={() => dispatch(deactivateModal())}
    >
      <View style={styles.modalView}>
        {/* <Text>{`Building ${modalState.buildingNumber}`}</Text> */}
        <CreateOrder buildingNumber={modalState.buildingNumber} />
      </View>
    </Modal>
  );
};

export default MapModal;
