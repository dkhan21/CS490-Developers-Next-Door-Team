import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useEffect } from 'react'
import { useAuth } from 'src/auth'
import { useQuery, gql, useMutation } from '@apollo/client'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Button, TextField, Box, Typography } from '@mui/material';
import Sidebar from 'src/components/Sidebar/Sidebar'
import Navbar from 'src/components/Navbar/Navbar'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id){
      id
    }
  }

`
const USER_QUERY = gql`
  query FindUserById($id: Int!){
    user: user(id: $id){
      id
      email
      name
      preferredProgrammingLanguage
      preferredIDE
    }
  }
`

const ProfilePage = () => {
  const { currentUser, reauthenticate, logOut } = useAuth() 
  const { load, err, data } = useQuery(USER_QUERY, {
    variables: {id: currentUser?.id}
  })

  const [deleteUser, { loading, error }] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      //show success message
      alert('Account successfully deleted') 
      logOut()
      navigate('/')
    },
  })

  const onClickDelete = () => {
    if (confirm('Are you sure you want to delete your account?')){
      deleteUser({ variables: { id: currentUser.id }})
    }
  }


  if (!currentUser){
    return <div>Loading...</div> 
  }

  if (err){
    console.error(err)
    return <div> Error: {err.message}</div>
  }

  return (
    <Box>
      <Metadata title="Profile" description="Profile page" />
      <Navbar/>

      <div>
        <button onClick={onClickDelete}>Delete Account</button>
      </div>

      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar/>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}> 
          <Box sx={{ color: '#393E41' }}>
          <Typography variant="h4">PROFILE</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', '& > :not(style)': { m: 1 }}}>
            {/* Email */}
            <Typography>Email: {currentUser.email}</Typography>
            {/* Name */}
            {data && data.user && <Typography>Name: {data.user.name} </Typography>}

            {/* Preferred Programming Language */}
            <Typography>Preferences</Typography>
            {data && data.user && <Typography>Preferred Programming Language: {data.user.preferredProgrammingLanguage}</Typography>}
            {/* Preferred IDE */}
            {data && data.user && <Typography>Preferred IDE: {data.user.preferredIDE}</Typography>}


            {/* <Button variant="contained" sx={{ bgcolor: '#44BBA4', '&:hover': { bgcolor: '#E7BB41' }}}>Update Profile</Button>
            <Button variant="contained" sx={{ bgcolor: '#44BBA4', '&:hover': { bgcolor: '#E7BB41' }}}>Change Password</Button>
            <Button variant="contained" sx={{ bgcolor: '#44BBA4', '&:hover': { bgcolor: '#E7BB41' }}}>Delete Account</Button> */}
          </Box>
        </Box>



        </Box>
      </Box>
    </Box>
  )
  
}

export default ProfilePage

