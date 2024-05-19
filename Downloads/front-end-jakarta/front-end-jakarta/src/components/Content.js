import React, { useEffect, useRef } from "react";
import styles from "./Content.module.css"; // Ensure this path is correct and it points to Content.module.css

const Content = () => {
  const articles = [
    {
      imgSrc: "https://i.pinimg.com/originals/fe/29/dc/fe29dc850d8cd80653b93db263858497.jpg",
      title: "Ondel-ondel",
      description:
        "Ondel-ondel merupakan tokoh ikonik Jakarta yang awalnya digunakan untuk mengusir roh jahat atau jiwa pengembara. Namun kini fungsinya beralih menjadi hiburan saat perayaan atau acara syukuran.",
    },
    {
      imgSrc: "https://wallpapercave.com/wp/wp6699292.jpg",
      title: "Bangunan Terkenal",
      description:
        "Jakarta Pusat adalah rumah bagi landmark ikonik seperti Monumen Nasional (Monas), Istana Merdeka, Museum Nasional, Masjid Istiqlal, Katedral Jakarta, dan Monumen Selamat Datang atau monumen selamat datang yang dikenal sebagai Bunderan HI",
    },
    {
      imgSrc: "https://images.unsplash.com/photo-1635380208459-b34560afacb1?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Pelabuhan Sunda Kelapa",
      description:
        "Pelabuhan Sunda Kelapa menjadi pemandangan yang menawan untuk dilihat dengan perahu-perahu tradisional yang berjejer rapi di pelabuhan tua. Ini bukan hanya situs bersejarah, tapi juga tempat di mana Anda bisa menegosiasikan harga dengan tukang perahu dan berkeliling dengan perahu tradisional yang penuh hiasan.",
    },
    {
      imgSrc: "https://awsimages.detik.net.id/community/media/visual/2022/06/22/potret-nostalgia-batavia-tempo-dulu-19_169.jpeg?w=600&q=90 ",
      title: "Perubahan Nama",
      description:
        "Jakarta telah banyak mengalami perubahan nama. Pada abad ke-14, kota ini dikenal dengan nama Sunda Kelapa. Sekitar tahun 1527, pejabat kota memutuskan untuk mengganti namanya menjadi Jayakarta. Pada masa Belanda, mereka meninggalkan jejaknya pada kota tersebut dengan memberinya nama Batavia sekitar tahun 1619. Setelah Perang Dunia II, Jepang mengubah identitasnya menjadi Jakarta",
    },
  ];

  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["animate-visible"]);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      if (observer) {
        elementsRef.current.forEach((element) => {
          if (element) observer.unobserve(element);
        });
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <header className={`${styles.header} ${styles.animate}`} ref={(el) => (elementsRef.current[0] = el)}>
        <h1>Keunikan DKI Jakarta</h1>
      </header>
      {articles.map((article, index) => (
        <React.Fragment key={index}>
          <figure className={`${styles[`featured-image-${index + 1}`]} ${styles.animate}`} ref={(el) => (elementsRef.current[index * 3 + 1] = el)}>
            <img src={article.imgSrc} alt={article.title} />
          </figure>
          <div className={`${styles[`number-${index + 1}`]} ${styles.animate}`} ref={(el) => (elementsRef.current[index * 3 + 2] = el)}>{index + 1}</div>
          <article className={`${styles[`article-${index + 1}`]} ${styles.animate}`} ref={(el) => (elementsRef.current[index * 3 + 3] = el)}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </article>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Content;

