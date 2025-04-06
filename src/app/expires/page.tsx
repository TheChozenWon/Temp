"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import sharedStyles from "../shared.module.css";
import minilistStyles from "../minilist.module.css";
import FridgeItem, { genItemKey } from "../types/FridgeItem";
import fetchItems from "../util/fetchItems";

function sortItems(items: FridgeItem[]): FridgeItem[] {
  return items.sort((a, b) => {
    const dateA = new Date(a.expiration);
    const dateB = new Date(b.expiration);
    return (
      (a.use_date && !b.use_date ? 1 : 0) ||
      (b.use_date && !a.use_date ? -1 : 0) ||
      dateA.getTime() - dateB.getTime() ||
      a.food.localeCompare(b.food) ||
      0
    );
  });
}

export default function ExpirationPage() {
  const [allItems, setAllItems] = useState<FridgeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchItems().then((items) => setAllItems(sortItems(items)));
  }, []);

  const today = new Date();

  const calculateDaysUntilExpiry = (expiryDate: Date): number => {
    const timeDifference = expiryDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  const isExpired = (item: FridgeItem): boolean => {
    return item.expiration < today && !item.use_date;
  };

  const willExpireSoon = (item: FridgeItem): boolean => {
    return item.expiration.getDate() == today.getDate() && !item.use_date;
  };

  const hasBeenUsed = (item: FridgeItem): boolean => {
    return !!item.use_date;
  };

  const filteredItems = allItems.filter((item) =>
    item.food.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className={sharedStyles.cardPage}>
      <div className={sharedStyles.container}>
        <h1 className={minilistStyles.title}>Food Expiration Info</h1>
        <input
          type="text"
          placeholder="Search food..."
          className={sharedStyles.input}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={minilistStyles.foodBoxContainer}>
          {filteredItems.map((item: FridgeItem) => (
            <div
              key={genItemKey(item)}
              className={`
                ${minilistStyles.foodBox}
                ${
                  isExpired(item)
                    ? styles.expired
                    : willExpireSoon(item)
                    ? styles.expiring
                    : hasBeenUsed(item)
                    ? styles.used
                    : ""
                }`}
            >
              <div className={minilistStyles.foodName}>{item.food}</div>
              <div className={styles.expirationDate}>
                Expiration: {item.expiration.toLocaleDateString()} (
                {calculateDaysUntilExpiry(item.expiration)} days)
              </div>
              <div className={styles.useDate}>
                Use Date:{" "}
                {item.use_date ? item.use_date.toLocaleDateString() : "N/A"}
              </div>
              <div className={styles.quantity}>
                {(item.use_date ? "Used: " : "Quantity: ") + item.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
