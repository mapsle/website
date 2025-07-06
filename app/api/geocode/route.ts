import { NextRequest } from "next/server";
import nominatim from "nominatim-client";

const client = nominatim.createClient({
  useragent: "Mapsle", // The name of your application
  referer: "", // The referer link
});

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  if (!query) {
    return Response.json({ error: "Missing query parameter" });
  }
  const result = await client.search({ q: query });
  console.log(result);
  return Response.json(result);
}
