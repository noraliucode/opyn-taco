import types from '../types'

export const setMakerAddress = (payload) => {
  return {
    type: types.SET_MAKER_ADDRESS,
    payload
  };
};