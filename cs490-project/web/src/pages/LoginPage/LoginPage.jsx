import { useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
  CheckboxField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Nav2 from 'src/components/Nav2/nav2'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const [rememberMe, setRememberMe] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('rememberMe') === 'true') {
      const rememberedUsername = localStorage.getItem('username')
      if (usernameRef.current) {
        usernameRef.current.value = rememberedUsername
      }
    }
  }, [])
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const expires = rememberMe ? 60 * 60 * 24 * 30 * 3 : 60 * 60 * 24
    const response = await logIn({
      username: data.username,
      password: data.password,
      rememberMe,
      expires,
    })

    // Check if the response is defined
    if (response) {
      if (!response.error) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true')
          localStorage.setItem('username', data.username)
        } else {
          localStorage.removeItem('rememberMe')
          localStorage.removeItem('username')
        }
      }

      if (response.message) {
        toast(response.message)
      } else if (response.error) {
        toast.error(response.error)
      } else {
        toast.success('Welcome back!')
      }
    } else {
      // Handle the case where the response is undefined
      toast.error('An error occurred during login.')
    }
  }

  return (
    <>
      <Metadata title="Login" />
      <header>
        <Nav2 />
      </header>
      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Login</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
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
                        message: 'Email is required',
                      },
                    }}
                  />

                  <FieldError name="username" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <div className="rw-forgot-link">
                    <Link
                      to={routes.forgotPassword()}
                      className="rw-forgot-link"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <FieldError name="password" className="rw-field-error" />
                  <div className="rw-checkbox-group">
                    <Label
                      name="rememberMe"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Remember Me?
                    </Label>

                    <CheckboxField
                      name="rememberMe"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </div>
                  <FieldError name="rememberMe" className="rw-field-error" />
                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Login</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Don&apos;t have an account?</span>{' '}
            <Link to={routes.signup()} className="rw-link">
              Sign up!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
