export interface PokemonAPIResponse {
    count: number;
    results: PokemonDetails[];
}

export interface PokemonDetails {
    name: string;
    image: string | null;
    url?: string;
    types: PokemonType[];
    abilities: Ability[];
    height: number;
    weight: number;
    id: number;
}

export interface PokemonDetailOriginal {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    order: number;
    is_default: boolean;
    abilities: Ability[];
    forms: NamedAPIResource[];
    game_indices: GameIndex[];
    held_items: any[];
    location_area_encounters: string;
    moves: PokemonMove[];
    species: NamedAPIResource;
    sprites: Sprites;
    stats: Stat[];
    types: PokemonType[];
    past_abilities: any[];
    past_types: any[];
}

// General Reusable Interface for Named Resources
export interface NamedAPIResource {
    name: string;
    url: string;
}

// Ability Interfaces
export interface Ability {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
}

// Game Index Interface
export interface GameIndex {
    game_index: number;
    version: NamedAPIResource;
}

// Move Interfaces
export interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
}

// Sprite Interfaces
export interface Sprites {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
    front_female?: string | null;
    back_female?: string | null;
    other: OtherSprites;
    versions: SpriteVersions;
}

// Other Sprite Variants
export interface OtherSprites {
    dream_world: DreamWorldSprites;
    home: HomeSprites;
    "official-artwork": OfficialArtworkSprites;
    showdown: ShowdownSprites;
}

export interface DreamWorldSprites {
    front_default: string;
    front_female?: string | null;
}

export interface HomeSprites {
    front_default: string;
    front_shiny: string;
    front_female?: string | null;
    front_shiny_female?: string | null;
}

export interface OfficialArtworkSprites {
    front_default: string;
    front_shiny: string;
}

export interface ShowdownSprites {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
}

// Sprite Versions Interface
export interface SpriteVersions {
    "generation-i": GenerationISprites;
    "generation-ii": GenerationIISprites;
    "generation-iii": GenerationIIISprites;
    "generation-iv": GenerationIVSprites;
    "generation-v": GenerationVSprites;
    "generation-vi": GenerationVISprites;
    "generation-vii": GenerationVIISprites;
    "generation-viii": GenerationVIIISprites;
}

// Generation-specific Sprites
export interface GenerationISprites {
    "red-blue": VersionSprites;
    yellow: VersionSprites;
}

export interface GenerationIISprites {
    crystal: VersionSprites;
    gold: VersionSprites;
    silver: VersionSprites;
}

export interface GenerationIIISprites {
    emerald: BasicSprites;
    "firered-leafgreen": VersionSprites;
    "ruby-sapphire": VersionSprites;
}

export interface GenerationIVSprites {
    "diamond-pearl": VersionSpritesWithGender;
    "heartgold-soulsilver": VersionSpritesWithGender;
    platinum: VersionSpritesWithGender;
}

export interface GenerationVSprites {
    "black-white": AnimatedSprites;
}

export interface GenerationVISprites {
    "omegaruby-alphasapphire": VersionSpritesWithGender;
    "x-y": VersionSpritesWithGender;
}

export interface GenerationVIISprites {
    icons: Icons;
    "ultra-sun-ultra-moon": VersionSpritesWithGender;
}

export interface GenerationVIIISprites {
    icons: Icons;
}

// Helper Sprite Interfaces
export interface BasicSprites {
    front_default: string;
    front_shiny: string;
}

export interface VersionSprites extends BasicSprites {
    back_default: string;
    back_shiny: string;
}

export interface VersionSpritesWithGender extends VersionSprites {
    front_female?: string | null;
    back_female?: string | null;
}

export interface AnimatedSprites extends VersionSpritesWithGender {
    animated: VersionSpritesWithGender;
}

export interface Icons {
    front_default: string;
    front_female?: string | null;
}

// Stat Interfaces
export interface Stat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

// Type Interfaces
export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

// Cries Interface (if needed)
export interface Cries {
    latest: string;
    legacy: string;
}

export interface IEvolutionsResponse {
    baby_trigger_item: any;
    chain: Chain;
    id: number;
}

export interface Chain {
    evolution_details: any[];
    evolves_to: EvolvesTo[];
    is_baby: boolean;
    species: Species3;
}

export interface EvolvesTo {
    evolution_details: EvolutionDetail[];
    evolves_to: EvolvesTo2[];
    is_baby: boolean;
    species: Species2;
}

export interface EvolutionDetail {
    gender: any;
    held_item: any;
    item: any;
    known_move: any;
    known_move_type: any;
    location: any;
    min_affection: any;
    min_beauty: any;
    min_happiness: any;
    min_level: number;
    needs_overworld_rain: boolean;
    party_species: any;
    party_type: any;
    relative_physical_stats: any;
    time_of_day: string;
    trade_species: any;
    trigger: Trigger;
    turn_upside_down: boolean;
}

export interface Trigger {
    name: string;
    url: string;
}

export interface EvolvesTo2 {
    evolution_details: EvolutionDetail2[];
    evolves_to: any[];
    is_baby: boolean;
    species: Species;
}

export interface EvolutionDetail2 {
    gender: any;
    held_item: any;
    item: any;
    known_move: any;
    known_move_type: any;
    location: any;
    min_affection: any;
    min_beauty: any;
    min_happiness: any;
    min_level: number;
    needs_overworld_rain: boolean;
    party_species: any;
    party_type: any;
    relative_physical_stats: any;
    time_of_day: string;
    trade_species: any;
    trigger: Trigger2;
    turn_upside_down: boolean;
}

export interface Trigger2 {
    name: string;
    url: string;
}

export interface Species {
    name: string;
    url: string;
}

export interface Species2 {
    name: string;
    url: string;
}

export interface Species3 {
    name: string;
    url: string;
}
