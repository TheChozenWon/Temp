"use client";

import { useEffect, useState } from "react";
import sharedStyles from "../shared.module.css";

type FridgeItem = {
  food: string;
  expiration: Date;
  is_expired: boolean;
};

export default function AllItemsPage() {
  const [allItems, setAllItems] = useState<FridgeItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const response = await fetch("/api/inventory");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data: FridgeItem[] = await response.json();
        setAllItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items. Please try again later.");
      }
    };
    fetchAllItems();
  }, []);

  return (
    <div className={sharedStyles.container}>
      <h1>All Items</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {allItems.map((item, index) => (
            <li key={index}>
              <h2>{item.food}</h2>
              <p>Expiration Date: {new Date(item.expiration).toLocaleDateString()}</p>
              <p>Expired: {item.is_expired ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}