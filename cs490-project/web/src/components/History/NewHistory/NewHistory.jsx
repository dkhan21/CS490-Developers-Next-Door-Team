import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import HistoryForm from 'src/components/History/HistoryForm'

const CREATE_HISTORY_MUTATION = gql`
  mutation CreateHistoryMutation($input: CreateHistoryInput!) {
    createHistory(input: $input) {
      id
    }
  }
`

const NewHistory = () => {
  const [createHistory, { loading, error }] = useMutation(
    CREATE_HISTORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('History created')
        navigate(routes.histories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createHistory({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New History</h2>
      </header>
      <div className="rw-segment-main">
        <HistoryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewHistory
