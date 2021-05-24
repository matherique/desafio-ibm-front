import * as React from 'react'
import { BookInfo } from 'types'

export type AppState = {
  query: string
  loading: boolean
  error: string
  books: BookInfo[]
  index: number
  total: number
}

export type AppAction = {
  type: 'TYPING' | 'SEARCHING' | 'SUCCESS' | 'FAIL' | 'PAGE'
  payload?: {
    query?: string
    books?: BookInfo[]
    error?: string
    index?: number
    total?: number
    book?: BookInfo
    id?: string
  }
}

const initialState: AppState = {
  query: '',
  loading: false,
  error: '',
  books: [],
  index: 0,
  total: 0
}

type AppContextType = {
  state: AppState
  dispatch: (action: AppAction) => void
}
export const AppContext =
  React.createContext<AppContextType | undefined>(undefined)

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TYPING':
      return {
        ...state,
        query: action.payload?.query || '',
        loading: false,
        error: ''
      }
    case 'SEARCHING':
      return {
        ...state,
        error: ''
      }
    case 'PAGE':
      return {
        ...state,
        loading: true,
        index: action.payload?.index || 0
      }
    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        error: '',
        books: action.payload?.books || [],
        total: action.payload?.total || 0
      }
    case 'FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload?.error || 'somethign went wrong',
        books: [],
        total: 0,
        index: 0
      }

    default:
      return { ...state }
  }
}

type AppProviderProps = {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  const [state, dispatch] = React.useReducer(appReducer, initialState)
  const value = { state, dispatch }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextType {
  const context = React.useContext(AppContext)

  if (!context) {
    throw new Error('useApp must be used within a AppPrivider')
  }

  return context
}
