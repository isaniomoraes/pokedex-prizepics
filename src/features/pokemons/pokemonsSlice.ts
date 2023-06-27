import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { searchByName } from './pokemonsAPI'
import { Pokemon } from 'pokenode-ts'

export interface PokemonsState {
  data: Pokemon | null
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PokemonsState = {
  data: null,
  status: 'idle',
}

export const searchAsync = createAsyncThunk(
  'pokemon/search',
  async (pokemonName: string) => {
    const response = await searchByName(pokemonName)
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
      })
  },
})

export const selectSearchResult = (state: RootState) => state.pokemons.data

export default pokemonsSlice.reducer
