import React from "react";
import styles from "./Hero.module.css";

const Hero = () => (
  <div className={styles.hero}>
    <div className={styles.overlay}></div>
    <div className={styles.neatoHeader}>
      <h1>Selamat Datang di DKI Jakarta</h1>
      <h2>Ibu kota Indonesia</h2>
    </div>
    <div className={styles.heroFooter}>
      {/* Footer content */}
    </div>
  </div>
);

export default Hero;
