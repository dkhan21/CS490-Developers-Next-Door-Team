import React from 'react';
import { gql, useMutation } from '@redwoodjs/web';
import { Link, routes, navigate } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/toast';
import { timeTag } from 'src/lib/formatters';
import { useAuth } from 'src/auth';

const DELETE_HISTORY_MUTATION = gql`
  mutation DeleteHistoryMutation($id: Int!) {
    deleteHistory(id: $id) {
      id
    }
  }
`;

const History = ({ history }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const { id: userId } = currentUser;

  const [deleteHistory] = useMutation(DELETE_HISTORY_MUTATION, {
    onCompleted: () => {
      toast.success('History deleted');
      navigate(routes.histories());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = () => {
    if (confirm('Are you sure you want to delete this history?')) {
      deleteHistory({ variables: { id: history.id } });
    }
  };

  return (
    <>
      <div className="bg-gray-200 p-8 rounded-lg" style={{
        backgroundColor: 'white',
        border: '2px solid black', borderRadius: '10px',
        padding: '5px', flexDirection: 'column', marginBottom: '10px', marginTop: '30px'
      }}>

        <header className="flex justify-between">
          <h2 className="rw-heading rw-heading-secondary">
            History {history.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{history.id}</td>
            </tr>
            <tr>
              <th>Input language</th>
              <td>{history.inputLanguage}</td>
            </tr>
            <tr>
              <th>Output language</th>
              <td>{history.outputLanguage}</td>
            </tr>
            <tr>
              <th>Input text</th>
              <td>{history.inputText}</td>
            </tr>
            <tr>
              <th>Output text</th>
              <td>{history.outputText}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(history.createdAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{history.userId}</td>
            </tr>
          </tbody>
        </table>

        {isAuthenticated && userId === history.userId && (
          <nav className="rw-button-group">
            <Link
              to={routes.editHistory({ id: history.id })}
              className="rw-button rw-button-blue"
            >
              Edit
            </Link>
            <button
              type="button"
              className="rw-button rw-button-red"
              onClick={onDeleteClick}
            >
              Delete
            </button>
          </nav>
        )}
      </div>
    </>
  );
};

export default History;
