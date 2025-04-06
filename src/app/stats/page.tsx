"use client";

import { useEffect, useState } from "react";
import sharedStyles from "../shared.module.css";
import FridgeItem, { genItemKey } from "../types/FridgeItem";
import fetchItems from "../util/fetchItems";

export default function AllItemsPage() {
  const [allItems, setAllItems] = useState<FridgeItem[]>([]);
  const [foodTypeFilter, setFoodTypeFilter] = useState<string>("all");
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

  const determineAllFoodTypes = (items: FridgeItem[]) => {
    const foodTypes = new Set<string>();
    items.forEach(item => {
      if (item.food_type) {
        foodTypes.add(item.food_type);
      }
    });
    return Array.from(foodTypes);
  };

  const calculateStats = (items: FridgeItem[]) => {
    const totalItems = items.length;
    const expiredItems = items.filter(
      item => item.is_expired && new Date(item.expiration) >= new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    );

    const itemsUsed = items.filter(item => item.use_date).length;
    const itemsBought = totalItems;
    const numItemsExpired = expiredItems.length;
    const expiredPercentage = totalItems > 0 ? (numItemsExpired / totalItems) * 100 : 0;

    const itemsUsedByQty = items.filter(item => item.use_date).reduce((acc, item) => acc + item.quantity, 0);
    const itemsBoughtByQty = items.reduce((acc, item) => acc + item.quantity, 0);
    const numItemsExpiredByQty = expiredItems.reduce((acc, item) => acc + item.quantity, 0);
    const expiredPercentageByQty = itemsBoughtByQty > 0 ? (numItemsExpiredByQty / itemsBoughtByQty) * 100 : 0;

    return {
      itemsUsed, itemsBought, expiredPercentage,
      itemsUsedByQty, itemsBoughtByQty, expiredPercentageByQty,
      numItemsExpired, numItemsExpiredByQty
    };
  };

  const categorizeItems = (items: FridgeItem[]) => {
    const expiredItems = items.filter(item => item.is_expired && !item.use_date);
    const nonExpiredItems = items.filter(item => !item.is_expired && !item.use_date);
    const usedItems = items.filter(item => item.use_date);

    return { expiredItems, nonExpiredItems, usedItems };
  };

  const filterByFoodType = (items: FridgeItem[], foodType: string) => {
    if (foodType === "all") {
      return items;
    }
    return items.filter(item => item.food_type === foodType);
  };

  const subsetFoodItems = filterByFoodType(allItems, foodTypeFilter);
  const {
    itemsUsed, itemsBought, expiredPercentage,
    itemsUsedByQty, itemsBoughtByQty, expiredPercentageByQty,
    numItemsExpired, numItemsExpiredByQty
  } = calculateStats(subsetFoodItems);
  const { expiredItems, nonExpiredItems, usedItems } = categorizeItems(subsetFoodItems);

  return (
    <div className={sharedStyles.cardPage}>
      <div className={sharedStyles.container}>
        <h1 className={sharedStyles.title}>Statistics</h1>
        <label htmlFor="foodTypeFilter" className={sharedStyles.label}>
          Filter by Food Type:
        </label>
        <select
          className={sharedStyles.input}
          name="foodTypeFilter"
          value={foodTypeFilter}
          onChange={e => {
            setFoodTypeFilter(e.target.value);
            setError(null);
          }}
        >
          <option value="all">All Items</option>
          {determineAllFoodTypes(allItems).map((foodType, index) => (
            <option key={index} value={foodType}>
              {foodType}
            </option>
          ))}
        </select>
        <div style={{ backgroundColor: "white" }} className={sharedStyles.horizontalContainer}>
          <div className={sharedStyles.nestedCard}>
            {error ? (
              <p>{error}</p>
            ) : (
              <div>
                <h2>Items Used vs. Items Bought</h2>
                <p>Items Used: {itemsUsed}</p>
                <p>Items Bought: {itemsBought}</p>
                <p>Items Used (by qty): {itemsUsedByQty}</p>
                <p>Items Bought (by qty): {itemsBoughtByQty}</p>
              </div>
            )}
          </div>
          <div className={sharedStyles.nestedCard}>
            {!error && (
              <div>
                <h2>Food Expired in Last 14 Days</h2>
                <p>{expiredPercentage.toFixed(2)}% of food expired</p>
                <p>{numItemsExpired} items expired</p>
                <p>{expiredPercentageByQty.toFixed(2)}% of food expired (by qty)</p>
                <p>{numItemsExpiredByQty} items expired (by qty)</p>
              </div>
            )}
          </div>
        </div>
        <div style={{ backgroundColor: "white" }} className={sharedStyles.horizontalContainer}>
          <div className={sharedStyles.nestedCard}>
            <h2>Non-Expired Items</h2>
            { nonExpiredItems.length > 0 && <ul>
              {nonExpiredItems.map(item => (
                <li key={genItemKey(item)}>
                  {item.food} - Use by: {new Date(item.expiration).toLocaleDateString()} (qty: {item.quantity})
                </li>
              ))}
            </ul> || <p>No non-expired items</p>}
          </div>
          <div className={sharedStyles.nestedCard}>
            <h2>Expired Items</h2>
            { expiredItems.length > 0 && <ul>
              {expiredItems.map(item => (
                <li key={genItemKey(item)}>
                  {item.food} - Expired on: {new Date(item.expiration).toLocaleDateString()} (qty: {item.quantity})
                </li>
              ))}
            </ul> || <p>No expired items</p>}
          </div>
        </div>
        <div className={sharedStyles.nestedCard}>
          <h2>Used Items</h2>
          { usedItems.length > 0 && <ul>
            {usedItems.map(item => (
              <li key={genItemKey(item)}>
                {item.food} - Used on: {new Date(item.use_date!).toLocaleDateString()} (qty: {item.quantity})
              </li>
            ))}
          </ul> || <p>No used items</p>}
        </div>
      </div>
    </div>
  );
}