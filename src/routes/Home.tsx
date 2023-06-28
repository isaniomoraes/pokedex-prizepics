import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  searchAsync,
  selectSearchResult,
} from '../features/pokemons/pokemonsSlice'
import { PokemonsSearchBar } from '../features/pokemons/PokemonsSearch'
import styles from './Home.module.css'
import globalStyles from '../app/Global.module.css'
import Pokemon from '../features/pokemons/Pokemon'
import PokemonDetails from '../features/pokemons/PokemonDetails'
import Button from '../components/Button'

export default function Home() {
  const dispatch = useAppDispatch()
  const currentPokemon = useAppSelector(selectSearchResult)

  const changePokemon = (pokemonName: string) => {
    dispatch(searchAsync(pokemonName))
  }

  return (
    <section className={globalStyles.pokedexContainer}>
      <div className={globalStyles.pokedexFront}>
        <header className={globalStyles.pokedexHeaderDetails}>
          <span></span>
          <span></span>
          <span></span>
          <div className={globalStyles.logoContainer}>
            Pokedex
            <img
              src="/pokedex-icon.png"
              alt="Pokeball"
              width={24}
              height={24}
            />
          </div>
        </header>
        <Pokemon />
        <div className={styles.pokemonsFilters}>
          <PokemonsSearchBar />
        </div>
        <div className={styles.navContainer}>
          <Button
            id="btn-prev-pokemon"
            variant="primary"
            rounded
            onClick={() => {
              const prevPokemonId = currentPokemon?.id
                ? currentPokemon?.id - 1
                : 1
              changePokemon(prevPokemonId.toString())
            }}
            disabled={!currentPokemon?.id || currentPokemon?.id === 1}
          >
            Prev
          </Button>
          <Button
            id="btn-next-pokemon"
            variant="primary"
            rounded
            disabled={!currentPokemon?.id}
            onClick={() => {
              const nextPokemonId = currentPokemon?.id
                ? currentPokemon?.id + 1
                : 1
              changePokemon(nextPokemonId.toString())
            }}
          >
            Next
          </Button>
        </div>
      </div>
      <PokemonDetails changePokemon={changePokemon} />
    </section>
  )
}
