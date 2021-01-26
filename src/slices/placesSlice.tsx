import { createSlice } from "@reduxjs/toolkit";

export type PlacesState = {
  id: string;
  countryCode: string;
  name: string;
  goal: string;
}[];

const initialState: PlacesState = [];

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    fetch: (_, { payload: places }) => [...places],
    add: (state, { payload: newPlace }) => [newPlace, ...state],
    remove: (state, { payload: id }) => state.filter((p) => p.id !== id),
    edit: (state, { payload: updatedPlace }) =>
      state.map((p) => (p.id === updatedPlace.id ? updatedPlace : p)),
  },
});

export const {
  fetch: fetchPlaces,
  add: addPlace,
  remove: removePlace,
  edit: editPlace,
} = placesSlice.actions;
export default placesSlice.reducer;
