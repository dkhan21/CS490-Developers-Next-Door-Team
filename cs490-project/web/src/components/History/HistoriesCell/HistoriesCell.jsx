import { Link, routes } from '@redwoodjs/router'

import Histories from 'src/components/History/Histories'

export const QUERY = gql`
  query FindHistories {
    histories {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No histories yet. '}
      <Link to={routes.newHistory()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ histories }) => {
  return <Histories histories={histories} />
}
