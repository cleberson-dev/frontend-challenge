import { createSlice } from "@reduxjs/toolkit";

export type CountriesState = {
  id: string;
  flag: string;
  name: string;
}[];

const initialState: CountriesState = [];

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    fetch: (_, { payload: countries }) => [...countries],
  },
});

export const { fetch: fetchCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
