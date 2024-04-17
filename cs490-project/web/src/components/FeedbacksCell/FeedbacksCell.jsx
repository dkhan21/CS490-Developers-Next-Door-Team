import Feedback from "src/components/Feedback"
import { FaStar } from 'react-icons/fa';


export const QUERY = gql`
  query FeedbacksListQuery {
    feedbacks {
      id
      name
      body
      rating
      createdAt
      inLanguage
      outLanguage
      inText
      outText
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div className="text-center text-gray-500" style={{ fontFamily: 'sans-serif', fontSize: '30px', paddingTop: '40px', paddingLeft: '650px', paddingBottom: '80px', color: 'white', backgroundImage: 'linear-gradient(to right, #403c44, #3C3C44)', }}>No Reviews yet!</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ feedbacks, userId, onCopyToEditors }) => {
  //Getting the Average
  const totalRatings = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
  const averageRating = totalRatings / feedbacks.length;

  const totalFeedbacksCount = feedbacks.length;

  const fiveStarCount = feedbacks.filter(feedback => feedback.rating === 5).length;
  const fourStarCount = feedbacks.filter(feedback => feedback.rating === 4).length;
  const threeStarCount = feedbacks.filter(feedback => feedback.rating === 3).length;
  const twoStarCount = feedbacks.filter(feedback => feedback.rating === 2).length;
  const oneStarCount = feedbacks.filter(feedback => feedback.rating === 1).length;
  const zeroStarCount = feedbacks.filter(feedback => feedback.rating === 0).length;

  const percentageFiveStarFeedbacks = (fiveStarCount / totalFeedbacksCount) * 100;
  const percentageFourStarFeedbacks = (fourStarCount / totalFeedbacksCount) * 100;
  const percentageThreeStarFeedbacks = (threeStarCount / totalFeedbacksCount) * 100;
  const percentageTwoStarFeedbacks = (twoStarCount / totalFeedbacksCount) * 100;
  const percentageOneStarFeedbacks = (oneStarCount / totalFeedbacksCount) * 100;
  const percentageZeroStarFeedbacks = (zeroStarCount / totalFeedbacksCount) * 100;






  // Filter feedbacks for the current user
  const currentUserFeedbacks = feedbacks.filter(feedback => feedback.userId === userId);

  // Filter feedbacks for other users
  const otherUserFeedbacks = feedbacks.filter(feedback => feedback.userId !== userId);

  return (
    <>
      {/* Display feedbacks for the current email below here  */}
      <div style={{ flexDirection: 'row', backgroundImage: 'linear-gradient(to right, #403c44, #3C3C44)', display: 'flex', paddingTop: '20px' }}>
        <p style={{ fontSize: '100px', paddingLeft: '30px' }}>⭐</p>
        <div style={{ flexDirection: 'column', display: 'flex' }}>
          <p style={{ color: 'white', fontSize: '20px', paddingLeft: '10px', paddingTop: '30px' }}>Average Rating:</p>
          <p style={{ color: 'white', fontSize: '70px', paddingLeft: '30px', paddingTop: '0px' }} >{averageRating.toFixed(1)}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px', paddingTop: '10px',  }}>

          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px',  height: '25px' }}>
            <p style={{ margin: '0', paddingRight: '-3px', color: 'white', fontSize: '18px' }}>5</p>
            <p style={{ margin: '0', paddingRight: '10px', paddingBottom: '5px', color: 'white', }}>⭐:</p>
            <p style={{ margin: '0', paddingRight: '20px', color: 'white', fontSize: '18px' }}>{fiveStarCount}</p>
            <div style={{ position: 'relative', width: '200px', paddingRight: '10px' }}>
              <progress style={{ height: '35px' }} value={percentageFiveStarFeedbacks} max="100"></progress>
              <span style={{ position: 'absolute', left: '42.5%', top: '50%', transform: 'translate(-50%, -50%)', color: 'black' }}>{percentageFiveStarFeedbacks.toFixed(2)}%</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px', height: '25px' }}>
            <p style={{ margin: '0', paddingRight: '-3px', color: 'white', fontSize: '18px' }}>4</p>
            <p style={{ margin: '0', paddingRight: '10px', paddingBottom: '5px', color: 'white', }}>⭐:</p>
            <p style={{ margin: '0', paddingRight: '20px', color: 'white', fontSize: '18px' }}>{fourStarCount}</p>
            <div style={{ position: 'relative', width: '200px', paddingRight: '10px' }}>
              <progress style={{ height: '35px' }} value={percentageFourStarFeedbacks} max="100"></progress>
              <span style={{ position: 'absolute', left: '42.5%', top: '50%', transform: 'translate(-50%, -50%)', color: 'black' }}>{percentageFourStarFeedbacks.toFixed(2)}%</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px',  height: '25px' }}>
            <p style={{ margin: '0', paddingRight: '-3px', color: 'white', fontSize: '18px' }}>3</p>
            <p style={{ margin: '0', paddingRight: '10px', paddingBottom: '5px', color: 'white', }}>⭐:</p>
            <p style={{ margin: '0', paddingRight: '20px', color: 'white', fontSize: '18px' }}>{threeStarCount}</p>
            <div style={{ position: 'relative', width: '200px', paddingRight: '10px' }}>
              <progress style={{ height: '35px' }} value={percentageThreeStarFeedbacks} max="100"></progress>
              <span style={{ position: 'absolute', left: '42.5%', top: '50%', transform: 'translate(-50%, -50%)', color: 'black' }}>{percentageThreeStarFeedbacks.toFixed(2)}%</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px',  height: '25px' }}>
            <p style={{ margin: '0', paddingRight: '-3px', color: 'white', fontSize: '18px' }}>2</p>
            <p style={{ margin: '0', paddingRight: '10px', paddingBottom: '5px', color: 'white', }}>⭐:</p>
            <p style={{ margin: '0', paddingRight: '20px', color: 'white', fontSize: '18px' }}>{twoStarCount}</p>
            <div style={{ position: 'relative', width: '200px', paddingRight: '10px' }}>
              <progress style={{ height: '35px' }} value={percentageTwoStarFeedbacks} max="100"></progress>
              <span style={{ position: 'absolute', left: '42.5%', top: '50%', transform: 'translate(-50%, -50%)', color: 'black' }}>{percentageTwoStarFeedbacks.toFixed(2)}%</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px',  height: '25px' }}>
            <p style={{ margin: '0', paddingRight: '-3px', color: 'white', fontSize: '18px' }}>1</p>
            <p style={{ margin: '0', paddingRight: '10px', paddingBottom: '5px', color: 'white', }}>⭐:</p>
            <p style={{ margin: '0', paddingRight: '20px', color: 'white', fontSize: '18px' }}>{oneStarCount}</p>
            <div style={{ position: 'relative', width: '200px', paddingRight: '10px' }}>
              <progress style={{ height: '35px' }} value={percentageOneStarFeedbacks} max="100"></progress>
              <span style={{ position: 'absolute', left: '42.5%', top: '50%', transform: 'translate(-50%, -50%)', color: 'black' }}>{percentageOneStarFeedbacks.toFixed(2)}%</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px',  height: '25px' }}>
            <p style={{ margin: '0', paddingRight: '-3px', color: 'white', fontSize: '18px' }}>0</p>
            <p style={{ margin: '0', paddingRight: '10px', paddingBottom: '5px', color: 'white', }}>⭐:</p>
            <p style={{ margin: '0', paddingRight: '20px', color: 'white', fontSize: '18px' }}>{zeroStarCount}</p>
            <div style={{ position: 'relative', width: '200px', paddingRight: '10px' }}>
              <progress style={{ height: '35px' }} value={percentageZeroStarFeedbacks} max="100"></progress>
              <span style={{ position: 'absolute', left: '42.5%', top: '50%', transform: 'translate(-50%, -50%)', color: 'black' }}>{percentageZeroStarFeedbacks.toFixed(2)}%</span>
            </div>
          </div>

        </div>

      </div>

      {userId ? (
        <>
          {currentUserFeedbacks.length > 0 && (
            <h2 style={{ paddingLeft: '60px', paddingBottom: '10px', textDecoration: 'underline', color: 'white', backgroundImage: 'linear-gradient(to right, #403c44, #3C3C44)', }}>Your Reviews:</h2>
          )}
          {currentUserFeedbacks.length > 0 ? (
            currentUserFeedbacks.map(feedback => (
              <Feedback key={feedback.id} feedback={feedback} onCopyToEditors={onCopyToEditors} />
            ))
          ) : (
            null)}

          {/* Display feedbacks for other users */}
          {otherUserFeedbacks.length > 0 && (
            <h2 style={{ paddingLeft: '60px', paddingBottom: '10px', textDecoration: 'underline', color: 'white', backgroundImage: 'linear-gradient(to right, #403c44, #3C3C44)', }}>Other User's Reviews:</h2>
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
            <h2 style={{ paddingLeft: '60px', paddingBottom: '10px', textDecoration: 'underline', color: 'white', backgroundImage: 'linear-gradient(to right, #403c44, #3C3C44)', }}>Other User's Reviews:</h2>
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
