import { PokemonClient } from 'pokenode-ts'

export async function searchByName(pokemonName: string) {
  const api = new PokemonClient()

  try {
    const response = await api.getPokemonByName(pokemonName)
    return response
  } catch (error) {
    console.error('Error while fetching Pokémon:', error)
    throw error
  }
}
