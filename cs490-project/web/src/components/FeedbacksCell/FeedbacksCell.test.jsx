import { render, screen } from '@redwoodjs/testing/web'
import { Loading, Empty, Failure, Success } from './FeedbacksCell'
import { standard } from './FeedbacksCell.mock'
import FeedbacksCell from 'src/components/FeedbacksCell/FeedbacksCell'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('FeedbacksCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  // When you're ready to test the actual output of your component render
  // you could test that, for example, certain text is present:
  //
  // 1. import { screen } from '@redwoodjs/testing/web'
  // 2. Add test: expect(screen.getByText('Hello, world')).toBeInTheDocument()

  it('renders Success successfully', async () => {
    const feedbacks = standard().feedbacks;
    const userId = 5; // Replace 'yourUserId' with the actual user ID if needed
    render(<Success feedbacks={feedbacks} userId={userId} />);

    feedbacks.forEach((feedback) => {
      const regex = new RegExp(`${feedback.body.trim()}`, 'i');
      expect(screen.getByText(regex)).toBeInTheDocument();
    });

    const currentUserFeedbacks = feedbacks.filter(feedback => feedback.userId === userId);
    currentUserFeedbacks.forEach((feedback) => {
      const regex = new RegExp(`${feedback.body.trim()}`, 'i');
      expect(screen.getByText(regex)).toBeInTheDocument();
    });

    const otherUserFeedbacks = feedbacks.filter(feedback => feedback.userId !== userId);
    otherUserFeedbacks.forEach((feedback) => {
      const regex = new RegExp(`${feedback.body.trim()}`, 'i');
      expect(screen.getByText(regex)).toBeInTheDocument();
    });
  });

  it('Handle Average/StarCount/StarCountPercentage for Feedback Display with reviews', async () => {
    const feedbacksList = standard().feedbacks;
    const userid = 2
    const { getByText, getByLabelText } = render(<Success feedbacks={feedbacksList} userId={userid} />)

    const totalRatings = feedbacksList.reduce((sum, feedback) => sum + feedback.rating, 0);
    const averageRating = totalRatings / feedbacksList.length;
    //Average rating shown
    expect(getByText(averageRating.toFixed(1))).toBeInTheDocument();

    //Get zeroStar Count percentage
    const zeroCountPercent = getByLabelText('zeroCountPercent');
    expect(zeroCountPercent).toBeInTheDocument();
    expect(zeroCountPercent.textContent).toBe('0.00%');
    //Get zero Star Count
    const zeroStarCount = getByLabelText('zeroCount')
    expect(zeroStarCount.textContent).toBe('0');

    //Get oneStar Count percentage
    const oneCountPercent = getByLabelText('oneCountPercent');
    expect(oneCountPercent).toBeInTheDocument();
    expect(oneCountPercent.textContent).toBe('0.00%');
    //Get oneStar Count
    const oneStarCount = getByLabelText('oneCount')
    expect(oneStarCount.textContent).toBe('0');

    //Get twoStar Count percentage
    const twoCountPercent = getByLabelText('twoCountPercent');
    expect(twoCountPercent).toBeInTheDocument();
    expect(twoCountPercent.textContent).toBe('25.00%');
    //Get twoStar Count
    const twoStarCount = getByLabelText('twoCount')
    expect(twoStarCount.textContent).toBe('1');


    //Get threeStar Count percentage
    const threeCountPercent = getByLabelText('threeCountPercent');
    expect(threeCountPercent).toBeInTheDocument();
    expect(threeCountPercent.textContent).toBe('0.00%');
    //Get threeStar Count
    const threeStarCount = getByLabelText('threeCount')
    expect(threeStarCount.textContent).toBe('0');

    //Get fourStar Count percentage
    const fourCountPercent = getByLabelText('fourCountPercent');
    expect(fourCountPercent).toBeInTheDocument();
    expect(fourCountPercent.textContent).toBe('25.00%');
    //Get fourStar Count
    const fourStarCount = getByLabelText('fourCount')
    expect(fourStarCount.textContent).toBe('1');


    //Get fiveStar Count percentage
    const fiveCountPercent = getByLabelText('fiveCountPercent');
    expect(fiveCountPercent).toBeInTheDocument();
    //Get fiveStar Count
    expect(fiveCountPercent.textContent).toBe('50.00%');
    const fiveStarCount = getByLabelText('fiveCount');
    expect(fiveStarCount.textContent).toBe('2');
  })



  it('Handles Average Feedback not Displayed from no reviews', async () => {
    const feedbacks = [];
    const { getByText, queryByText } = render(<Empty feedbacks={feedbacks} userId={-1} />)
    //Average rating message not displayed. Use querybytext to check that it is not displayed.
    expect(queryByText("Average Rating:")).toBeNull();
    expect(getByText('No Reviews yet!')).toBeInTheDocument();
  })

})
