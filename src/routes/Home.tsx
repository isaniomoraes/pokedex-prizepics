import { PokemonsSearchBar } from '../features/pokemons/PokemonsSearchBar'
import styles from './Home.module.css'
import globalStyles from '../app/Global.module.css'

export default function Home() {
  return (
    <section>
      <header>
        <h1 className={globalStyles.pageHeading}>Your Pokédex</h1>
      </header>
      <div className={styles.pokemonsFilters}>
        <PokemonsSearchBar />
      </div>
      <div className={styles.pokemonsContainer}>Search results here...</div>
    </section>
  )
}
