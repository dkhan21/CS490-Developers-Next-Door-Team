import { Link, routes, navigate} from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from 'src/auth'
import { useMutation } from '@redwoodjs/web'

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePasswordMutation($email: String!, $newPassword: String!) {
    changePassword(email: $email, newPassword: $newPassword) {
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
    if (data.newPassword !== data.confirmNewPassword){
      alert('Passwords do not match!')
    }else{
      changePassword( { variables: { ...data, email: currentUser.email } })
    }
    
  }

  return (
    <div >
      <Form onSubmit={onSubmit} >
        <Label name="newPassword" errorClassName="error">New Password</Label>
        <TextField
          name="newPassword"
          placeholder="New Password"
          validation={{ required: true }}
          errorClassName='error'
        />
        <Label name="confirmNewPassword" errorClassName="error">Confirm New Password</Label>
        <TextField
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          validation={{ required: true }}
          errorClassName='error'
        />
        <Submit disabled={loading}>Change Password</Submit>

        {error && <div className='error'>{error.message}</div>}
      </Form>
    </div>
  )
}

export default ChangePasswordPage
