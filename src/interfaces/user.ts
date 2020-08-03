interface Profile {   
   readonly name: string,
   readonly email: string
}

interface AdditionalUserInfo {
   readonly isNewUser: boolean,
   profile: Profile
}

interface user {
   photoURL: string
}

export default interface User {
   additionalUserInfo: AdditionalUserInfo,
   user: user
}

