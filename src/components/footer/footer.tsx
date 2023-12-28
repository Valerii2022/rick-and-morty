import styles from "./footer.module.css";
import Image from "next/image";

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        <span>Make with</span>
        <Image
          src="/heart.svg"
          width={16}
          height={16}
          alt="Rick and Morty logo"
          priority={true}
        ></Image>{" "}
        <span>for the MobProgramming team</span>
      </p>
    </footer>
  );
}
