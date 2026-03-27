import styles from "./adminUsers.module.css";
import Image from "next/image";
import {getUsers} from "@/app/lib/data";
import {deleteUser} from "@/app/lib/action";
import type {User} from "@/app/lib/types";

const AdminUsers = async () => {
    const users: User[] = await getUsers();

    return (
        <div className={styles.container}>
            <h1>Users</h1>
            {users.map((user) => (
                <div className={styles.user} key={user.id}>
                    <div className={styles.detail}>
                        <Image
                            src={user.img || "/noAvatar.png"}
                            alt=""
                            width={50}
                            height={50}
                        />
                        <span>{user.username}</span>
                    </div>
                    <form action={deleteUser}>
                        <input type="hidden" name="id" value={user.id}/>
                        <button className={styles.userButton}>Delete</button>
                    </form>
                </div>
            ))}
        </div>
    );
};

export default AdminUsers;