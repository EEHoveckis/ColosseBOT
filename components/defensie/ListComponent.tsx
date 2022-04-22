import axios from "axios";
import React, { useEffect, useState } from "react";
import { IDataFines } from "../../util/database";

export default function ListComponent() {
  var [data, setData] = useState<IDataFines[]>([]);

  useEffect(() => {
    axios
      .get("/api/defence/fines")
      .then((d) => setData(d.data))
      .catch(console.error);
  }, []);

  function GetTotalAmount() {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
      var el = data[i];
      total += el.amount;
    }
    return total;
  }
  function GetTotalNumbers() {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
      total++;
    }
    return total;
  }

  return (
    <div className="box">
      <table className="table">
        <tbody>
          <td>
            <b>Volgnummer (totaal: {GetTotalNumbers()})</b>
          </td>
          <td>
            <b>Reden</b>
          </td>
          <td>
            <b>Bedrag (totaal: {GetTotalAmount()} €)</b>
          </td>
          <td>
            <b>Datum</b>
          </td>
        </tbody>
        <tfoot>
          {data.map((data, index) => {
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
        </tfoot>
      </table>
    </div>
  );
}
