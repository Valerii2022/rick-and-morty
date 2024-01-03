"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import { getCharacterById } from "@/redux/slices/mainSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CharacterDetails({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const { current } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getCharacterById(params.id));
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
      {current && (
        <div>
          <div className={styles.imgWrapper}>
            <Image
              src={current.character.image}
              sizes="100vw,33vw"
              fill
              alt={current.character.image}
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
                  <Link href={`/location/2`}>
                    <Image
                      src="/arrow.svg"
                      width={24}
                      height={24}
                      alt="Arrow icon"
                      priority={true}
                    />
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <h2 className={styles.subtitle}>Episodes</h2>
              <u className={styles.episodesList}></u>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
