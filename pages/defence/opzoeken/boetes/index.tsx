import { NextPage } from "next";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import ListComponent from "../../../../components/defensie/ListComponent";
import SideNav from "../../../../components/defensie/SideNav";
import styles from "../../../../styles/Home.module.css";
import { CheckLoggedIn } from "../../../../util/authentication";
import { GetDarkMode } from "../../../../util/darkmode";

const BoetesPage: NextPage = () => {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  useEffect(() => {
    if (CheckLoggedIn()) {
      if (GetDarkMode()) setDarkmode(true);
    } else Router.push("/login");
  }, []);
  return (
    <div className={darkmode ? styles.dark_mode : ""}>
      <SideNav />
      <div className={styles.home_container}>
        <ListComponent />
      </div>
    </div>
  );
};

export default BoetesPage;
