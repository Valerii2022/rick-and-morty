"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

import { useSelector, useDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { getLocations } from "@/redux/slices/mainSlice";

export default function Location(): JSX.Element {
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");
  const [mobileFilter, setMobileFilter] = useState(false);
  const dispatch = useDispatch();
  const { locations, error } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getLocations(null));
  }, [dispatch]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setMobileFilter(false);
    }
  }

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
          sizes="100vw, 33vw"
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
                <option value="Memory">Memory</option>
                <option value="Planet">Planet</option>
                <option value="Dimension">Dimension</option>
                <option value="Consciousness">Consciousness</option>
                <option value="Hell">Hell</option>
                <option value="Police department">Police department</option>
                <option value="Space">Space</option>
                <option value="Human">Human</option>
                <option value="Liquid">Liquid</option>
                <option value="Elemental Rings">Elemental Rings</option>
                <option value="Base">Base</option>
                <option value="Spacecraft">Spacecraft</option>
                <option value="Death Star">Death Star</option>
                <option value="Reality">Reality</option>
                <option value="Acid Plant">Acid Plant</option>
                <option value="Asteroid">Asteroid</option>
                <option value="Country">Country</option>
                <option value="Diegesis">Diegesis</option>
                <option value="Nightmare">Nightmare</option>
                <option value="Non-Diegetic Alternative Reality">
                  Non-Diegetic Alternative Reality
                </option>
                <option value="Mount">Mount</option>
                <option value="Woods">Woods</option>
                <option value="Quasar">Quasar</option>
                <option value="Quadrant">Quadrant</option>
                <option value="Space Station">Space Station</option>
                <option value="Diegesis">Diegesis</option>
                <option value="Spa">Spa</option>
                <option value="Dream">Dream</option>
                <option value="Arcade">Arcade</option>
                <option value="Artificially generated world">
                  Artificially generated world
                </option>
                <option value="Machine">Machine</option>
                <option value="Microverse">Microverse</option>
                <option value="Teenyverse">Teenyverse</option>
                <option value="Box">Box</option>
                <option value="Dwarf planet (Celestial Dwarf)">
                  Dwarf planet (Celestial Dwarf)
                </option>
                <option value="Daycare">Daycare</option>
                <option value="Customs">Customs</option>
                <option value="Game">Game</option>
                <option value="Menagerie">Menagerie</option>
                <option value="Fantasy Town">Fantasy Town</option>
                <option value="Resort">Resort</option>
                <option value="TV">TV</option>
                <option value="Unknown">Unknown</option>
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
                <option value="Chair Dimension">Chair Dimension</option>
                <option value="Cromulon Dimension">Cromulon Dimension</option>
                <option value="Cronenberg Dimension">
                  Cronenberg Dimension
                </option>
                <option value="Dimension C-137">Dimension C-137</option>
                <option value="Dimension C-35">Dimension C-35</option>
                <option value="Dimension C-500A">Dimension C-500A</option>
                <option value="Dimension D-716">Dimension D-716</option>
                <option value="Dimension D-716-B">Dimension D-716-B</option>
                <option value="Dimension D-716-C">Dimension D-716-C</option>
                <option value="Dimension D-99">Dimension D-99</option>
                <option value="Dimension J19ζ7">Dimension J19ζ7</option>
                <option value="Dimension J-22">Dimension J-22</option>
                <option value="Dimension K-22">Dimension K-22</option>
                <option value="Dimension K-83">Dimension K-83</option>
                <option value="Dimension 5-126">Dimension 5-126</option>

                <option value="Eric Stoltz Mask Dimension">
                  Eric Stoltz Mask Dimension
                </option>
                <option value="Evil Rick's Target Dimension">
                  Evil Rick&#39;s Target Dimension
                </option>
                <option value="Fantasy Dimension">Fantasy Dimension</option>
                <option value="Fascist Dimension">Fascist Dimension</option>
                <option value="Fascist Shrimp Dimension">
                  Fascist Shrimp Dimension
                </option>
                <option value="Fascist Teddy Bear Dimension">
                  Fascist Teddy Bear Dimension
                </option>
                <option value="Giant Telepathic Spiders Dimension">
                  Giant Telepathic Spiders Dimension
                </option>
                <option value="Pizza Dimension">Pizza Dimension</option>
                <option value="Magic Dimension">Magic Dimension</option>
                <option value="Merged Dimension">Merged Dimension</option>
                <option value="Replacement Dimension">
                  Replacement Dimension
                </option>
                <option value="Phone Dimension">Phone Dimension</option>
                <option value="Post-Apocalyptic Dimension">
                  Post-Apocalyptic Dimension
                </option>
                <option value="Testicle Monster Dimension">
                  Testicle Monster Dimension
                </option>
                <option value="Tusk Dimension">Tusk Dimension</option>
                <option value="Wasp Dimension">Wasp Dimension</option>
                <option value="Unknown">Unknown</option>
                <option value="Unknown dimension">Unknown dimension</option>
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
                          <option value="Memory">Memory</option>
                          <option value="Planet">Planet</option>
                          <option value="Dimension">Dimension</option>
                          <option value="Consciousness">Consciousness</option>
                          <option value="Hell">Hell</option>
                          <option value="Police department">
                            Police department
                          </option>
                          <option value="Space">Space</option>
                          <option value="Human">Human</option>
                          <option value="Liquid">Liquid</option>
                          <option value="Elemental Rings">
                            Elemental Rings
                          </option>
                          <option value="Base">Base</option>
                          <option value="Spacecraft">Spacecraft</option>
                          <option value="Death Star">Death Star</option>
                          <option value="Reality">Reality</option>
                          <option value="Acid Plant">Acid Plant</option>
                          <option value="Asteroid">Asteroid</option>
                          <option value="Country">Country</option>
                          <option value="Diegesis">Diegesis</option>
                          <option value="Nightmare">Nightmare</option>
                          <option value="Non-Diegetic Alternative Reality">
                            Non-Diegetic Alternative Reality
                          </option>
                          <option value="Mount">Mount</option>
                          <option value="Woods">Woods</option>
                          <option value="Quasar">Quasar</option>
                          <option value="Quadrant">Quadrant</option>
                          <option value="Space Station">Space Station</option>
                          <option value="Diegesis">Diegesis</option>
                          <option value="Spa">Spa</option>
                          <option value="Dream">Dream</option>
                          <option value="Arcade">Arcade</option>
                          <option value="Artificially generated world">
                            Artificially generated world
                          </option>
                          <option value="Machine">Machine</option>
                          <option value="Microverse">Microverse</option>
                          <option value="Teenyverse">Teenyverse</option>
                          <option value="Box">Box</option>
                          <option value="Dwarf planet (Celestial Dwarf)">
                            Dwarf planet (Celestial Dwarf)
                          </option>
                          <option value="Daycare">Daycare</option>
                          <option value="Customs">Customs</option>
                          <option value="Game">Game</option>
                          <option value="Menagerie">Menagerie</option>
                          <option value="Fantasy Town">Fantasy Town</option>
                          <option value="Resort">Resort</option>
                          <option value="TV">TV</option>
                          <option value="Unknown">Unknown</option>
                        </select>
                      </label>
                    </li>
                    <li className={styles.inputItem}>
                      <label htmlFor="dimension">
                        <select name="dimension" id="dimension">
                          <option defaultValue="Dimension">Dimension</option>
                          <option value="Chair Dimension">
                            Chair Dimension
                          </option>
                          <option value="Cromulon Dimension">
                            Cromulon Dimension
                          </option>
                          <option value="Cronenberg Dimension">
                            Cronenberg Dimension
                          </option>
                          <option value="Dimension C-137">
                            Dimension C-137
                          </option>
                          <option value="Dimension C-35">Dimension C-35</option>
                          <option value="Dimension C-500A">
                            Dimension C-500A
                          </option>
                          <option value="Dimension D-716">
                            Dimension D-716
                          </option>
                          <option value="Dimension D-716-B">
                            Dimension D-716-B
                          </option>
                          <option value="Dimension D-716-C">
                            Dimension D-716-C
                          </option>
                          <option value="Dimension D-99">Dimension D-99</option>
                          <option value="Dimension J19ζ7">
                            Dimension J19ζ7
                          </option>
                          <option value="Dimension J-22">Dimension J-22</option>
                          <option value="Dimension K-22">Dimension K-22</option>
                          <option value="Dimension K-83">Dimension K-83</option>
                          <option value="Dimension 5-126">
                            Dimension 5-126
                          </option>

                          <option value="Eric Stoltz Mask Dimension">
                            Eric Stoltz Mask Dimension
                          </option>
                          <option value="Evil Rick's Target Dimension">
                            Evil Rick&#39;s Target Dimension
                          </option>
                          <option value="Fantasy Dimension">
                            Fantasy Dimension
                          </option>
                          <option value="Fascist Dimension">
                            Fascist Dimension
                          </option>
                          <option value="Fascist Shrimp Dimension">
                            Fascist Shrimp Dimension
                          </option>
                          <option value="Fascist Teddy Bear Dimension">
                            Fascist Teddy Bear Dimension
                          </option>
                          <option value="Giant Telepathic Spiders Dimension">
                            Giant Telepathic Spiders Dimension
                          </option>
                          <option value="Pizza Dimension">
                            Pizza Dimension
                          </option>
                          <option value="Magic Dimension">
                            Magic Dimension
                          </option>
                          <option value="Merged Dimension">
                            Merged Dimension
                          </option>
                          <option value="Replacement Dimension">
                            Replacement Dimension
                          </option>
                          <option value="Phone Dimension">
                            Phone Dimension
                          </option>
                          <option value="Post-Apocalyptic Dimension">
                            Post-Apocalyptic Dimension
                          </option>
                          <option value="Testicle Monster Dimension">
                            Testicle Monster Dimension
                          </option>
                          <option value="Tusk Dimension">Tusk Dimension</option>
                          <option value="Wasp Dimension">Wasp Dimension</option>
                          <option value="Unknown">Unknown</option>
                          <option value="Unknown dimension">
                            Unknown dimension
                          </option>
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
