import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource/instrument-sans/400.css'
import '@fontsource/instrument-sans/500.css'
import '@fontsource/instrument-sans/600.css'
import '@fontsource/instrument-sans/700.css'
import '@fontsource/fraunces/400-italic.css'

import { LoaderProvider } from './hooks/useLoaderComplete'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { FaithPage } from './pages/FaithPage'
import { LeadershipPage } from './pages/LeadershipPage'
import { ContactPage } from './pages/ContactPage'

export default function App() {
  return (
    <LoaderProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/faith" element={<FaithPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoaderProvider>
  )
}
