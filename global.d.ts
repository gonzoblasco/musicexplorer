import "next";

declare module "next" {
  export interface PageProps {
    params: {
      id: string; // Aquí definimos explícitamente que `params` es un objeto con `id` de tipo `string`
    };
  }
}
