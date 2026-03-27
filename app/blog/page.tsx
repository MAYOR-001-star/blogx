import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css"
import {getPosts} from "@/app/lib/data";

interface Post {
    id: number,
    title: string,
    body: string,
}

const blogPage = async () => {
    const posts = await getPosts()
    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <div className={styles.post} key={post.id}>
                    <PostCard post={post}/>
                </div>
            ))}
        </div>
    );
};

export default blogPage