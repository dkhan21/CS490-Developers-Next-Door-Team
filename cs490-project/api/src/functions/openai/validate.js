import { authDecoder, dbAuthSession, extractCookie, getSession, decryptSession } from '@redwoodjs/auth-dbauth-api'


export const validateCookie = function(event, context){
  //Cookie will contain dbAuth information
  const cookie = extractCookie(event);
  if(cookie == undefined || cookie == null){
    console.log("Not logged in")
    return -1;
  }
  if (cookie) {
    //Obtain encrypted dbAuth string from cookie
    const encryptedSession = getSession(cookie, "session_8911")
    
    if (encryptedSession) {
      try{
        const [session, _csrfToken] = decryptSession(encryptedSession)
        context.currentUser = { ...session }
        return context.currentUser;
      }
      catch(error){
        //Usually this means the cookie has been tampered with
        console.error('Error decrypting session - ', error);
        return -1;
      }

    }
    else {
      console.log("Invalid session")
      return -1;
    }
  }
}