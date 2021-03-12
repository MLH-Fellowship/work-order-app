const INITIAL_STATE = {
  modalActive: false,
  buildingNumber: null,
  buildingName: null,
  buildingCoordinates: [],
};

const ACTIVATE_MODAL = 'ACTIVATE_MODAL';
const DEACTIVATE_MODAL = 'DEACTIVATE_MODAL';

// START: ACTIONS
export const activateModal = (building) => ({
  type: ACTIVATE_MODAL,
  buildingNumber: building.number,
  buildingName: building.name,
  buildingCoordinates: building.coordinates,
});

export const deactivateModal = () => ({
  type: DEACTIVATE_MODAL,
});
// END: ACTIONS

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVATE_MODAL:
      return {
        ...state,
        modalActive: true,
        buildingNumber: action.buildingNumber,
        buildingName: action.buildingName,
        buildingCoordinates: action.buildingCoordinates,
      };
    case DEACTIVATE_MODAL:
      return {
        ...state,
        modalActive: false,
        buildingNumber: null,
        buildingName: null,
        buildingCoordinates: [],
      };
    default:
      return state;
  }
};

export default reducer;