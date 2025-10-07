"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";
import {
  languages as availableLanguages,
  regions as availableRegions,
  repositories,
  tags as availableTags,
} from "../data/publicManagementRepositories";

const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

const BuenasPracticasPage = () => {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(availableRegions[0]);
  const [selectedTag, setSelectedTag] = useState(availableTags[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(availableLanguages[0]);

  const filteredRepositories = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    const normalizedTag = normalize(selectedTag);
    const normalizedLanguage = normalize(selectedLanguage);

    return repositories.filter((repository) => {
      const matchesRegion =
        selectedRegion === availableRegions[0] || repository.region === selectedRegion;

      const matchesTag =
        selectedTag === availableTags[0] ||
        repository.tags.some((tag) => normalize(tag) === normalizedTag);

      const matchesLanguage =
        selectedLanguage === availableLanguages[0] ||
        repository.languages.some((language) => normalize(language) === normalizedLanguage);

      const searchableFields = [
        repository.name,
        repository.description,
        repository.organization,
        repository.region,
        repository.tags.join(" "),
      ]
        .map((field) => normalize(field))
        .join(" ");

      const matchesQuery = normalizedQuery === "" || searchableFields.includes(normalizedQuery);

      return matchesRegion && matchesTag && matchesLanguage && matchesQuery;
    });
  }, [query, selectedLanguage, selectedRegion, selectedTag]);

  const totalRegions = useMemo(() => new Set(repositories.map((repo) => repo.region)).size, []);
  const totalLanguages = useMemo(
    () => new Set(repositories.flatMap((repo) => repo.languages.map((language) => language))).size,
    []
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Buscador de buenas prácticas en gestión pública</h1>
          <p className={styles.subtitle}>
            Explora repositorios internacionales que documentan experiencias exitosas de modernización,
            innovación y mejora de los servicios públicos. Filtra por región, idioma o temática para encontrar
            la referencia que más se ajusta a tus necesidades.
          </p>
        </header>

        <section className={styles.filters} aria-label="Filtros del buscador">
          <div className={styles.searchField}>
            <label className={styles.label} htmlFor="search">
              Buscar por nombre, descripción u organización
            </label>
            <input
              id="search"
              className={styles.input}
              type="search"
              placeholder="Ejemplo: gobierno abierto, transformación digital, planificación"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div>
            <label className={styles.label} htmlFor="region">
              Región
            </label>
            <select
              id="region"
              className={styles.select}
              value={selectedRegion}
              onChange={(event) => setSelectedRegion(event.target.value)}
            >
              {availableRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label} htmlFor="tag">
              Temática principal
            </label>
            <select
              id="tag"
              className={styles.select}
              value={selectedTag}
              onChange={(event) => setSelectedTag(event.target.value)}
            >
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label} htmlFor="language">
              Idioma disponible
            </label>
            <select
              id="language"
              className={styles.select}
              value={selectedLanguage}
              onChange={(event) => setSelectedLanguage(event.target.value)}
            >
              {availableLanguages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className={styles.stats} aria-live="polite">
          <strong>
            {filteredRepositories.length} de {repositories.length} repositorios coinciden con tu búsqueda.
          </strong>
          <span>
            Cobertura total: {totalRegions} regiones, {totalLanguages} idiomas y {availableTags.length - 1} grandes temáticas.
          </span>
        </section>

        {filteredRepositories.length === 0 ? (
          <div className={styles.emptyState}>
            No encontramos repositorios con esos criterios. Ajusta los filtros o prueba con otra palabra clave.
          </div>
        ) : (
          <section className={styles.results} aria-label="Resultados del buscador">
            {filteredRepositories.map((repository) => (
              <article key={repository.url} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>{repository.name}</h2>
                  <p className={styles.meta}>
                    {repository.organization} · {repository.region} · {repository.languages.join(", ")}
                  </p>
                </div>

                <p className={styles.description}>{repository.description}</p>

                <div className={styles.tags}>
                  {repository.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  className={styles.link}
                  href={repository.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Visitar recurso
                </a>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default BuenasPracticasPage;
