
export interface INameUrl {
  name: string;
  url: string;
}

export interface IResponseGetPokemons {
  count: number;
  next: string;
  previous: string;
  results: [IPokemons];
}

export interface IPokemons extends INameUrl {
  id: number;
 }

export interface IPokemon {
  id: number;
  name: string;
  types: [IType];
  height: number;
  weight: number;
  stats: [IStats];
}

export interface IType {
  slot: number;
  type: INameUrl
}

export interface IPlace {
  location_area: {
    name: string;
    url: string;
  };
  version_details: [IVersionDetais];
}

export interface IVersionDetais {
  [key: string]: string | number | [] | {};
}

export interface IStats {
  base_stat: number;
  effort: number;
  stat: INameUrl;
}

export enum EStat {
  "hp" = "HP",
  "attack" = "Attack",
  "defense" = "Defense",
  "special-attack" = "Sp.Atk",
  "special-defense" = "Sp.Def",
  "speed" = "Speed",
}

export enum EColorStat {
  "hp" = "#FF0000",
  "attack" = "#F08030",
  "defense" = "#F8D030",
  "special-attack" = "#6890F0",
  "special-defense" = "#78C850",
  "speed" = "#F85888",
}

export enum EConvertNumber {
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
  "viii",
  "ix",
  "x",
}



interface ISpeciesColor extends INameUrl {}
interface ISpeciesEggGroups extends INameUrl {}
interface ISpeciesEvolves extends INameUrl {}
interface ISpeciesFlavor {
  flavor_text: string;
  language: INameUrl;
  version: INameUrl;
}
interface ISpeciesGenera {
  genus: string;
  language: INameUrl;
}
interface ISpeciesGeneration extends INameUrl {}
interface ISpeciesGrowthRate extends INameUrl {}
interface ISpeciesHabitat extends INameUrl {}
interface ISpeciesNames {
  language: INameUrl;
  name: string;
}
interface ISpeciesPalParkEncounters {
  area: INameUrl;
  base_score: number;
  rate: number;
}
interface ISpeciesPokedexNumber {
  entry_number: number;
  pokedex: INameUrl;
}
interface ISpeciesVarieties {
  is_default: boolean;
  pokemon: INameUrl;
}

export interface ISpecies {
  base_happiness: number;
  capture_rate: number;
  color: ISpeciesColor;
  egg_groups: [ISpeciesEggGroups];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: ISpeciesEvolves;
  flavor_text_entries: [ISpeciesFlavor];
  form_descriptions: [];
  forms_switchable: boolean;
  gender_rate: number;
  genera: [ISpeciesGenera];
  generation: ISpeciesGeneration;
  growth_rate: ISpeciesGrowthRate;
  habitat: ISpeciesHabitat;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: [ISpeciesNames];
  order: number;
  pal_park_encounters: [ISpeciesPalParkEncounters];
  pokedex_numbers: ISpeciesPokedexNumber[];
  shape: INameUrl;
  varieties: [ISpeciesVarieties];
}




interface IEvolutionDetails {
  gender: number;
  held_item: INameUrl;
  item: INameUrl;
  known_move: INameUrl;
  known_move_type: INameUrl;
  location: INameUrl;
  min_affection: number;
  min_beauty: number;
  min_happiness: number;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: INameUrl;
  party_type: INameUrl;
  relative_physical_stats: number;
  time_of_day: string;
  trade_species: INameUrl;
  trigger: INameUrl;
  turn_upside_down: boolean;
}

interface IEvolution {
  evolution_details: [IEvolutionDetails];
  evolves_to: [IEvolution]; // [] ???
  is_baby: boolean;
  species: INameUrl;
}

export interface IChainEvolution {
  baby_trigger_item: INameUrl;
  chain: {
    evolution_details: [IEvolutionDetails];
    evolves_to: [IEvolution];
    is_baby: boolean;
    species: INameUrl;
  },
  id: number;
}