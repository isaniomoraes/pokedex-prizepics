import { ChangeEventHandler, useState, useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { searchAsync } from './pokemonsSlice'
import debounce from 'lodash/debounce'
import styles from './Pokemons.module.css'
import Modal from '../../components/Modal'

export function PokemonsSearchBar() {
  const dispatch = useAppDispatch()
  const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useState(false)
  const [localSearchHistory, setLocalSearchHistory] = useState<
    { name: string; id: number }[]
  >([])

  useEffect(() => {
    if (isSearchHistoryOpen) {
      const searchHistory = localStorage.getItem('pokedexSearchHistory')
      if (searchHistory) {
        const searchHistoryArray = JSON.parse(searchHistory)
        setLocalSearchHistory(searchHistoryArray)
      }
    }
  }, [isSearchHistoryOpen])

  const InputDebouncedOnchange = () => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      dispatch(searchAsync(event.target.value))
    }

    const debouncedOnChange = debounce(onChange, 700)

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

  return (
    <>
      <div className={styles.pokedexSearchFieldGroup}>
        <InputDebouncedOnchange />
        <button
          type="button"
          className={styles.searchHistoryToggle}
          id="search-history-toggle"
          onClick={() => setIsSearchHistoryOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className={styles.tooltip}>
            Search History (
            {localSearchHistory.length > 0 && localSearchHistory.length})
          </span>
        </button>
      </div>
      <Modal
        isOpen={isSearchHistoryOpen}
        onClose={() => setIsSearchHistoryOpen(false)}
      >
        <section className={styles.searchHistory} id="search-history">
          <header>
            <h2>Search History</h2>
          </header>
          <div className={styles.searchHistoryContent}>
            {localSearchHistory.length > 0 && (
              <ul>
                {localSearchHistory.map((item) => {
                  return (
                    <li key={`search-history-item-${item?.id}`}>
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(searchAsync(item?.id.toString()))
                          setIsSearchHistoryOpen(false)
                        }}
                      >
                        <span className={styles.searchItemId}>{item?.id}</span>
                        <span className={styles.searchItemValue}>
                          {item?.name}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>
      </Modal>
    </>
  )
}
