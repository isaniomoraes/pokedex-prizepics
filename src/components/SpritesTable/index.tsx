import React from 'react'
import {
  PokemonSprites,
  GenerationISprites,
  GenerationIISprites,
  GenerationIIISprites,
  GenerationIVSprites,
  GenerationVSprites,
  GenerationVISprites,
  GenerationVIISprites,
} from 'pokenode-ts'
import styles from './SpritesTable.module.css'

interface Props {
  sprites: PokemonSprites
  isLoading: string
}

const SpritesTable: React.FC<Props> = ({ sprites, isLoading }) => {
  const genI: GenerationISprites = sprites?.versions?.['generation-i']
  const genII: GenerationIISprites = sprites?.versions?.['generation-ii']
  const genIII: GenerationIIISprites = sprites?.versions?.['generation-iii']
  const genIV: GenerationIVSprites = sprites?.versions?.['generation-iv']
  const genV: GenerationVSprites = sprites?.versions?.['generation-v']
  const genVI: GenerationVISprites = sprites?.versions?.['generation-vi']
  const genVII: GenerationVIISprites = sprites?.versions?.['generation-vii']

  return (
    <>
      <label className={styles.title}>Sprites</label>
      <div className={styles.tableContainer}>
        {isLoading !== 'loading' && (
          <table className={styles.spritesTable}>
            <tbody>
              <tr>
                <td>Normal</td>
                <td>
                  {genVII?.['ultra-sun-ultra-moon']?.['front_default'] && (
                    <img
                      src={genVII?.['ultra-sun-ultra-moon']?.['front_default']}
                      alt={`Generation VII Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genVI?.['x-y']?.['front_default'] && (
                    <img
                      src={genVI?.['x-y']?.['front_default']}
                      alt={`Generation VI Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genVI?.['omegaruby-alphasapphire']?.['front_default'] && (
                    <img
                      src={
                        genVI?.['omegaruby-alphasapphire']?.['front_default']
                      }
                      alt={`Generation VI Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genV?.['black-white']?.['front_default'] && (
                    <img
                      src={genV?.['black-white']?.['front_default']}
                      alt={`Generation V Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genIV?.['platinum']?.['front_default'] && (
                    <img
                      src={genIV?.['platinum']?.['front_default']}
                      alt={`Generation IV Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genIII?.['emerald']?.['front_default'] && (
                    <img
                      src={genIII?.['emerald']?.['front_default']}
                      alt={`Generation III Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genII?.['crystal']?.['front_transparent'] && (
                    <img
                      src={genII?.['crystal']?.['front_transparent']}
                      alt={`Generation II Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genI?.['red-blue']?.['front_transparent'] && (
                    <img
                      src={genI?.['red-blue']?.['front_transparent']}
                      alt={`Generation I Sprite`}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>Shiny</td>
                <td>
                  {genVII?.['ultra-sun-ultra-moon']?.['front_shiny'] && (
                    <img
                      src={genVII?.['ultra-sun-ultra-moon']?.['front_shiny']}
                      alt={`Generation VII Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genVI?.['x-y']?.['front_shiny'] && (
                    <img
                      src={genVI?.['x-y']?.['front_shiny']}
                      alt={`Generation VI Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genVI?.['omegaruby-alphasapphire']?.['front_shiny'] && (
                    <img
                      src={genVI?.['omegaruby-alphasapphire']?.['front_shiny']}
                      alt={`Generation VI Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genV?.['black-white']?.['front_shiny'] && (
                    <img
                      src={genV?.['black-white']?.['front_shiny']}
                      alt={`Generation V Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genIV?.['platinum']?.['front_shiny'] && (
                    <img
                      src={genIV?.['platinum']?.['front_shiny']}
                      alt={`Generation IV Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genIII?.['emerald']?.['front_shiny'] && (
                    <img
                      src={genIII?.['emerald']?.['front_shiny']}
                      alt={`Generation III Sprite`}
                    />
                  )}
                </td>
                <td>
                  {genII?.['gold']?.['front_transparent'] && (
                    <img
                      src={genII?.['gold']?.['front_transparent']}
                      alt={`Generation II Sprite`}
                    />
                  )}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default SpritesTable
