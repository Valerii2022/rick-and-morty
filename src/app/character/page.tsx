"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Character(): JSX.Element {
  const [personageData, setPersonageData] = useState([]);
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      await fetch("https://rickandmortyapi.com/api/character")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error");
          }
          return response.json();
        })
        .then((data) => {
          let result = data;
          if (species) {
            result = data.filter(
              (el: { species: string }) => el.species === species
            );
          }
          if (gender) {
            result = data.filter(
              (el: { gender: string }) => el.gender === gender
            );
          }
          if (status) {
            result = data.filter(
              (el: { status: string }) => el.status === status
            );
          }
          setPersonageData(result);
        })
        .catch((error) => console.log(error));
    })();
  }, [gender, status, species]);

  return (
    <div className="wrapper">
      <div className={styles.inner}>
        <Image
          src="/logo.png"
          width={600}
          height={200}
          alt="Rick and Morty logo"
          priority={true}
        />
      </div>
      <ul className={styles.inputList}>
        <li className={styles.inputItem}>
          <label htmlFor="name">
            <Image
              src="/search.svg"
              width={24}
              height={24}
              alt="Search icon"
              priority={true}
            />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Filter by name..."
            />
          </label>
        </li>
        <li className={styles.inputItem}>
          <label htmlFor="name">
            <select name="species" id="name">
              <option
                value="Species"
                className={styles.hidden}
                selected
                disabled
              >
                Species
              </option>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
            </select>
          </label>
        </li>
        <li className={styles.inputItem}>
          <label htmlFor="gender">
            <select name="gender" id="gender">
              <option
                value="Gender"
                className={styles.hidden}
                selected
                disabled
              >
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
        </li>
        <li className={styles.inputItem}>
          <label htmlFor="status">
            <select name="status" id="status">
              <option
                value="Status"
                className={styles.hidden}
                selected
                disabled
              >
                Status
              </option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
            </select>
          </label>
        </li>
      </ul>
      <ul className={styles.personList}>
        {personageData &&
          personageData.map((el: any) => {
            return (
              <li key={el.id} className={styles.personItem}>
                <Link href="/item">
                  <Image
                    src={el.image}
                    width={240}
                    height={168}
                    alt={el.name}
                    priority={true}
                  />
                  <div className={styles.personInfo}>
                    <h2>{el.name}</h2>
                    <p>{el.species}</p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
      <div className={styles.btnWrapper}>
        <button className={styles.loadMoreBtn}>Load more</button>
      </div>
    </div>
  );
}
