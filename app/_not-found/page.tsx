"use client";

// Configurar la página como exclusivamente dinámica (no prerenderizada)
export const dynamic = "force-dynamic";

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, no hemos podido encontrar la página que buscas.</p>
    </div>
  );
}
