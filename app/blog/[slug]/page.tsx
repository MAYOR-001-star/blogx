import Image from "next/image";
import styles from "./singlePost.module.css";
import {getPost} from "@/app/lib/data";

type paramsProps = {
    params: {
        slug: number
    }
}

const SinglePostPage = async ({params}: paramsProps) => {
    const {slug} = params
    const post = await getPost(slug)
    return (
        <div className={styles.container}>
            {/* Image Section */}
            <div className={styles.imgContainer}>
                <Image
                    src="https://images.pexels.com/photos/19457037/pexels-photo-19457037/free-photo-of-the-view-from-the-top-of-a-building-in-paris.jpeg"
                    alt=""
                    fill
                    className={styles.img}
                />
            </div>

            {/* Text Section */}
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Title</h1>

                <div className={styles.detail}>
                    <Image
                        className={styles.avatar}
                        src="https://images.pexels.com/photos/19457037/pexels-photo-19457037/free-photo-of-the-view-from-the-top-of-a-building-in-paris.jpeg"
                        alt=""
                        width={50}
                        height={50}
                    />

                    <div className={styles.detailText}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailTitle}>Author: </span>
                            <span className={styles.detailValue}>Terry Jefferson</span>
                        </div>

                        <div className={styles.detailItem}>
                            <span className={styles.detailTitle}>Published: </span>
                            <span className={styles.detailValue}>01.01.2024</span>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Iure velit quisquam natus blanditiis? Autem, dolore consectetur
                    sunt quod temporibus voluptates deserunt rerum atque.
                    Necessitatibus, repellendus!
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;