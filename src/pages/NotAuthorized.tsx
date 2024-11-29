import React from "react";
import styles from "./NotAuthorized.module.css";

const NotAuthorized: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>403</h1>
      <p className={styles.message}>You are not authorized to access this page.</p>
      <a href="/" className={styles.button}>
        Go to Homepage
      </a>
    </div>
  );
};

export default NotAuthorized;
