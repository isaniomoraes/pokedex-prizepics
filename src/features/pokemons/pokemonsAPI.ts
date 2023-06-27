import { MainClient, ChainLink } from 'pokenode-ts'

const api = new MainClient()

export async function searchByName(pokemonName: string) {
  try {
    const response = await api.pokemon.getPokemonByName(pokemonName)
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
