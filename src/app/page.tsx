import Image from "next/image";
import styles from "./page.module.css";

export default function Home(): JSX.Element {
  return (
    <main className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.imageWrapper}>
          <Image
            src="/logo.png"
            sizes="100vw, 33vw"
            fill
            alt="Rick and Morty logo"
            priority={true}
          />
        </div>
      </div>
    </main>
  );
}
