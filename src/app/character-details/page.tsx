"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "@/redux/slices/mainSlice";

export default function CharacterDetails(): JSX.Element {
  return (
    <div className="wrapper">
      <h1>Character Details Page</h1>
    </div>
  );
}
