"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Character(): JSX.Element {
  const [personageData, setPersonageData] = useState([]);
  const [filter, setFilter] = useState("");
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
          let result = data.results;
          result = data.results
            .filter((el: { name: string }) => el.name.includes(filter))
            .filter((el: { species: string }) => {
              if (species) {
                return el.species === species;
              } else {
                return el.species;
              }
            })
            .filter((el: { gender: string }) => {
              if (gender) {
                return el.gender === gender;
              } else {
                return el.gender;
              }
            })
            .filter((el: { status: string }) => {
              if (status) {
                return el.status === status;
              } else {
                return el.status;
              }
            });

          setPersonageData(result);
        })
        .catch((error) => console.log(error));
    })();
  }, [gender, species, status, filter]);

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
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              type="text"
              name="name"
              id="name"
              placeholder="Filter by name..."
            />
          </label>
        </li>
        <li className={styles.inputItem}>
          <label htmlFor="name">
            <select
              name="species"
              id="name"
              onChange={(e) => setSpecies(e.target.value)}
            >
              <option value="Species" selected>
                Species
              </option>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
            </select>
          </label>
        </li>
        <li className={styles.inputItem}>
          <label htmlFor="gender">
            <select
              name="gender"
              id="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Gender" selected>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
        </li>
        <li className={styles.inputItem}>
          <label htmlFor="status">
            <select
              name="status"
              id="status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Status" selected>
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
