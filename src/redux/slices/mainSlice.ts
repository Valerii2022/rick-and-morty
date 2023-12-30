import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

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

interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null | string;
}

interface Data {
  characters: { info: Info; results: Character[] };
  locations: { info: Info; results: Location[] };
  episodes: { info: Info; results: Episode[] };
}

const defaultInfo = {
  info: { count: 0, pages: 0, next: "", prev: "" },
  results: [],
};

const initialState: Data = {
  characters: defaultInfo,
  locations: defaultInfo,
  episodes: defaultInfo,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
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

export const { getCharactersSuccess, getLocationsSuccess, getEpisodesSuccess } =
  characterSlice.actions;

export default characterSlice.reducer;

export function getCharacters(url: string | null) {
  const URL = url ? url : "https://rickandmortyapi.com/api/character";
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(URL);
      const resources: { info: Info; results: Character[] } = response.data;
      dispatch(getCharactersSuccess(resources));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLocations(url: string | null) {
  const URL = url ? url : "https://rickandmortyapi.com/api/location";
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(URL);
      const resources: { info: Info; results: Location[] } = response.data;
      dispatch(getLocationsSuccess(resources));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getEpisodes(url: string | null) {
  const URL = url ? url : "https://rickandmortyapi.com/api/episode";
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(URL);
      const resources: { info: Info; results: Episode[] } = response.data;
      dispatch(getEpisodesSuccess(resources));
    } catch (error) {
      console.log(error);
    }
  };
}
