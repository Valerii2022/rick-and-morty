"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import { getCharacterById } from "@/redux/slices/mainSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Data, Episode } from "@/types/interfaces";

export default function CharacterDetails({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const { current, error } = useSelector(
    (state: { cards: Data }) => state.cards
  );

  // getting Characters from API
  useEffect(() => {
    dispatch(getCharacterById(params.id));
  }, [dispatch, params]);

  // getting location id
  const splittedLocation: string[] = current.character.location?.url.split("/");
  const locationId: string = splittedLocation
    ? splittedLocation[splittedLocation.length - 1]
    : "";

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
          <div className={styles.imgWrapper}>
            <Image
              src={
                current.character.image
                  ? current.character.image
                  : "/default.jpg"
              }
              sizes="(max-width: 1440px) 100vw, 33vw"
              alt={current.character.name ? current.character.name : "Title"}
              fill
              priority={true}
            />
          </div>
          <h1 className={styles.title}>{current.character.name}</h1>
          <ul className={styles.infoMainList}>
            <li>
              <h2 className={styles.subtitle}>Information</h2>
              <ul className={styles.infoList}>
                <li>
                  <h3>Gender</h3>
                  <p>{current.character.gender}</p>
                </li>
                <li>
                  <h3>Status</h3>
                  <p>{current.character.status}</p>
                </li>
                <li>
                  <h3>Specie</h3>
                  <p>{current.character.species}</p>
                </li>
                <li>
                  <h3>Type</h3>
                  <p>
                    {current.character.type
                      ? current.character.type
                      : "unknown"}
                  </p>
                </li>
                <li className={styles.redirectItem}>
                  <div>
                    <h3>Location</h3>
                    <p>{current.character.location?.name}</p>
                  </div>
                  {locationId && (
                    <Link href={`/location/${locationId}`}>
                      <Image
                        src="/arrow.svg"
                        width={24}
                        height={24}
                        alt="Arrow icon"
                        priority={true}
                      />
                    </Link>
                  )}
                </li>
              </ul>
            </li>
            <li>
              <h2 className={styles.subtitle}>Episodes</h2>
              <ul className={styles.infoList}>
                {current.episodes &&
                  current.episodes.map((el: Episode) => {
                    return (
                      <li key={el.id} className={styles.redirectItem}>
                        <div>
                          <h3>{el.episode}</h3>
                          <p>{el.name}</p>
                          <p>{el.air_date}</p>
                        </div>
                        <Link href={`/episode/${el.id}`}>
                          <Image
                            src="/arrow.svg"
                            width={24}
                            height={24}
                            alt="Arrow icon"
                            priority={true}
                          />
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
