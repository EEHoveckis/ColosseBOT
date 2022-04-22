import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import Navbar from "../components/Main/Navbar";
import styles from "../styles/Home.module.css";
import { GetDarkMode } from "../util/darkmode";

const Home: NextPage = () => {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  useEffect(() => {
    if (GetDarkMode()) setDarkmode(true);
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Overheid - Columbus Roleplay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://kit.fontawesome.com/82faba1ef6.js"></Script>
      <Navbar />
      <div
        className={`${darkmode ? styles.dark_mode : ""} ${styles.main_content}`}
      >
        <div
          className={`${styles.main_content_content} ${
            darkmode ? styles.dark_mode : ""
          }`}
        >
          a
        </div>
      </div>
    </div>
  );
};

export default Home;
