import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  selectSearchResult,
  selectSearchStatus,
  selectPokemonSpecies,
  selectPokemonEvolutionChain,
  selectPokemonMoves,
  getPokemonEvolutions,
  getPokemonSpecies,
  getPokemonMoves,
} from './pokemonsSlice'
import styles from './PokemonDetails.module.css'
import globalStyles from '../../app/global.module.css'
import SpritesTable from '../../components/SpritesTable'
import LoadingSpinner from '../../components/LoadingSpinner'
import MovesTable from '../../components/MovesTable'

interface PokemonDetailsProps {
  changePokemon: (pokemonName: string) => void
}

export default function Pokemon(props: PokemonDetailsProps) {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const pokemon = useAppSelector(selectSearchResult)
  const searchStatus = useAppSelector(selectSearchStatus)
  const pokemonEvolutionChain = useAppSelector(selectPokemonEvolutionChain)
  const pokemonSpecies = useAppSelector(selectPokemonSpecies)
  const pokemonMoves = useAppSelector(selectPokemonMoves)

  useEffect(() => {
    if (pokemon?.id && isOpen) {
      dispatch(getPokemonEvolutions(pokemon.id))
      dispatch(getPokemonSpecies(pokemon.id))
      dispatch(getPokemonMoves(pokemon.moves))
    }
  }, [pokemon, dispatch, isOpen])

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
        id="pokemon-details-toggle"
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
          {searchStatus === 'loading' ? (
            <LoadingSpinner width="24" height="24" position="center" />
          ) : (
            <>
              <div className={styles.detailsRow}>
                <div>
                  <label className={styles.attributeLabel}>Height</label>
                  <div className={styles.attributeValue}>{pokemon?.height}</div>
                </div>
                <div>
                  <label className={styles.attributeLabel}>Weight</label>
                  <div className={styles.attributeValue}>{pokemon?.weight}</div>
                </div>
              </div>
              <div className={styles.fullRow}>
                <label className={styles.attributeLabel}>Species</label>
                {pokemonSpecies && (
                  <div className={styles.attributeValue}>
                    {
                      pokemonSpecies?.genera.find(
                        (s) => s.language.name === 'en'
                      )?.genus
                    }
                  </div>
                )}
              </div>
              <div className={styles.fullRow}>
                <label className={styles.attributeLabel}>Type</label>
                <div className={styles.attributeValues}>
                  {pokemon?.types?.map((typeItem) => (
                    <span
                      key={`pokemon-type-${typeItem?.type?.name}`}
                      className={[
                        globalStyles[`bg_type_${typeItem?.type?.name}`],
                        globalStyles.bgTypeShadow,
                      ].join(' ')}
                    >
                      {typeItem?.type?.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.fullRow}>
                <label className={styles.attributeLabel}>Abilities</label>
                <div className={styles.attributeValues}>
                  {pokemon?.abilities &&
                    pokemon?.abilities?.map((abilityItem) => {
                      return (
                        <span
                          key={`pokemon-type-${abilityItem?.ability?.name}`}
                          style={{ backgroundColor: '#eee', color: '#333' }}
                        >
                          {abilityItem?.ability?.name?.replace('-', ' ')}
                          {abilityItem?.is_hidden && (
                            <small> (hidden ability)</small>
                          )}
                        </span>
                      )
                    })}
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
              {pokemon?.sprites && (
                <SpritesTable
                  sprites={pokemon?.sprites}
                  isLoading={searchStatus}
                />
              )}

              {pokemonMoves && <MovesTable moves={pokemonMoves} />}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
