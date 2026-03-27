"use server";

import {revalidatePath} from "next/cache";
import {Post, User} from "./models";
import {connectToDb} from "./utils";
import {signIn, signOut} from "./auth";
import bcrypt from "bcrypt";

/* -------------------- TYPES -------------------- */
export type ActionState =
    | { error: string }
    | { success: true }
    | undefined;

/** Alias used by auth forms (loginForm, registerForm) */
export type AuthState = ActionState;

/* -------------------- ADD POST -------------------- */
export const addPost = async (
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> => {
    const {title, desc, slug, userId} = Object.fromEntries(formData) as {
        title: string;
        desc: string;
        slug: string;
        userId: string;
    };

    try {
        await connectToDb();

        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
        });

        await newPost.save();

        revalidatePath("/blog");
        revalidatePath("/admin");

        return {success: true};
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};

/* -------------------- DELETE POST -------------------- */
export const deletePost = async (
    formData: FormData
): Promise<void> => {
    const {id} = Object.fromEntries(formData) as { id: string };

    try {
        await connectToDb();

        await Post.findByIdAndDelete(id);

        revalidatePath("/blog");
        revalidatePath("/admin");

        return {success: true};
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};

/* -------------------- ADD USER -------------------- */
export const addUser = async (
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> => {
    const {username, email, password, img} = Object.fromEntries(
        formData
    ) as {
        username: string;
        email: string;
        password: string;
        img?: string;
    };

    try {
        await connectToDb();

        // ⚠️ IMPORTANT: hash password (you missed this before)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });

        await newUser.save();

        revalidatePath("/admin");

        return {success: true};
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};

/* -------------------- DELETE USER -------------------- */
export const deleteUser = async (
    formData: FormData
): Promise<void> => {
    const {id} = Object.fromEntries(formData) as { id: string };

    try {
        await connectToDb();

        // delete all posts by user
        await Post.deleteMany({userId: id});

        // delete user
        await User.findByIdAndDelete(id);

        revalidatePath("/admin");

        return {success: true};
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};

/* -------------------- AUTH -------------------- */
export const handleGithubLogin = async (): Promise<void> => {
    await signIn("github");
};

export const handleLogout = async (): Promise<void> => {
    await signOut();
};

/* -------------------- REGISTER -------------------- */
export const register = async (
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> => {
    const {username, email, password, img, passwordRepeat} =
        Object.fromEntries(formData) as {
            username: string;
            email: string;
            password: string;
            passwordRepeat: string;
            img?: string;
        };

    if (password !== passwordRepeat) {
        return {error: "Passwords do not match"};
    }

    try {
        await connectToDb();

        const existingUser = await User.findOne({username});

        if (existingUser) {
            return {error: "Username already exists"};
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });

        await newUser.save();

        return {success: true};
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};

/* -------------------- LOGIN -------------------- */
export const login = async (
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> => {
    const {username, password} = Object.fromEntries(formData) as {
        username: string;
        password: string;
    };

    try {
        await signIn("credentials", {
            username,
            password,
            redirect: false, // ✅ IMPORTANT in server actions
        });

        return {success: true};
    } catch (err) {
        console.log(err);

        if (err instanceof Error && err.message?.includes("CredentialsSignin")) {
            return {error: "Invalid username or password"};
        }

        return {error: "Something went wrong!"};
    }
};