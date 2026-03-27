import {connectToDb} from "@/app/lib/utils";
import {Post} from "@/app/lib/models";
import {NextResponse} from "next/server";

type paramsProps = {
    params: {
        slug: string
    }
}

export const GET = async (request: Request, {params}: paramsProps) => {
    const {slug} = params
    try {
        await connectToDb()
        const post = await Post.findOne({slug})
        return NextResponse.json(post)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch post")
    }
}

export const DELETE = async (request: Request, {params}: paramsProps) => {

    const {slug} = params
    try {
        await connectToDb()
        await Post.deleteOne({slug})
        return NextResponse.json("Post deleted")
    } catch (error) {
        console.log(error)
        throw new Error("Failed to delete post")
    }
}