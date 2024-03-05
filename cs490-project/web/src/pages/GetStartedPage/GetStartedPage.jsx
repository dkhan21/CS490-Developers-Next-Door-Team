import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import React, { useState } from 'react';
import {
  Form,
  Label, FieldError,
  TextAreaField, TextField,
  Submit,
} from '@redwoodjs/forms'

import FeedbackForm from 'src/components/FeedbackForm';


const GetStartedPage = () => {

  return (
    <>
      <Metadata title="GetStarted" description="GetStarted page" />

      <h1>GetStartedPage</h1>

      <main>
        <p>Start Converting!</p>
        <Link to={routes.home()}>Back Home</Link>



        {/* Feedback Form submission start here!!!*/}
        <FeedbackForm ></FeedbackForm>

        {/* Feedback Form submission ends here!!!*/}


      </main>
    </>
  );
};

export default GetStartedPage;
