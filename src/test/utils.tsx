import * as React from 'react'
import { AppProvider } from '../context/app-context'

export function withAppConext(children: React.ReactNode): JSX.Element {
  return <AppProvider>{children}</AppProvider>
}
