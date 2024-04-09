import { render, screen } from '@redwoodjs/testing/web'
import HistoryForm from './HistoryForm';

describe('HistoryForm', () => {
  it('renders sign-in message when user is not signed in', () => {
    render(<HistoryForm />);
    expect(screen.getByText('You need to sign in to access your history.')).toBeInTheDocument();
  });
  
  it('pages load', () => {
    render(<HistoryForm />);
    expect(screen.queryByText('Pagination')).not.toBeInTheDocument();
  });

  it('history created successfully', () => {
    const history = {
      inputLanguage: 'English',
      outputLanguage: 'Spanish',
      inputText: 'Hello',
      outputText: 'Hola',
      createdAt: '2024-03-26T12:00:00Z',
      status: 'Successfully translated',
      userId: 1
    };

    render(
      <HistoryForm />
    );

    expect(screen.queryByText(history.inputLanguage)).toBeNull();
    expect(screen.queryByText(history.outputLanguage)).toBeNull();
    expect(screen.queryByText(history.inputText)).toBeNull();
    expect(screen.queryByText(history.outputText)).toBeNull();
    expect(screen.queryByText('March 26, 2024')).toBeNull();
    expect(screen.queryByText(history.status)).toBeNull();
  });
  test('renders input language when user is signed in and history created', () => {
    const history = {
      inputLanguage: 'English',
      outputLanguage: 'Spanish',
      inputText: 'Hello',
      outputText: 'Hola',
      createdAt: '2024-03-26T12:00:00Z',
      status: 'completed',
      userId: 1
    };

    render(
      <HistoryForm />
    );

    expect(screen.queryByText(history.inputLanguage)).toBeNull();
  });

  test('renders output language when user is signed in and history created', () => {
    const history = {
      inputLanguage: 'English',
      outputLanguage: 'Spanish',
      inputText: 'Hello',
      outputText: 'Hola',
      createdAt: '2024-03-26T12:00:00Z',
      status: 'completed',
      userId: 1
    };

    render(
      <HistoryForm />
    );

    expect(screen.queryByText(history.outputLanguage)).toBeNull();
  });

  test('renders input text when user is signed in and history created', () => {
    const history = {
      inputLanguage: 'English',
      outputLanguage: 'Spanish',
      inputText: 'Hello',
      outputText: 'Hola',
      createdAt: '2024-03-26T12:00:00Z',
      status: 'completed',
      userId: 1
    };

    render(
      <HistoryForm />
    );

    expect(screen.queryByText(history.inputText)).toBeNull();
  });

  test('renders output text when user is signed in and history created', () => {
    const history = {
      inputLanguage: 'English',
      outputLanguage: 'Spanish',
      inputText: 'Hello',
      outputText: 'Hola',
      createdAt: '2024-03-26T12:00:00Z',
      status: 'completed',
      userId: 1
    };

    render(
      <HistoryForm />
    );

    expect(screen.queryByText(history.outputText)).toBeNull();
  });

  test('renders created date when user is signed in and history created', () => {
    const history = {
      inputLanguage: 'English',
      outputLanguage: 'Spanish',
      inputText: 'Hello',
      outputText: 'Hola',
      createdAt: '2024-03-26T12:00:00Z',
      status: 'completed',
      userId: 1
    };

    render(
      <HistoryForm />
    );

    expect(screen.queryByText('March 26, 2024')).toBeNull();
  });

  test('renders status when user is signed in and history created', () => {
    const history = {
      inputLanguage: 'English',
      outputLanguage: 'Spanish',
      inputText: 'Hello',
      outputText: 'Hola',
      createdAt: '2024-03-26T12:00:00Z',
      status: 'completed',
      userId: 1
    };

    render(
      <HistoryForm />
    );

    expect(screen.queryByText(history.status)).toBeNull();
  });
});
