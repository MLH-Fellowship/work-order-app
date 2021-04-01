const INITIAL_STATE = {
  order: [],
};

const GET_DASHBOARD_DETAIL_DATA = 'GET_DASHBOARD_DETAIL_DATA';

export const getDashboardDetailData = (order) => ({
  type: GET_DASHBOARD_DETAIL_DATA,
  order,
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DETAIL_DATA:
      return {
        ...state,
        order: action.order,
      };

    default:
      return state;
  }
};

export default reducer;