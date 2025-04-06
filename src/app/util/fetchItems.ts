import FridgeItem from "../types/FridgeItem";

export default async function fetchItems(): Promise<FridgeItem[]> {
  const response = await fetch("/api/inventory");
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  const data = await response.json();
  return data.map((item: FridgeItem) => ({
    ...item,
    expiration: new Date(item.expiration),
    use_date: item.use_date ? new Date(item.use_date) : null,
  }));
}