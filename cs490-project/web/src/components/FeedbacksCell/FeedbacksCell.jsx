import Feedback from "src/components/Feedback"

export const QUERY = gql`
  query FeedbacksQuery {
    feedbacks {
      id
      name
      body
      rating
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ feedbacks }) => {
  return (
    <>
      {feedbacks.map((feedback) => (
        <Feedback key={feedback.id} feedback={feedback} />
      ))}
    </>
  )
}
