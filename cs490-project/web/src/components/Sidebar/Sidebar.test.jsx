import { render , screen, fireEvent} from '@redwoodjs/testing/web'
import { MemoryRouter } from 'react-router-dom';

import Sidebar from './Sidebar'

window.scrollTo = jest.fn();

describe('Sidebar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Sidebar />)
    }).not.toThrow()
  })

  it('navigates to Profile page when Profile link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Sidebar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Profile'));

    expect(window.location.pathname).toBe('/profile');
  });

  it('navigates to Password page when Password link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/change-password']}>
        <Sidebar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Password'));

    expect(window.location.pathname).toBe('/change-password');
  });

  it('navigates to Delete My Account page when Delete My Account link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/delete-account']}>
        <Sidebar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Delete My Account'));

    expect(window.location.pathname).toBe('/delete-account');
  });


})
