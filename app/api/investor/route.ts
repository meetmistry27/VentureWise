// app/api/investor/route.ts
import { getAllStartups } from "./investor";

export async function GET() {
  return getAllStartups();
}