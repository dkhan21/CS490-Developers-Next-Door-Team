export const QUERY = gql`
  query FindHistoryQuery($id: Int!) {
    history: history(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ history }) => {
  return <div>{JSON.stringify(history)}</div>
}
