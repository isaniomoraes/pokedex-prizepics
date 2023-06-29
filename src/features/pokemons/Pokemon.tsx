import { useAppSelector } from '../../app/hooks'
import { selectSearchResult, selectSearchStatus } from './pokemonsSlice'
import styles from './Pokemons.module.css'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function Pokemon() {
  const pokemon = useAppSelector(selectSearchResult)
  const searchStatus = useAppSelector(selectSearchStatus)
  const pokemonImage: string | null | undefined =
    pokemon?.sprites?.other?.['official-artwork']?.front_default

  return (
    <section className={styles.pokemonContainer}>
      <div className={styles.pokemonPreview}>
        {pokemon && pokemonImage && (
          <div className={styles.pokemonImage}>
            <img
              src={pokemonImage}
              alt={pokemon.name}
              width="60%"
              height="auto"
            />
          </div>
        )}
        {searchStatus === 'loading' && (
          <LoadingSpinner width="24" height="24" position="top-left" />
        )}
      </div>
      {pokemon && pokemon?.id && pokemon?.name && (
        <div className={styles.pokemonNameContainer}>
          <h1 className={styles.pokemonName}>
            <span className={styles.pokemonNumber}>{pokemon?.id} - </span>
            {pokemon?.name}
          </h1>
        </div>
      )}
      {searchStatus === 'failed' && (
        <div className={styles.pokemonNameContainer}>
          <h1 className={styles.pokemonName}>Pokemon not found</h1>
        </div>
      )}
    </section>
  )
}
