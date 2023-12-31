import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link href="/">
          <Image
            src="/favicon.png"
            width={46}
            height={46}
            alt="Rick and Morty logo"
            priority={true}
          />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href="/character">Character</Link>
          </li>
          <li className={styles.item}>
            <Link href="/location">Location</Link>
          </li>
          <li className={styles.item}>
            <Link href="/episode">Episode</Link>
          </li>
        </ul>
        <div className={styles.mobileMenu}>
          <Image
            src="/menu.svg"
            width={24}
            height={24}
            alt="Burger menu icon"
            priority={true}
          />
        </div>
      </nav>
    </header>
  );
}
