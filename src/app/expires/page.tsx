"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type FridgeItem = {
  food: string;
  expiration: Date;
  cost: number;
  food_type: string;
};

type FoodItem = {
  food: string;
  expiration: string;
};

enum SuccessMode {
  NONE,
  SUCCESS,
  ERROR,
}

function createFakeItem(): FridgeItem {
  return {
    food: "",
    expiration: new Date(),
    cost: 0,
    food_type: "",
  };
}

export default function InventoryPage() {
  const [mode, setMode] = useState(SuccessMode.NONE);
  const [issue, setIssue] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [allItems, setAllItems] = useState<FridgeItem[]>([createFakeItem()]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/inventory");
      const data = await response.json();
      data[data.length] = createFakeItem();
      setAllItems(data);
    };
    fetchItems();
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
          cost: 0,
          food_type: "",
        });
      }

      return newItems;
    });
  };

  const validateItems = (items: FridgeItem[]): FridgeItem[] | null => {
    const validatedItems = [];
    for (let i = 0; i < items.length - 1; i++) {
      const item = items[i];
      if (item.food && item.expiration && item.cost && item.food_type) {
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

  const foodData: FoodItem[] = [
    { food: "Apples", expiration: "2025-4-07" },
    { food: "Chicken", expiration: "2025-4-07" },
    { food: "Milk", expiration: "2025-4-07" },
    { food: "Bread", expiration: "2025-4-07" },
    { food: "Eggs", expiration: "2025-4-07" },
    { food: "Carrots", expiration: "2025-4-07" },
    { food: "Rice", expiration: "2025-4-07" },
    { food: "Fish", expiration: "2025-4-07" },
    { food: "Yogurt", expiration: "2025-4-07" },
    { food: "Potatoes", expiration: "2025-4-07" },
    { food: "Pasta", expiration: "2025-4-07" },
    { food: "Cheese", expiration: "2025-4-07" },
    { food: "Broccoli", expiration: "2025-4-07" },
    { food: "Beef", expiration: "2025-4-07" },
    { food: "Bananas", expiration: "2025-4-07" },
  ];

  const today = new Date();

  const calculateDaysUntilExpiry = (expirationDate: string): number => {
    const expiryDate = new Date(expirationDate);
    const timeDifference = expiryDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  const formatExpiryString = (food: string, expiration: string): string => {
    const daysUntilExpiry = calculateDaysUntilExpiry(expiration);
    const dotsLength = 30 - food.length;
    const dots = ".".repeat(dotsLength > 0 ? dotsLength : 0);
    return `${food}${dots}expire in ${daysUntilExpiry} days`;
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.title}>List of Food Expiry</h1>
          <div className={styles.foodBoxContainer}>
            {foodData.map((item: FoodItem) => (
              <div key={item.food} className={styles.foodBox}>
                <div className={styles.foodName}>{item.food}</div>
                <div className={styles.expirationDate}>
                  {calculateDaysUntilExpiry(item.expiration)} days left
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
