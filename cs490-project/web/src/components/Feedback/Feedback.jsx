import React, { useState } from 'react';
import { useAuth } from 'src/auth'
//This Feedback.jsx file is for one feedback creation.
//In FeedbacksCell.jsx file, we pass thru this file(Feedback.jsx) to it and iterate thru multiple feedbacks
const Feedback = ({ feedback }) => {

  const { isAuthenticated, currentUser, logOut } = useAuth()
  var UID = -1;
  if(isAuthenticated){
    UID = currentUser.id;
  }
  

  const [rating, setRating] = useState(feedback.rating || 0);

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const formattedDate = (datetime) => {
    const parsedDate = new Date(datetime);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return parsedDate.toLocaleDateString('en-US', options);
  };

  var testColor = (UID == feedback.userId) ? 'rgb(154, 245, 178)' : 'white'; 
  

  return (

    <div className="bg-gray-200 p-8 rounded-lg" style={{
      
      backgroundColor: testColor,
      border: '2px solid black', borderRadius: '10px',
      padding: '5px', flexDirection: 'column', marginBottom: '10px'
    }}>
      
      <header className="flex justify-between">
        <div style={{ alignItems: 'center' }}>
        {[...Array(feedback.rating)].map((_, index) => (
            <span key={index} style={{ color: 'gold' }}>
              ⭐
            </span>
          ))}
          <h3 style={{ margin: '0', marginLeft: '5px' }}>{feedback.name}</h3>
        </div>
      </header>




      <div style={{ marginLeft: '5px' }}>
        <p >{feedback.body}</p>
      </div>

      <time className="text-xs" dateTime={feedback.createdAt} style={{marginLeft: '5px'}}>
        <span style={{ opacity: 0.8, fontWeight: 300}}>posted on</span> {formattedDate(feedback.createdAt)}
      </time>
    </div>
  );
};

export default Feedback;
