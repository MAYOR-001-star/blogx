import Link from "next/link"
import Links from "./links/Links"
import styles from "./navbar.module.css"

const Navbar = async () => {
    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>Blog<span className="text-[#3673FD]">X</span></Link>
            <div>
                <Links/>
            </div>
        </div>
    )
}

export default Navbar