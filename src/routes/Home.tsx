import { PokemonsSearchBar } from '../features/pokemons/PokemonsSearchBar'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  searchAsync,
  selectSearchResult,
} from '../features/pokemons/pokemonsSlice'
import styles from './Home.module.css'
import globalStyles from '../app/Global.module.css'
import Pokemon from '../features/pokemons/Pokemon'
import Button from '../components/Button'

export default function Home() {
  const dispatch = useAppDispatch()
  const currentPokemon = useAppSelector(selectSearchResult)
  return (
    <section className={globalStyles.pokedexContainer}>
      <header className={globalStyles.pokedexHeaderDetails}>
        <span></span>
        <span></span>
        <span></span>
      </header>
      <Pokemon />
      <div className={styles.pokemonsFilters}>
        <PokemonsSearchBar />
      </div>
      <div className={styles.navContainer}>
        <Button
          variant="primary"
          rounded
          onClick={() => {
            const prevPokemonId = currentPokemon?.id
              ? currentPokemon?.id - 1
              : 1
            dispatch(searchAsync(prevPokemonId.toString()))
          }}
          disabled={!currentPokemon?.id || currentPokemon?.id === 1}
        >
          Prev
        </Button>
        <Button
          variant="primary"
          rounded
          disabled={!currentPokemon?.id}
          onClick={() => {
            const nextPokemonId = currentPokemon?.id
              ? currentPokemon?.id + 1
              : 1
            dispatch(searchAsync(nextPokemonId.toString()))
          }}
        >
          Next
        </Button>
      </div>
    </section>
  )
}
