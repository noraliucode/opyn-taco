import types from "../types";

export const initialState = {
  makerAddress: ''
};

const RootReducer =
  (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case types.SET_MAKER_ADDRESS:
        return {
          ...state,
          makerAddress: action.payload,
        };
      default:
        return state;
    }
  };

  export default RootReducer