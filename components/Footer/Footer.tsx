import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Blog<span className="text-[#3673FD]">X</span></div>
            <div className={styles.text}>
                BlogX is a creative thoughts agency © All rights reserved.
            </div>
        </div>
    );
};

export default Footer;