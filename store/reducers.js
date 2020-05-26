import { ADD_PLACEID, REMOVE_PLACEID } from "./actions";

const initialState = {
  placeIdOfCurrentLocation: "",
};

export default function userState(state = initialState, action) {
  switch (action.type) {
    case ADD_PLACEID:
      return Object.assign({}, state, {
        placeIdOfCurrentLocation: action.placeId,
      });
    case REMOVE_PLACEID:
      return Object.assign({}, state, {
        placeIdOfCurrentLocation: "",
      });
    default:
      return state;
  }
}
