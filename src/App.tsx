import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import styles from './App.module.css'
import HomePage from './routes/Home'
import Details from './routes/Details'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/details/:pokemonName',
    element: <Details />,
  },
])

function App() {
  return (
    <main className={styles.main}>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
