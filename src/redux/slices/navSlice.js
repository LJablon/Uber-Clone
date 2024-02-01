import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  originAddress: null,
  destinationAddress: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setOriginAddress: (state, action) => {
      state.originAddress = action.payload;
    },
    setDestinationAddress: (state, action) => {
      state.destinationAddress = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOrigin,
  setDestination,
  setTravelTimeInformation,
  setOriginAddress,
  setDestinationAddress,
} = navSlice.actions;

//Selectors
export const selectOrigin = (state) => state.nav.origin;

export const selectDestination = (state) => state.nav.destination;

export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;

export const selectOriginAddress = (state) => state.nav.originAddress;

export const selectDestinationAddress = (state) => state.nav.destinationAddress;

export default navSlice.reducer;
