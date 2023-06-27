import { ChangeEventHandler } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { searchAsync } from './pokemonsSlice'
import debounce from 'lodash/debounce'
import styles from './Pokemons.module.css'

export function PokemonsSearchBar() {
  const dispatch = useAppDispatch()

  const InputDebouncedOnchange = () => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      dispatch(searchAsync(event.target.value))
    }

    const debouncedOnChange = debounce(onChange, 500)

    return (
      <input
        type="text"
        placeholder="NAME OR NUMBER"
        onChange={debouncedOnChange}
        className={styles.pokedexSearchField}
        autoComplete="off"
      />
    )
  }

  return <InputDebouncedOnchange />
}
