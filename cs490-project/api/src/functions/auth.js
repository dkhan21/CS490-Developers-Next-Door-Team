import { DbAuthHandler } from '@redwoodjs/auth-dbauth-api'
import { cookieName } from 'src/lib/auth'
import { db } from 'src/lib/db'
import sgMail from '@sendgrid/mail'
import SENDGRID_API_KEY from '**/.env';
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function generateResetToken() {
  return Math.random().toString(36).slice(2);
}

const sendResetPasswordEmail = async (email, resetToken) => {
  console.log('Sending reset password email to:', email, 'with API:', SENDGRID_API_KEY)
  const resetUrl = `http://localhost:8910/reset-password?token=${resetToken}`;
  const msg = {
    to: email,
    from: 'kas23@njit.edu',
    subject: 'Code Harbor: Reset Your Password',
    text: `Click the link to reset your password: ${resetUrl}`, 
    html: `Click the link to reset your password: <a href="${resetUrl}">${resetUrl}</a>`,
  };
  return sgMail.send(msg);
}

export const handler = async (event, context) => {  
  const forgotPasswordOptions = {
    handler: async (user) => {
      try {
        const resetToken = generateResetToken();
        await db.user.update({
          where: { email: user.email },
          data: {
            resetToken,
            resetTokenExpiresAt: new Date(Date.now() + 60 * 60 * 24 * 7) // 1 hour expiry
          }
        });
        await sendResetPasswordEmail(user.email, resetToken);
        return { email: user.email };
      } catch (error) {
        console.error('Error sending reset password email:', error);
        throw new Error('Failed to send reset password email');
      }
    },

    expires: 60 * 60 * 24,

    errors: {
      usernameNotFound: 'Username not found',
      usernameRequired: 'Username is required',
    },
  }
  let rememberMe
  const loginOptions = {
    rememberMe: true,
    handler: (user) => {
      return user
    },

    errors: {
      usernameOrPasswordMissing: 'Both email and password are required',
      usernameNotFound: 'Email ${username} not found',
      incorrectPassword: 'Incorrect password for ${username}',
    },

    expires: rememberMe ? 60 * 60 * 24 * 30 * 3 : 60 * 60 * 24,
  }

  const resetPasswordOptions = {
    handler: (_user) => {
      return true
    },

    allowReusedPassword: true,

    errors: {
      resetTokenExpired: 'resetToken is expired',
      resetTokenInvalid: 'resetToken is invalid',
      resetTokenRequired: 'resetToken is required',
      reusedPassword: 'Must choose a new password',
    },
  }

  const signupOptions = {
    handler: ({
      username,
      hashedPassword,
      salt,
      userAttributes: _userAttributes,
    }) => {
      return db.user.create({
        data: {
          email: username,
          hashedPassword: hashedPassword,
          salt: salt,
        },
      })
    },

    passwordValidation: (_password) => {
      return true
    },

    errors: {
      fieldMissing: '${field} is required',
      usernameTaken: 'Email `${username}` already in use',
    },
  }

  const authHandler = new DbAuthHandler(event, context, {
    db: db,

    authModelAccessor: 'user',

    credentialModelAccessor: 'userCredential',

    authFields: {
      id: 'id',
      username: 'email',
      hashedPassword: 'hashedPassword',
      salt: 'salt',
      resetToken: 'resetToken',
      resetTokenExpiresAt: 'resetTokenExpiresAt',
      challenge: 'webAuthnChallenge',
    },

    cookie: {
      attributes: {
        HttpOnly: true,
        Path: '/',
        SameSite: 'Strict',
        Secure: process.env.NODE_ENV !== 'development' ? true : false,
      },
      name: cookieName,
    },

    forgotPassword: forgotPasswordOptions,
    login: loginOptions,
    resetPassword: resetPasswordOptions,
    signup: signupOptions,

    webAuthn: {
      enabled: true,
      expires: 60 * 60 * 24 * 365 * 10,
      name: 'Redwood Application',
      domain:
        process.env.NODE_ENV === 'development' ? 'localhost' : 'server.com',
      origin:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8910'
          : 'https://server.com',
      type: 'platform',
      timeout: 60000,
      credentialFields: {
        id: 'id',
        userId: 'userId',
        publicKey: 'publicKey',
        transports: 'transports',
        counter: 'counter',
      },
    },
  })

  return await authHandler.invoke()
}