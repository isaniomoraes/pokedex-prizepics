import { PokemonsSearchBar } from '../features/pokemons/PokemonsSearchBar'
import styles from './Home.module.css'
import globalStyles from '../app/Global.module.css'
import Pokemon from '../features/pokemons/Pokemon'

export default function Home() {
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
    </section>
  )
}
