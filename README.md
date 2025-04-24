# MusicExplorer v2

MusicExplorer es una aplicación web moderna construida con Next.js y TypeScript que permite a los usuarios explorar
información sobre artistas musicales, sus álbumes y canciones utilizando la API de TheAudioDB. La aplicación proporciona
una interfaz responsiva e intuitiva para el descubrimiento musical.

[Ver Demo en Vivo](https://musicexplorer-gb.netlify.app)

![Captura de Pantalla de MusicExplorer](https://github.com/gonzoblasco/musicexplorer/blob/main/public/screenshot.png)

## 🎵 Características Principales

- **Búsqueda de Artistas**: Encuentra información detallada sobre artistas musicales
- **Perfiles de Artistas**: Visualiza biografías, país de origen, año de formación y enlaces a redes sociales
- **Exploración de Discografía**: Navega por álbumes completos y sus detalles
- **Listado de Canciones**: Descubre pistas de cada álbum con duración y enlaces a videos musicales
- **Modo Oscuro/Claro**: Interfaz adaptativa con soporte para preferencias de tema del sistema
- **Diseño Responsivo**: Experiencia optimizada en dispositivos móviles, tabletas y ordenadores de escritorio

## 🚀 Stack Tecnológico

### Frontend

- **Next.js 14**: Framework de React con App Router para enrutamiento basado en archivos y Componentes de Servidor
- **React 18**: Biblioteca de UI con hooks y patrones
- **TypeScript**: Tipado estático para mayor seguridad y mejor experiencia de desarrollo
- **Tailwind CSS 3**: CSS utilitario para estilizado rápido y consistente

### Estado y Datos

- **TanStack Query (React Query)**: Gestión de estado del servidor, caché y actualizaciones de datos
- **next-themes**: Integración de modo oscuro/claro con persistencia

### Pruebas

- **Jest**: Framework para pruebas unitarias y de componentes
- **React Testing Library**: Pruebas orientadas al comportamiento para componentes React
- **Playwright**: Pruebas end-to-end para flujos completos de usuario

### API

- **TheAudioDB**: API externa para información musical detallada

## 🏗️ Arquitectura

El proyecto sigue una arquitectura moderna basada en:

### Componentes y Patrones

- **Componentes de Servidor y Cliente**: Clara separación entre componentes renderizados en el servidor y componentes
  del lado del cliente
- **Patrón Contenedor/Presentación**: Separación de lógica y UI para mejor mantenibilidad
- **Hooks Personalizados**: Abstracción de lógica reutilizable (useArtistQueries, useAlbumQueries)
- **Suspense**: Mejora de la experiencia de usuario durante la carga de datos
- **Renderizado Condicional**: Manejo elegante de estados de carga, error y datos vacíos

### Estructura del Proyecto

```
music-explorer/
├── app/                   # Páginas y rutas (Next.js App Router)
│   ├── album/[id]         # Página de detalle de álbum
│   ├── api/               # Rutas API para endpoints del servidor
│   ├── artist/[id]        # Página de detalle de artista
│   ├── search             # Página de resultados de búsqueda
│   └── page.tsx           # Página de inicio
│
├── components/            # Componentes reutilizables
│   ├── album/             # Componentes relacionados con álbumes
│   ├── artist/            # Componentes relacionados con artistas
│   ├── common/            # Componentes comunes (errores, sin resultados)
│   ├── home/              # Componentes de la página de inicio
│   ├── layout/            # Componentes de estructura (cabecera, pie de página)
│   ├── search/            # Componentes de búsqueda
│   └── ui/                # Componentes básicos de UI (botones, inputs)
│
├── hooks/                 # Hooks personalizados para lógica reutilizable
│
├── lib/                   # Utilidades y servicios
│   ├── api/               # Funciones para interacciones con API
│   └── utils/             # Utilidades generales
│
├── public/                # Archivos estáticos
│
├── types/                 # Definiciones de tipos de TypeScript
│
└── __tests__/             # Pruebas unitarias y de componentes
```

## 🧠 Decisiones Técnicas

### 1. Next.js App Router

El App Router en Next.js fue elegido para aprovechar:

- **Mejores prácticas de SEO** con generación de metadatos
- **Streaming y carga progresiva** para una mejor experiencia de usuario
- **Componentes de Servidor** para reducir el JavaScript enviado al cliente
- **Rutas API** para endpoints de backend seguros

### 2. TanStack Query

Implementado para:

- **Gestión eficiente de caché** con invalidación automática
- **Reintentos de solicitudes** con retroceso exponencial
- **Estados integrados** para carga, error y datos
- **Stale-while-revalidate** para mantener la UI actualizada

### 3. Estrategia de Pruebas

Enfoque de tres niveles:

- **Pruebas unitarias** para utilidades y hooks
- **Pruebas de componentes** para asegurar el renderizado correcto y el manejo de props
- **Pruebas end-to-end** para validar flujos completos de usuario

### 4. Optimización de Rendimiento

- **Carga perezosa** de imágenes con el componente Image de Next.js
- **Límites de Suspense** para carga progresiva de componentes
- **Debouncing** en búsquedas para reducir solicitudes innecesarias
- **Memoización** para prevenir re-renderizados innecesarios

## 🛠️ Instalación y Desarrollo

### Prerrequisitos

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
- `npm run dev:turbo` - Inicia el servidor con Turbopack para un desarrollo más rápido
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia la aplicación construida
- `npm test` - Ejecuta pruebas unitarias y de componentes
- `npm run test:watch` - Ejecuta pruebas en modo observador
- `npm run test:coverage` - Genera informe de cobertura de pruebas
- `npm run test:e2e` - Ejecuta pruebas end-to-end con Playwright

## 🧪 Estrategia de Pruebas

El proyecto implementa una estrategia de pruebas integral:

- **Pruebas unitarias**: Para funciones puras y hooks
- **Pruebas de componentes**: Para verificar el renderizado y comportamiento
- **Pruebas de integración**: Para validar interacciones entre componentes
- **Pruebas end-to-end**: Para probar flujos completos de usuario

Las pruebas están organizadas usando Jest para pruebas unitarias y de componentes, y Playwright para pruebas end-to-end.

## 📝 Notas sobre la API de TheAudioDB

Esta aplicación utiliza la API gratuita de [TheAudioDB](https://www.theaudiodb.com/api_guide.php), que tiene algunas
limitaciones:

- Búsqueda limitada a ciertos artistas
- Límites diarios de consultas
- Algunas características premium no disponibles

Para pruebas, puedes buscar artistas populares como "coldplay", "daft punk", "madonna", "metallica", entre otros.

## 🚧 Desarrollo Futuro

Características planeadas para versiones futuras:

- [ ] Implementación de PWA para uso sin conexión
- [ ] Reproductor de música integrado con vistas previas de canciones
- [ ] Autenticación para guardar artistas favoritos
- [ ] Vista de letras de canciones
- [ ] Filtrado avanzado de álbumes y canciones
- [ ] Integración con servicios de streaming

Al implementar nuevas características, considera cómo se alinean con la arquitectura existente y la experiencia de
usuario.

## 🤝 Flujo de Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama de características (`git checkout -b feature/caracteristica-asombrosa`)
3. Haz commit de tus cambios (`git commit -m 'Añadir alguna característica asombrosa'`)
4. Haz push a la rama (`git push origin feature/caracteristica-asombrosa`)
5. Abre un Pull Request

Por favor, asegúrate de que tus cambios pasen todas las pruebas antes de enviar un Pull Request.

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## 📱 Contacto

Tu Nombre - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Enlace del Proyecto: [https://github.com/yourusername/music-explorer](https://github.com/yourusername/music-explorer)

---

Desarrollado con ❤️ usando Next.js y React
