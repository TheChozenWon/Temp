"use client";

import { useEffect, useState } from "react";
import sharedStyles from "../shared.module.css";
import FridgeItem, { genItemKey } from "../types/FridgeItem";
import fetchItems from "../util/fetchItems";

export default function AllItemsPage() {
  const [allItems, setAllItems] = useState<FridgeItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllItems = async () => {
      fetchItems()
        .then(setAllItems)
        .catch(err => {
          setError("Failed to fetch items");
          console.error(err);
        });
    };
    fetchAllItems();
  }, []);

  const calculateStats = () => {
    const totalItems = allItems.length;
    const expiredItems = allItems.filter(
      item => item.is_expired && new Date(item.expiration) >= new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    ).length;

    const itemsUsed = Math.floor(totalItems * 0.6); // Example: 60% of items are used
    const itemsBought = totalItems;

    const expiredPercentage = totalItems > 0 ? (expiredItems / totalItems) * 100 : 0;

    return { itemsUsed, itemsBought, expiredPercentage };
  };

  const categorizeItems = () => {
    const expiredItems = allItems.filter(item => item.is_expired);
    const nonExpiredItems = allItems.filter(item => !item.is_expired);

    return { expiredItems, nonExpiredItems };
  };

  const { itemsUsed, itemsBought, expiredPercentage } = calculateStats();
  const { expiredItems, nonExpiredItems } = categorizeItems();

  return (
    <div className={sharedStyles.cardPage}>
      <div className={sharedStyles.container}>
        <h1 className={sharedStyles.title}>Statistics</h1>
        <div style={{ backgroundColor: "white" }} className={sharedStyles.horizontalContainer}>
          <div className={sharedStyles.nestedCard}>
            {error ? (
              <p>{error}</p>
            ) : (
              <div>
                <h2>Items Used vs. Items Bought</h2>
                <p>Items Used: {itemsUsed}</p>
                <p>Items Bought: {itemsBought}</p>
              </div>
            )}
          </div>
          <div className={sharedStyles.nestedCard}>
            {!error && (
              <div>
                <h2>Food Expired in Last 14 Days</h2>
                <p>{expiredPercentage.toFixed(2)}% of food expired</p>
              </div>
            )}
          </div>
        </div>
        <div style={{ backgroundColor: "white" }} className={sharedStyles.horizontalContainer}>
          <div className={sharedStyles.nestedCard}>
            <h2>Non-Expired Items</h2>
            <ul>
              {nonExpiredItems.map(item => (
                <li key={genItemKey(item)}>
                  {item.food} - Use by: {new Date(item.expiration).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
          <div className={sharedStyles.nestedCard}>
            <h2>Expired Items</h2>
            <ul>
              {expiredItems.map(item => (
                <li key={genItemKey(item)}>
                  {item.food} - Expired on: {new Date(item.expiration).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}