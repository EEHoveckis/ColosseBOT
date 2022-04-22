import Link from "next/link";
import React from "react";

const style: React.CSSProperties = {
  //   height: "7.5vh",
  width: "75vw",
  backgroundColor: "#ecf0f1",
  marginLeft: "-10vw",
  position: "absolute",
  bottom: "0",
};

export default function Footer() {
  return (
    <div style={style}>
      <footer>
        <div>
          <nav className="level">
            <div className="level-item">
              <div>
                <p className="heading">
                  <p>
                    Web created by <b>LxrsV1</b> for <b>Columbus Roleplay</b>{" "}
                    &copy;
                  </p>
                </p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">
                  <Link href="#">Wetboek</Link>
                </p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">
                  <Link href="#">Discord - Overheid</Link>
                </p>
              </div>
            </div>
          </nav>
        </div>
      </footer>
    </div>
  );
}
