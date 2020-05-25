export const ADD_PLACEID = "ADD_PLACEID";
export const REMOVE_PLACEID = "REMOVE_PLACEID";

export function addPlaceId(placeId) {
  return { type: ADD_PLACEID, placeId };
}

export function removePlaceId(placeId) {
  return { type: REMOVE_PLACEID, placeId };
}
