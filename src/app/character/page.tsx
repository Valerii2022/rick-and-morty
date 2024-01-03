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
  const [mobileFilter, setMobileFilter] = useState(false);
  const dispatch = useDispatch();
  const { characters, error } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getCharacters(null));
  }, [dispatch]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setMobileFilter(false);
    }
  }

  function handleFiltersApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let status = "";
    let species = "";
    let gender = "";
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });
    if (data.status !== "Status") status = data.status;
    if (data.species !== "Species") species = data.species;
    if (data.gender !== "Gender") gender = data.gender;
    dispatch(
      getCharacters({
        name: filter,
        gender: gender,
        status: status,
        species: species,
      })
    );
    setMobileFilter(false);
  }

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
            onClick={() => {
              dispatch(
                getCharacters({ name: filter, status, species, gender })
              );
            }}
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
          {filter && (
            <Image
              onClick={() => {
                setFilter("");
                dispatch(getCharacters({ name: "", status, species, gender }));
              }}
              src="/close.svg"
              width={24}
              height={24}
              alt="Search icon"
              priority={true}
              style={{ cursor: "pointer" }}
            />
          )}
        </label>
        <ul className={styles.inputList}>
          <li className={styles.inputItem}>
            <label htmlFor="species">
              <select
                name="species"
                id="species"
                onChange={(e) => {
                  if (e.target.value === "Species") {
                    setSpecies("");
                    dispatch(
                      getCharacters({
                        name: filter,
                        status: status,
                        species: "",
                        gender: gender,
                      })
                    );
                  } else {
                    setSpecies(e.target.value);
                    dispatch(
                      getCharacters({
                        name: filter,
                        status: status,
                        species: e.target.value,
                        gender: gender,
                      })
                    );
                  }
                }}
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
                onChange={(e) => {
                  if (e.target.value === "Gender") {
                    setGender("");
                    dispatch(
                      getCharacters({
                        name: filter,
                        status: status,
                        species: species,
                        gender: "",
                      })
                    );
                  } else {
                    setGender(e.target.value);
                    dispatch(
                      getCharacters({
                        name: filter,
                        status: status,
                        gender: e.target.value,
                        species: species,
                      })
                    );
                  }
                }}
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
                onChange={(e) => {
                  if (e.target.value === "Status") {
                    setStatus("");
                    dispatch(
                      getCharacters({
                        name: filter,
                        status: "",
                        species: species,
                        gender: gender,
                      })
                    );
                  } else {
                    setStatus(e.target.value);
                    dispatch(
                      getCharacters({
                        name: filter,
                        status: e.target.value,
                        species: species,
                        gender: gender,
                      })
                    );
                  }
                }}
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
            onClick={() => setMobileFilter(!mobileFilter)}
            src="/filter.svg"
            width={24}
            height={24}
            alt="Search icon"
            priority={true}
            style={{ cursor: "pointer" }}
          />
          <p>Advanced filter</p>
          {mobileFilter && (
            <div
              onClick={handleBackdropClick}
              className={styles.filterModalBackdrop}
            >
              <div className={styles.filterModal}>
                <h2>Filters</h2>
                <Image
                  onClick={() => setMobileFilter(!mobileFilter)}
                  src="/close.svg"
                  width={24}
                  height={24}
                  alt="Close icon"
                  priority={true}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                  }}
                />
                <form onSubmit={handleFiltersApply}>
                  <ul className={styles.mobileInputList}>
                    <li className={styles.inputItem}>
                      <label htmlFor="species">
                        <select name="species" id="species">
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
                        <select name="gender" id="gender">
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
                        <select name="status" id="status">
                          <option defaultValue="Status">Status</option>
                          <option value="Alive">Alive</option>
                          <option value="Dead">Dead</option>
                          <option value="Unknown">Unknown</option>
                        </select>
                      </label>
                    </li>
                  </ul>
                  <button className={styles.loadMoreBtn}>Apply</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <ul className={styles.personList}>
        {error ? (
          <li className="error">
            <h2>{error}</h2>
          </li>
        ) : (
          characters.results.map((el: any) => {
            return (
              <li key={el.id} className={styles.personItem}>
                <Link href={`/character/${el.id}`}>
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
          })
        )}
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
