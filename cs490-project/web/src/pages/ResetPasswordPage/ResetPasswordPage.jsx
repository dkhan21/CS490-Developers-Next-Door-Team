import { useEffect, useRef, useState } from 'react'

import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const ResetPasswordPage = ({ resetToken }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [resetToken, validateResetToken])

  const passwordRef = useRef(null)
  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <Metadata title="Reset Password" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Reset Password
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
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
                      disabled={!enabled}
                      ref={passwordRef}
                      validation={{
                        required: {
                          value: true,
                          message: 'New Password is required',
                        },
                      }}
                    />

                    <FieldError name="password" className="rw-field-error" />
                  </div>

                  <div className="rw-button-group">
                    <Submit
                      className="rw-button rw-button-blue"
                      disabled={!enabled}
                    >
                      Submit
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>



      <div style = {{ flex: 1, marginRight: "300px" }}>
    <ThemeProvider theme={theme}>
      <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh'}}>
        <Grid item xs={12} style={{ textAlign: 'center', marginBottom: "20px "}}>
          <h1>Update Profile</h1>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <form onSubmit={onSubmit}>
            {/* Existing fields... */}
            <Grid item className={classes.textField}>
              <Label
                name="password"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Current Password
              </Label>
              <PasswordField
                name="currentPassword"
                autoComplete="current-password"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                disabled={!enabled}
                ref={currentPasswordRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Current Password is required',
                  },
                }}
              />
              <FieldError name="currentPassword" className="rw-field-error" />
            </Grid>
            <Grid item className={classes.textField}>
              <Label
                name="password"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                New Password
              </Label>
              <PasswordField
                name="newPassword"
                autoComplete="new-password"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                disabled={!enabled}
                ref={newPasswordRef}
                validation={{
                  required: {
                    value: true,
                    message: 'New Password is required',
                  },
                }}
              />
              <FieldError name="newPassword" className="rw-field-error" />
            </Grid>
            <Grid item className={classes.textField}>
              <Label
                name="password"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Confirm New Password
              </Label>
              <PasswordField
                name="confirmNewPassword"
                autoComplete="new-password"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                disabled={!enabled}
                ref={confirmNewPasswordRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Confirm New Password is required',
                  },
                }}
              />
              <FieldError name="confirmNewPassword" className="rw-field-error" />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" sx={{ bgcolor: '#44BBA4', '&:hover': { bgcolor: '#E7BB41' }}}>
                Update Profile
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
    </>
  )
}

export default ResetPasswordPage
