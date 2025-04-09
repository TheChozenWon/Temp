"use client";

import { useEffect, useState, useCallback } from "react";
import sharedStyles from "../shared.module.css";
import styles from "./page.module.css";
import FridgeItem from "../types/FridgeItem";
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
    quantity: "",
    food_type: "",
  };
}

export default function InventoryPage() {
  const [mode, setMode] = useState(SuccessMode.NONE);
  const [issue, setIssue] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [allItems, setAllItems] = useState<FridgeItem[]>([createFakeItem()]);

  useEffect(() => {
    fetchItems().then((items) => {
      const parsedItems = items.map((item) => ({
        ...item,
        expiration: new Date(item.expiration), // Ensure expiration is a Date object
      }));
      setAllItems(parsedItems);
    });
  }, []);

  const updateItem = useCallback(
    (index: number, field: keyof FridgeItem, value: string | number | Date) => {
      setAllItems((prevItems) => {
        const newItems = [...prevItems];
        if (newItems[index][field] !== value) {
          newItems[index] = { ...newItems[index], [field]: value };
        }
        return newItems;
      });
    },
    []
  );

  const validateItems = (items: FridgeItem[]): FridgeItem[] | null => {
    const validatedItems = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (
        item.food &&
        item.expiration instanceof Date &&
        !isNaN(item.expiration.getTime()) &&
        Number(item.quantity) > 0 &&
        item.food_type
      ) {
        validatedItems.push(item);
      } else {
        return null; // Return null if any item is invalid
      }
    }

    return validatedItems;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validatedItems = validateItems(allItems);
    if (!validatedItems) {
      setIssue("Please fill in all fields correctly.");
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
        const errorText = await response.text(); // Fetch error details if available
        throw new Error(errorText || "Failed to save inventory.");
      }

      setSuccess("Inventory saved successfully!");
      setMode(SuccessMode.SUCCESS);
    } catch (error: any) {
      setIssue(error.message || "An unknown error occurred.");
      setMode(SuccessMode.ERROR);
    } finally {
      setTimeout(() => {
        setSuccess(null);
        setMode(SuccessMode.NONE);
      }, 3000);
    }
  };

  return (
    <div className={`${styles.wrapper} ${sharedStyles.cardPage}`}>
      <div className={`${sharedStyles.container} ${styles.container}`}>
        <form onSubmit={handleSubmit}>
          <h1>Inventory</h1>
          <ul>
            {allItems.map((item, index) => (
              <li key={index}>
                <div className={styles.foodBox}>
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
                    value={
                      item.expiration instanceof Date
                        ? item.expiration.toISOString().split("T")[0]
                        : ""
                    }
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
                      updateItem(index, "quantity", Number(e.target.value))
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

                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={() => {
                      const newItems = [...allItems];
                      newItems.push(createFakeItem());
                      setAllItems(newItems);
                    }}
                  >
                    Add
                  </button>

                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => {
                      if (allItems.length > 1) {
                        const newItems = [...allItems];
                        newItems.splice(index, 1);
                        setAllItems(newItems);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <input
            type="submit"
            disabled={allItems.length === 0 || validateItems(allItems) === null}
            className={`${sharedStyles.input} ${sharedStyles.submit}`}
            value="Save"
          />

          {issue && mode === SuccessMode.ERROR && (
            <p className={sharedStyles.error}>{issue}</p>
          )}
          {success && mode === SuccessMode.SUCCESS && (
            <p className={sharedStyles.success}>{success}</p>
          )}
        </form>
      </div>
    </div>
  );
}
