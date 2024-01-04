"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import { getEpisodeById } from "@/redux/slices/mainSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export default function EpisodeDetails({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const { current, error } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getEpisodeById(params.id));
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
            <h1 className={styles.title}>{current.episode.name}</h1>
            <ul className={styles.infoList}>
              <li>
                <h3>Episode</h3>
                <p>{current.episode.episode}</p>
              </li>
              <li>
                <h3>Date</h3>
                <p>{current.episode.air_date}</p>
              </li>
            </ul>
          </div>
          <h2 className={styles.subtitle}>Cast</h2>
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
