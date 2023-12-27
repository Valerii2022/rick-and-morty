import styles from "./page.module.css";
import Image from "next/image";

export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <p>my first project with Next.js</p>
      <p className="montserat">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo aperiam
        cum aliquid, nihil odio accusantium.
      </p>

      <Image
        src="/logo.png"
        width={500}
        height={300}
        alt="Rick and Morty logo"
        priority={true}
      />
    </main>
  );
}
