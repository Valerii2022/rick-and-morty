"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import { getLocationById } from "@/redux/slices/mainSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Character } from "@/types/interfaces";

export default function CharacterDetails({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const { current, error } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getLocationById(params.id));
  }, [dispatch, params]);

  return (
    <div className="wrapper">
      <button className={styles.backBtn} onClick={() => router.back()}>
        <Image
          src="/back.svg"
          width={24}
          height={24}
          alt="Arrow back"
          priority={true}
        />
        <span>Go back</span>
      </button>
      {error ? (
        <h2 className="error">{error}</h2>
      ) : (
        <div>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{current.location.name}</h1>
            <ul className={styles.infoList}>
              <li>
                <h3>Type</h3>
                <p>{current.location.type}</p>
              </li>
              <li>
                <h3>Dimension</h3>
                <p>{current.location.dimension}</p>
              </li>
            </ul>
          </div>
          <h2 className={styles.subtitle}>Residents</h2>
          <ul className={styles.personList}>
            {current.characters.map((el: Character) => {
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
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
