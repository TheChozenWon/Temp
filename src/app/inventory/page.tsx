"use client";

import { useEffect, useState } from "react";
import sharedStyles from "../shared.module.css";
import styles from "./page.module.css";
import FridgeItem, { genItemKey } from "../types/FridgeItem";
import fetchItems from "../util/fetchItems";

enum SuccessMode {
  NONE,
  SUCCESS,
  ERROR,
}

function createFakeItem(): FridgeItem {
  return {
    food: "",
    expiration: new Date(),
    quantity: 0,
    food_type: "",
  };
}

export default function InventoryPage() {
  const [mode, setMode] = useState(SuccessMode.NONE);
  const [issue, setIssue] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [allItems, setAllItems] = useState<FridgeItem[]>([createFakeItem()]);

  useEffect(() => {
    fetchItems().then(setAllItems);
  }, []);

  const itemIsEmpty = (item: FridgeItem) => {
    return !item.food;
  };

  const updateItem = (
    index: number,
    field: keyof FridgeItem,
    value: string | number | Date
  ) => {
    setAllItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], [field]: value };

      if (itemIsEmpty(newItems[index]) && index !== newItems.length - 1) {
        newItems.splice(index, 1);
      }

      if (index === newItems.length - 1 && !itemIsEmpty(newItems[index])) {
        newItems.push({
          food: "",
          expiration: new Date(),
          quantity: 0,
          food_type: "",
        });
      }

      return newItems;
    });
  };

  const deleteItem = (index: number) => {
    setAllItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  const validateItems = (items: FridgeItem[]): FridgeItem[] | null => {
    const validatedItems = [];
    for (let i = 0; i < items.length - 1; i++) {
      const item = items[i];
      if (item.food && item.expiration && item.quantity && item.food_type) {
        validatedItems.push(item);
      } else {
        return null;
      }
    }

    return validatedItems;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validatedItems = validateItems(allItems);
    if (!validatedItems) {
      setIssue("Please fill in all fields");
      setMode(SuccessMode.ERROR);
      return;
    }

    setMode(SuccessMode.NONE);
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedItems),
      });

      if (!response.ok) {
        throw new Error("Failed to save items");
      }

      const data = await response.json();
      setSuccess(data.message);
      setMode(SuccessMode.SUCCESS);
    } catch (error) {
      console.error("Error saving items:", error);
      setIssue("Failed to save items");
      setMode(SuccessMode.ERROR);
    }
  };

  return (
    <div className={styles.animationWrapper}>
      <div className={`${styles.wrapper} ${sharedStyles.cardPage}`}>
        <div className={`${sharedStyles.container} ${styles.container}`}>
          <form onSubmit={handleSubmit}>
            <h1>Inventory</h1>
            <ul>
              {allItems.map((item, index) => (
                <li key={genItemKey(item)}>
                  <h2>
                    {item.food ||
                      (index === allItems.length - 1
                        ? "New Item"
                        : "Unknown Food Item")}
                  </h2>
                  <input
                    type="text"
                    className={sharedStyles.input}
                    placeholder="Food"
                    value={item.food}
                    onChange={(e) => updateItem(index, "food", e.target.value)}
                  />
                  <input
                    type="date"
                    className={sharedStyles.input}
                    placeholder="Expiration Date"
                    value={item.expiration.toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                    onChange={(e) =>
                      updateItem(index, "expiration", new Date(e.target.value))
                    }
                  />
                  <input
                    type="number"
                    className={sharedStyles.input}
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, "quantity", e.target.value)
                    }
                    min={0}
                  />
                  <input
                    type="text"
                    className={sharedStyles.input}
                    placeholder="Type"
                    value={item.food_type}
                    onChange={(e) =>
                      updateItem(index, "food_type", e.target.value)
                    }
                  />
                  {index !== allItems.length - 1 && (
                    <button
                      type="button"
                      className={`${sharedStyles.input} ${styles.delete}`}
                      onClick={() => deleteItem(index)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <input
              type="submit"
              disabled={
                allItems.length === 0 || validateItems(allItems) === null
              }
              className={`${sharedStyles.input} ${sharedStyles.submit}`}
              value="Save"
            />
            {issue && mode == SuccessMode.ERROR && (
              <p className={sharedStyles.error}>{issue}</p>
            )}
            {success && mode == SuccessMode.SUCCESS && (
              <p className={sharedStyles.success}>{success}</p>
            )}
          </form>
          <p className={styles.memetext}>Web design is my passion!</p>
        </div>
      </div>
    </div>
  );
}
