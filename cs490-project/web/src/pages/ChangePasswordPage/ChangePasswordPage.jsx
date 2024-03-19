import { Link, routes, navigate} from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from 'src/auth'
import { useMutation } from '@redwoodjs/web'

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePasswordMutation($email: String!, $currentPassword: String!, $newPassword: String!) {
    changePassword(email: $email, currentPassword: $currentPassword, newPassword: $newPassword) {
      email
    }
  }

`

const ChangePasswordPage = () => {
  const { currentUser } = useAuth()
  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: () => {
      toast.success('Password changed successfully')
      navigate('/')
    }, 
    onError: (error) => {
      toast.error(error.message)
    },
  })


  const onSubmit = (data) => {
    changePassword( { variables: { ...data, email: currentUser.email } })
  }

  return (
    <Form onSubmit={onSubmit} >
      <Label name="currentPassword" errorClassName="error">Current Password</Label>
      <TextField
        name="currentPassword"
        placeholder="Current password"
        validation={{ required: true }}
        errorClassName='error'
      />
      <Label name="newPassword" errorClassName="error">New Password</Label>
      <TextField
        name="newPassword"
        placeholder="New password"
        validation={{ required: true }}
        errorClassName='error'
      />
      <Submit disabled={loading}>Change Password</Submit>

      {error && <div className='error'>{error.message}</div>}
    </Form>
  )
}

export default ChangePasswordPage
