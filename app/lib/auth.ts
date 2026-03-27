import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {connectToDb} from "@/app/lib/utils";
import CredentialsProvider from "next-auth/providers/credentials";
import {User} from "@/app/lib/models";
import bcrypt from "bcrypt";

type LoginCredentials = {
    username: string
    password: string
}

const login = async (credentials: LoginCredentials) => {
    try {
        await connectToDb()
        const user = await User.findOne({username: credentials.username})
        if (!user) {
            throw new Error("Wrong credentials")
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
        if (!isPasswordCorrect) {
            throw new Error("Wrong credentials")
        }
        return user
    } catch (error) {
        console.log(error);
        return false
    }
}

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials) return null

                const typedCredentials = credentials as LoginCredentials

                try {
                    const user = await login(typedCredentials)
                    return user
                } catch {
                    return null
                }
            },
        })
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            console.log(user, account, profile)
            if (account?.provider === "github") {
                await connectToDb()
                try {
                    const user = await User.findOne({email: profile?.email})
                    if (!user) {
                        const newUser = new User({
                            email: profile?.email,
                            image: profile?.avatar_url,
                            name: profile?.login,
                        })
                    }
                } catch (error) {
                    console.log(error);
                    return false
                }
            }
            return true
        }
    }
})