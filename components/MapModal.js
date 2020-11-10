import React from "react";
import { StyleSheet, View, Text, Button, Card } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { deactivateModal } from "../actions/index";
import CreateOrder from "./CreateOrder";
import { theme } from "../core/theme";
import Icon from "react-native-vector-icons/FontAwesome";

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
  closeButton: {
    alignSelf: 'flex-end',
    right: 0,
    top: 0,
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
        {/* <Icon.Button
          name="bars"
          backgroundColor={theme.colors.primary}
          size={30}
          style={styles.closeButton}
          onPress={() => console.log("yeet")}
        ></Icon.Button> */}
        <Text style={styles.text}>
          {modalState.buildingName == null
            ? `Building ${modalState.buildingNumber}`
            : modalState.buildingName}
        </Text>
        <CreateOrder buildingNumber={modalState.buildingNumber} />
      </View>
    </Modal>
  );
};

export default MapModal;
