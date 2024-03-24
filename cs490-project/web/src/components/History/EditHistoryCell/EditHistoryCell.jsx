import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import HistoryForm from 'src/components/History/HistoryForm'

export const QUERY = gql`
  query EditHistoryById($id: Int!) {
    history: history(id: $id) {
      id
      inputLanguage
      outputLanguage
      inputText
      outputText
      createdAt
      userId
    }
  }
`
const UPDATE_HISTORY_MUTATION = gql`
  mutation UpdateHistoryMutation($id: Int!, $input: UpdateHistoryInput!) {
    updateHistory(id: $id, input: $input) {
      id
      inputLanguage
      outputLanguage
      inputText
      outputText
      createdAt
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ history }) => {
  const [updateHistory, { loading, error }] = useMutation(
    UPDATE_HISTORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('History updated')
        navigate(routes.histories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateHistory({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit History {history?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <HistoryForm
          history={history}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
