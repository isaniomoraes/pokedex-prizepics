import React from 'react'
import { PokemonSprites, VersionSprites } from 'pokenode-ts'
import styles from './SpritesTable.module.css'

interface Props {
  sprites: PokemonSprites
  isLoading: string
}

interface SpriteMap {
  [key: string]: string
}

const spriteMapForGeneration: SpriteMap = {
  'generation-i': 'red-blue',
  'generation-ii': 'silver',
  'generation-iii': 'ruby-sapphire',
  'generation-iv': 'diamond-pearl',
  'generation-v': 'black-white',
  'generation-vi': 'x-y',
  'generation-vii': 'ultra-sun-ultra-moon',
}

interface IndexedVersionSprites {
  [key: string]: VersionSprites
}

const SpritesTable: React.FC<Props> = ({ sprites, isLoading }) => {
  const generationsSprites: IndexedVersionSprites | undefined =
    sprites?.versions
  const generations = Object.keys(generationsSprites || {}).slice(0, 7)

  return (
    <>
      <label className={styles.title}>Sprites</label>
      <div className={styles.tableContainer}>
        {isLoading !== 'loading' && (
          <table className={styles.spritesTable}>
            <tbody>
              <tr>
                <td>Normal</td>
                {generations.map((generation) => {
                  if (generation.toString() === 'generation-vi') return null
                  const versionSprites = generationsSprites?.[generation]
                  const spriteKey = spriteMapForGeneration[generation]
                  const frontDefaultSprite =
                    versionSprites?.[spriteKey]?.['front_default']

                  return (
                    <td key={`body-generation-${generation}`}>
                      {frontDefaultSprite ? (
                        <img
                          src={frontDefaultSprite}
                          alt={`Generation ${generation} normal`}
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td>Shiny</td>
                {generations.map((generation) => {
                  if (generation.toString() === 'generation-vi') return null
                  const versionSprites = generationsSprites?.[generation]
                  const spriteKey = spriteMapForGeneration[generation]
                  const frontDefaultSprite =
                    versionSprites?.[spriteKey]?.['front_shiny']

                  return (
                    <td key={`body-generation-${generation}`}>
                      {frontDefaultSprite ? (
                        <img
                          src={frontDefaultSprite}
                          alt={`Generation ${generation} normal`}
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default SpritesTable
