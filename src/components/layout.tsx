import * as React from 'react'
import styled from 'styled-components'

type LayoutProps = {
  children: React.ReactNode
}

const Container = styled.div`
  margin: 0 auto;
`

export default function Layout({ children }: LayoutProps): JSX.Element {
  return <Container>{children}</Container>
}
