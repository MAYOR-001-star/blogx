"use client";

import {ActionState, addPost} from "@/app/lib/action";
import styles from "./adminPostForm.module.css";
import {useActionState} from "react";

const AdminPostForm = ({userId}: {userId: string}) => {
    const [state, formAction, isPending] = useActionState<ActionState, FormData>(addPost, undefined);

    return (
        <form action={formAction} className={styles.container}>
            <h1>Add New Post</h1>
            <input type="hidden" name="userId" value={userId}/>
            <input type="text" name="title" placeholder="Title"/>
            <input type="text" name="slug" placeholder="slug"/>
            <input type="text" name="img" placeholder="img"/>
            <textarea name="desc" placeholder="desc" rows={10}/>
            <button disabled={isPending}>
                {isPending ? "Adding..." : "Add"}
            </button>
            {state && "error" in state && state.error}
        </form>
    );
};

export default AdminPostForm;