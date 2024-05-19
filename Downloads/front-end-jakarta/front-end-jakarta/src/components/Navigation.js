import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive);
    document.body.classList.toggle(styles.navActive, !isActive);
  };

  return (
    <div>
      <div className={styles.menuIcon} onClick={toggleNavbar}>
        <a>
          <span
            className={`${styles.menuIconLine} ${
              isActive ? styles.menuIconActiveLine : ""
            }`}
          ></span>
          <span
            className={`${styles.menuIconLine} ${
              isActive ? styles.menuIconActiveLine : ""
            }`}
          ></span>
          <span
            className={`${styles.menuIconLine} ${
              isActive ? styles.menuIconActiveLine : ""
            }`}
          ></span>
        </a>
        <span
          className={`${styles.menuIconLineLeft} ${
            isActive ? styles.menuIconActiveLineLeft : ""
          }`}
        ></span>
        <span
          className={`${styles.menuIconLineRight} ${
            isActive ? styles.menuIconActiveLineRight : ""
          }`}
        ></span>
      </div>
      <div className={`${styles.nav} ${isActive ? styles.navActive : ""}`}>
        <div className={styles.navContent}>
          <ul >
            <li 
              className={`${styles.navListItem} ${
                isActive ? styles.navListItemActive : ""
              }`}
            >
              <Link  to="/" onClick={toggleNavbar}>
                Home
              </Link>
            </li>
            <li
              className={`${styles.navListItem} ${
                isActive ? styles.navListItemActive : ""
              }`}
            >
              <Link to="/wisata" onClick={toggleNavbar}>
                Wisata
              </Link>
            </li>
            <li
              className={`${styles.navListItem} ${
                isActive ? styles.navListItemActive : ""
              }`}
            >
              <Link to="/about-us" onClick={toggleNavbar}>
                About Us
              </Link>
            </li>
            <li
              className={`${styles.navListItem} ${
                isActive ? styles.navListItemActive : ""
              }`}
            >
              <Link to="/contact" onClick={toggleNavbar}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;



