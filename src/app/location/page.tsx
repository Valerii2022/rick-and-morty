"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

import { useSelector, useDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { getLocations } from "@/redux/slices/mainSlice";
import { dimensionsValue, typesValue } from "./options-value";
import { Data } from "@/types/interfaces";

export default function Location(): JSX.Element {
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");
  const [mobileFilter, setMobileFilter] = useState(false);
  const dispatch = useDispatch();
  const { locations, error } = useSelector(
    (state: { cards: Data }) => state.cards
  );

  // getting Locations from API
  useEffect(() => {
    dispatch(getLocations(null));
  }, [dispatch]);

  // closing modal window by backdrop click
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setMobileFilter(false);
    }
  }

  // getting filtered Locations from API
  function handleFiltersApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let type = "";
    let dimension = "";
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });
    if (data.type !== "Type") type = data.type;
    if (data.dimension !== "Dimension") dimension = data.dimension;
    dispatch(getLocations({ name: filter, type: type, dimension: dimension }));
    setMobileFilter(false);
  }

  return (
    <div className="wrapper">
      <div className={styles.inner}>
        <Image
          src="/locations.png"
          sizes="(max-width: 1440px) 100vw, 33vw"
          fill
          alt="Locations Page logo"
          priority={true}
        />
      </div>
      <div className={styles.filter}>
        <label htmlFor="name" className={styles.inputLabel}>
          <Image
            onClick={() => {
              dispatch(
                getLocations({ name: filter, type: type, dimension: dimension })
              );
            }}
            src="/search.svg"
            width={24}
            height={24}
            alt="Search icon"
            priority={true}
            style={{ cursor: "pointer" }}
          />
          <input
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            type="text"
            name="name"
            id="name"
            placeholder="Filter by name..."
          />
          {filter && (
            <Image
              onClick={() => {
                setFilter("");
                dispatch(getLocations({ name: "", type: "", dimension: "" }));
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
        <ul className={styles.inputList}>
          <li className={styles.inputItem}>
            <label htmlFor="type">
              <select
                name="type"
                id="type"
                onChange={(e) => {
                  if (e.target.value === "Type") {
                    setType("");
                    dispatch(
                      getLocations({
                        name: filter,
                        type: "",
                        dimension: dimension,
                      })
                    );
                  } else {
                    setType(e.target.value);
                    dispatch(
                      getLocations({
                        name: filter,
                        type: e.target.value,
                        dimension: dimension,
                      })
                    );
                  }
                }}
              >
                <option defaultValue="Type">Type</option>
                {typesValue.map((el: string, index: number) => {
                  return (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </label>
          </li>
          <li className={styles.inputItem}>
            <label htmlFor="dimension">
              <select
                name="dimension"
                id="dimension"
                onChange={(e) => {
                  if (e.target.value === "Dimension") {
                    setDimension("");
                    dispatch(
                      getLocations({
                        name: filter,
                        type: type,
                        dimension: "",
                      })
                    );
                  } else {
                    setDimension(e.target.value);
                    dispatch(
                      getLocations({
                        name: filter,
                        type: type,
                        dimension: e.target.value,
                      })
                    );
                  }
                }}
              >
                <option defaultValue="Dimension">Dimension</option>
                {dimensionsValue.map((el: string, index: number) => {
                  return (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </label>
          </li>
        </ul>
      </div>

      <div className={styles.mobileFilter}>
        <div className={styles.inputLabel}>
          <Image
            onClick={() => setMobileFilter(!mobileFilter)}
            src="/filter.svg"
            width={24}
            height={24}
            alt="Search icon"
            priority={true}
            style={{ cursor: "pointer" }}
          />
          <p>Advanced filter</p>
          {mobileFilter && (
            <div
              onClick={handleBackdropClick}
              className={styles.filterModalBackdrop}
            >
              <div className={styles.filterModal}>
                <h2>Filters</h2>
                <Image
                  onClick={() => setMobileFilter(!mobileFilter)}
                  src="/close.svg"
                  width={24}
                  height={24}
                  alt="Close icon"
                  priority={true}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                  }}
                />
                <form onSubmit={handleFiltersApply}>
                  <ul className={styles.mobileInputList}>
                    <li className={styles.inputItem}>
                      <label htmlFor="type">
                        <select name="type" id="type">
                          <option defaultValue="Type">Type</option>
                          {typesValue.map((el: string, index: number) => {
                            return (
                              <option key={index} value={el}>
                                {el}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                    </li>
                    <li className={styles.inputItem}>
                      <label htmlFor="dimension">
                        <select name="dimension" id="dimension">
                          <option defaultValue="Dimension">Dimension</option>
                          {dimensionsValue.map((el: string, index: number) => {
                            return (
                              <option key={index} value={el}>
                                {el}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                    </li>
                  </ul>
                  <button className={styles.loadMoreBtn}>Apply</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <ul className={styles.locationsList}>
        {error ? (
          <li className="error">
            <h2>{error}</h2>
          </li>
        ) : (
          locations.results.map((el: any) => {
            return (
              <li key={el.id} className={styles.item}>
                <Link href={`/location/${el.id}`}>
                  <h2>{el.dimension}</h2>
                  <p>{el.name}</p>
                </Link>
              </li>
            );
          })
        )}
      </ul>
      <div className={styles.btnWrapper}>
        {locations.info.prev && (
          <button
            onClick={() => {
              dispatch(getLocations(locations.info.prev));
            }}
            className={`${styles.loadMoreBtn} ${styles.prevBtn}`}
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
