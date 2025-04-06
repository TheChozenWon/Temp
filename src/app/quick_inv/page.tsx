"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import sharedStyles from "../shared.module.css";

type FridgeItem = {
  food: string;
  expiration: Date;
  quantity: number;
  food_type: string;
};

export default function QuickInventoryPage() {
  const [allItems, setAllItems] = useState<FridgeItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/inventory");
      const data = await response.json();
      setAllItems(data);
    };
    fetchItems();
  }, []);

  async function submitItems(items: FridgeItem[]) {
    const response = await fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Items updated successfully:", data);
    } else {
      console.error("Error updating items:", response.statusText);
    }
  }

  function fUseOneItem(name: string, expiration: Date) {
    setAllItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.food === name && item.expiration === expiration) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      submitItems(newItems);

      return newItems;
    });
  }

  function deleteItem(name: string, expiration: Date) {
    setAllItems((prevItems) => {
      const newItems = prevItems.filter(
        (item) => !(item.food === name && item.expiration === expiration)
      );
      submitItems(newItems);

      return newItems;
    });
  }

  return (
    <div className={sharedStyles.cardPage}>
      <div className={sharedStyles.container}>
        <h1 className={sharedStyles.title}>Inventory at a Glance</h1>
        <div className={styles.foodBoxContainer}>
          {allItems.map((item: FridgeItem) => (
            <div key={item.food + "_" + item.expiration.toString()} className={styles.foodBox}>
              <div className={styles.foodName}>{item.food}</div>
              <div className={styles.foodType}>{item.food_type}</div>
              <div className={styles.foodQuantity}>Quantity: {item.quantity}</div>
              <div className={styles.foodExpiration}>
                Expires {new Date(item.expiration).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
              <div className={styles.foodStatus}>
                {new Date(item.expiration) < new Date()
                  ? "Expired"
                  : "Fresh"}
              </div>
              <button
                className={`${styles.useButton} ${styles.useOneButton}`}
                onClick={() => fUseOneItem(item.food, item.expiration)}
              >
                Use One
              </button>
              <button
                className={`${styles.useButton} ${styles.useAllButton}`}
                onClick={() => deleteItem(item.food, item.expiration)}
              >
                Use All
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
