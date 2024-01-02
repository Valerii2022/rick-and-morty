"use client";

import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "../../redux/store";
import { getCharacters } from "@/redux/slices/mainSlice";

export default function Character(): JSX.Element {
  const [filter, setFilter] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const { characters } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getCharacters(null));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className={styles.inner}>
        <Image
          src="/logo.png"
          sizes="100vw, 33vw"
          alt="Rick and Morty logo"
          fill
          priority={true}
        />
      </div>
      <div className={styles.filter}>
        <label htmlFor="name" className={styles.inputLabel}>
          <Image
            src="/search.svg"
            width={24}
            height={24}
            alt="Search icon"
            priority={true}
            style={{ cursor: "pointer" }}
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
        <ul className={styles.inputList}>
          <li className={styles.inputItem}>
            <label htmlFor="species">
              <select
                name="species"
                id="species"
                onChange={(e) => setSpecies(e.target.value)}
              >
                <option defaultValue="Species">Species</option>
                <option value="Alien">Alien</option>
                <option value="Animal">Animal</option>
                <option value="Cronenberg">Cronenberg</option>
                <option value="Human">Human</option>
                <option value="Humanoid">Humanoid</option>
                <option value="Mythological Creature">
                  Mythological Creature
                </option>
                <option value="Poopybutthole">Poopybutthole</option>
                <option value="Robot">Robot</option>
                <option value="Unknown">Unknown</option>
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
                <option defaultValue="Gender">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="Unknown">Unknown</option>
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
                <option defaultValue="Status">Status</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="Unknown">Unknown</option>
              </select>
            </label>
          </li>
        </ul>
      </div>
      <div className={styles.mobileFilter}>
        <div className={styles.inputLabel}>
          <Image
            src="/filter.svg"
            width={24}
            height={24}
            alt="Search icon"
            priority={true}
            style={{ cursor: "pointer" }}
          />
          <p>Advanced filter</p>
        </div>
      </div>
      <ul className={styles.personList}>
        {characters.results &&
          characters.results.map((el: any) => {
            return (
              <li key={el.id} className={styles.personItem}>
                <Link href="/character-details">
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
        {characters.info.prev && (
          <button
            onClick={() => {
              dispatch(getCharacters(characters.info.prev));
            }}
            className={`${styles.loadMoreBtn} ${styles.prevBtn}`}
          >
            Prev
          </button>
        )}

        {characters.info.next && (
          <button
            onClick={() => {
              dispatch(getCharacters(characters.info.next));
            }}
            className={`${styles.loadMoreBtn} ${styles.nextBtn}`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
