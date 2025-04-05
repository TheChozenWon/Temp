import { openDb } from "@/app/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await openDb();
  const items = await db.all("SELECT * FROM FoodStorage");
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const db = await openDb();
  const allItems = await request.json();
  await db.run("BEGIN TRANSACTION");
  await db.run("DELETE FROM FoodStorage");
  for (const item of allItems) {
    await db.run(
      "INSERT INTO FoodStorage (food, expiration, cost, food_type) VALUES (?, ?, ?, ?)",
      [item.food, item.expiration, item.cost, item.food_type]
    );
  }
  await db.run("COMMIT");
  return NextResponse.json({ message: "Items updated successfully" });
}