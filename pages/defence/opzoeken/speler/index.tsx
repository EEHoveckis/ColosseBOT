import axios from "axios";
import { NextPage } from "next";
import Router from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import SideNav from "../../../../components/defensie/SideNav";
import styles from "../../../../styles/PlayerPage.module.css";
import { CheckLoggedIn } from "../../../../util/authentication";
import { GetDarkMode } from "../../../../util/darkmode";
import { IDataFines } from "../../../../util/database";

interface IData {
  name: string;
  fines: IDataFines[];
  notes: string[];
  commands: string[];
}

const SpelerPage: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [notes, setNotes] = useState<string[]>([]);
  const [data, setData] = useState<IData>();
  const [isLoaded, setLoaded] = useState<boolean>(true);
  const [darkmode, setDarkmode] = useState<boolean>(false);

  useEffect(() => {
    if (CheckLoggedIn()) {
      if (GetDarkMode()) setDarkmode(true);
    } else Router.push("/login");
  }, []);

  const submitForm: Function = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(`/api/defence/player?name=${name}`)
      .then(({ data }) => {
        setData(data);
        setNotes(data?.notes || [""]);
        setLoaded(false);
      })
      .catch(console.error); // TODO: Maak error bericht bij de plaats waar data getoont word
    console.log(data);
  };

  function UpdateNotes(content: string[]) {
    console.log(content);
    axios
      .post("/api/defence/player/updateNotes", { content, name })
      .then((data) => console.log(data.data))
      .catch(console.error);
  }

  return (
    <div className={darkmode ? styles.dark_mode : ""}>
      <Script src="https://kit.fontawesome.com/82faba1ef6.js"></Script>
      <SideNav />
      <div className="fixed_container">
        <div className="box">
          {/* ZOEK GEBIED */}
          <form className="field has-addons" onSubmit={(e) => submitForm(e)}>
            <div className="control">
              <input
                className={`input ${styles.input}`}
                type="text"
                placeholder="Zoek speler (let op: volledige naam)"
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div className="control">
              <button className="button is-info" type="submit">
                Search
              </button>
            </div>
          </form>

          {!isLoaded ? (
            <div className="data">
              {/* TODO: Verander met css */}
              <br />
              <p>
                <b>Naam:</b> {data?.name}
              </p>
              <p>
                <b>Bevelen:</b>
                {data?.commands.map((c, i) => (
                  <p key={i}>- {c}</p>
                ))}
              </p>
              <p>
                <b>Notities:</b> <br />
                <textarea
                  className={styles.textarea_notes}
                  onChange={(e) => setNotes(e.currentTarget.value.split("\n"))}
                  defaultValue={data?.notes}
                ></textarea>
                <button
                  className="button is-primary"
                  onClick={() => UpdateNotes(notes)}
                >
                  Update Notes
                </button>
              </p>
              <div>
                <p>
                  <b>Openstaande boetes:</b>
                </p>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Volgnummer</th>
                      <th>Reden</th>
                      <th>Bedrag</th>
                      <th>Datum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.fines.map((data, index) => {
                      const { amount, date, reason, number } = data;
                      return (
                        <tr key={index}>
                          <td>{number}</td>
                          <td>{reason}</td>
                          <td>{amount} €</td>
                          <td>{date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpelerPage;
