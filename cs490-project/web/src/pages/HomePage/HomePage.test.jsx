import { screen } from '@testing-library/react'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import HomePage from './HomePage'

describe('HomePage', () => {
  test('renders all elements correctly', () => {
    render(<HomePage />)

    expect(screen.getByText('Welcome To Code Harbor!')).toBeInTheDocument()
    expect(
      screen.getByText('The Place To Convert Your Code,')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Into Other Programming Languages!')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Paste or upload your code in the input box.')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'From the first dropdown menu, select the programming language that code is currently in.'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Next, in the second dropdown menu, select the language desired to be converted to.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Lastly, click convert!')).toBeInTheDocument()
  })
  describe('HomePage', () => {
    test('renders all images correctly', () => {
      render(<HomePage />)

      expect(screen.getByAltText('People on computer')).toBeInTheDocument()
      expect(screen.getByAltText('Code on computer')).toBeInTheDocument()
    })
  })

  describe('HomePage', () => {
    test('navigates to the correct page when Get Started button is clicked', () => {
      const { getByText } = render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      )

      const button = getByText('Get Started')
      fireEvent.click(button)
      // expect(history.location.pathname).toBe('/start')
    })
  })
})
