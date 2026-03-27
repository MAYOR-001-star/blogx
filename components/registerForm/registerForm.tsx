"use client";

import styles from "./registerForm.module.css";
import Link from "next/link";
import {AuthState, register} from "@/app/lib/action";
import {useActionState, useEffect} from "react";
import {useRouter} from "next/navigation";

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState<AuthState, FormData>(
        register,
        undefined
    );

    const router = useRouter();

    useEffect(() => {
        if (state && "success" in state && state.success) {
            router.push("/login");
        }
    }, [state, router]);

    return (
        <form className={styles.form} action={formAction}>
            <input type="text" name="username" placeholder="username"/>
            <input type="email" name="email" placeholder="email"/>
            <input type="password" name="password" placeholder="password"/>
            <input type="password" name="passwordRepeat" placeholder="password again"/>

            <button disabled={isPending}>
                {isPending ? "Registering..." : "Register"}
            </button>

            {state && "error" in state && <p className={styles.error}>{state.error}</p>}

            <Link href="/login">
                Have an account? <b>Login</b>
            </Link>
        </form>
    );
};

export default RegisterForm;