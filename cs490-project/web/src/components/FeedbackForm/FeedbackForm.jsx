import React, { useState } from 'react';
import { Link, routes } from '@redwoodjs/router';

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

const CREATE = gql`
  mutation CreateFeedbackMutation($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      id
      name
      rating
      body
      createdAt
    }
  }
`


const FeedbackForm = () => {

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

  const onSubmit = (data) => {
    const { name, body } = data;
    // Assuming your rating is stored in the 'rating' state variable
    const input = { name, rating, body: body };
    createFeedback({ variables: { input } });
  };

  return (
    <>
      <main >
        {/* Feedback Form submission start here!!!*/}
        <Toaster />
        <Form onSubmit={onSubmit} formMethods={formMethods} className="mt-4 w-full" style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>

          <div style={{ marginLeft: '400px', marginRight: '20px', flexDirection: 'column' }}>
            <Label name="name">Name</Label>

            <TextAreaField name="name" required
              className="block w-full p-1 border rounded h-24 text-xs"
              validation={{ required: true }}
              style={{ borderRadius: '10px', border: '2px solid black', resize: 'none', width: '200px', height: '30px', fontSize: '16px' }}
            />
            <FieldError name="names" />
          </div>

          <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column' }}>
            <Label name="rating" className="block text-sm text-gray-600 uppercase" >
              Quality
            </Label>
            <div style={{
              width: '140px', borderRadius: '10px',
              backgroundColor: 'white',
              border: '2px solid black', height: '25px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '5px'
            }} required >
              {[1, 2, 3, 4, 5].map((index) => (
                <span name="rating" key={index} onClick={() => handleStarClick(index)} style={{ cursor: 'pointer' }} validation={{ required: true }} >
                  {index <= rating ? '⭐' : '☆'}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column' }}>
            <Label
              name="body"
              className="block mt-4 text-sm text-gray-600 uppercase"
            >
              Feedback
            </Label>
            <TextAreaField
              name="body"
              validation={{ required: true }}
              style={{ borderRadius: '10px', border: '2px solid black', resize: 'none', width: '300px' }}
            />
            <FieldError name="body" />

          </div>

          <div style={{ marginTop: '37px', marginRight: '20px', marginLeft: '0px' }}>

            <Submit className="submit-button" disabled={loading} style={{ cursor: 'pointer', color: 'white', width: '110px', height: '35px', border: 'none', backgroundColor: 'white' }}
            >
              <Example ></Example>

            </Submit>
          </div>

        </Form>
        {/* Feedback Form submission ends here!!!*/}

        <FeedbacksCell ></FeedbacksCell>

      </main>
    </>
  )
}

export default FeedbackForm;
