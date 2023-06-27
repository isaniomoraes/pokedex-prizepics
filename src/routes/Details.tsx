import styles from './Details.module.css'
import globalStyles from '../app/Global.module.css'

export default function Details() {
  return (
    <section>
      <header>
        <h1 className={globalStyles.pageHeading}>Details</h1>
      </header>
      <div className={styles.detailsContainer}>
      </div>
    </section>
  )
}