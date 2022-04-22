import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { UpdateDarkMode, GetDarkMode } from "../../util/darkmode";

export default function Navbar() {
  const router = useRouter();
  const ToggleDarkMode = () => {
    UpdateDarkMode(!GetDarkMode());
    router.reload();
  };

  return (
    <div>
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">Home</a>

            <a className="navbar-item">Solliciteer</a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Overheids Diensten</a>

              <div className="navbar-dropdown">
                <Link href="/defence">
                  <a className="navbar-item">Politie - MEOS</a>
                </Link>
                <a className="navbar-item">KMar - NOT_IN_USE</a>
                <a className="navbar-item">Ambulance - NOT_IN_USE</a>
                <a className="navbar-item">ANWB - NOT_IN_USE</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-primary" onClick={ToggleDarkMode}>
                  Dark Mode <div style={{ width: "10px" }}></div>
                  <i className="fa fa-moon-o"></i>
                </button>
                <Link href="/login">
                  <a className="button is-primary">
                    Log in <div style={{ width: "10px" }}></div>
                    <i className="fa-solid fa-right-to-bracket"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
