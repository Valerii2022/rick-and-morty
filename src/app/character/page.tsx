"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Character(): JSX.Element {
  let personageData: any[] = [];

  async function handleFetch() {
    await fetch("https://rickandmortyapi.com/api/character")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.results);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="wrapper">
      <h2 className={styles.title}>Character page</h2>
      <Link href="/">Home</Link>
      <button onClick={() => handleFetch()}>button test</button>

      <ul>
        {personageData &&
          personageData.map((el) => {
            return <li key={el.id}>{el.name}</li>;
          })}
      </ul>
    </div>
  );
}
