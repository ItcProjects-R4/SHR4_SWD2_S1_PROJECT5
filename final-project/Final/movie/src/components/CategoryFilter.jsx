import React from "react";
import styles from "../style/CategoryFilter.module.css";

export const CategoryFilter = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className={styles.filterContainer}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`${styles.filterButton} ${activeCategory === category.id ? styles.active : ""}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
