import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { searchByName, getEvolutions } from './pokemonsAPI'
import { Pokemon } from 'pokenode-ts'

// See Pokemon typings here:
// https://pokenode-ts.vercel.app/typings/pokemon-typings
export interface PokemonsState {
  data: Pokemon | null
  status: 'idle' | 'loading' | 'failed'
  evolutionChain: { name: string; image: string; pokemonId: number }[]
}

const initialState: PokemonsState = {
  data: null,
  status: 'idle',
  evolutionChain: [],
}

export const searchAsync = createAsyncThunk(
  'pokemon/search',
  async (pokemonName: string) => {
    const response = await searchByName(pokemonName)
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
  },
})

export const selectSearchResult = (state: RootState) => state.pokemons.data
export const selectSearchStatus = (state: RootState) => state.pokemons.status
export const selectPokemonEvolutionChain = (state: RootState) =>
  state.pokemons.evolutionChain

export default pokemonsSlice.reducer
