"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

import { useSelector, useDispatch } from "../../redux/store";
import { useEffect, useState } from "react";

import { getLocations } from "@/redux/slices/mainSlice";

export default function Location(): JSX.Element {
  const dispatch = useDispatch();
  const { locations } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getLocations(null));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className={styles.inner}>
        <Image
          src="/locations.png"
          width={326}
          height={202}
          alt="Locations Page logo"
          priority={true}
        />
      </div>
      <ul className={styles.locationsList}>
        {locations.results &&
          locations.results.map((el: any) => {
            return (
              <li key={el.id} className={styles.item}>
                <Link href="/item">
                  <h2>{el.dimension}</h2>
                  <p>{el.name}</p>
                </Link>
              </li>
            );
          })}
      </ul>
      <div className={styles.btnWrapper}>
        {locations.info.prev && (
          <button
            onClick={() => {
              dispatch(getLocations(locations.info.prev));
            }}
            className={styles.loadMoreBtn}
          >
            Prev
          </button>
        )}

        {locations.info.next && (
          <button
            onClick={() => {
              dispatch(getLocations(locations.info.next));
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
