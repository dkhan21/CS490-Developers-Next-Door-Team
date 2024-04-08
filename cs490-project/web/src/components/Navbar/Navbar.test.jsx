import { render, screen, fireEvent, waitFor } from '@redwoodjs/testing/web'
import { routes } from '@redwoodjs/router'
import Navbar from './Navbar'
import { MemoryRouter } from 'react-router-dom';


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

  it('redirects to home page when home link is clicked', async () => {
    render(<Navbar />) // Render the Routes component with initial route '/translate'

    const homeLink = screen.getByLabelText('Code Harbor');
    homeLink.click();
    await screen.findByText('Code Harbor');

    expect(window.location.pathname).toBe('/');
  });
})

//-----------other links------------should fail for noww
describe('Navbar', () => {
  it('navigates to respective pages when links are clicked', () => {
    render(<Navbar />)

    const getStartedLink = screen.getByLabelText("Get Started")
    getStartedLink.click()
    // Assert that navigation to the 'translate' route has occurred
    expect(window.location.pathname).toBe('/translate');

    const loginLink = screen.getByLabelText("Login")
    loginLink.click();
    expect(window.location.pathname).toBe('/login');
  })
})

describe('Navbar', () => {
  it('changes url hash when links are clicked - about and instructions links', async () => {
    render(<Navbar />)

    const aboutLink = screen.getByText(/About/i)
    fireEvent.click(aboutLink)
    await waitFor(() => expect(window.location.hash).toEqual('#section-about'))

    const instructionsLink = screen.getByText(/Instructions/i)
    fireEvent.click(instructionsLink)
    await waitFor(() => expect(window.location.hash).toEqual('#section-works'))
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
