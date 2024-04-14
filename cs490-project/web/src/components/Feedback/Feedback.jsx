import React, { useState } from 'react';
import { gql, useMutation } from '@redwoodjs/web';

import EditFeedback from 'src/components/EditFeedback'; // Make sure to provide the correct path
import { useAuth } from 'src/auth'
import 'src/components/Feedback/Feedback.css'
//
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
export const DELETE_FEEDBACK_MUTATION = gql`
  mutation DeleteFeedback($id: Int!) {
    deleteFeedback(id: $id) {
      id
    }
  }
`;

export const UPDATE_FEEDBACK_MUTATION = gql`
  mutation UpdateFeedback($id: Int!, $input: UpdateFeedbackInput!) {
    updateFeedback(id: $id, input: $input) {
      id
      name
      rating
      body
    }
  }
`;

//
const Feedback = ({ feedback, onSave }) => {

  const { isAuthenticated, currentUser, logOut } = useAuth()
  var UID = -2;
  var roles = "";
  if (isAuthenticated) {
    UID = currentUser.id;
    roles = currentUser.roles;
  }

  //
  const [deleteFeedback] = useMutation(DELETE_FEEDBACK_MUTATION, {
    refetchQueries: [{ query: QUERY }],
  });

  const handleDelete = async (id) => {
    try {
      await deleteFeedback({ variables: { id } });
    } catch (error) {
      console.error('Error deleting feedback:', error.message);
    }
  };
  //
  const [isEditing, setEditing] = useState(false);
  const [rating, setRating] = useState(feedback.rating || 0);

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const formattedDate = (datetime) => {
    const parsedDate = new Date(datetime);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return parsedDate.toLocaleDateString('en-US', options);
  };

  const handleEditClick = () => {
    setEditing(true);

  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const [updateFeedback] = useMutation(UPDATE_FEEDBACK_MUTATION, {
    refetchQueries: [{ query: QUERY }],
  });


  const handleSaveEdit = async (editedFeedback) => {
    try {
      console.log('Saving feedback:', feedback.id);
      console.log(editedFeedback.name);
      console.log(editedFeedback.rating);
      console.log(editedFeedback.body);

      // Check if editedFeedback.body is provided
      if (!editedFeedback.body) {
        console.error('Error: Body is required.');
        // Handle the error appropriately, e.g., show a message to the user
        return;
      }
      if (isNaN(rating)) {
        console.error('Error: Rating must be a valid integer.');
        // Handle the error appropriately, e.g., show a message to the user
        return;
      }
      const newRating = parseInt(editedFeedback.rating, 10);
      await updateFeedback({
        variables: {
          id: feedback.id,
          input: {
            name: editedFeedback.name,
            rating: newRating,
            body: editedFeedback.body,
          },
        },
      });
    } catch (error) {
      console.error('Error updating feedback:', error.message);
    }
    setEditing(false);
  };

  var canEdit = true;

  if (feedback.userId === null || (UID != feedback.userId && roles != "admin")) {
    canEdit = false;
  }

  return (
    <div >
      <div style={{
        backgroundColor: 'white',
        border: '3px solid black', borderRadius: '20px',
        padding: '5px', flexDirection: 'column', marginLeft: '50px', width: '1400px', background: 'linear-gradient(180deg, #44bba4, #eae9f9)'
      }}>

        <header className="flex justify-between">
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <div style={{ height: '30px' }}>
              {[...Array(feedback.rating)].map((_, index) => (
                <span key={index} style={{ color: 'gold' }}>
                  ⭐
                </span>
              ))}
            </div>


            {!isEditing && canEdit && (

              <div style={{
                marginLeft: 'auto', display: 'flex'
              }}>
                <button style={{ width: '35px', height: '25px', marginTop: '5px', marginRight: '10px', transition: 'background-color 0.3s, color 0.3s', backgroundColor: 'white', marginLeft: '1400', border: '2px solid black', borderRadius: '5px', cursor: 'pointer' }} onClick={handleEditClick}

                >Edit</button>

                <button style={{ width: '45px', height: '25px', marginTop: '5px', marginRight: '5px', transition: 'background-color 0.3s, color 0.3s', backgroundColor: 'white', marginLeft: '1400', border: '2px solid black', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleDelete(feedback.id)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'black';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'black';
                  }}

                >Delete</button>
              </div>
            )}


          </div>
        </header>

        <h3 style={{ margin: '0', marginLeft: '5px', flexDirection: 'column', marginBottom: '10px' }}>{feedback.name}</h3>

        <div style={{ marginLeft: '5px', marginBottom: '10px' }}>
          {isEditing ? (
            <EditFeedback feedback={feedback} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
          ) : (
            <p style={{ fontFamily: "initial", fontSize: '18px', overflow: 'hidden', wordWrap: 'break-word' }}>{feedback.body}</p>
          )}
        </div>

        <time className="text-xs" dateTime={feedback.createdAt} style={{ marginLeft: '5px' }}>
          <span style={{ opacity: 0.8, fontWeight: 300 }}>posted on</span> {formattedDate(feedback.createdAt)}
        </time>
      </div>

      <div style={{ height: '30px' }}> </div>

    </div>

  );
};

export default Feedback;