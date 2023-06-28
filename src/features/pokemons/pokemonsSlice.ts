import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import {
  searchByName,
  getSpecies,
  getEvolutions,
  getMoves,
} from './pokemonsAPI'
import { Pokemon, PokemonSpecies, PokemonMove, Move } from 'pokenode-ts'

// See Pokemon typings here:
// https://pokenode-ts.vercel.app/typings/pokemon-typings
export interface PokemonsState {
  data: Pokemon | null
  status: 'idle' | 'loading' | 'failed'
  evolutionChain: { name: string; image: string; pokemonId: number }[]
  species: PokemonSpecies | null
  moves: Move[]
}

const initialState: PokemonsState = {
  data: null,
  status: 'idle',
  evolutionChain: [],
  species: null,
  moves: [],
}

export const searchAsync = createAsyncThunk(
  'pokemon/search',
  async (pokemonName: string) => {
    const response = await searchByName(pokemonName)
    return response
  }
)

export const getPokemonSpecies = createAsyncThunk(
  'pokemon/species',
  async (pokemonId: number) => {
    const response = await getSpecies(pokemonId)
    return response
  }
)

export const getPokemonEvolutions = createAsyncThunk(
  'pokemon/evolutions',
  async (pokemonId: number) => {
    const response = await getEvolutions(pokemonId)
    return response
  }
)

export const getPokemonMoves = createAsyncThunk(
  'pokemon/moves',
  async (moves: PokemonMove[]) => {
    const levelUpMoves: PokemonMove[] = moves.filter((m) =>
      m.version_group_details.find(
        (vgd) => vgd.move_learn_method.name === 'level-up'
      )
    )
    const response = await getMoves(levelUpMoves)
    return response
  }
)

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    search: (state) => {
      state.status = 'loading'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.status = 'loading'
        state.evolutionChain = []
        state.species = null
      })
      .addCase(
        searchAsync.fulfilled,
        (state, action: PayloadAction<Pokemon | null>) => {
          state.status = 'idle'
          state.data = action.payload
        }
      )
      .addCase(searchAsync.rejected, (state) => {
        state.status = 'failed'
        state.data = null
      })
      .addCase(getPokemonEvolutions.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getPokemonEvolutions.fulfilled, (state, action) => {
        state.status = 'idle'
        state.evolutionChain = action.payload
      })
      .addCase(getPokemonEvolutions.rejected, (state) => {
        state.status = 'failed'
        state.evolutionChain = []
      })
      .addCase(getPokemonSpecies.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getPokemonSpecies.fulfilled, (state, action) => {
        state.status = 'idle'
        state.species = action.payload
      })
      .addCase(getPokemonSpecies.rejected, (state) => {
        state.status = 'failed'
        state.species = null
      })
      .addCase(getPokemonMoves.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getPokemonMoves.fulfilled, (state, action) => {
        state.status = 'idle'
        state.moves = action.payload
      })
      .addCase(getPokemonMoves.rejected, (state) => {
        state.status = 'failed'
        state.moves = []
      })
  },
})

export const selectSearchResult = (state: RootState) => state.pokemons.data
export const selectSearchStatus = (state: RootState) => state.pokemons.status
export const selectPokemonEvolutionChain = (state: RootState) =>
  state.pokemons.evolutionChain
export const selectPokemonSpecies = (state: RootState) => state.pokemons.species
export const selectPokemonMoves = (state: RootState) => state.pokemons.moves

export default pokemonsSlice.reducer
