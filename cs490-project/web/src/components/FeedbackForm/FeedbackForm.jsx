import React, { useState } from 'react';
import { Link, routes } from '@redwoodjs/router';
import { useAuth } from 'src/auth'

import {
  Form,
  Label, FieldError,
  TextAreaField, TextField,
  Submit, useForm
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'
import FeedbacksCell from 'src/components/FeedbacksCell';
import { QUERY as FeedbacksQuery } from 'src/components/FeedbacksCell'
import Example from 'src/components/FeedbackForm/EncryptButton';
import Filter from 'bad-words';


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
`


const FeedbackForm = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  const [rating, setRating] = useState(0);
  const handleStarClick = (clickedRating) => {
    setRating(clickedRating === rating ? 0 : clickedRating);
  };

  const [hasFeedbacked, setHasFeedbacked] = useState(false)
  const formMethods = useForm()


  const [createFeedback, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      setHasFeedbacked(true)
      toast.success('Thank you for your Feedback!')
      formMethods.reset()
    },
    refetchQueries: [{ query: FeedbacksQuery }],
  })

  const fontStyles = {
    fontFamily: 'Arial, sans-serif', // Choose the desired font-family
    fontSize: '25px', // Adjust the font size
    fontWeight: 'bold', // Adjust the font weight
    color: 'black', // Choose the text color
    textAlign: 'center', // Adjust the text alignment
    paddingTop: '110px', // Add space above the text
  };
  const filter = new Filter();
  const [profanityFound, setProfanityFound] = useState(false);

  const onSubmit = (data) => {
    const { name, body } = data;
    // Assuming your rating is stored in the 'rating' state variable

    //Get user ID
    var userID = -1;
    if (isAuthenticated) {
      userID = currentUser.id;
    }
    const user = userID;

    if (filter.isProfane(body)) {
      console.log("Profanity found!");
      setProfanityFound(true);
      return false;
    } else {
      console.log("No profanity found.");
      setProfanityFound(false);
    }

    const input = { name, rating, body: body, userId: user };
    createFeedback({ variables: { input } });
  };



  return (
    <>

      <main style={{ backgroundColor: '#3C3C44' }} >

        {/* Feedback Form submission start here!!!*/}

        <Toaster />
        {isAuthenticated ? (
          <Form onSubmit={onSubmit} formMethods={formMethods} className="mt-4 w-full" style={{ display: 'flex', flexDirection: 'row', paddingTop: '100px', backgroundColor: '#3C3C44' }}>

            <div style={{ marginLeft: '400px', marginRight: '20px', flexDirection: 'column', display: 'flex' }}>
              <Label name="name" className="name" style={{
                fontFamily: 'Open Sans, sans-serif', fontSize: '26px', fontWeight: 400, color: 'white', textAlign: 'center',
              }}>Name</Label>
              <TextAreaField name="name" required aria-label="Name"
                className="name"
                validation={{ required: true }}
                style={{ borderRadius: '10px', padding: '5px', border: '2px solid black', resize: 'none', width: '200px', height: '35px', fontSize: '16px' }}
              />
              <FieldError name="names" />
            </div>
            <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column' }}>
              <Label name="rating" className="ratings" style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '26px', fontWeight: 400, color: 'white', textAlign: 'center',
              }} >
                Quality
              </Label>
              <div className="ratings" style={{
                width: '140px', borderRadius: '10px',
                backgroundColor: 'white',
                border: '2px solid black', height: '35px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px'
              }} required >
                {[1, 2, 3, 4, 5].map((index) => (
                  <span name="rating" key={index} aria-label="rating" onClick={() => handleStarClick(index)} style={{ cursor: 'pointer' }} validation={{ required: true }} >
                    {index <= rating ? '⭐' : '☆'}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column' }}>
              <Label
                name="body" errorClassName="label error"
                className="label" style={{
                  fontFamily: 'Open Sans, sans-serif', fontSize: '26px', fontWeight: 400, color: 'white', textAlign: 'center',
                }}
              >
                Feedback
              </Label>
              <TextAreaField
                name="body"
                aria-label='body'
                className="input"
                errorClassName="input error"
                validation={{
                  required: true,
                }}
                style={{ borderRadius: '10px', padding: '3px', border: '2px solid black', height: '35px', width: '300px', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: 400 }}
              />
              <FieldError name="body" className="Profanity Found!"/>
              {profanityFound ? <span style={{ color: 'red', marginTop:'5px', marginLeft: '5px' }}>Profanity found! Please remove.</span> : null}
            </div>


            <div style={{ marginTop: '32px', marginRight: '20px', marginLeft: '0px', display: 'flex', flexDirection: 'column' }}>


              <Example className="submit-button" disabled={loading} style={{ marginTop: '10px', cursor: 'pointer', color: 'blue', width: '110px', height: '35px', border: 'none', backgroundColor: '#403c44' }} ></Example>

            </div>

          </Form>) : (
          <h3 style={{ ...fontStyles, color: 'white' }}>Please log in to provide feedback!</h3>
        )}
        {/* Feedback Form submission ends here!!!*/}

        <div style={{ height: '20px' }}>

        </div>

        <FeedbacksCell></FeedbacksCell>

      </main>

    </>
  )
}

export default FeedbackForm;