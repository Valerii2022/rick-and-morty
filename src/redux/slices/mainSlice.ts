import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

// Define the interface for Character
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface CharactersData {
  results: Character[];
}

// Define the initial state for this slice
const initialState: CharactersData = {
  results: [],
};

// Create a Redux slice for managing card data
const characterSlice = createSlice({
  name: "character", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Define a reducer for a successful resource fetch
    getResourcesSuccess(state, action) {
      state.results = action.payload;
    },
  },
});

// Export the action creator for getResourcesSuccess
export const { getResourcesSuccess } = characterSlice.actions;

// Export the reducer
export default characterSlice.reducer;

// Define an asynchronous action creator to fetch card resources from an API
export function getCharacters() {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );

      // Extract card resources from the API response
      const resources: Character = response.data.results;

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(getResourcesSuccess(resources));
    } catch (error) {
      console.log(error);
    }
  };
}
