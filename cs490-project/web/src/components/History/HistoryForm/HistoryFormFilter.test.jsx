import { render, screen, waitFor, fireEvent, within, getByRole, cleanup } from '@redwoodjs/testing';
import userEvent from '@testing-library/user-event'; // Import userEvent correctly
import HistoryForm from './HistoryForm';

jest.mock('src/auth', () => ({
  useAuth: () => ({
    currentUser: { id: 1 },
  }),
}));

describe('HistoryForm', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders history successfully', async () => {
    mockGraphQLQuery('GetUserHistory', () => ({
      histories: [
        // Different user ID:
        {id: 123, inputLanguage: 'English', outputLanguage: 'Spanish', inputText: 'Hello', outputText: 'Hola',userId: 1, createdAt: new Date().toISOString(), status: 'Completed'}
      ],
    }));

    render(<HistoryForm />);
    await waitFor(() => expect(screen.getByText("Hola")).toBeInTheDocument());
  });

  it('only gets histories for correct user', async () => {
    mockGraphQLQuery('GetUserHistory', () => ({
      histories: [
        // Different user ID:
        {id: 123, inputLanguage: 'English', outputLanguage: 'Spanish', inputText: 'Hello', outputText: 'Hola', userId: 2, createdAt: new Date().toISOString(), status: 'Completed'}
      ],
    }));

    render(<HistoryForm />);
    expect(screen.queryByText("Hola")).not.toBeInTheDocument();
  });

  it('filters history entries correctly by input language', async () => {
    mockGraphQLQuery('GetUserHistory', () => ({
      histories: [
        { id: 1, inputLanguage: 'Java', outputLanguage: 'Python', inputText: 'Hello', outputText: 'Bonjour', userId: 1, createdAt: '2022-01-01T12:00:00.000Z', status: 'Completed' },
        { id: 2, inputLanguage: 'JavaScript', outputLanguage: 'Python', inputText: 'Hola', outputText: 'Bonjour', userId: 1, createdAt: '2022-01-02T12:00:00.000Z', status: 'Completed' }
      ],
    }));

    render(<HistoryForm />);

    const wrapperNode = await screen.findByTestId('input-language-select');
    const selectNode = within(wrapperNode).getByRole('button');
    userEvent.click(selectNode);
    const option = await screen.findByText('JavaScript');
    userEvent.click(option);

    // Check that only histories with JavaScript input language are shown
    await waitFor(() => {
      expect(screen.queryByText("Hello")).not.toBeInTheDocument();
    });
  });

  it('filters history entries correctly by output language', async () => {
    mockGraphQLQuery('GetUserHistory', () => ({
      histories: [
        { id: 1, inputLanguage: 'Java', outputLanguage: 'Python', inputText: 'Bonjour', outputText: 'Hello', userId: 1, createdAt: '2022-01-01T12:00:00.000Z', status: 'Completed' },
        { id: 2, inputLanguage: 'JavaScript', outputLanguage: 'Python', inputText: 'Bonjour', outputText: 'Hola', userId: 1, createdAt: '2022-01-02T12:00:00.000Z', status: 'Completed' }
      ],
    }));

    render(<HistoryForm />);  
    const wrapperNode = await screen.getByTestId('output-language-select');
    const selectNode = within(wrapperNode).getByRole('button');
    userEvent.click(selectNode);
    const option = await screen.findByText('JavaScript');
    userEvent.click(option);

    await waitFor(() => {
      expect(screen.queryByText("Hello")).not.toBeInTheDocument();
    });
  });
  it('sorts by newest', async () => {
    mockGraphQLQuery('GetUserHistory', () => ({
      histories: [
        { id: 1, inputLanguage: 'Java', outputLanguage: 'Python', inputText: 'Bonjour', outputText: 'Hello', userId: 1, createdAt: '2022-01-01T12:00:00.000Z', status: 'Completed' },
        { id: 2, inputLanguage: 'JavaScript', outputLanguage: 'Python', inputText: 'Bonjour', outputText: 'Hola', userId: 1, createdAt: '2022-01-02T12:00:00.000Z', status: 'Completed' }
      ],
    }));
  
    render(<HistoryForm />);
    
    // Wait for the component to finish rendering
    await waitFor(() => {
      // Find the elements with the output text
      const outputTextElements = screen.getAllByText(/Hola|Hello/);
      // Assert that "Hola" appears before "Hello"
      const holaIndex = outputTextElements.findIndex(element => element.textContent === 'Hola')-1;
      const helloIndex = outputTextElements.findIndex(element => element.textContent === 'Hello');
      expect(holaIndex).toBeLessThan(helloIndex);
    });
  });
  it('sorts by oldest', async () => {
    mockGraphQLQuery('GetUserHistory', () => ({
      histories: [
        { id: 1, inputLanguage: 'Java', outputLanguage: 'Python', inputText: 'Bonjour', outputText: 'Hello', userId: 1, createdAt: '2022-01-01T12:00:00.000Z', status: 'Completed' },
        { id: 2, inputLanguage: 'JavaScript', outputLanguage: 'Python', inputText: 'Bonjour', outputText: 'Hola', userId: 1, createdAt: '2022-01-02T12:00:00.000Z', status: 'Completed' }
      ],
    }));
  
    render(<HistoryForm />);
    const wrapperNode = await screen.getByTestId('sort-by-select');
    const selectNode = within(wrapperNode).getByRole('button');
    userEvent.click(selectNode);
    const option = await screen.findByText('Oldest');
    userEvent.click(option);

    // Wait for the component to finish rendering
    await waitFor(() => {
      // Find the elements with the output text
      const outputTextElements = screen.getAllByText(/Hola|Hello/);
      // Assert that "Hola" appears before "Hello"
      const holaIndex = outputTextElements.findIndex(element => element.textContent === 'Hola');
      const helloIndex = outputTextElements.findIndex(element => element.textContent === 'Hello')-1;
      expect(holaIndex).toBeGreaterThan(helloIndex);
    });
  });
  it('sorts by shortest', async () => {
    mockGraphQLQuery('GetUserHistory', () => ({
      histories: [
        { id: 1, inputLanguage: 'Java', outputLanguage: 'Python', inputText: 'Hello', outputText: 'Bonjour', userId: 1, createdAt: '2022-01-01T12:00:00.000Z', status: 'Completed' },
        { id: 2, inputLanguage: 'JavaScript', outputLanguage: 'Python', inputText: 'Hola', outputText: 'Bonjour', userId: 1, createdAt: '2022-01-02T12:00:00.000Z', status: 'Completed' }
      ],
    }));
  
    render(<HistoryForm />);
    const wrapperNode = await screen.getByTestId('sort-by-select');
    const selectNode = within(wrapperNode).getByRole('button');
    userEvent.click(selectNode);
    const option = await screen.findByText('Shortest');
    userEvent.click(option);

    await waitFor(() => {
      const outputTextElements = screen.getAllByText(/Hola|Hello/);
      const holaIndex = outputTextElements.findIndex(element => element.textContent === 'Hola')-1;
      const helloIndex = outputTextElements.findIndex(element => element.textContent === 'Hello');
      expect(holaIndex).toBeLessThan(helloIndex);
    });
  });
  it('sorts by longest', async () => {
    mockGraphQLQuery('GetUserHistory', () => ({
      histories: [
        { id: 1, inputLanguage: 'Java', outputLanguage: 'Python', inputText: 'Hello', outputText: 'Bonjour', userId: 1, createdAt: '2022-01-01T12:00:00.000Z', status: 'Completed' },
        { id: 2, inputLanguage: 'JavaScript', outputLanguage: 'Python', inputText: 'Hola', outputText: 'Bonjour', userId: 1, createdAt: '2022-01-02T12:00:00.000Z', status: 'Completed' }
      ],
    }));
    
    render(<HistoryForm />);
    const wrapperNode = await screen.getByTestId('sort-by-select');
    const selectNode = within(wrapperNode).getByRole('button');
    userEvent.click(selectNode);
    const option = await screen.findByText('Longest');
    userEvent.click(option);
  
    await waitFor(() => {
      const outputTextElements = screen.getAllByText(/Hola|Hello/);
      const holaIndex = outputTextElements.findIndex(element => element.textContent === 'Hola')-1;
      const helloIndex = outputTextElements.findIndex(element => element.textContent === 'Hello');
      expect(holaIndex).toBeLessThan(helloIndex);
    });
  });
  it('searches text correctly', async () => {
    mockGraphQLQuery('GetUserHistory', () => ({
      histories: [
        { id: 1, inputLanguage: 'Java', outputLanguage: 'Python', inputText: 'Hello World', outputText: 'Bonjour le monde', userId: 1, createdAt: '2022-01-01T12:00:00.000Z', status: 'Completed' },
        { id: 2, inputLanguage: 'JavaScript', outputLanguage: 'Python', inputText: 'Good morning', outputText: 'Bonjour', userId: 1, createdAt: '2022-01-02T12:00:00.000Z', status: 'Completed' }
      ],
    }));
  
    render(<HistoryForm />);
  
    const searchField = screen.getByTestId('search-text-field');
    await waitFor(() => {
    userEvent.type(searchField, 'Hello');
    });
    await waitFor(() => {
      expect(screen.queryByText('Good morning')).not.toBeInTheDocument(); // "Good morning" should not be present
    });
  });
});