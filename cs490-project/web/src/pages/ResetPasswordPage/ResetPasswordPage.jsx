import { useEffect, useRef, useState } from 'react';
import { Form, Label, PasswordField, Submit, FieldError } from '@redwoodjs/forms';
import { useParams, navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';
import { useQuery, useMutation, gql } from '@apollo/client';
import Nav2 from 'src/components/Nav2/nav2'

const GET_USER_QUERY = gql`
  query FindUserByToken($resetToken: String!) {
    userbytoken(resetToken: $resetToken) {
      id
      email
      resetTokenExpiresAt
    }
  }
`;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePasswordMutation($email: String!, $newPassword: String!) {
    changePassword2(email: $email, newPassword: $newPassword) {
      email
    }
  }
`;

const RESET_TOKEN_MUTATION = gql`
  mutation ResetTokenMutation($id: Int!) {
    resetTokenAndExpiresAtNull(id: $id) {
      id
    }
  }
`;

const ResetPasswordPage = () => {
  const { token } = useParams();
  console.log("TOKEN: ", token); // Log the token to ensure it's correct
  const [email, setEmail] = useState(null);
  const [currentid, setId] = useState(null);
  const [changePassword2] = useMutation(CHANGE_PASSWORD_MUTATION);
  const [resetTokenAndExpiresAtNull] = useMutation(RESET_TOKEN_MUTATION);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { resetToken: token },
    onCompleted: (data) => {
      if (data && data.userbytoken) {
        setId(data.userbytoken.id);
        setEmail(data.userbytoken.email);
        console.log("TIME: ", data.userbytoken);
        const expiresAt = new Date(data.userbytoken.resetTokenExpiresAt);

        const now = new Date();
        if (expiresAt < now) {
          toast.error('The password reset link has expired. Please request a new one.');
        }
      } else {
        toast.error('Invalid Token. Request a new password reset link.');
      }
    },
  });
  const passwordStrengthRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword){
      toast.error('Passwords do not match!');
      return;
    } else if (!passwordStrengthRegex.test(data.password)) {
      toast.error(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.'
      );
      return;
    } else {
      changePassword2({ variables: { email: email, newPassword: data.password } });
      await resetTokenAndExpiresAtNull({ variables: { id: currentid } }); 
      navigate(routes.login());
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) {
    console.error(error);
    return <div>Error fetching user data</div>;
  }

  return (
    <>
      <Metadata title="Reset Password" />
      <header>
        <Nav2 />
      </header>
      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Reset Password</h2>
            </header>
            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <p>Email: {email}</p>
                    <Label
                      name="password"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      New Password
                    </Label>
                    <PasswordField
                      name="password"
                      autoComplete="new-password"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      ref={passwordRef}
                      validation={{
                        required: { value: true, message: 'New Password is required' },
                      }}
                    />
                    <FieldError name="password" className="rw-field-error" />

                    <Label
                      name="confirmPassword"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Confirm Password
                    </Label>
                    <PasswordField
                      name="confirmPassword"
                      autoComplete="new-password"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      ref={confirmPasswordRef}
                      validation={{
                        required: { value: true, message: 'Confirm Password is required' },
                      }}
                    />
                    <FieldError name="confirmPassword" className="rw-field-error" />
                  </div>
                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Submit
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPasswordPage;
