import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useEffect } from 'react'
import { useAuth } from 'src/auth'
import { useQuery, gql } from '@apollo/client'

const GET_USER_QUERY = gql`
  query GetUserNameQuery($id: Int!) {
    user(id: $id) {
      name
    }
  }
`

const ProfilePage = () => {
  const { currentUser, reauthenticate } = useAuth() 

  
  const { data: userData } = useQuery(GET_USER_QUERY, {
    variables: { id: currentUser.id },
  })

  if (!currentUser || !userData){
    return <div>Loading...</div> 
  }

  return (
    <>
      <Metadata title="Profile" description="Profile page" />
      <p>
      Name: {userData.user.name}
      </p>
      <p>
        Email: {currentUser.email}
      </p>

      <Link to={routes.updateProfile()}>Update Profile</Link>
      <Link to={routes.resetPassword()}>Reset Password</Link>
     
    </>
  )
}

export default ProfilePage
