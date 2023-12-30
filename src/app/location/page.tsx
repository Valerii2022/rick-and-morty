"use client";

import styles from "./page.module.css";

import { useSelector, useDispatch } from "../../redux/store";
import { getLocations } from "@/redux/slices/mainSlice";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Location(): JSX.Element {
  const dispatch = useDispatch();
  const { locations } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getLocations());
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
        {locations &&
          locations.map((el: any) => {
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
        <button className={styles.loadMoreBtn}>Load more</button>
      </div>
    </div>
  );
}
