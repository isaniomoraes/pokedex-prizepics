import styles from './MovesTable.module.css'

import React from 'react'
import { Move } from 'pokenode-ts'

interface Props {
  moves: Move[]
}

const MovesTable: React.FC<Props> = ({ moves }) => {
  console.log(moves)
  return (
    <>
      <label className={styles.title}>Moves</label>
      <div className={styles.movesTableContainer}>
        <table className={styles.movesTable}>
          <thead>
            <tr>
              <th colSpan={5}>Level-up</th>
            </tr>
            <tr>
              <th>Move</th>
              <th>Power</th>
              <th>Accuracy</th>
              <th>PP</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {moves.map((move) => {
              return (
                <tr key={move.name}>
                  <td>
                    <span className={styles.moveName}>
                      {move?.names.find((a) => a?.language?.name == 'en')?.name}
                    </span>
                  </td>
                  <td>{move?.power}</td>
                  <td>{move?.accuracy}%</td>
                  <td>{move?.pp}</td>
                  <td>
                    <div className={styles.flexRow}>
                      <span className={styles.attributeValue}>{move?.type?.name}</span>
                      <span className={styles.attributeValue} title="Damage class">
                        {move?.damage_class?.name}
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MovesTable
