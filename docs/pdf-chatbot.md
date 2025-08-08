# Chatbot con Base de Conocimiento en PDF

Este servicio permite cargar archivos PDF, preguntar sobre su contenido y embeber un chatbot en cualquier página web.

## Endpoints

- `POST /api/pdf-chatbot/upload`: subir un PDF mediante `FormData` (`file`).
- `POST /api/pdf-chatbot/query`: enviar `{ "question": "..." }` y obtener una respuesta con referencias.

## Widget Web

Inserta el siguiente script en tu página HTML para mostrar el chatbot:

```html
<script src="/pdf-chatbot-widget.js"></script>
```

## Ejemplos

### HTML Puro

```html
<!doctype html>
<html>
  <head>
    <script src="/pdf-chatbot-widget.js"></script>
  </head>
  <body></body>
</html>
```

### React

```jsx
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/pdf-chatbot-widget.js";
    document.body.appendChild(script);
  }, []);
  return <div />;
}
```

### WordPress

Agrega un bloque HTML personalizado con:

```html
<script src="/pdf-chatbot-widget.js"></script>
```

## Instalación y Despliegue

1. Instala dependencias: `npm install`.
2. Define `OPENAI_API_KEY` en un `.env`.
3. Ejecuta en desarrollo: `npm run dev`.
4. Compila para producción: `npm run build && npm start`.
