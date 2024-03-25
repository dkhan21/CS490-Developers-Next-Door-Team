import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/History/HistoriesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_HISTORY_MUTATION = gql`
  mutation DeleteHistoryMutation($id: Int!) {
    deleteHistory(id: $id) {
      id
    }
  }
`

const HistoriesList = ({ histories }) => {
  const [deleteHistory] = useMutation(DELETE_HISTORY_MUTATION, {
    onCompleted: () => {
      toast.success('History deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete history ' + id + '?')) {
      deleteHistory({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Input language</th>
            <th>Output language</th>
            <th>Input text</th>
            <th>Output text</th>
            <th>Created at</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history) => (
            <tr key={history.id}>
              <td>{truncate(history.id)}</td>
              <td>{truncate(history.inputLanguage)}</td>
              <td>{truncate(history.outputLanguage)}</td>
              <td>{truncate(history.inputText)}</td>
              <td>{truncate(history.outputText)}</td>
              <td>{timeTag(history.createdAt)}</td>
              <td>{truncate(history.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.history({ id: history.id })}
                    title={'Show history ' + history.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editHistory({ id: history.id })}
                    title={'Edit history ' + history.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete history ' + history.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(history.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HistoriesList
