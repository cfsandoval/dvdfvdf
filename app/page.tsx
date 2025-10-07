"use client";

import React from "react";
import styles from "./page.module.css";

const Home = () => {
  const categories = [
    { name: "Basic chat", href: "/examples/basic-chat" },
    { name: "Function calling", href: "/examples/function-calling" },
    { name: "File search", href: "/examples/file-search" },
    { name: "All", href: "/examples/all" },
    {
      name: "Buscador de buenas prácticas",
      href: "/buscador-practicas",
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        Explore sample apps built with Assistants API
      </div>
      <div className={styles.container}>
        {categories.map(({ name, href }) => (
          <a key={name} className={styles.category} href={href}>
            {name}
          </a>
        ))}
      </div>
    </main>
  );
};

export default Home;
