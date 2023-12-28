import styles from "./page.module.css";
import Link from "next/link";

export default function Episode(): JSX.Element {
  return (
    <div className="wrapper">
      <h2 className={styles.title}>Episode page</h2>
      <Link href="/">Home</Link>
    </div>
  );
}
