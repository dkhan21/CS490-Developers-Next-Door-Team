import { render, screen, fireEvent } from '@redwoodjs/testing/web'
import { routes } from '@redwoodjs/router'

import Navbar from './Navbar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components
/*
describe('Navbar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Navbar />)
    }).not.toThrow()
  })
})


describe('Navbar', () => {
  it('logo is present', () => {
    render(<Navbar />)
    const logo = screen.getByText(/Code Harbor/i)
    expect(logo).toBeInTheDocument()
  })
})

//--------------Logo Link---------

jest.mock('@redwoodjs/router', () => ({
  ...jest.requireActual('@redwoodjs/router'),
  routes: {
    home: jest.fn(() => '/'),
    about: jest.fn(() => '/about'),
    getStarted: jest.fn(() => '/get-started'),
    login: jest.fn(() => '/login'),
  },
}))

describe('Navbar', () => {
  it('navigates to home page when logo is clicked', () => {
    render(<Navbar />)
    const logo = screen.getByText(/Code Harbor/i)
    fireEvent.click(logo)
    expect(routes.home()).toHaveBeenCalled()
  })
})

//-----------other links------------should fail for noww
describe('Navbar', () => {
  it('navigates to respective pages when links are clicked', () => {
    render(<Navbar />)

    const aboutLink = screen.getByText(/About/i)
    fireEvent.click(aboutLink)
    expect(routes.about).toHaveBeenCalled()

    const getStartedLink = screen.getByText(/Get Started/i)
    fireEvent.click(getStartedLink)
    expect(routes.getStarted).toHaveBeenCalled()

    const loginLink = screen.getByText(/Login/i)
    fireEvent.click(loginLink)
    expect(routes.login).toHaveBeenCalled()
  })
})


describe('Navbar', () => {
  it('renders without crashing on small screens', () => {
    window.innerWidth = 360
    expect(() => render(<Navbar />)).not.toThrow()
  })

  it('renders without crashing on medium screens', () => {
    window.innerWidth = 768
    expect(() => render(<Navbar />)).not.toThrow()
  })

  it('renders without crashing on large screens', () => {
    window.innerWidth = 1024
    expect(() => render(<Navbar />)).not.toThrow()
  })
})
*/