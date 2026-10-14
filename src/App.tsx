import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource/instrument-sans/400.css'
import '@fontsource/instrument-sans/500.css'
import '@fontsource/instrument-sans/600.css'
import '@fontsource/instrument-sans/700.css'
import '@fontsource/fraunces/400-italic.css'

import { LoaderProvider } from './hooks/useLoaderComplete'
import { Layout } from './components/Layout'
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const FaithPage = lazy(() => import('./pages/FaithPage').then((m) => ({ default: m.FaithPage })))
const LeadershipPage = lazy(() =>
  import('./pages/LeadershipPage').then((m) => ({ default: m.LeadershipPage })),
)
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const GivePage = lazy(() => import('./pages/GivePage').then((m) => ({ default: m.GivePage })))

export default function App() {
  return (
    <LoaderProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/faith" element={<FaithPage />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/give" element={<GivePage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LoaderProvider>
  )
}
