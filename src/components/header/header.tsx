"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { useState } from "react";

export default function Header(): JSX.Element {
  const [burgerModal, setBurgerModal] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link href="/">
          <Image
            src="/favicon.png"
            width={46}
            height={46}
            alt="Rick and Morty logo"
            priority={true}
          />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href="/character">Character</Link>
          </li>
          <li className={styles.item}>
            <Link href="/location">Location</Link>
          </li>
          <li className={styles.item}>
            <Link href="/episode">Episode</Link>
          </li>
        </ul>

        <div className={styles.mobileMenu}>
          <Image
            onClick={() => {
              setBurgerModal(!burgerModal);
            }}
            src="/menu.svg"
            width={24}
            height={24}
            alt="Burger menu icon"
            priority={true}
            style={{ cursor: "pointer" }}
          />
          {burgerModal && (
            <div className={styles.burgerMenu}>
              <div className="wrapper">
                <Image
                  onClick={() => {
                    setBurgerModal(!burgerModal);
                  }}
                  src="/close.svg"
                  width={24}
                  height={24}
                  alt="Burger menu icon"
                  priority={true}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "24px",
                    right: "24px",
                  }}
                />
                <ul className={styles.mobileList}>
                  <li className={styles.item}>
                    <Link
                      onClick={() => setBurgerModal(!burgerModal)}
                      href="/character"
                    >
                      Character
                    </Link>
                  </li>
                  <li className={styles.item}>
                    <Link
                      onClick={() => setBurgerModal(!burgerModal)}
                      href="/location"
                    >
                      Location
                    </Link>
                  </li>
                  <li className={styles.item}>
                    <Link
                      onClick={() => setBurgerModal(!burgerModal)}
                      href="/episode"
                    >
                      Episode
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
