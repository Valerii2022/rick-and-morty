"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "../../redux/store";
import { getEpisodes } from "@/redux/slices/mainSlice";

export default function Episode(): JSX.Element {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const { episodes, error } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getEpisodes(null));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className={styles.inner}>
        <Image
          src="/episode.png"
          fill
          sizes="(max-width: 1440px) 100vw, 33vw"
          alt="Episode Page logo"
          priority={true}
        />
      </div>
      <div className={styles.filter}>
        <label htmlFor="name" className={styles.inputLabel}>
          <Image
            onClick={() => {
              dispatch(getEpisodes({ name: filter }));
            }}
            style={{ cursor: "pointer" }}
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
            placeholder="Filter by episode (ex. S01 or S01E02)..."
          />
          {filter && (
            <Image
              onClick={() => {
                setFilter("");
                dispatch(getEpisodes({ name: "" }));
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
      </div>
      <ul className={styles.episodesList}>
        {error ? (
          <li className="error">
            <h2>{error}</h2>
          </li>
        ) : (
          episodes.results.map((el: any) => {
            return (
              <li key={el.id} className={styles.item}>
                <Link href={`/episode/${el.id}`}>
                  <h2>{el.name}</h2>
                  <p>{el.air_date}</p>
                  <p>{el.episode}</p>
                </Link>
              </li>
            );
          })
        )}
      </ul>
      <div className={styles.btnWrapper}>
        {episodes.info.prev && (
          <button
            onClick={() => {
              dispatch(getEpisodes(episodes.info.prev));
            }}
            className={`${styles.loadMoreBtn} ${styles.prevBtn}`}
          >
            Prev
          </button>
        )}

        {episodes.info.next && (
          <button
            onClick={() => {
              dispatch(getEpisodes(episodes.info.next));
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
