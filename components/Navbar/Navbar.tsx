import Link from "next/link"
import Links from "./links/Links"
import styles from "./navbar.module.css"
import {auth} from "@/app/lib/auth";

const Navbar = async () => {
    const session = await auth()
    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>Blog<span className="text-[#3673FD]">X</span></Link>
            <div>
                <Links session={session}/>
            </div>
        </div>
    )
}

export default Navbar