import styles from "./page.module.css";
import Link from "next/link";

export default function Location(): JSX.Element {
  return (
    <div className="wrapper">
      <h2 className={styles.title}>Location page</h2>
      <Link href="/">Home</Link>
    </div>
  );
}
