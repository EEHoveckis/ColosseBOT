import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Sidenav.module.css";
import { GetDarkMode } from "../../util/darkmode";

export default function SideNav() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  useEffect(() => {
    if (GetDarkMode()) setDarkmode(true);
  }, []);
  return (
    <div
      className={`${styles.sidebar} ${
        darkmode ? styles.dark_mode_sidebar : ""
      }`}
    >
      <aside className={styles.main_content}>
        <p
          className={`menu-label is-hidden-touch ${
            darkmode ? styles.dark_mode_title : ""
          }`}
        >
          MEOS
        </p>
        <ul className="menu-list">
          <li className={darkmode ? styles.item : ""}>
            <Link href="/">
              <a>
                <span className="icon">
                  <i className="fa-solid fa-arrow-left-long"></i>
                </span>{" "}
                Terug
              </a>
            </Link>
          </li>
          <li className={darkmode ? styles.item : ""}>
            <Link href="/defence">
              <a>
                <span className="icon">
                  <i className="fa fa-home"></i>
                </span>{" "}
                Home
              </a>
            </Link>
          </li>
          <li className={darkmode ? styles.item : ""}>
            <Link href="/defence/opzoeken/voertuig">
              <a>
                <span className="icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>{" "}
                Voertuig Opzoeken
              </a>
            </Link>
          </li>
          <li className={darkmode ? styles.item : ""}>
            <Link href="/defence/opzoeken/speler">
              <a>
                <span className="icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>{" "}
                Speler Opzoeken
              </a>
            </Link>
          </li>

          <li className={darkmode ? styles.item : ""}>
            <Link href="/defence/opzoeken/boetes">
              <a>
                <span className="icon">
                  <i className="fa-solid fa-money-check-dollar"></i>
                </span>{" "}
                Boetes
              </a>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
