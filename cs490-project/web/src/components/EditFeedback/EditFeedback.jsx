import React, { useState } from 'react';
import Example from "src/components/EditFeedback/EncryptButton"

const EditFeedback = ({ feedback, onSave, onCancel }) => {
  const [rating, setRating] = useState(feedback.rating || 0);
  const handleStarClick = (clickedRating) => {
    setRating(clickedRating === rating ? 0 : clickedRating);
  };

  const [editedFeedback, setEditedFeedback] = useState({ ...feedback });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({ ...editedFeedback, rating });
    console.log(editedFeedback.id);
    console.log(editedFeedback.name);
    console.log(rating);
    console.log(editedFeedback.body);
  };

  const handleCancel = () => {
    onCancel();
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ flexDirection: 'column', display: 'flex' }}>
      <label style={{marginLeft: '3px' }}>Name:</label>
      <input
        type="text"
        name="name"
        value={editedFeedback.name}
        onChange={handleChange}
        style={{ borderRadius: '10px', padding: '5px', border: '2px solid black', resize: 'none', width: '200px', height: '35px', fontSize: '16px',  }}
        />

      <label style={{ marginTop: '10px', marginLeft: '3px' }}>Rating:</label>
      <div>
        {[1, 2, 3, 4, 5].map((index) => (
          <span
            key={index}
            onClick={() => handleStarClick(index)}
            style={{ cursor: 'pointer' }}
          >
            {index <= rating ? '⭐' : '☆'}
          </span>
        ))}
      </div>

      <label style={{ marginTop: '10px' }}>Body:</label>
      <textarea name="body" style={{ borderRadius: '10px', padding: '3px', border: '2px solid black', height: '35px', width: '300px', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: 400 }}
        value={editedFeedback.body} onChange={handleChange} />

      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <button
          onClick={handleCancel}
          style={{
            width: '55px',
            cursor: 'pointer',
            border: '2px solid black',
            backgroundColor: 'white',
            color: 'black',  // Set default text color
            borderRadius: '5px',
            marginLeft: '10px',
            marginRight: '15px',
            marginTop: '10px',
            marginBottom: '10px',
            height: '25px',
            transition: 'background-color 0.3s, color 0.3s',  // Add a smooth transition effect for both background color and text color
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'black';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
          }}

        >
          Cancel
        </button>


        <button
          onClick={handleSave}
          style={{
            width: '55px',
            cursor: 'pointer',
            border: '2px solid black',
            backgroundColor: 'white',
            color: 'black',  // Set default text color
            borderRadius: '5px',
            marginLeft: '10px',
            marginRight: '15px',
            marginTop: '10px',
            marginBottom: '10px',
            height: '25px',
            transition: 'background-color 0.3s, color 0.3s',  // Add a smooth transition effect for both background color and text color
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'black';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
          }}

        >
          Save
        </button>

      </div>
    </div>
  );
};

export default EditFeedback;
