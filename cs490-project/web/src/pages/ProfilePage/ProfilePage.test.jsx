import { render, screen, waitFor } from '@redwoodjs/testing/web'
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage'


describe('ProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfilePage />)
    }).not.toThrow()
  })

  // it('renders user information correctly', async () => {
  //   const currentUser = {
  //     id: 1,
  //     email: 'test@example.com',
  //     name: 'Test User',
  //     preferredProgrammingLanguage: 'JavaScript',
  //     preferredIDE: 'VSCode',
  //   };

  //   render(
  //     <MemoryRouter>
  //       <ProfilePage currentUser={currentUser} />
  //     </MemoryRouter>
  //   );

  //   // Wait for the profile information to be rendered
  //   await waitFor(() => {
  //     expect(screen.getByText(`Email: ${currentUser.email}`)).toBeInTheDocument();
  //     expect(screen.getByText(`Name: ${currentUser.name}`)).toBeInTheDocument();
  //     expect(screen.getByText(`Preferred Programming Language: ${currentUser.preferredProgrammingLanguage}`)).toBeInTheDocument();
  //     expect(screen.getByText(`Preferred IDE: ${currentUser.preferredIDE}`)).toBeInTheDocument();
  //   });
  // });
})
