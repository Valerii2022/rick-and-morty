export interface Character {
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

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null | string;
}

export interface Data {
  error: string;
  current: {
    character: Character;
    location: Location;
    episode: Episode;
    episodes: Episode[];
    characters: Character[];
  };
  characters: { info: Info; results: Character[] };
  locations: { info: Info; results: Location[] };
  episodes: { info: Info; results: Episode[] };
}
