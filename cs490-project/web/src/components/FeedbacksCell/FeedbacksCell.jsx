import Feedback from "src/components/Feedback"

export const QUERY = gql`
  query FeedbacksQuery {
    feedbacks {
      id
      name
      body
      rating
      createdAt
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {return <div className="text-center text-gray-500">No Reviews yet</div>}

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
