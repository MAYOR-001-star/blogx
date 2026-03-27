"use client";

import {ActionState, addUser} from "@/app/lib/action";
import styles from "./adminUserForm.module.css";
import {useActionState} from "react";

const AdminUserForm = () => {
    const [state, formAction, isPending] = useActionState<ActionState, FormData>(addUser, undefined);

    return (
        <form action={formAction} className={styles.container}>
            <h1>Add New User</h1>
            <input type="text" name="username" placeholder="username"/>
            <input type="text" name="email" placeholder="email"/>
            <input type="password" name="password" placeholder="password"/>
            <input type="text" name="img" placeholder="img"/>
            <select name="isAdmin">
                <option value="false">Is Admin?</option>
                <option value="false">No</option>
                <option value="true">Yes</option>
            </select>
            <button disabled={isPending}>
                {isPending ? "Adding..." : "Add"}
            </button>
            {state && "error" in state && state.error}
        </form>
    );
};

export default AdminUserForm;