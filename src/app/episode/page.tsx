"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

import { useEffect } from "react";
import { useSelector, useDispatch } from "../../redux/store";
import { getEpisodes } from "@/redux/slices/mainSlice";

export default function Episode(): JSX.Element {
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
          width={270}
          height={210}
          alt="Episode Page logo"
          priority={true}
        />
      </div>
      <ul className={styles.locationsList}>
        {episodes.results &&
          episodes.results.map((el: any) => {
            return (
              <li key={el.id} className={styles.item}>
                <Link href="/item">
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
            className={styles.loadMoreBtn}
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
