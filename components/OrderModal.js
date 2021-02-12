import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { deactivateModal } from "../actions/index";
import CreateOrder from "./CreateOrder";
import { theme } from "../core/theme";
import { IconButton } from "react-native-paper";

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 6,
    backgroundColor: theme.colors.background,
    overflow: "hidden",
    height: "80%",
  },
  modal: {
    alignItems: "center",
    height: "80%",
  },
  text: {
    fontSize: 24,
    marginBottom: 24,
    color: theme.colors.text,
  },
  closeButton: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
});

const OrderModal = () => {
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
        <IconButton
          icon="close"
          color={"white"}
          size={30}
          onPress={() => dispatch(deactivateModal())}
          style={styles.closeButton}
        />
        <View style={styles.modal}>
          <Text style={styles.text}>
            {modalState.buildingName == null
              ? `Building ${modalState.buildingNumber}`
              : modalState.buildingName}
          </Text>
          <CreateOrder
            buildingNumber={modalState.buildingNumber}
            buildingCoordinates={modalState.buildingCoordinates}
          />
        </View>
      </View>
    </Modal>
  );
};

export default OrderModal;
