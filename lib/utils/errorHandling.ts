/**
 * Sistema centralizado de manejo de errores para la aplicación MusicExplorer.
 * Proporciona clases de error personalizadas y funciones de utilidad para
 * manejar errores de forma consistente en toda la aplicación.
 */

/**
 * Clase de error personalizada para errores de API.
 * Extiende la clase Error nativa y añade propiedades adicionales.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "ApiError";

    // Esto es necesario porque al extender clases nativas en TypeScript
    // el prototipo puede perderse
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Obtiene un mensaje de error amigable para el usuario
   */
  public getUserFriendlyMessage(): string {
    switch (this.statusCode) {
      case 404:
        return "No pudimos encontrar lo que estabas buscando.";
      case 401:
      case 403:
        return "No tienes permiso para acceder a este recurso.";
      case 429:
        return "Demasiadas solicitudes. Por favor, inténtalo más tarde.";
      default:
        return "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";
    }
  }
}

/**
 * Clase de error personalizada para errores de validación.
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public validationErrors: Record<string, string> = {},
  ) {
    super(message);
    this.name = "ValidationError";

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Convierte un error desconocido en un ApiError estructurado.
 * Útil para normalizar el manejo de errores en toda la aplicación.
 *
 * @param error - El error original que se capturó
 * @param fallbackMessage - Mensaje alternativo si el error no tiene uno
 * @returns Un objeto ApiError estructurado
 */
export function handleApiError(
  error: unknown,
  fallbackMessage: string,
): ApiError {
  // Si ya es un ApiError, simplemente lo devolvemos
  if (error instanceof ApiError) return error;

  // Si es un error HTTP con código de estado (como de fetch)
  if (error && typeof error === "object" && "status" in error) {
    const statusCode = typeof error.status === "number" ? error.status : 500;
    const message =
      "statusText" in error && typeof error.statusText === "string"
        ? error.statusText
        : fallbackMessage;

    return new ApiError(message, statusCode, error);
  }

  // Para errores estándar de JavaScript
  if (error instanceof Error) {
    return new ApiError(error.message, 500, error);
  }

  // Para cualquier otro tipo de error
  return new ApiError(fallbackMessage, 500, error);
}

/**
 * Función para manejar errores específicamente en las peticiones a APIs.
 *
 * @param response - La respuesta fetch a evaluar
 * @param entityName - Nombre de la entidad para personalizar mensajes de error
 * @returns La respuesta si es correcta
 * @throws ApiError si la respuesta no es correcta
 */
export async function handleFetchResponse<T>(
  response: Response,
  entityName: string,
): Promise<T> {
  if (!response.ok) {
    // Tratamos de extraer un mensaje de error si el servidor lo proporciona
    let errorMessage: string;
    try {
      const errorData = await response.json();
      errorMessage =
        errorData.message ||
        errorData.error ||
        `Error al obtener ${entityName}`;
    } catch {
      errorMessage = `Error al obtener ${entityName}`;
    }

    throw new ApiError(errorMessage, response.status);
  }

  return response.json() as Promise<T>;
}
