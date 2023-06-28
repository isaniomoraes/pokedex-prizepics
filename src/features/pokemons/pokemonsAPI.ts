import { MainClient, ChainLink } from 'pokenode-ts'

const api = new MainClient()

type PokemonSearchHistory = {
  name: string
  id: number
}

const handleSearchHistory = (Pokemon: PokemonSearchHistory) => {
  // Save search history to localStorage
  // @TODO: Refactor this function to use a real database
  const searchHistory = localStorage.getItem('pokedexSearchHistory') || '[]'
  const searchHistoryArray = JSON.parse(searchHistory)

  // Check if Pokemon is already in search history
  const pokemonAlreadyInHistory = searchHistoryArray.find(
    (pokemon: PokemonSearchHistory) => pokemon.id === Pokemon.id
  )
  if (!pokemonAlreadyInHistory) {
    searchHistoryArray.push(Pokemon)
    localStorage.setItem(
      'pokedexSearchHistory',
      JSON.stringify(searchHistoryArray)
    )
  }
}

export async function searchByName(pokemonName: string) {
  try {
    const response = await api.pokemon.getPokemonByName(pokemonName)
    try {
      const pokemon: PokemonSearchHistory = {
        name: response.name,
        id: response.id,
      }
      handleSearchHistory(pokemon)
    } catch (error) {
      console.error('Error while fetching Pokemon API:', error)
    }
    return response
  } catch (error) {
    console.error('Error while fetching Pokemon API:', error)
    throw error
  }
}

export async function getEvolutions(pokemonId: number) {
  try {
    const pokemonSpecies = await api.pokemon.getPokemonSpeciesById(pokemonId)
    const evolutionChainId = parseInt(
      pokemonSpecies.evolution_chain.url.split('/').reverse()[1]
    )
    const evolutionChainResponse = await api.evolution.getEvolutionChainById(
      evolutionChainId
    )
    const evolutionChainData = evolutionChainResponse.chain

    const evolutions: { name: string; image: string; pokemonId: number }[] = []

    const processEvolution = (chain: ChainLink) => {
      const pokemonId = parseInt(chain.species.url.split('/').reverse()[1])
      const name = chain.species.name
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
      evolutions.push({ name, image, pokemonId })

      if (chain.evolves_to.length > 0) {
        for (const evolution of chain.evolves_to) {
          processEvolution(evolution)
        }
      }
    }

    processEvolution(evolutionChainData)
    return evolutions
  } catch (error) {
    console.error('Error while fetching Pokemon API:', error)
    throw error
  }
}

export async function getSpecies(pokemonId: number) {
  try {
    const response = await api.pokemon.getPokemonSpeciesById(pokemonId)
    return response
  } catch (error) {
    console.error('Error while fetching Pokemon API:', error)
    throw error
  }
}
