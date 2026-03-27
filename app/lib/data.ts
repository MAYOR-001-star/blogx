import {Post, User} from "@/app/lib/models";
import {connectToDb} from "@/app/lib/utils";
import {unstable_noStore as noStore} from "next/cache";

export const getPosts = async () => {
    try {
        await connectToDb()
        const posts = await Post.find()
        return posts
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch posts")
    }
}

export const getPost = async (slug: string) => {
    try {
        await connectToDb()
        const post = await Post.findOne({slug})
        return post
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch post")
    }
}

export const getUser = async (id: any) => {
    noStore()
    try {
        await connectToDb()
        const user = await User.findById(id)
        return user
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch user")
    }
}

export const getUsers = async () => {
    try {
        await connectToDb()
        const users = await User.find()
        return users
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch users")
    }
}
