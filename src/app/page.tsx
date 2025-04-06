"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter(); // Initialize the router

  const navigateToInventory = () => {
    router.push("/inventory"); // Navigate to the inventory page
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>The U.S. wastes over 120 billion pounds of food every year.</h1>
          <h2>That&apos;s 325 pounds of waste per person</h2>
          <br /><p>Make the Most of your Meal. Fight Waste. Save the Planet.</p>
          <br /><button className={styles.button} onClick={navigateToInventory}>Start Saving</button>
         

        </div>
      </main>
    </div>
  );
}
