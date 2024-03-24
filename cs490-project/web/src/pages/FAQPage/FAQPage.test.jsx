import { render, fireEvent } from '@redwoodjs/testing/web'

import FaqPage from './FAQPage'

describe('FaqPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FaqPage />)
    }).not.toThrow()
  })

  it('renders the search bar', () => {
    const { getByPlaceholderText } = render(<FaqPage />)
    expect(getByPlaceholderText('Search FAQ')).toBeInTheDocument()
  })

  it('renders the Expand All and Collapse All buttons', () => {
    const { getByText } = render(<FaqPage />)
    expect(getByText('Expand All')).toBeInTheDocument()
    expect(getByText('Collapse All')).toBeInTheDocument()
  })
  
})

describe('FaqPage', () => {
  it('filters FAQ entries based on search query', async () => {
    const { getByPlaceholderText, queryByText } = render(<FaqPage />)

    // Check that a question is initially rendered
    expect(queryByText('WHAT IS CODEHARBOR?')).toBeInTheDocument()

    // Perform a search that matches no questions
    fireEvent.change(getByPlaceholderText('Search FAQ'), { target: { value: 'nonexistent query' } })

    // Check that the question is no longer rendered
    expect(queryByText('WHAT IS CODEHARBOR?')).not.toBeInTheDocument()
  })
  
  it('supports partial searches', () => {
    const { getByPlaceholderText, queryByText } = render(<FaqPage />)
    
    // Perform a partial search
    fireEvent.change(getByPlaceholderText('Search FAQ'), { target: { value: 'code' } })
  
    // Check that questions containing 'code' are rendered
    expect(queryByText('WHAT IS CODEHARBOR?')).toBeInTheDocument()
    expect(queryByText('HOW DOES CODEHARBOR WORK?')).toBeInTheDocument()
  })
  
})

describe('FaqPage', () => {
  it('renders focusable interactive elements', () => {
    const { getByText, getByPlaceholderText } = render(<FaqPage />)
    
    // Focus on the elements and check if they are the active element
    getByText('Expand All').focus()
    expect(getByText('Expand All')).toBe(document.activeElement)
  
    getByText('Collapse All').focus()
    expect(getByText('Collapse All')).toBe(document.activeElement)
  
    getByPlaceholderText('Search FAQ').focus()
    expect(getByPlaceholderText('Search FAQ')).toBe(document.activeElement)
  })

})




