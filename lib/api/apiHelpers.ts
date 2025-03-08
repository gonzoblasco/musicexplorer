// lib/api/apiHelpers.ts
import { NextResponse } from "next/server";

export function createApiHandler<T>(
  fetchFn: (id: string) => Promise<T>,
  entityName: string,
) {
  return async function handler(request: any, { params }: any) {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: `${entityName} ID is required` },
        { status: 400 },
      );
    }

    try {
      const data = await fetchFn(id);
      return NextResponse.json({ [entityName.toLowerCase()]: data });
    } catch (error) {
      return NextResponse.json(
        { error: `Error fetching ${entityName.toLowerCase()}` },
        { status: 500 },
      );
    }
  };
}
