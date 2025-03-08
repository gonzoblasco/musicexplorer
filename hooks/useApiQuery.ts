// hooks/useApiQuery.ts
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { ApiError } from "../lib/utils/errorHandling";

/**
 * Tipo de función para crear claves de consulta a partir de parámetros
 */
type QueryKeyFactory<TParams extends any[]> = (...params: TParams) => unknown[];

/**
 * Tipo de función que realiza una llamada a la API
 */
type ApiFetchFunction<TData, TParams extends any[]> = (
  ...params: TParams
) => Promise<TData>;

/**
 * Opciones adicionales para el hook de consulta de API
 */
interface ApiQueryOptions<TParams extends any[]> {
  // Tiempo de caducidad de la cache
  staleTime?: number;
  // Función que determina si la consulta debe estar habilitada
  getEnabled?: (params: TParams) => boolean;
  // Función de transformación del resultado
  transform?: (data: any) => any;
}

/**
 * Factory para crear hooks de consulta de API reutilizables y tipados
 *
 * @param queryKeyFn - Función para generar la clave de consulta
 * @param apiFn - Función para realizar la llamada a la API
 * @param options - Opciones adicionales
 * @returns Un hook personalizado para consultar la API
 */
export function createApiQueryHook<TData, TParams extends any[]>(
  queryKeyFn: QueryKeyFactory<TParams>,
  apiFn: ApiFetchFunction<TData, TParams>,
  options?: ApiQueryOptions<TParams>,
) {
  return (...params: TParams): UseQueryResult<TData, ApiError> => {
    // Determinar si la consulta debe estar habilitada
    const enabled = options?.getEnabled ? options.getEnabled(params) : true;

    return useQuery<TData, ApiError>({
      queryKey: queryKeyFn(...params),
      queryFn: () => apiFn(...params),
      enabled,
      staleTime: options?.staleTime,
      select: options?.transform,
    });
  };
}

/**
 * Factory para crear hooks de consulta de API con parámetros opcionales
 * Útil cuando algunos parámetros podrían ser indefinidos pero queremos
 * tipos TypeScript correctos
 */
export function createOptionalParamsApiQueryHook<TData, TParams extends any[]>(
  queryKeyFn: QueryKeyFactory<TParams>,
  apiFn: ApiFetchFunction<TData, TParams>,
  options?: ApiQueryOptions<TParams> & UseQueryOptions<TData, ApiError>,
) {
  return (...params: TParams): UseQueryResult<TData, ApiError> => {
    // Verificar que todos los parámetros requeridos estén presentes
    const hasAllRequiredParams = params.every(
      (param) => param !== undefined && param !== null && param !== "",
    );

    // Habilitar la consulta solo si todos los parámetros requeridos están presentes
    // y si la opción getEnabled lo permite
    const enabled =
      hasAllRequiredParams &&
      (options?.getEnabled ? options.getEnabled(params) : true);

    return useQuery<TData, ApiError>({
      queryKey: queryKeyFn(...params),
      queryFn: () => apiFn(...params),
      enabled,
      staleTime: options?.staleTime,
      select: options?.transform,
      ...options,
    });
  };
}
