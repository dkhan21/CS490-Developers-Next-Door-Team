import { Link, routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import { Form, TextField, Submit } from '@redwoodjs/forms'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

// import { updateUser } from 'src/services/users/users'
const UPDATE_USER_MUTATION = gql`
  mutation UpdatedUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name 
      email
    }
  }

`

const UpdateProfilePage = () => {
  const { currentUser, reauthenticate } = useAuth() 
  const [updateUser, {loading: updating, error: updateError}] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: (response) => {
      navigate(routes.profile())
    },
  })

  const [name, setName] = useState(currentUser.name)

  const onSubmit = (data) => {
    const variables = { input: { id: currentUser.id, ...data } } 
      setName(data.name)

      updateUser({ variables })
        .then(() => {
          reauthenticate()
        },1000)
  }

  return (
    
    <Form onSubmit={onSubmit}>
      <TextField 
        name="name"
        defaultValue={name}
        // onChange={(e) => setName(e.target.value)}
        validation={{ required: true }}
      />

      <TextField 
        name="email"
        defaultValue={currentUser.email}
        validation={{ required: true }}
      />
      
      <Submit>Update Profile</Submit>
    </Form>
  )
}

export default UpdateProfilePage
