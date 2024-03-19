import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useEffect } from 'react'
import { useAuth } from 'src/auth'
import { useQuery, gql, useMutation } from '@apollo/client'
import { toast, Toaster } from '@redwoodjs/web/toast'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id){
      id
    }
  }

`

const ProfilePage = () => {
  const { currentUser, reauthenticate, logOut } = useAuth() 

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

  return (
    <>
      <Metadata title="Profile" description="Profile page" />
      <p>
        Email: {currentUser.email}
      </p>

      <Link to={routes.updateProfile()}>Update Profile</Link>
      <Link to={routes.changePassword()}>Change Password</Link>
     <button onClick={onClickDelete}>Delete Account</button>
    </>
  )
}

export default ProfilePage

