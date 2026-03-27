"use client";

import {AuthState, login} from "@/app/lib/action";
import {useActionState, useEffect} from "react";
import {useRouter} from "next/navigation";
import styles from "./loginForm.module.css";


const LoginForm = () => {
    const [state, formAction, isPending] = useActionState<AuthState, FormData>(
        login,
        undefined
    );

    const router = useRouter();

    useEffect(() => {
        if (state && "success" in state && state.success) {
            router.push("/");
        }
    }, [state, router]);

    return (
        <form className={styles.form} action={formAction}>
            <input type="text" name="username" placeholder="username"/>
            <input type="password" name="password" placeholder="password"/>

            <button disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
            </button>

            {state && "error" in state && <p>{state.error}</p>}
        </form>
    );
};

export default LoginForm;