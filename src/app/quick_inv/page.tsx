"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import sharedStyles from "../shared.module.css";
import minilistStyles from "../minilist.module.css";
import FridgeItem, { fridgeItemMatches, genItemKey } from "../types/FridgeItem";
import fetchItems from "../util/fetchItems";

export default function QuickInventoryPage() {
  const [allItems, setAllItems] = useState<FridgeItem[]>([]);

  useEffect(() => {
    fetchItems().then(setAllItems);
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

  function incrementOrInsertUsedItem(items: FridgeItem[], item: FridgeItem, num: number) {
    const itemIndex = items.findIndex((i) => fridgeItemMatches(i, { ...item, use_date: new Date() }));
    if (itemIndex !== -1) {
      const existingItem = items[itemIndex];
      console.log("Item found, updating quantity", existingItem);
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + num };
      items[itemIndex] = updatedItem;
    } else {
      console.log("Item not found, creating a new one");
      const newItem = { ...item, quantity: num, use_date: new Date() };
      items.push(newItem);
    }
  }

  function fUseNumItems(searchItem: FridgeItem, num: number) {
    const newItems = [...allItems];
    const itemIndex = newItems.findIndex(
      (item) => fridgeItemMatches(item, searchItem)
    );
    
    if (itemIndex !== -1) {
      const item = newItems[itemIndex];
      const consumedQuantity = Math.min(item.quantity, num);
      if (item.quantity > num) {
        item.quantity -= num;
      } else {
        newItems.splice(itemIndex, 1);
      }

      incrementOrInsertUsedItem(newItems, item, consumedQuantity);
    }

    setAllItems(newItems);
    submitItems(newItems);

    return newItems;
  }

  return (
    <div className={sharedStyles.cardPage}>
      <div className={sharedStyles.container}>
        <h1 className={sharedStyles.title}>Inventory at a Glance</h1>
        <div className={minilistStyles.foodBoxContainer}>
          {allItems.filter(i => i.use_date === null || i.use_date === undefined).map((item: FridgeItem) => (
            <div key={genItemKey(item)} className={minilistStyles.foodBox}>
              <div className={minilistStyles.foodName}>{item.food}</div>
              <div className={minilistStyles.foodType}>{item.food_type}</div>
              <div className={minilistStyles.foodQuantity}>Quantity: {item.quantity}</div>
              <div className={minilistStyles.foodExpiration}>
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
                onClick={() => fUseNumItems(item, 1)}
              >
                Use One
              </button>
              <button
                className={`${styles.useButton} ${styles.useAllButton}`}
                onClick={() => fUseNumItems(item, item.quantity)}
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
