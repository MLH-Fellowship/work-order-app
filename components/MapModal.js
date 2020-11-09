import React from "react";
import { StyleSheet, View, Text, Button, Card } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { deactivateModal } from "../actions/index";
import CreateOrder from "./CreateOrder";
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 6,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    height: "80%",
  },
  text: {
    fontSize: 20,
    color: theme.colors.text,
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
        <Text
          style={styles.text}
        >{`Building ${modalState.buildingNumber}`}</Text>
        <CreateOrder buildingNumber={modalState.buildingNumber} />
      </View>
    </Modal>
  );
};

export default MapModal;
