import { render, screen } from '@redwoodjs/testing/web'

import ReleaseNotesPage from './ReleaseNotesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ReleaseNotesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReleaseNotesPage />)
    }).not.toThrow()
  })

  it('renders ReleaseNotesPage component', () => {
    render(<ReleaseNotesPage />);
    
    // Check if the page title is rendered
    expect(screen.getByText('Welcome to CodeHarbor v1.0')).toBeInTheDocument();

    // Check if the main features are rendered
    expect(screen.getByText('Main Features')).toBeInTheDocument();
    expect(screen.getByText('Code Submission and Translation Output (Translation Tool):')).toBeInTheDocument();
    expect(screen.getByText('User Registration/Login:')).toBeInTheDocument();
    // Add similar checks for other features

    // Check if the new and improved features are rendered
    expect(screen.getByText('New + Improved')).toBeInTheDocument();
    expect(screen.getByText('GPT-3 Integration')).toBeInTheDocument();
    // Add similar checks for other new and improved features

    // Check if the bug fixes are rendered
    expect(screen.getByText('Bug Fixes')).toBeInTheDocument();
    expect(screen.getByText('Code Translation Errors:')).toBeInTheDocument();
    // Add similar checks for other bug fixes
  });
})
