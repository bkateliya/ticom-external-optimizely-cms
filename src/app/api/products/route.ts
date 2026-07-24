import { getProducts } from "@/lib/api/product-api";

export async function GET() {
    return Response.json(await getProducts());
}
