import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  selectSearchResult,
  getPokemonEvolutions,
  selectPokemonEvolutionChain,
} from './pokemonsSlice'
import styles from './PokemonDetails.module.css'

interface PokemonDetailsProps {
  changePokemon: (pokemonName: string) => void
}

export default function Pokemon(props: PokemonDetailsProps) {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const pokemon = useAppSelector(selectSearchResult)
  const pokemonEvolutionChain = useAppSelector(selectPokemonEvolutionChain)

  useEffect(() => {
    if (pokemon?.id) {
      dispatch(getPokemonEvolutions(pokemon.id))
    }
  }, [pokemon, dispatch])

  return (
    <div className={styles.pokemonDetailsContainer}>
      <button
        type="button"
        className={[
          styles.buttonToggle,
          styles[isOpen ? 'is-open' : 'is-closed'],
        ].join(' ')}
        onClick={() => setIsOpen(!isOpen)}
        disabled={!pokemon?.id}
      >
        {isOpen ? 'Close' : 'Details'}
      </button>
      <section
        className={[
          styles.pokemonDetails,
          styles[isOpen ? 'is-open' : 'is-closed'],
        ].join(' ')}
      >
        <div className={styles.pokemonInfo}>
          <div className={styles.detailsRow}>
            <div>
              <label className={styles.attributeLabel}>Height</label>
              <div className={styles.attributeValue}>{pokemon?.height}</div>
            </div>
            <div>
              <label className={styles.attributeLabel}>Weight</label>
              <div className={styles.attributeValue}>{pokemon?.weight}</div>
            </div>
            <div>
              <label className={styles.attributeLabel}>Type</label>
              <div className={styles.attributeValues}>
                {pokemon?.types?.map((typeItem) => (
                  <span key={`pokemon-type-${typeItem?.type?.name}`}>
                    {typeItem?.type?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className={styles.attributeLabel}>Evolutions</label>
            <ul className={styles.evolutions}>
              {pokemonEvolutionChain?.map((evolution) => {
                const pokemonId = evolution?.pokemonId.toString()
                return (
                  <li
                    className={[
                      styles.evolution,
                      evolution?.pokemonId === pokemon?.id
                        ? styles['is-selected']
                        : '',
                    ].join(' ')}
                    key={`evolution-item-${pokemonId}`}
                  >
                    <button
                      onClick={() => props.changePokemon(pokemonId)}
                      className={styles.evolutionImage}
                    >
                      <img
                        src={evolution?.image}
                        alt={evolution?.name}
                        width="80%"
                        height="auto"
                      />
                    </button>
                    <button
                      onClick={() => props.changePokemon(pokemonId)}
                      className={styles.evolutionName}
                    >
                      {evolution?.name}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
