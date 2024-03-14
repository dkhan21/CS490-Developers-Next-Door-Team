import React, { useState } from 'react';
import { useAuth } from 'src/auth';
import { Form, Label, FieldError, TextAreaField, Submit, useForm } from '@redwoodjs/forms';
import { useMutation, gql } from '@redwoodjs/web';
import { Toaster, toast } from '@redwoodjs/web/toast';
import FeedbacksCell from 'src/components/FeedbacksCell';
import { QUERY as FeedbacksQuery } from 'src/components/FeedbacksCell';
import Example from 'src/components/FeedbackForm/EncryptButton';

const CREATE = gql`
  mutation CreateFeedbackMutation($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      id
      name
      rating
      body
      createdAt
      userId
    }
  }
`;

const FeedbackForm = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const formMethods = useForm();

  const [createFeedback, { loading }] = useMutation(CREATE, {
    onCompleted: () => {
      toast.success('Thank you for your Feedback!');
      formMethods.reset();
    },
    refetchQueries: [{ query: FeedbacksQuery }],
  });

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating === rating ? 0 : clickedRating);
  };

  const onSubmit = (data) => {
    const { name, body } = data;
    const userId = isAuthenticated ? currentUser.id : -1;
    const input = { name, rating, body, userId };
    createFeedback({ variables: { input } });
  };

  const fontStyles = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '25px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingTop: '110px',
  };

  return (
    <main style={{ backgroundColor: '#3C3C44' }}>
      <Toaster />
      {isAuthenticated ? (
        <Form onSubmit={onSubmit} formMethods={formMethods} className="mt-4 w-full" style={{ display: 'flex', flexDirection: 'row', paddingTop: '100px', backgroundColor: '#3C3C44' }}>
          <div style={{ marginLeft: '400px', marginRight: '20px', flexDirection: 'column', display: 'flex' }}>
            <Label name="name" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '26px', fontWeight: 400, color: 'white', textAlign: 'center' }}>Name</Label>
            <TextAreaField name="name" required className="block w-full p-1 border rounded h-24 text-xs" validation={{ required: true }} style={{ borderRadius: '10px', border: '2px solid black', resize: 'none', width: '200px', height: '30px', fontSize: '16px' }} />
            <FieldError name="names" />
          </div>

          <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column' }}>
            <Label name="rating" className="block text-sm text-gray-600 uppercase" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '26px', fontWeight: 400, color: 'white', textAlign: 'center' }}>Quality</Label>
            <div style={{ width: '140px', borderRadius: '10px', backgroundColor: 'white', border: '2px solid black', height: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }} required>
              {[1, 2, 3, 4, 5].map((index) => (
                <span name="rating" key={index} onClick={() => handleStarClick(index)} style={{ cursor: 'pointer' }} validation={{ required: true }}>{index <= rating ? '⭐' : '☆'}</span>
              ))}
            </div>
          </div>

          <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column' }}>
            <Label name="body" className="block mt-4 text-sm text-gray-600 uppercase" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '26px', fontWeight: 400, color: 'white', textAlign: 'center' }}>Feedback</Label>
            <TextAreaField name="body" validation={{ required: true }} style={{ borderRadius: '10px', border: '2px solid black', resize: 'none', width: '300px', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: 400 }} />
            <FieldError name="body" />
          </div>

          <div style={{ marginTop: '20px', marginRight: '20px', marginLeft: '0px', display: 'flex', flexDirection: 'column' }}>
            <Submit className="submit-button" disabled={loading} style={{ marginTop: '10px', cursor: 'pointer', color: 'blue', width: '110px', height: '35px', border: 'none', backgroundColor: '#403c44' }}>
              <Example />
            </Submit>
          </div>
        </Form>
      ) : (
        <h3 style={{ ...fontStyles, color: 'white' }}>Please log in to provide feedback!</h3>
      )}

<main style={{ backgroundColor: '#3C3C44', textAlign: 'center' }}> {/* Centering content */}
      <Toaster />
      {isAuthenticated ? (
        <Form onSubmit={onSubmit} formMethods={formMethods} className="mt-4 w-full" style={{ display: 'flex', flexDirection: 'row', paddingTop: '100px', backgroundColor: '#3C3C44' }}>
          {/* Your form fields */}
        </Form>
      ) : (
        <h3 style={{ ...fontStyles, color: 'white' }}>Please log in to provide feedback!</h3>
      )}

      {/* Centering and styling the "Show Comments" button */}
      <button onClick={() => setShowComments(!showComments)} style={{ margin: '20px auto', backgroundColor: '#403c44', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {/* Rendering comments only if showComments is true */}
      {showComments && <FeedbacksCell />}
    </main>
    </main>
  );
};

export default FeedbackForm;
