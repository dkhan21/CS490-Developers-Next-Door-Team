import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { gql, useMutation, useQuery } from '@redwoodjs/web';
import { mockCurrentUser } from '@redwoodjs/testing';
import HistoryForm from './HistoryForm';

const GET_USER_HISTORY_QUERY = gql`
  query GetUserHistory {
    histories {
      id
      inputLanguage
      outputLanguage
      inputText
      outputText
      userId
      createdAt
      status
    }
  }
`;

jest.mock('@redwoodjs/web', () => ({
  gql: jest.fn(),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

// Mock a signed-in user
mockCurrentUser({
  email: 'test@example.com',
  name: 'Test User',
});

describe('HistoryForm', () => {
  it('renders successfully', async () => {
    const mockData = {
      histories: [
        { id: 1, inputLanguage: 'cpp', outputLanguage: 'java', inputText: 'Hello', outputText: 'Hola', createdAt: '2022-01-01T12:00:00Z', status: 'completed', userId: 1 },
        { id: 2, inputLanguage: 'java', outputLanguage: 'python', inputText: 'Hello', outputText: 'Hola', createdAt: '2022-01-02T12:00:00Z', status: 'completed', userId: 1 },
        { id: 3, inputLanguage: 'python', outputLanguage: 'cpp', inputText: 'Hello', outputText: 'Hola', createdAt: '2022-01-03T12:00:00Z', status: 'completed', userId: 1 },
      ],
    };

    // Mocking useQuery to return mock data
    useQuery.mockReturnValue({ loading: false, error: null, data: mockData });
    useMutation.mockReturnValue([{}, { refetchQueries: [{ query: GET_USER_HISTORY_QUERY }] }]);

    expect(() => {
      render(<HistoryForm />)
    }).not.toThrow()
  });
});