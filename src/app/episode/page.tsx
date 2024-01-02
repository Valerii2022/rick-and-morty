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
  const { episodes } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getEpisodes(null));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className={styles.inner}>
        <Image
          src="/episode.png"
          fill
          sizes="100vw, 33vw"
          alt="Episode Page logo"
          priority={true}
        />
      </div>
      <div className={styles.filter}>
        <label htmlFor="name" className={styles.inputLabel}>
          <Image
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
            placeholder="Filter by name or episode (ex. S01 or S01E02)..."
          />
        </label>
      </div>
      <ul className={styles.episodesList}>
        {episodes.results &&
          episodes.results.map((el: any) => {
            return (
              <li key={el.id} className={styles.item}>
                <Link href="/episode-details">
                  <h2>{el.name}</h2>
                  <p>{el.air_date}</p>
                  <p>{el.episode}</p>
                </Link>
              </li>
            );
          })}
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
