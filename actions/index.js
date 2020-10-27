import * as actionTypes from "./types";

export const activateModal = (buildingNumber) => ({
    type: actionTypes.MODAL_ACTIVE,
    buildingNumber: buildingNumber
});

export const deactivateModal = () => ({
    type: actionTypes.MODAL_INACTIVE
});