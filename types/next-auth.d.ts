import { DefaultUser, ISODateString } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module "next-auth" {
    interface User extends DefaultUser {
        UserId: string,
        Role?: "admin" | "manager",
        Email: string,
        Photo?: string,
        Username: string,
        PhoneNumber: number,
    }

    interface Session {
        user: User
        expires: ISODateString
    }

}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role?: "admin" | "manager",
        phoneNumber: number
    }
}