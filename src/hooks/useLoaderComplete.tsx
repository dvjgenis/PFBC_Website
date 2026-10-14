import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface LoaderContextValue {
  complete: boolean
  setComplete: () => void
}

const LoaderContext = createContext<LoaderContextValue>({
  complete: false,
  setComplete: () => {},
})

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [complete, setCompleteState] = useState(false)
  const setComplete = useCallback(() => setCompleteState(true), [])

  return (
    <LoaderContext.Provider value={{ complete, setComplete }}>
      {children}
    </LoaderContext.Provider>
  )
}

export function useLoaderComplete() {
  return useContext(LoaderContext)
}
