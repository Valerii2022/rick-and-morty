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
  error: string;
  characters: { info: Info; results: Character[] };
  locations: { info: Info; results: Location[] };
  episodes: { info: Info; results: Episode[] };
}

type FilteredLocationData = { name: string; type: string; dimension: string };
type FilteredEpisodesData = { name: string };
type FilteredCharacterData = {
  name: string;
  species: string;
  gender: string;
  status: string;
};

const defaultInfo = {
  info: { count: 0, pages: 0, next: "", prev: "" },
  results: [],
};

const initialState: Data = {
  error: "",
  characters: defaultInfo,
  locations: defaultInfo,
  episodes: defaultInfo,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    getCharactersSuccess(state, action) {
      state.error = "";
      state.characters = action.payload;
    },
    getLocationsSuccess(state, action) {
      state.error = "";
      if (action.payload as FilteredLocationData) {
        state.locations.results = action.payload;
      }
      state.locations = action.payload;
    },
    getEpisodesSuccess(state, action) {
      state.error = "";
      state.episodes = action.payload;
    },
    getError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  getCharactersSuccess,
  getLocationsSuccess,
  getEpisodesSuccess,
  getError,
} = characterSlice.actions;

export default characterSlice.reducer;

export function getCharacters(url: string | null | FilteredCharacterData) {
  let URL = "";
  if (!url) {
    URL = "https://rickandmortyapi.com/api/character";
  } else if (typeof url === "string") {
    URL = url;
  } else {
    URL = `https://rickandmortyapi.com/api/character/?name=${url.name}&status=${url.status}&species=${url.species}&gender=${url.gender}`;
  }
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(URL);
      const resources: { info: Info; results: Character[] } = response.data;
      dispatch(getCharactersSuccess(resources));
    } catch (error) {
      dispatch(getError("No characters find.Try again!"));
    }
  };
}

export function getLocations(url: string | null | FilteredLocationData) {
  let URL = "";
  if (!url) {
    URL = "https://rickandmortyapi.com/api/location";
  } else if (typeof url === "string") {
    URL = url;
  } else {
    URL = `https://rickandmortyapi.com/api/location/?name=${url.name}&type=${url.type}&dimension=${url.dimension}`;
  }
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(URL);
      const resources: { info: Info; results: Location[] } = response.data;
      dispatch(getLocationsSuccess(resources));
    } catch (error) {
      dispatch(getError("No locations find.Try again!"));
    }
  };
}

export function getEpisodes(url: string | null | FilteredEpisodesData) {
  let URL = "";
  if (!url) {
    URL = "https://rickandmortyapi.com/api/episode";
  } else if (typeof url === "string") {
    URL = url;
  } else {
    URL = `https://rickandmortyapi.com/api/episode/?episode=${url.name}`;
  }
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(URL);
      const resources: { info: Info; results: Episode[] } = response.data;
      dispatch(getEpisodesSuccess(resources));
    } catch (error) {
      dispatch(getError("No episodes find. Try again!"));
    }
  };
}
