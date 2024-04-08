import sgMail from '@sendgrid/mail';
import { sendResetPasswordEmail } from './auth.js';
import { generateResetToken } from './auth.js';
import { db } from 'src/lib/db';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

describe('sendResetPasswordEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends reset password email with correct parameters', async () => {
    // Arrange
    const email = 'test@example.com';
    const resetToken = 'randomToken';

    // Act
    await sendResetPasswordEmail(email, resetToken);

    // Assert
    expect(sgMail.send).toHaveBeenCalledTimes(1);
    expect(sgMail.send).toHaveBeenCalledWith({
      to: email,
      from: 'kas23@njit.edu',
      subject: 'Code Harbor: Reset Your Password',
      text: expect.stringContaining(resetToken),
      html: expect.stringContaining(resetToken),
    });
  });
  it('generates a unique reset token', async () => {
    // Mock the findUnique function of the db.user object
    db.user.findUnique = jest.fn().mockReturnValueOnce(null); // First call returns null
    db.user.findUnique.mockReturnValueOnce({}); // Second call returns a user object
    // Act
    const token = await generateResetToken();
    // Assert
    expect(token).toBeTruthy(); // Check if token is generated
    expect(typeof token).toBe('string'); // Check if token is a string

    // Check if token length is greater than 0
    expect(token.length).toBeGreaterThan(0);

    // Check if the token format is correct (alphanumeric characters)
    expect(token).toMatch(/^[a-zA-Z0-9]+$/);

    // Check if findUnique function is called once
    expect(db.user.findUnique).toHaveBeenCalledTimes(1);
  });
  
});
