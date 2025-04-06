import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>The U.S. wastes over 120 billion pounds of food every year.</h1>
          <h2>That's 325 pounds of waste per person</h2>
          <p>Make the Most of your Meal. Fight Waste. Save the Planet.</p>
        
{/* 
        <section className={styles.mission}>
          <h2>Our mission: Prevent food waste</h2>
          <blockquote>
            “1/3 of all food produced is wasted globally. Most of it could’ve
            been eaten.”
          </blockquote>
          <div>{ "Chart will be implemented here "}</div>
        </section> */}

      <button className={styles.button}>Start Saving</button>
      
      {/* <button className={styles.addNewButton}>Add New</button> */}
      </div>
    
    </main>
    </div>
  );
}
