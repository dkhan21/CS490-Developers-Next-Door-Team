import Feedback from "src/components/Feedback"

export const QUERY = gql`
  query FeedbacksListQuery {
    feedbacks {
      id
      name
      body
      rating
      createdAt
      inText
      outText
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div className="text-center text-gray-500" style={{ fontFamily: 'sans-serif', fontSize: '30px', paddingTop: '40px', marginLeft: '650px', marginTop: '20px', paddingBottom: '80px', color: 'white' }}>No Reviews yet!</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ feedbacks, userId }) => {
  // Filter feedbacks for the current user
  const currentUserFeedbacks = feedbacks.filter(feedback => feedback.userId === userId);

  // Filter feedbacks for other users
  const otherUserFeedbacks = feedbacks.filter(feedback => feedback.userId !== userId);

  return (
    <>
      {/* Display feedbacks for the current email below here  */}
      {userId ? (
        <>
          {currentUserFeedbacks.length > 0 && (
            <h2 style={{ marginLeft: '60px', marginBottom: '10px', textDecoration: 'underline', color: 'white' }}>Your Reviews:</h2>
          )}
          {currentUserFeedbacks.length > 0 ? (
            currentUserFeedbacks.map(feedback => (
              <Feedback key={feedback.id} feedback={feedback} />
            ))
          ) : (
            <p style={{ marginLeft: '630px', color: 'white', marginBottom: '40px', marginTop: '20px', fontSize: '25px' }}>Make your First Review!</p>
          )}

          {/* Display feedbacks for other users */}
          {otherUserFeedbacks.length > 0 && (
            <h2 style={{ marginLeft: '60px', marginBottom: '10px', textDecoration: 'underline', color: 'white' }}>Other User's Reviews:</h2>
          )}
          {otherUserFeedbacks.length > 0 ? (
            otherUserFeedbacks.map(feedback => (
              <Feedback key={feedback.id} feedback={feedback} />
            ))
          ) : (
            null
          )}
        </>
      ) : (
        <>
          {/* Display feedbacks for other users */}
          {otherUserFeedbacks.length > 0 && (
            <h2 style={{ marginLeft: '60px', marginBottom: '10px', textDecoration: 'underline', color: 'white' }}>Other User's Reviews:</h2>
          )}
          {otherUserFeedbacks.length > 0 ? (
            otherUserFeedbacks.map(feedback => (
              <Feedback key={feedback.id} feedback={feedback} />
            ))
          ) : (
            null
          )}
        </>
      )}
    </>
  );
};
