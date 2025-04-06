"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type FridgeItem = {
  food: string;
  expiration: Date;
};

type FoodItem = {
  food: string;
  expiration?: string;
  use_date: string | null;
  is_expired: string;
};

function createFakeItem(): FridgeItem {
  return {
    food: "",
    expiration: new Date(),
  };
}

export default function ExpirationPage() {
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

  const foodData = [
    {
      food: "milk",
      expiration: "2025-04-01",
      use_date: "2025-03-20",
      is_expired: "true",
    },
    {
      food: "bread",
      expiration: "2025-04-03",
      use_date: "2025-03-15",
      is_expired: "true",
    },
    {
      food: "chicken",
      expiration: "2025-04-08",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "spinach",
      expiration: "2025-03-25",
      use_date: "2025-03-10",
      is_expired: "true",
    },
    {
      food: "cheese",
      expiration: "2025-04-12",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "rice",
      expiration: "2025-04-20",
      use_date: "2025-03-25",
      is_expired: "false",
    },
    {
      food: "carrot",
      expiration: "2025-04-02",
      use_date: null,
      is_expired: "true",
    },
    {
      food: "beef",
      expiration: "2025-04-10",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "yogurt",
      expiration: "2025-04-05",
      use_date: "2025-03-18",
      is_expired: "true",
    },
    {
      food: "pasta",
      expiration: "2025-04-25",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "lettuce",
      expiration: "2025-04-04",
      use_date: "2025-03-22",
      is_expired: "true",
    },
    {
      food: "fish",
      expiration: "2025-04-15",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "eggplant",
      expiration: "2025-03-27",
      use_date: "2025-03-12",
      is_expired: "true",
    },
    {
      food: "butter",
      expiration: "2025-04-06",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "quinoa",
      expiration: "2025-04-28",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "potato",
      expiration: "2025-04-07",
      use_date: "2025-03-30",
      is_expired: "false",
    },
    {
      food: "turkey",
      expiration: "2025-04-20",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "cream",
      expiration: "2025-04-01",
      use_date: "2025-03-17",
      is_expired: "true",
    },
    {
      food: "oats",
      expiration: "2025-04-30",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "broccoli",
      expiration: "2025-03-29",
      use_date: "2025-03-14",
      is_expired: "true",
    },
    {
      food: "sausage",
      expiration: "2025-04-18",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "cereal",
      expiration: "2025-04-25",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "zucchini",
      expiration: "2025-04-02",
      use_date: "2025-03-20",
      is_expired: "true",
    },
    {
      food: "ham",
      expiration: "2025-04-28",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "sour cream",
      expiration: "2025-03-26",
      use_date: "2025-03-11",
      is_expired: "true",
    },
    {
      food: "flour",
      expiration: "2025-04-30",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "cauliflower",
      expiration: "2025-03-24",
      use_date: "2025-03-09",
      is_expired: "true",
    },
    {
      food: "bacon",
      expiration: "2025-04-05",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "cream cheese",
      expiration: "2025-04-04",
      use_date: "2025-03-21",
      is_expired: "true",
    },
    {
      food: "corn",
      expiration: "2025-04-15",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "bell pepper",
      expiration: "2025-03-23",
      use_date: "2025-03-08",
      is_expired: "true",
    },
    {
      food: "lamb",
      expiration: "2025-04-30",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "ice cream",
      expiration: "2025-03-28",
      use_date: "2025-03-13",
      is_expired: "true",
    },
    {
      food: "pancake mix",
      expiration: "2025-04-20",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "asparagus",
      expiration: "2025-03-22",
      use_date: "2025-03-07",
      is_expired: "true",
    },
    {
      food: "duck",
      expiration: "2025-04-25",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "whipped cream",
      expiration: "2025-04-01",
      use_date: "2025-03-19",
      is_expired: "true",
    },
    {
      food: "bread crumbs",
      expiration: "2025-04-30",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "green beans",
      expiration: "2025-04-03",
      use_date: "2025-03-16",
      is_expired: "true",
    },
    {
      food: "veal",
      expiration: "2025-04-28",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "cream soda",
      expiration: "2025-03-29",
      use_date: "2025-03-14",
      is_expired: "true",
    },
    {
      food: "granola",
      expiration: "2025-04-25",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "sweet potato",
      expiration: "2025-03-30",
      use_date: "2025-03-15",
      is_expired: "true",
    },
    {
      food: "rabbit",
      expiration: "2025-04-20",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "cheddar cheese",
      expiration: "2025-04-02",
      use_date: "2025-03-18",
      is_expired: "true",
    },
    {
      food: "couscous",
      expiration: "2025-04-30",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "egg",
      expiration: "2025-03-31",
      use_date: "2025-03-16",
      is_expired: "true",
    },
    {
      food: "goat cheese",
      expiration: "2025-04-25",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "bulgur wheat",
      expiration: "2025-04-30",
      use_date: null,
      is_expired: "false",
    },
    {
      food: "mushroom",
      expiration: "2025-03-26",
      use_date: "2025-03-11",
      is_expired: "true",
    },
    {
      food: "pork",
      expiration: "2025-04-05",
      use_date: null,
      is_expired: "false",
    },
  ];

  const today = new Date();

  const calculateDaysUntilExpiry = (expirationDate?: string): number => {
    if (!expirationDate) {
      return 0;
    }
    const expiryDate = new Date(expirationDate);
    const timeDifference = expiryDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>List of Food Expiry</h1>
        <div className={styles.foodBoxContainer}>
          {foodData.map((item: FoodItem) => (
            <div key={item.food} className={styles.foodBox}>
              <div className={styles.foodName}>{item.food}</div>
              <div className={styles.expirationDate}>
                Expiration: {item.expiration} (
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
