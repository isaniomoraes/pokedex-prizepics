import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { searchAsync, selectSearchResult } from './pokemonsSlice'
import Button from '../../components/Button'
export function PokemonsSearchBar() {
  const [searchString, setSearchString] = useState('')
  const dispatch = useAppDispatch()
  const pokemons = useAppSelector(selectSearchResult)

  console.log('pokemons', pokemons)

  return (
    <div>
      <input
        type="text"
        value={searchString}
        placeholder="Search..."
        onChange={(event) => setSearchString(event.target.value)}
      />
      <Button
        variant="primary"
        rounded
        onClick={() => {
          console.log('searchString', searchString)
          dispatch(searchAsync(searchString))
        }}
      >
        Search
      </Button>
    </div>
  )
}
