import React from "react";
import styles from "../../styles/Home.module.css";

export default function HomeContainer({ children }: any) {
  return <div className={styles.home_container}>{children}</div>;
}
