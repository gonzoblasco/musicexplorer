# MusicExplorer

MusicExplorer es una aplicación web construida con Next.js 15 y TypeScript que te permite explorar información sobre
artistas musicales, sus álbumes y canciones utilizando TheAudioDB API.

![MusicExplorer Screenshot](https://github.com/gonzoblasco/musicexplorer/blob/main/public/screenshot.png)

## Características

- 🎵 Búsqueda de artistas musicales
- 🎨 Visualización de información detallada de artistas
- 💿 Exploración de discografías y álbumes
- 🎧 Listado de tracks por álbum
- 🌓 Modo claro/oscuro
- 📱 Diseño responsivo para todos los dispositivos

## Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilizado**: Tailwind CSS 4
- **Tema**: next-themes para el manejo del modo claro/oscuro
- **API**: TheAudioDB (API gratuita para información musical)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/yourusername/music-explorer.git
   ```

2. Instala las dependencias:
   ```bash
   cd music-explorer
   npm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run dev:turbo` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia la aplicación construida
- `npm run lint` - Ejecuta el linter para verificar el código

## Estructura del Proyecto

```
music-explorer/
├── app/                   # Directorio de páginas y rutas (App Router)
│   ├── album/[id]         # Página para mostrar detalle de un álbum
│   ├── api/               # Rutas de API
│   ├── artist/[id]        # Página para mostrar detalle de un artista
│   ├── search             # Página de resultados de búsqueda
│   └── page.tsx           # Página de inicio
│
├── components/            # Componentes reutilizables
│   ├── album/             # Componentes relacionados con álbumes
│   ├── artist/            # Componentes relacionados con artistas
│   ├── common/            # Componentes comunes (errores, sin resultados)
│   ├── home/              # Componentes de la página de inicio
│   ├── layout/            # Componentes de estructura (header, footer)
│   ├── search/            # Componentes de búsqueda
│   └── ui/                # Componentes básicos de UI (botones, inputs)
│
├── hooks/                 # Custom hooks
│
├── lib/                   # Utilidades y servicios
│   ├── api/               # Funciones para interactuar con APIs
│   └── utils/             # Utilidades generales
│
├── public/                # Archivos estáticos
│
└── types/                 # Definiciones de tipos TypeScript
```

## TheAudioDB API

Esta aplicación utiliza la API gratuita de [TheAudioDB](https://www.theaudiodb.com/api_guide.php) para obtener
información sobre artistas y música. La API gratuita tiene algunas limitaciones:

- Búsqueda limitada a ciertos artistas
- Límite de consultas por día
- Algunas características premium no están disponibles

Para pruebas, puedes buscar artistas como "coldplay", "daft punk", "madonna", "metallica", entre otros.

## Características en Detalle

### Búsqueda de Artistas

La búsqueda permite encontrar artistas musicales y ver sus detalles. Puedes acceder a la búsqueda desde:

- La barra de búsqueda en el encabezado
- El formulario de búsqueda en la página principal

### Página de Artista

La página de artista muestra:

- Información biográfica
- Imagen del artista
- País de origen y año de formación
- Enlaces a sus redes sociales y sitio web
- Lista de álbumes

### Página de Álbum

La página de álbum muestra:

- Portada del álbum
- Información general (año, género, etc.)
- Descripción
- Lista de canciones con duración

### Tema Claro/Oscuro

La aplicación soporta cambio entre tema claro y oscuro, respetando las preferencias del sistema del usuario y
permitiendo cambiar manualmente.

## Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Haz fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## Contacto

Tu Nombre - [@tu_twitter](https://twitter.com/tu_twitter) - email@example.com

Link del Proyecto: [https://github.com/yourusername/music-explorer](https://github.com/yourusername/music-explorer)

---

Desarrollado con ❤️ usando Next.js y React