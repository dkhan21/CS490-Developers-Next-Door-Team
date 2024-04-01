import { Link, routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import { Form, TextField, Submit } from '@redwoodjs/forms'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { toast, Toaster } from '@redwoodjs/web/toast'
// import { Button, Box, Typography } from '@mui/material';

const UPDATE_USER_MUTATION = gql`
  mutation UpdatedUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      email
      name
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
    console.log(data)

    const input = { 
      id: currentUser.id, 
      email: data.email || currentUser.email,
      // name: data.name || currentUser.name 
    }

    if (data.name){
      input.name = data.name
    }

    if (data.preferredProgrammingLanguage){
      input.preferredProgrammingLanguage = data.preferredProgrammingLanguage
    }

    if (data.preferredIDE){
      input.preferredIDE = data.preferredIDE
    }

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
          <label>Name </label>
          <TextField 
            name="name"
            placeholder="New Name"
          />
          <label>Preferred Programming Language</label>
          <TextField 
            name="preferredProgrammingLanguage"
            placeholder="Preferred Programming Language"
          />

          <label>Preferred IDE</label>
          <TextField 
            name="preferredIDE"
            placeholder="Preferred IDE"
          />
        </div>

        
        <div>
          <Submit>Update Profile</Submit>
        </div>
      </Form>

{/* 
      <Box sx={{ color: '#393E41' }}>
      <Typography variant="h4">Profile Page</Typography>
      <Box component="form" sx={{ '& > :not(style)': { m: 1 }}}>
        <TextField label="Email" InputProps={{readOnly: true}} variant="outlined" />
        <TextField label="Name"  InputProps={{readOnly: true}} variant="outlined" />
        <TextField label="Preferred Programming Language" InputProps={{readOnly: true}} variant="outlined" />
        <TextField label="Preferred IDE" InputProps={{readOnly: true}} variant="outlined" />
        <Button variant="contained" sx={{ bgcolor: '#44BBA4', '&:hover': { bgcolor: '#E7BB41' }}}>Update Profile</Button>
        <Button variant="contained" sx={{ bgcolor: '#44BBA4', '&:hover': { bgcolor: '#E7BB41' }}}>Change Password</Button>
        <Button variant="contained" sx={{ bgcolor: '#44BBA4', '&:hover': { bgcolor: '#E7BB41' }}}>Delete Account</Button>
      </Box>
    </Box> */}
    </div>
  )
  
}

export default UpdateProfilePage
