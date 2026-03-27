import styles from "./postUser.module.css";
import Image from "next/image";
import {getUser} from "@/app/lib/data";
import {Types} from "mongoose";

const PostUser = async ({userId}: { userId: string | Types.ObjectId }) => {
    const user = await getUser(userId);
    if (!user) {
        return null
    }
    return (
        <div className={styles.container}>
            <Image
                className={styles.avatar}
                src={user.img ? user.img : "/noavatar.png"}
                alt=""
                width={50}
                height={50}
            />
            <div className={styles.texts}>
                <span className={styles.title}>Author</span>
                <span className={styles.username}>{user.username}</span>
            </div>
        </div>
    );
};

export default PostUser;