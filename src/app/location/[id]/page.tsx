"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import { getLocationById } from "@/redux/slices/mainSlice";
import { useRouter } from "next/navigation";

export default function CharacterDetails({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const { current } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getLocationById(params.id));
  }, [dispatch, params]);

  return (
    <div>
      <button onClick={() => router.back()}>Go back</button>
      {current && <div>{current.location.name}</div>}
    </div>
  );
}
