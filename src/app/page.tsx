import Image from "next/image";
import styles from "./page.module.css";

export default function Home(): JSX.Element {
  return (
    <main className="wrapper">
      <div className={styles.inner}>
        <Image
          src="/logo.png"
          width={600}
          height={200}
          alt="Rick and Morty logo"
          priority={true}
        />
      </div>
    </main>
  );
}
