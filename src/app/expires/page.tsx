"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import sharedStyles from "../shared.module.css";
import minilistStyles from "../minilist.module.css";

type FridgeItem = {
  food: string;
  expiration: Date;
  use_date: string | null;
  is_expired: string;
};

export default function ExpirationPage() {
  const [allItems, setAllItems] = useState<FridgeItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/inventory");
      const data = await response.json();
      setAllItems(
        data.map((item: FridgeItem) => ({
          ...item,
          expiration: new Date(item.expiration),
        }))
      );
    };
    fetchItems();
  }, []);

  const today = new Date();

  const calculateDaysUntilExpiry = (expiryDate: Date): number => {
    const timeDifference = expiryDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  return (
    <div className={sharedStyles.cardPage}>
      <div className={sharedStyles.container}>
        <h1 className={minilistStyles.title}>Food Expiration Info</h1>
        <div className={minilistStyles.foodBoxContainer}>
          {allItems.map((item: FridgeItem) => (
            <div key={item.food} className={minilistStyles.foodBox}>
              <div className={minilistStyles.foodName}>{item.food}</div>
              <div className={styles.expirationDate}>
                Expiration: {item.expiration.toLocaleDateString()} (
                {calculateDaysUntilExpiry(item.expiration)} days)
              </div>
              <div className={styles.useDate}>
                Use Date: {item.use_date ? item.use_date : "N/A"}
              </div>
              <div className={styles.isExpired}>Expired: {item.is_expired}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
