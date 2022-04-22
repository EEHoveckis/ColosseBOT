import axios from "axios";
import React, { useEffect } from "react";
import styles from "../styles/forms.module.css";
import {
  CheckLoggedIn,
  UpdateAuthCode,
  UpdateUsername,
} from "../util/authentication";
import Router from "next/router";
import LogoPolice from "../public/content/Logo_Politie.svg";
import Image from "next/image";
import { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";

const Login: NextPage = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [data, setData] = React.useState<any>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(`/api/login?username=${username}&password=${password}&type=0`) //TODO: FIX PATH
      .then(({ data }) => {
        setData(data);
        UpdateAuthCode(data.authcode);
        UpdateUsername(data.data.username);
        Router.push("/defence");
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (CheckLoggedIn()) {
      Router.push("/defence");
    } else {
      console.log("unauthed");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Login - Columbus Roleplay</title>
      </Head>
      <Script src="https://kit.fontawesome.com/82faba1ef6.js"></Script>
      <form
        className={styles.questions_container}
        style={{ position: "relative" }}
        onSubmit={onSubmit}
      >
        <Image
          src={LogoPolice}
          alt=""
          className={styles.main_image}
          layout="raw"
        ></Image>
        <h1>
          Login <i className="fa-solid fa-right-to-bracket"></i>
        </h1>
        <div className={styles.question}>
          <label htmlFor="naam">
            <i className="fa-solid fa-id-card"></i> Naam:
          </label>
          <input
            className="input"
            type="text"
            placeholder="Naam"
            name="Naam"
            id="naam"
            onChange={(e) => setUsername(e.currentTarget.value)}
            onLoad={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div className={styles.question}>
          <label htmlFor="wachtwoord">
            <i className="fa-solid fa-lock"></i> Wachtwoord:
          </label>
          <input
            className="input"
            type="password"
            placeholder="Wachtwoord"
            name="Wachtwoord"
            id="wachtwoord"
            onChange={(e) => setPassword(e.currentTarget.value)}
            onLoad={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <span className={styles.buttons}>
          <button className={styles.button} type="submit">
            Submit
          </button>
          <button className={styles.buttonclear} type="reset">
            Clear
          </button>
        </span>
      </form>
    </div>
  );
};
export default Login;
