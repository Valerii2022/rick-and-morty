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

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

interface Data {
  characters: Character[];
  locations: Location[];
  episodes: Episode[];
}

// Define the initial state for this slice
const initialState: Data = {
  characters: [],
  locations: [],
  episodes: [],
};

// Create a Redux slice for managing card data
const characterSlice = createSlice({
  name: "character", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Define a reducer for a successful resource fetch
    getCharactersSuccess(state, action) {
      state.characters = action.payload;
    },
    getLocationsSuccess(state, action) {
      state.locations = action.payload;
    },
    getEpisodesSuccess(state, action) {
      state.episodes = action.payload;
    },
  },
});

// Export the action creator for getResourcesSuccess
export const { getCharactersSuccess, getLocationsSuccess, getEpisodesSuccess } =
  characterSlice.actions;

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
      dispatch(getCharactersSuccess(resources));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLocations() {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/location"
      );

      const resources: Location = response.data.results;

      dispatch(getLocationsSuccess(resources));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getEpisodes() {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/episode"
      );

      const resources: Episode = response.data.results;

      dispatch(getEpisodesSuccess(resources));
    } catch (error) {
      console.log(error);
    }
  };
}
