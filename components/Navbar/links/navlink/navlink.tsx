"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";

type itemProps = {
    item: {
        title: string;
        path: string;
    };
};


const NavLink = ({item}:itemProps) => {
    const pathName = usePathname();

    return (
        <Link
            href={item.path}
            className={`${styles.container} ${
                pathName === item.path && styles.active
            }`}
        >
            {item.title}
        </Link>
    );
};

export default NavLink;