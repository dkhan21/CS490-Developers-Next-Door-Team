import { useEffect, useRef, useState } from 'react'; // Added useState import

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms';
import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';
import Nav2 from 'src/components/Nav2/nav2'
import { useAuth } from 'src/auth';

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home());
    }
  }, [isAuthenticated]);

  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data.username);
    const response = await forgotPassword(data.username);
    console.log(response);
    if (response?.error === 'Username not found') {
      toast.error('Email address not found. Please check and try again.');
    } else if (response?.email) {
      toast.success('Password reset email sent. Please check your email.');
      setTimeout(() => {
        navigate(routes.login());
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <>
      <Metadata title="Forgot Password" />
      <header>
        <Nav2 />
      </header>
      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Forgot Password</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <Label
                      name="username"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Email
                    </Label>
                    <TextField
                      name="username"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      ref={usernameRef}
                      validation={{
                        required: {
                          value: true,
                          message: 'Username is required',
                        },
                      }}
                    />

                    <FieldError name="username" className="rw-field-error" />
                  </div>

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue" disabled={loading}>Submit</Submit> {/* Added disabled attribute */}
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

export default ForgotPasswordPage;
