import * as React from 'react'

import { render, screen } from '@testing-library/react'
import Home from '../pages'

describe('Home', () => {
  it('should render', () => {
    render(<Home />)
    expect(screen.getByText(/home/i)).toBeInTheDocument()
  })
})
