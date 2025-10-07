export interface PublicManagementRepository {
  name: string;
  description: string;
  url: string;
  organization: string;
  region: string;
  languages: string[];
  tags: string[];
}

export const repositories: PublicManagementRepository[] = [
  {
    name: "Observatorio de buenas prácticas en gestión pública",
    description:
      "Repositorio curado por el CLAD con experiencias destacadas en modernización del Estado y mejora de servicios públicos en Iberoamérica.",
    url: "https://clad.org/observatorio/",
    organization:
      "Centro Latinoamericano de Administración para el Desarrollo (CLAD)",
    region: "América Latina",
    languages: ["Español"],
    tags: ["modernización", "servicios públicos", "calidad"]
  },
  {
    name: "OECD Observatory of Public Sector Innovation (OPSI)",
    description:
      "Biblioteca global de casos y herramientas para innovar en el sector público, con filtros por países, retos y resultados.",
    url: "https://oecd-opsi.org/innovations/",
    organization: "Organisation for Economic Co-operation and Development (OECD)",
    region: "Global",
    languages: ["Inglés", "Francés"],
    tags: ["innovación", "servicios públicos", "transformación digital"]
  },
  {
    name: "Open Government Partnership Story Repository",
    description:
      "Historias documentadas sobre reformas de gobierno abierto, transparencia y participación ciudadana de los países miembros de la Alianza.",
    url: "https://www.opengovpartnership.org/stories/",
    organization: "Open Government Partnership (OGP)",
    region: "Global",
    languages: ["Inglés", "Español", "Francés"],
    tags: ["gobierno abierto", "participación", "transparencia"]
  },
  {
    name: "Observatorio Regional de Planificación para el Desarrollo",
    description:
      "Colección de buenas prácticas impulsada por la CEPAL que reúne experiencias de planificación pública en América Latina y el Caribe.",
    url: "https://observatorioplanificacion.cepal.org/es/buenas-practicas",
    organization:
      "Comisión Económica para América Latina y el Caribe (CEPAL)",
    region: "América Latina",
    languages: ["Español"],
    tags: ["planificación", "desarrollo territorial", "evaluación"]
  },
  {
    name: "Banco de Innovaciones en Gestión Pública",
    description:
      "Plataforma del BID que cataloga soluciones innovadoras aplicadas por gobiernos subnacionales y nacionales de la región.",
    url: "https://www.iadb.org/es/sector-publico/banco-de-innovaciones",
    organization: "Banco Interamericano de Desarrollo (BID)",
    region: "América Latina",
    languages: ["Español", "Inglés", "Portugués"],
    tags: ["innovación", "gobierno digital", "gestión pública"]
  },
  {
    name: "Repositorio de políticas y servicios digitales (GDS)",
    description:
      "Colección de estudios de caso y guías del Government Digital Service del Reino Unido sobre diseño y entrega de servicios digitales.",
    url: "https://www.gov.uk/government/collections/gds-case-studies",
    organization: "Government Digital Service (Reino Unido)",
    region: "Europa",
    languages: ["Inglés"],
    tags: ["servicios digitales", "diseño centrado en las personas", "transformación digital"]
  },
  {
    name: "Portal de buenas prácticas en datos abiertos (datos.gob.es)",
    description:
      "Compendio de iniciativas españolas y europeas que demuestran el valor público generado a partir de la apertura de datos.",
    url: "https://datos.gob.es/es/documentacion/buenas-practicas",
    organization: "Secretaría de Estado de Digitalización e Inteligencia Artificial (España)",
    region: "Europa",
    languages: ["Español"],
    tags: ["datos abiertos", "transparencia", "economía del dato"]
  },
  {
    name: "Repositorio de innovación pública de CAF",
    description:
      "Catálogo de casos de innovación gubernamental en América Latina impulsado por la CAF y su iniciativa GovTech Latam.",
    url: "https://www.caf.com/es/actualidad/noticias/2021/05/repositorio-de-innovacion-publica/",
    organization: "Banco de Desarrollo de América Latina (CAF)",
    region: "América Latina",
    languages: ["Español", "Portugués"],
    tags: ["innovación", "GovTech", "co-creación"]
  },
  {
    name: "UNDP Digital X Solutions Catalogue",
    description:
      "Inventario de soluciones escalables impulsadas por el PNUD para acelerar la transformación digital inclusiva en el sector público.",
    url: "https://digitalx.undp.org/solutions",
    organization: "Programa de las Naciones Unidas para el Desarrollo (PNUD)",
    region: "Global",
    languages: ["Inglés"],
    tags: ["transformación digital", "inclusión", "ODS"]
  },
  {
    name: "Repositorio de innovación pública (LabGobAR)",
    description:
      "Casos documentados por el laboratorio de innovación del gobierno argentino sobre cómo mejorar servicios y regulaciones.",
    url: "https://www.argentina.gob.ar/jefatura/innovacion-publica/labgobar/recursos",
    organization: "Laboratorio de Innovación Pública del Gobierno de Argentina",
    region: "América Latina",
    languages: ["Español"],
    tags: ["innovación", "co-diseño", "servicios públicos"]
  },
  {
    name: "GovTech Catalogue (Portugal)",
    description:
      "Directorio de soluciones GovTech y proyectos de innovación coordinado por la Agencia para a Modernização Administrativa de Portugal.",
    url: "https://catalogo.govtech.pt/",
    organization: "Agência para a Modernização Administrativa (AMA)",
    region: "Europa",
    languages: ["Portugués", "Inglés"],
    tags: ["GovTech", "transformación digital", "startups"]
  }
];

export const regions = [
  "Todas las regiones",
  ...Array.from(new Set(repositories.map((repo) => repo.region))).sort(),
];

export const tags = [
  "Todos los temas",
  ...Array.from(
    new Set(repositories.flatMap((repo) => repo.tags.map((tag) => tag.toLowerCase())))
  )
    .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
    .sort(),
];

export const languages = [
  "Todos los idiomas",
  ...Array.from(
    new Set(repositories.flatMap((repo) => repo.languages.map((language) => language.toLowerCase())))
  )
    .map((language) => language.charAt(0).toUpperCase() + language.slice(1))
    .sort(),
];
