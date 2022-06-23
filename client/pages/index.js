import Button from "react-bootstrap/Button";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.topHomeContainer}>
        <h1 className={styles.title}>DogeCoin Wallet</h1>
        <div className={styles.mainImageContainer}>
          <img
            src="/img/main/dogeIcon.jpg"
            alt="DogeCoin"
            className={styles.mainImage}
          />
        </div>
      </div>
      <div className={styles.topBottomContainer}>
        <Link href="/login">
          <a>
            <Button variant="primary" size="lg" className={styles.accessButton}>
              Comenzar
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
}
