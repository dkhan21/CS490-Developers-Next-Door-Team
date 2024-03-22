import History from 'src/components/History/History'

export const QUERY = gql`
  query FindHistoryById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>History not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ history }) => {
  return <History history={history} />
}
