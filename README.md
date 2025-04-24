# MusicExplorer v2

MusicExplorer es una aplicación web moderna construida con Next.js 15 y TypeScript que permite explorar información
sobre artistas musicales, sus álbumes y canciones utilizando TheAudioDB API.

[Ver demostración en vivo](https://musicexplorer-gb.netlify.app)

![MusicExplorer Screenshot](https://github.com/gonzoblasco/musicexplorer/blob/main/public/screenshot.png)

## 🎵 Características

- **Búsqueda de artistas**: Encuentra información detallada sobre tus artistas favoritos
- **Perfiles de artistas**: Visualiza biografías, país de origen, año de formación y enlaces a redes sociales
- **Exploración de discografías**: Navega por álbumes completos y sus detalles
- **Listado de canciones**: Descubre las pistas de cada álbum con su duración y enlaces a videos musicales
- **Modo oscuro/claro**: Interfaz adaptativa con soporte para preferencias de tema del sistema
- **Diseño responsive**: Experiencia optimizada en dispositivos móviles, tablets y escritorio

## 🚀 Stack Tecnológico

### Frontend

- **Next.js 15**: Framework React con App Router para routing basado en sistema de archivos y Server Components
- **React 19**: Biblioteca UI con los últimos hooks y patrones
- **TypeScript**: Tipado estático para mayor seguridad y mejor DX
- **Tailwind CSS 4**: Utilidades CSS de primera clase para estilizado rápido y consistente

### Estado y Datos

- **TanStack Query (React Query)**: Gestión de estado del servidor, caché y actualización de datos
- **next-themes**: Integración de modo oscuro/claro con persistencia

### Testing

- **Jest**: Framework de testing para pruebas unitarias y de componentes
- **React Testing Library**: Testing orientado a comportamiento para componentes React
- **Playwright**: Testing end-to-end para flujos de usuario completos

### API

- **TheAudioDB**: API externa para información musical detallada

## 🏗️ Arquitectura

El proyecto sigue una arquitectura moderna basada en:

### Componentes y Patrones

- **Server y Client Components**: Separación clara entre componentes renderizados en servidor y cliente
- **Patrón de Container/Presentational**: Separación de lógica y UI para mejor mantenibilidad
- **Custom Hooks**: Abstracción de lógica reutilizable (useArtistQueries, useAlbumQueries)
- **Suspense**: Mejora de UX durante carga de datos
- **Renderizado condicional**: Manejo elegante de estados de carga, error y datos vacíos

### Estructura de Directorios

```
music-explorer/
├── app/                   # Páginas y rutas (Next.js App Router)
│   ├── album/[id]         # Página de detalle de álbum
│   ├── api/               # API Routes para endpoints del servidor
│   ├── artist/[id]        # Página de detalle de artista
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
├── hooks/                 # Custom hooks para lógica reutilizable
│
├── lib/                   # Utilidades y servicios
│   ├── api/               # Funciones para interactuar con APIs
│   └── utils/             # Utilidades generales
│
├── public/                # Archivos estáticos
│
├── types/                 # Definiciones de tipos TypeScript
│
└── __tests__/             # Tests unitarios y de componentes
```

## 🧠 Decisiones Técnicas

### 1. Next.js App Router

Se eligió utilizar el App Router de Next.js para aprovechar:

- **Mejores prácticas SEO** con generación de metadatos
- **Streaming y carga progresiva** para una mejor experiencia de usuario
- **Server Components** para reducir el JavaScript enviado al cliente
- **API Routes** para endpoints de backend seguros

### 2. TanStack Query

Implementado para:

- **Gestión eficiente de caché** con invalidación automática
- **Reintento de peticiones** con backoff exponencial
- **Estados integrados** de carga, error y datos
- **Stale-while-revalidate** para mantener la UI actualizada

### 3. Estrategia de Testing

Enfoque en tres niveles:

- **Tests unitarios** para utilidades y hooks
- **Tests de componentes** para garantizar renderizado correcto y manejo de props
- **Tests end-to-end** para validar flujos de usuario completos

### 4. Optimización de Rendimiento

- **Lazy loading** de imágenes con el componente Image de Next.js
- **Suspense boundaries** para carga progresiva de componentes
- **Debouncing** en búsquedas para reducir peticiones innecesarias
- **Memoización** para evitar renderizados innecesarios

## 🛠️ Instalación y Desarrollo

### Requisitos Previos

- Node.js 18.17.0 o superior
- npm 9.0.0 o superior

### Configuración Local

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

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run dev:turbo` - Inicia el servidor con Turbopack para desarrollo más rápido
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia la aplicación construida
- `npm test` - Ejecuta los tests unitarios y de componentes
- `npm run test:watch` - Ejecuta los tests en modo observador
- `npm run test:coverage` - Genera informe de cobertura de tests
- `npm run test:e2e` - Ejecuta los tests end-to-end con Playwright

## 🧪 Estrategia de Testing

El proyecto implementa una estrategia de testing completa:

- **Tests unitarios**: Para funciones puras y hooks
- **Tests de componentes**: Para verificar renderizado y comportamiento
- **Tests de integración**: Para validar la interacción entre componentes
- **Tests end-to-end**: Para probar flujos completos de usuario

Los tests están organizados usando Jest para tests unitarios y de componentes, y Playwright para tests end-to-end.

## 📝 Notas sobre TheAudioDB API

Esta aplicación utiliza la API gratuita de [TheAudioDB](https://www.theaudiodb.com/api_guide.php), que tiene algunas
limitaciones:

- Búsqueda limitada a ciertos artistas
- Límite de consultas diarias
- Algunas características premium no disponibles

Para pruebas, puedes buscar artistas populares como "coldplay", "daft punk", "madonna", "metallica", entre otros.

## 🚧 Roadmap

Características planeadas para futuras versiones:

- [ ] Implementación de PWA para uso offline
- [ ] Reproductor de música integrado con previews de canciones
- [ ] Autenticación para guardar artistas favoritos
- [ ] Vista de letras de canciones
- [ ] Filtrado avanzado de álbumes y canciones
- [ ] Integración con servicios de streaming

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Haz fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

Por favor, asegúrate de que tus cambios pasen todos los tests.

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## 📱 Contacto

Tu Nombre - [@tu_twitter](https://twitter.com/tu_twitter) - email@example.com

Link del Proyecto: [https://github.com/yourusername/music-explorer](https://github.com/yourusername/music-explorer)

---

Desarrollado con ❤️ usando Next.js y React