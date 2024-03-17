import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useEffect } from 'react'
import { useAuth } from 'src/auth'
import { useQuery, gql, useMutation } from '@apollo/client'
import { toast, Toaster } from '@redwoodjs/web/toast'


const ProfilePage = () => {
  const { currentUser, reauthenticate } = useAuth() 


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
      <Link to={routes.resetPassword()}>Reset Password</Link>
     
    </>
  )
}

export default ProfilePage

