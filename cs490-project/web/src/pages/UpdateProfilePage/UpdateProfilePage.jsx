import { Link, routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import { Form, TextField, Submit } from '@redwoodjs/forms'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { toast, Toaster } from '@redwoodjs/web/toast'

const UPDATE_USER_MUTATION = gql`
  mutation UpdatedUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      email
    }
  }

`

const UpdateProfilePage = () => {
  const { currentUser, reauthenticate } = useAuth() 
  const [updateUser, {loading: updating, error: updateError}] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: (response) => {
      // toast.success('Profile updated successfully')
      navigate(routes.profile())
    },
  })

  // const [name, setName] = useState(currentUser.name)
  //  

  const onSubmit = (data) => {

    const input = { 
      id: currentUser.id, 
      email: data.email || currentUser.email}

    const variables = { input }

    updateUser({ variables })
      .then(() => {
        reauthenticate()
      },1000)
  }

  return (
    <div style={{ display: 'flex'}}>
      <Form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <div>
          <label>Email </label>
          <TextField 
            name="email"
            placeholder="New Email"
          />
        </div>
        
        <div>
          <Submit>Update Profile</Submit>
        </div>
      </Form>
    </div>
  )
  
}

export default UpdateProfilePage