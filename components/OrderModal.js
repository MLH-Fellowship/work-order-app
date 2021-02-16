import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { deactivateModal } from "../actions/index";
import CreateOrder from "./CreateOrder";
import { theme } from "../core/theme";
import { IconButton } from "react-native-paper";

const styles = StyleSheet.create({
  model: {
    borderRadius: 6,
    backgroundColor: theme.colors.background,
    overflow: "hidden",
    padding: 16
  },
  modalContents: {
    alignItems: "center",
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    marginBottom: 6,
    color: theme.colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: theme.colors.text,
  },
  headerCloseIcon: {
    margin: -16
  }
});

const OrderModal = () => {
  const modalState = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  console.log(modalState);

  const buildingName = modalState.buildingName == null
              ? `Building ${modalState.buildingNumber}`
    : modalState.buildingName
  const buildingNameParts = buildingName.split('-', 2)

  return (
    <Modal
      isVisible={modalState.modalActive}
      swipeDirection="down"
      onSwipeComplete={() => dispatch(deactivateModal())}
    >
      <View style={styles.model}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>{buildingNameParts[0]}</Text>
            {buildingNameParts[1] && <Text style={styles.headerSubtitle}>{buildingNameParts[1]}</Text>}
          </View>
          <View style={styles.headerCloseIcon}>
            <IconButton
              icon="close"
              color={"white"}
              size={30}
              onPress={() => dispatch(deactivateModal())}
              />
          </View>
        </View>
        <View style={styles.modalContents}>
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
