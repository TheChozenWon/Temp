import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Keep Food Fresh. Fight Waste. Save the Planet.</h1>
          <p>Track food expiration dates to reduce waste and eat smarter.</p>
          <Image
            src="/placeholder.png"
            alt="Placeholder Image"
            width={500}
            height={300}
          />
        </div>

        <section className={styles.mission}>
          <h2>Our mission: Prevent food waste</h2>
          <blockquote>
            “1/3 of all food produced is wasted globally. Most of it could’ve
            been eaten.”
          </blockquote>
          <div>{/* Chart will be implemented here */}</div>
        </section>

        <button className={styles.button}>Start Preserving Food</button>
      </main>
      <button className={styles.addNewButton}>Add New</button>
    </div>
  );
}
